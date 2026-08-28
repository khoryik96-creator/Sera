import { getEl } from './dom';
import { EPISODE_ARCS } from './episodeMeta';

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
 * Build the archive from typed metadata and discard the legacy handwritten arc
 * markup if it is still present in index.html. Episode prose is rendered lazily
 * into these generated season containers.
 */
export function prepareEpisodeArchive(): EpisodeArcMeta[] {
  const root = getEl('episodes');
  const existing = document.getElementById('episodeArchiveGenerated');
  if (existing) return archiveStructure;

  archiveStructure = EPISODE_ARCS;
  const originalArcs = [...root.children].filter((child) => child.matches('.arc-accordion')) as HTMLElement[];
  const generated = document.createElement('div');
  generated.id = 'episodeArchiveGenerated';
  generated.innerHTML = archiveStructure.map(arcMarkup).join('');

  if (originalArcs[0]) root.insertBefore(generated, originalArcs[0]);
  else root.appendChild(generated);
  originalArcs.forEach((arc) => arc.remove());
  return archiveStructure;
}

export function getEpisodeStructure(): EpisodeArcMeta[] {
  return archiveStructure;
}

export function allSeasonNumbers(): number[] {
  return archiveStructure.flatMap((arc) => arc.seasons.map((season) => season.season));
}
