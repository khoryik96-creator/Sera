export interface CharacterAppearance {
  season: number;
  episode: number;
  title: string;
}

export type CharacterAppearanceIndex = Record<string, CharacterAppearance[]>;

let cache: CharacterAppearanceIndex | null = null;
let pending: Promise<CharacterAppearanceIndex> | null = null;

async function loadIndex(): Promise<CharacterAppearanceIndex> {
  if (__SINGLEFILE__) {
    const mod = await import('../../../generated/character-appearances.json');
    return mod.default as CharacterAppearanceIndex;
  }

  const { default: dataUrl } = await import('../../../generated/character-appearances.json?url');
  const response = await fetch(dataUrl, { cache: 'default' });
  if (!response.ok) throw new Error(`Failed to load character appearances: ${response.status}`);
  return await response.json() as CharacterAppearanceIndex;
}

export async function getCharacterAppearances(key: string): Promise<CharacterAppearance[]> {
  if (!cache) {
    pending ||= loadIndex().then((value) => {
      cache = value;
      return value;
    }).finally(() => {
      pending = null;
    });
    cache = await pending;
  }
  return cache[key] || [];
}
