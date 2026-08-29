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

async function loadSearchPayload(): Promise<SearchIndexPayload> {
  if (__SINGLEFILE__) {
    const module = await import('../../../generated/search-index.json');
    return module.default as SearchIndexPayload;
  }

  const { default: dataUrl } = await import('../../../generated/search-index.json?url');
  const response = await fetch(dataUrl, { cache: 'default' });
  if (!response.ok) throw new Error(`Failed to load episode search index: ${response.status} ${response.statusText}`);
  return await response.json() as SearchIndexPayload;
}

export function loadEpisodeSearchIndex(): Promise<EpisodeSearchRecord[]> {
  if (!indexPromise) {
    indexPromise = loadSearchPayload()
      .then((payload) => payload.episodes || [])
      .catch((error) => {
        indexPromise = null;
        throw error;
      });
  }
  return indexPromise;
}
