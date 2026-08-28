export interface EpisodeSearchRecord {
  id: string;
  season: number;
  episode: number;
  title: string;
  excerpt: string;
  searchText: string;
}

interface SearchIndexPayload {
  episodes: EpisodeSearchRecord[];
}

let indexPromise: Promise<EpisodeSearchRecord[]> | null = null;

export function loadEpisodeSearchIndex(): Promise<EpisodeSearchRecord[]> {
  if (!indexPromise) {
    indexPromise = import('../../../generated/search-index.json')
      .then((module) => (module.default as SearchIndexPayload).episodes || [])
      .catch((error) => {
        indexPromise = null;
        throw error;
      });
  }
  return indexPromise;
}
