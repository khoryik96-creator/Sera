import { getEl } from './dom';

export interface EpisodeSeasonMeta {
  season: number;
  title: string;
  badge: string;
  hasCast: boolean;
}

export interface EpisodeArcMeta {
  title: string;
  badge: string;
  description: string;
  seasons: EpisodeSeasonMeta[];
}

let archiveStructure: EpisodeArcMeta[] = [];

function directChild(parent: Element, selector: string): HTMLElement | null {
  return [...parent.children].find((child) => child.matches(selector)) as HTMLElement | undefined || null;
}

/** Extract the legacy static archive headings into a typed metadata structure. */
export function extractEpisodeStructure(root: HTMLElement): EpisodeArcMeta[] {
  const arcs = [...root.children].filter((child) => child.matches('.arc-accordion')) as HTMLDetailsElement[];
  return arcs.map((arc) => {
    const head = directChild(arc, '.arc-head');
    const body = directChild(arc, '.arc-body');
    const title = head?.querySelector('h2')?.textContent?.trim() || 'Untitled Arc';
    const badge = head?.querySelector('.badge')?.textContent?.trim() || '';
    const description = head?.querySelector('p')?.textContent?.trim() || '';
    const seasonNodes = body ? [...body.children].filter((child) => child.matches('.season-accordion')) as HTMLDetailsElement[] : [];
    const seasons = seasonNodes.map((seasonNode) => {
      const seasonTitle = seasonNode.querySelector('h2')?.textContent?.trim() || '';
      const match = seasonTitle.match(/Season\s+(\d+)/i);
      if (!match) throw new Error(`Cannot determine season number from: ${seasonTitle}`);
      const season = Number(match[1]);
      return {
        season,
        title: seasonTitle,
        badge: seasonNode.querySelector('.badge')?.textContent?.trim() || '',
        hasCast: Boolean(seasonNode.querySelector(`#seasonCast${season}`)),
      };
    });
    return { title, badge, description, seasons };
  });
}

function seasonListId(season: number): string {
  return season === 1 ? 'episodeList' : `episodeListSeason${season}`;
}

function arcMarkup(arc: EpisodeArcMeta): string {
  return `<details class="arc-accordion">
    <summary class="arc-head"><div><h2>${arc.title}</h2><span class="badge">${arc.badge}</span><p>${arc.description}</p></div><span class="arc-toggle">▾</span></summary>
    <div class="arc-body">
      ${arc.seasons.map((meta) => `<details class="season-accordion" data-season="${meta.season}">
        <summary class="episode-season-head"><div><h2>${meta.title}</h2><span class="badge">${meta.badge}</span></div><span class="season-toggle" aria-hidden="true">▾</span></summary>
        ${meta.hasCast ? `<div id="seasonCast${meta.season}" class="season-cast-guide"></div>` : ''}
        <div id="${seasonListId(meta.season)}" class="season-episode-list" data-season-list="${meta.season}"></div>
      </details>`).join('')}
    </div>
  </details>`;
}

/**
 * Replace the large handwritten archive DOM with a generated shell. The old
 * markup is read once as migration metadata, then discarded; episode prose is
 * rendered lazily into the generated season containers.
 */
export function prepareEpisodeArchive(): EpisodeArcMeta[] {
  const root = getEl('episodes');
  const existing = document.getElementById('episodeArchiveGenerated');
  if (existing) return archiveStructure;

  archiveStructure = extractEpisodeStructure(root);
  const originalArcs = [...root.children].filter((child) => child.matches('.arc-accordion')) as HTMLElement[];
  if (originalArcs.length === 0) throw new Error('Episode archive metadata is missing.');

  const generated = document.createElement('div');
  generated.id = 'episodeArchiveGenerated';
  generated.innerHTML = archiveStructure.map(arcMarkup).join('');
  root.insertBefore(generated, originalArcs[0]);
  originalArcs.forEach((arc) => arc.remove());
  return archiveStructure;
}

export function getEpisodeStructure(): EpisodeArcMeta[] {
  return archiveStructure;
}

export function allSeasonNumbers(): number[] {
  return archiveStructure.flatMap((arc) => arc.seasons.map((season) => season.season));
}
