const STATUS_ID = 'appStatus';

function statusEl(): HTMLElement | null {
  return document.getElementById(STATUS_ID);
}

export function showAppLoading(message = 'Opening the lore archive…'): void {
  const el = statusEl();
  if (!el) return;
  el.hidden = false;
  el.className = 'app-status app-status--loading';
  el.innerHTML = `<div class="app-status__card" role="status" aria-live="polite"><span class="app-spinner" aria-hidden="true"></span><strong>${message}</strong></div>`;
}

export function hideAppStatus(): void {
  const el = statusEl();
  if (el) el.hidden = true;
}

export function showAppError(message = 'The lore archive could not be loaded.'): void {
  const el = statusEl();
  if (!el) return;
  el.hidden = false;
  el.className = 'app-status app-status--error';
  el.innerHTML = `<div class="app-status__card" role="alert"><strong>${message}</strong><span>Check your connection, then try again.</span><button id="retryAppLoad" type="button">Retry</button></div>`;
  document.getElementById('retryAppLoad')?.addEventListener('click', () => location.reload(), { once: true });
}

export function setOfflineBanner(offline: boolean): void {
  const banner = document.getElementById('offlineBanner');
  if (!banner) return;
  banner.hidden = !offline;
}
