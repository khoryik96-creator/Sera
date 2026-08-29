const MOBILE_BREAKPOINT = '(max-width: 800px)';
const LIBRARY_TAB_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'Home', 'End']);

function syncResponsiveNavigationLandmarks(media: MediaQueryList): void {
  const primary = document.querySelector<HTMLElement>('.primary-nav');
  const mobile = document.querySelector<HTMLElement>('.mobile-tabs');
  if (!primary || !mobile) return;

  // Both navigation sets remain in the DOM for responsive continuity. Expose
  // only the one that is actually visible so assistive technology never sees
  // duplicate navigation landmarks for the same repository sections.
  if (media.matches) {
    primary.setAttribute('aria-hidden', 'true');
    mobile.removeAttribute('aria-hidden');
  } else {
    mobile.setAttribute('aria-hidden', 'true');
    primary.removeAttribute('aria-hidden');
  }
}

function handleLibraryTabKeyDown(event: KeyboardEvent): void {
  if (!LIBRARY_TAB_KEYS.has(event.key)) return;
  const current = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('.library-tabs [role="tab"]');
  if (!current) return;
  const tablist = current.closest<HTMLElement>('[role="tablist"]');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const index = tabs.indexOf(current);
  if (index < 0 || !tabs.length) return;

  event.preventDefault();
  // React delegates keyboard events from the root. Handle this capture-phase
  // interaction here so focus changes synchronously instead of waiting for a
  // requestAnimationFrame after the selected panel rerenders.
  event.stopPropagation();

  const nextIndex = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? tabs.length - 1
      : event.key === 'ArrowRight'
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
  const next = tabs[nextIndex];
  if (!next) return;
  next.focus();
  next.click();
}

export function initAccessibilityHardening(): void {
  const media = window.matchMedia(MOBILE_BREAKPOINT);
  const sync = (): void => syncResponsiveNavigationLandmarks(media);
  window.requestAnimationFrame(sync);
  media.addEventListener('change', sync);
  document.addEventListener('keydown', handleLibraryTabKeyDown, true);
}
