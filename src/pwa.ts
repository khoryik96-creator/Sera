import { APP_VERSION, BUILD_SHA } from './version';
import { setOfflineBanner } from './appStatus';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

type InstallAvailabilityListener = (available: boolean) => void;

let installPrompt: BeforeInstallPromptEvent | null = null;
let refreshForUpdate = false;
let reloadingForUpdate = false;
// A new build detected within this window of the page loading is treated as an
// update the reader just triggered by opening or refreshing, so it is applied
// automatically. Updates that land later (mid-read) fall back to the banner so
// an active reader is never yanked out of their chapter by a surprise reload.
const AUTO_APPLY_WINDOW_MS = 20_000;
const installAvailabilityListeners = new Set<InstallAvailabilityListener>();

function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches;
}

export function canInstallReader(): boolean {
  return Boolean(installPrompt) && !isStandalone();
}

function updateInstallButton(): void {
  const button = document.getElementById('installApp') as HTMLButtonElement | null;
  if (!button) return;
  button.hidden = !canInstallReader();
}

function notifyInstallAvailability(): void {
  const available = canInstallReader();
  updateInstallButton();
  installAvailabilityListeners.forEach((listener) => listener(available));
}

export function subscribeInstallAvailability(listener: InstallAvailabilityListener): () => void {
  installAvailabilityListeners.add(listener);
  listener(canInstallReader());
  return () => {
    installAvailabilityListeners.delete(listener);
  };
}

export async function promptInstallReader(): Promise<'accepted' | 'dismissed' | null> {
  const prompt = installPrompt;
  if (!prompt || isStandalone()) return null;
  await prompt.prompt();
  const choice = await prompt.userChoice;
  installPrompt = null;
  notifyInstallAvailability();
  return choice.outcome;
}

function ensureUpdateBanner(): { banner: HTMLElement; update: HTMLButtonElement; dismiss: HTMLButtonElement } {
  let banner = document.getElementById('updateBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'updateBanner';
    banner.className = 'reader-update-banner';
    banner.hidden = true;
    banner.innerHTML = '<span>New reader version ready.</span><button id="updateReader" type="button">Update Reader</button><button id="dismissReaderUpdate" type="button">Later</button>';
    document.body.appendChild(banner);
  }
  const update = banner.querySelector<HTMLButtonElement>('#updateReader') || document.createElement('button');
  const dismiss = banner.querySelector<HTMLButtonElement>('#dismissReaderUpdate') || document.createElement('button');
  return { banner, update, dismiss };
}

function showUpdateBanner(registration: ServiceWorkerRegistration): void {
  const { banner, update, dismiss } = ensureUpdateBanner();
  banner.hidden = false;
  update.disabled = false;
  update.textContent = 'Update Reader';
  update.onclick = () => {
    const waiting = registration.waiting;
    if (!waiting) {
      void registration.update();
      return;
    }
    refreshForUpdate = true;
    update.disabled = true;
    update.textContent = 'Updating…';
    waiting.postMessage({ type: 'SKIP_WAITING' });
  };
  dismiss.onclick = () => { banner.hidden = true; };
}

async function registerServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator) || !location.protocol.startsWith('http')) return;
  try {
    const workerVersion = BUILD_SHA && BUILD_SHA !== 'dev' ? `${APP_VERSION}-${BUILD_SHA}` : APP_VERSION;
    const registeredAt = Date.now();
    const registration = await navigator.serviceWorker.register(`./sw.js?v=${encodeURIComponent(workerVersion)}`);

    const applyWaitingWorker = (): void => {
      const waiting = registration.waiting;
      if (!waiting) return;
      refreshForUpdate = true;
      waiting.postMessage({ type: 'SKIP_WAITING' });
    };
    const handleWaitingWorker = (): void => {
      // Only a genuine update replaces an already-controlling worker; the first
      // ever install (no controller) must not trigger a reload.
      if (!registration.waiting || !navigator.serviceWorker.controller || refreshForUpdate) return;
      if (Date.now() - registeredAt < AUTO_APPLY_WINDOW_MS) applyWaitingWorker();
      else showUpdateBanner(registration);
    };
    handleWaitingWorker();

    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) handleWaitingWorker();
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshForUpdate || reloadingForUpdate) return;
      reloadingForUpdate = true;
      location.reload();
    });

    const checkForUpdate = (): void => {
      if (navigator.onLine) void registration.update().catch(() => undefined);
    };
    window.addEventListener('online', checkForUpdate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    });
    window.setTimeout(checkForUpdate, 1500);
  } catch (error) {
    console.warn('Service worker registration failed', error);
  }
}

export function initPwa(): void {
  setOfflineBanner(!navigator.onLine);
  window.addEventListener('online', () => setOfflineBanner(false));
  window.addEventListener('offline', () => setOfflineBanner(true));

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event as BeforeInstallPromptEvent;
    notifyInstallAvailability();
  });

  document.getElementById('installApp')?.addEventListener('click', () => {
    void promptInstallReader();
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    notifyInstallAvailability();
  });

  notifyInstallAvailability();

  if (document.readyState === 'complete') void registerServiceWorker();
  else window.addEventListener('load', () => { void registerServiceWorker(); }, { once: true });
}
