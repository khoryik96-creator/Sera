import { GENERATED_APP_VERSION, GENERATED_BUILD_SHA } from './generated/build-meta';

export const APP_VERSION = GENERATED_APP_VERSION;
export const BUILD_SHA = GENERATED_BUILD_SHA;
export const BUILD_LABEL = BUILD_SHA && BUILD_SHA !== 'dev' ? `v${APP_VERSION} · ${BUILD_SHA}` : `v${APP_VERSION}`;

export function renderBuildInfo(): void {
  const chip = document.querySelector<HTMLElement>('.version-chip');
  if (chip) {
    chip.textContent = BUILD_LABEL;
    chip.title = BUILD_SHA === 'dev' ? 'Development build' : `Build ${BUILD_SHA}`;
  }
  document.title = `The Quiet Regular — Lore Repository v${APP_VERSION}`;
}
