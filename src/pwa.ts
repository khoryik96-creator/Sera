import { APP_VERSION, BUILD_SHA } from './version';
import { setOfflineBanner } from './appStatus';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let installPrompt: BeforeInstallPromptEvent | null = null;
let refreshForUpdate = false;

function updateInstallButton(): void {
  const button = document.getElementById('installApp') as HTMLButtonElement | null;
  if (!button) return;
  const standalone = window.matchMedia('(display-mode: standalone)').matches;
  button.hidden = standalone || !installPrompt;
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
    const registration = await navigator.serviceWorker.register(`./sw.js?v=${encodeURIComponent(workerVersion)}`);
    const announceWaitingWorker = (): void => {
      if (registration.waiting && navigator.serviceWorker.controller) showUpdateBanner(registration);
    };
    announceWaitingWorker();

    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) announceWaitingWorker();
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshForUpdate) location.reload();
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
    updateInstallButton();
  });

  document.getElementById('installApp')?.addEventListener('click', async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    updateInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    updateInstallButton();
  });

  if (document.readyState === 'complete') void registerServiceWorker();
  else window.addEventListener('load', () => { void registerServiceWorker(); }, { once: true });
}