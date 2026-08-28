import { activateTab } from './tabs';
import { renderCharacter } from './characters';
import { jumpToEpisodeByNumber } from './episodeNav';

const VALID_TABS = new Set(['characters', 'others', 'skills', 'rankings', 'legends', 'former', 'sera-timeline', 'episodes', 'canon']);
let applying = false;

function cleanHash(): string {
  return decodeURIComponent(location.hash.replace(/^#\/?/, '')).trim();
}

function setRoute(path: string, replace = false): void {
  const url = `${location.pathname}${location.search}#${path}`;
  if (replace) history.replaceState(null, '', url);
  else history.pushState(null, '', url);
}

export async function applyCurrentRoute(): Promise<void> {
  if (applying) return;
  applying = true;
  try {
    const route = cleanHash();
    if (!route) {
      setRoute('characters/sera', true);
      await activateTab('characters');
      renderCharacter('sera');
      return;
    }

    const [first, second, third] = route.split('/');
    if (first === 'characters') {
      await activateTab('characters');
      renderCharacter(second || 'sera');
      return;
    }

    if (first === 'episodes') {
      await activateTab('episodes');
      const season = Number(second || 1);
      const episode = Number(third || 1);
      if (Number.isFinite(season) && Number.isFinite(episode)) {
        await jumpToEpisodeByNumber(season, episode, false);
      }
      return;
    }

    if (VALID_TABS.has(first)) {
      await activateTab(first);
      return;
    }

    setRoute('characters/sera', true);
    await activateTab('characters');
    renderCharacter('sera');
  } finally {
    applying = false;
  }
}

export async function navigateToTab(tab: string): Promise<void> {
  if (!VALID_TABS.has(tab)) return;
  setRoute(tab === 'characters' ? 'characters/sera' : tab);
  await applyCurrentRoute();
}

export async function navigateToCharacter(key: string): Promise<void> {
  setRoute(`characters/${encodeURIComponent(key)}`);
  await applyCurrentRoute();
}

export async function navigateToEpisode(season: number, episode: number): Promise<void> {
  setRoute(`episodes/${season}/${episode}`);
  await applyCurrentRoute();
}

export function initRouter(): void {
  window.addEventListener('popstate', () => { void applyCurrentRoute(); });
  window.addEventListener('hashchange', () => { void applyCurrentRoute(); });
}
