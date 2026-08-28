export const APP_VERSION = __APP_VERSION__;
export const BUILD_SHA = __BUILD_SHA__;
export const BUILD_LABEL = BUILD_SHA && BUILD_SHA !== 'dev' ? `v${APP_VERSION} · ${BUILD_SHA}` : `v${APP_VERSION}`;

export function renderBuildInfo(): void {
  const chip = document.querySelector<HTMLElement>('.version-chip');
  if (chip) {
    chip.textContent = BUILD_LABEL;
    chip.title = BUILD_SHA === 'dev' ? 'Development build' : `Build ${BUILD_SHA}`;
  }
  document.title = `The Quiet Regular — Lore Repository v${APP_VERSION}`;
}
