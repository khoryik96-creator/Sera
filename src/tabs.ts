import { renderCharacterButtons, renderCharacter } from './characters';
import { renderSkills } from './skills';
import { renderRanks } from './ranks';
import { renderLegends } from './legends';
import { renderFormer } from './former';
import { renderSeraTimeline } from './seraTimeline';
import { renderEpisodes, mountEpisodeLazyRendering } from './episodes';
import { renderArcFigures } from './arcFigures';
import { renderColorKey } from './colorKey';
import { prepareEpisodeArchive } from './episodeStructure';
import { initEpisodeNav } from './episodeNav';

export const SEARCH_INPUT_IDS = ['search', 'legendSearch', 'otherSearch'] as const;
const initializedTabs = new Set<string>();

export function clearSearchInputs(): void {
  for (const id of SEARCH_INPUT_IDS) {
    const input = document.getElementById(id);
    if (input instanceof HTMLInputElement) input.value = '';
  }
}

async function initializeTab(tabName: string): Promise<void> {
  if (initializedTabs.has(tabName)) return;
  if (tabName === 'characters') {
    renderCharacterButtons();
    renderCharacter('sera');
  } else if (tabName === 'others') {
    renderArcFigures();
  } else if (tabName === 'skills') {
    renderSkills();
  } else if (tabName === 'rankings') {
    renderRanks();
  } else if (tabName === 'legends') {
    renderLegends();
  } else if (tabName === 'former') {
    renderFormer();
  } else if (tabName === 'sera-timeline') {
    renderSeraTimeline();
  } else if (tabName === 'episodes') {
    prepareEpisodeArchive();
    renderColorKey();
    mountEpisodeLazyRendering();
    await initEpisodeNav();
    await renderEpisodes();
  }
  initializedTabs.add(tabName);
}

export async function activateTab(tabName: string): Promise<void> {
  document.querySelectorAll<HTMLElement>('.tab').forEach((button) => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  document.querySelectorAll<HTMLElement>('.panel').forEach((panel) => {
    const active = panel.id === tabName;
    panel.classList.toggle('hidden', !active);
    panel.setAttribute('aria-hidden', String(!active));
  });
  clearSearchInputs();
  await initializeTab(tabName);
}

export function isTabInitialized(tabName: string): boolean {
  return initializedTabs.has(tabName);
}
