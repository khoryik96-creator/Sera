import { renderCharacterButtons } from './characters';
import { renderSkills } from './skills';
import { renderRanks } from './ranks';
import { renderLegends } from './legends';
import { renderFormer } from './former';
import { renderSeraTimeline } from './seraTimeline';
import { renderEpisodes } from './episodes';
import { renderArcFigures } from './arcFigures';

/** Every search box across the tabs (global + per-tab). */
export const SEARCH_INPUT_IDS = ['search', 'legendSearch', 'otherSearch'] as const;

/**
 * Reset every search box. The global search plus the per-tab Legends and
 * Other-Characters boxes are cleared so a stale query never lingers over a
 * freshly re-rendered (unfiltered) list after switching tabs.
 */
export function clearSearchInputs(): void {
  for (const id of SEARCH_INPUT_IDS) {
    const el = document.getElementById(id);
    if (el instanceof HTMLInputElement) el.value = '';
  }
}

export function activateTab(tabName: string): void {
  document.querySelectorAll<HTMLElement>('.tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === tabName));
  document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('hidden', p.id !== tabName));
  clearSearchInputs();
  if (tabName === 'skills') renderSkills();
  if (tabName === 'rankings') renderRanks();
  if (tabName === 'legends') renderLegends();
  if (tabName === 'former') renderFormer();
  if (tabName === 'sera-timeline') renderSeraTimeline();
  if (tabName === 'episodes') renderEpisodes();
  if (tabName === 'characters') renderCharacterButtons();
  if (tabName === 'others') renderArcFigures();
}
