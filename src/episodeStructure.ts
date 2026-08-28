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
    <summary class="arc-head"><div><h2>${arc.title}</h2><span class="badge">${arc.badge}</span><p>${arc.description}</p></div><span class="arc-toggle" aria-hidden="true">▾</span></summary>
    <div class="arc-body">
      ${arc.seasons.map((meta) => `<details class="season-accordion" data-season="${meta.season}">
        <summary class="episode-season-head"><div><h2>${meta.title}</h2><span class="badge">${meta.badge}</span></div><span class="season-toggle" aria-hidden="true">▾</span></summary>
        ${meta.hasCast ? `<div id="seasonCast${meta.season}" class="season-cast-guide"></div>` : ''}
        <div id="${seasonListId(meta.season)}" class="season-episode-list" data-season-list="${meta.season}" aria-live="polite"></div>
      </details>`).join('')}
    </div>
  </details>`;
}

/** Build the entire lightweight archive shell from typed metadata. */
export function prepareEpisodeArchive(): EpisodeArcMeta[] {
  archiveStructure = EPISODE_ARCS;
  const root = getEl('episodes');
  let generated = document.getElementById('episodeArchiveGenerated');
  if (!generated) {
    generated = document.createElement('div');
    generated.id = 'episodeArchiveGenerated';
    root.appendChild(generated);
  }
  if (!generated.childElementCount) generated.innerHTML = archiveStructure.map(arcMarkup).join('');
  return archiveStructure;
}

export function getEpisodeStructure(): EpisodeArcMeta[] {
  return archiveStructure.length ? archiveStructure : EPISODE_ARCS;
}

export function allSeasonNumbers(): number[] {
  return getEpisodeStructure().flatMap((arc) => arc.seasons.map((season) => season.season));
}
