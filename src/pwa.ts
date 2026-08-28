import { APP_VERSION } from './version';
import { setOfflineBanner } from './appStatus';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let installPrompt: BeforeInstallPromptEvent | null = null;

function updateInstallButton(): void {
  const button = document.getElementById('installApp') as HTMLButtonElement | null;
  if (!button) return;
  const standalone = window.matchMedia('(display-mode: standalone)').matches;
  button.hidden = standalone || !installPrompt;
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

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`./sw.js?v=${encodeURIComponent(APP_VERSION)}`).catch((error) => {
        console.warn('Service worker registration failed', error);
      });
    }, { once: true });
  }
}
