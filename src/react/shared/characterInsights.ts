import { characterRegistry } from '../../characterRegistry';
import { DB } from '../../db';
import { loadSeasons } from '../../seasonStore';
import type { Legend } from '../../types';
import { cleanCharacterName, rankLabel, rankStatus } from './rankState';
import type { RankStatus } from './rankState';

export interface CharacterLink {
  key: string;
  name: string;
  subtitle: string;
}

export interface RankJourneyStep {
  rank: string;
  status: RankStatus;
  fromSeason: number;
  toSeason: number;
  current: boolean;
}

export interface EpisodeAppearance {
  id: string;
  season: number;
  episode: number;
  title: string;
}

export interface AppearanceScan {
  seasons: number[];
  episodes: EpisodeAppearance[];
}

const appearanceCache = new Map<string, Promise<AppearanceScan>>();

function normalize(value: string): string {
  return cleanCharacterName(value)
    .toLowerCase()
    .replace(/\bformer\b/g, '')
    .replace(/#\d+/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function registryEntry(key: string, displayName: string) {
  const clean = cleanCharacterName(displayName);
  return characterRegistry.find((entry) => entry.key === key || entry.displayName === clean || entry.aliases.includes(clean));
}

function distinctiveSubtitle(key: string): string {
  const subtitle = DB.characters[key]?.subtitle || '';
  const segment = subtitle
    .split('·')
    .map((part) => part.replace(/^The\s+/i, '').trim())
    .find((part) => part.length >= 4 && part.split(/\s+/).length <= 5 && !/#\d|world\s+#?\d|rank|unranked|retired|age\s+\d|beyond\s+/i.test(part));
  return segment || '';
}

export function characterAliases(key: string, displayName: string): string[] {
  const entry = registryEntry(key, displayName);
  return Array.from(new Set([cleanCharacterName(displayName), ...(entry?.aliases || []), distinctiveSubtitle(key)].filter(Boolean)));
}

function containsAlias(value: string | undefined, aliases: string[]): boolean {
  if (!value) return false;
  const haystack = value.toLowerCase();
  return aliases.some((alias) => {
    const needle = alias.trim().toLowerCase();
    if (needle.length < 4) return false;
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, 'i').test(haystack);
  });
}

export function relatedCharacters(key: string, displayName: string): CharacterLink[] {
  const aliases = characterAliases(key, displayName);
  const active = DB.characters[key];
  const activeRelationshipText = [active?.relationship, active?.background, active?.details].filter(Boolean).join(' ');

  return Object.entries(DB.characters)
    .filter(([otherKey]) => otherKey !== key)
    .map(([otherKey, other]) => {
      const otherName = cleanCharacterName(other.name);
      const otherAliases = characterAliases(otherKey, otherName);
      const reciprocalText = [other.relationship, other.background, other.details].filter(Boolean).join(' ');
      const linked = containsAlias(activeRelationshipText, otherAliases) || containsAlias(reciprocalText, aliases);
      return linked ? { key: otherKey, name: otherName, subtitle: other.subtitle } : null;
    })
    .filter((item): item is CharacterLink => Boolean(item))
    .slice(0, 8);
}

export function characterLegends(key: string, displayName: string): Legend[] {
  const aliases = characterAliases(key, displayName);
  return DB.legends.filter((legend) => containsAlias(`${legend.title} ${legend.text} ${legend.significance} ${legend.quote}`, aliases));
}

export function rankJourney(displayName: string): RankJourneyStep[] {
  const clean = cleanCharacterName(displayName);
  const timeline: Array<{ season: number; rank: string }> = [];
  for (let season = 1; season <= 69; season += 1) timeline.push({ season, rank: rankLabel(clean, season) });

  const steps: RankJourneyStep[] = [];
  let start = 1;
  let activeRank = timeline[0]?.rank || '';
  for (let index = 1; index <= timeline.length; index += 1) {
    const nextRank = timeline[index]?.rank ?? '__END__';
    if (nextRank === activeRank) continue;
    const end = index;
    if (activeRank) {
      const current = end === 69;
      steps.push({
        rank: activeRank,
        status: current ? rankStatus(clean) : activeRank.toLowerCase().includes('unranked') ? 'unranked' : 'former',
        fromSeason: start,
        toSeason: end,
        current,
      });
    }
    activeRank = nextRank;
    start = index + 1;
  }
  return steps;
}

export function characterAppearanceSeasons(key: string, displayName: string): number[] {
  const aliases = characterAliases(key, displayName).map(normalize).filter(Boolean);
  const entry = registryEntry(key, displayName);
  const speakerKeys = new Set(entry?.speakerKeys || [entry?.key || key]);

  return Object.entries(DB.seasonCast)
    .filter(([, rows]) => rows.some((row) => {
      const castName = normalize(row.name);
      return aliases.some((alias) => castName === alias || castName.includes(alias) || alias.includes(castName))
        || Array.from(speakerKeys).some((speaker) => normalize(row.name) === normalize(speaker));
    }))
    .map(([season]) => Number(season))
    .filter((season) => Number.isInteger(season) && season >= 1 && season <= 69)
    .sort((a, b) => a - b);
}

function episodeMentionsCharacter(text: string, title: string, aliases: string[], speakerKeys: string[]): boolean {
  const source = `${title}\n${text}`;
  if (speakerKeys.some((speaker) => source.includes(`[[speaker:${speaker}]]`))) return true;
  return containsAlias(source, aliases);
}

export function scanCharacterAppearances(key: string, displayName: string): Promise<AppearanceScan> {
  const cacheKey = `${key}:${displayName}`;
  const existing = appearanceCache.get(cacheKey);
  if (existing) return existing;

  const request = (async () => {
    const aliases = characterAliases(key, displayName);
    const entry = registryEntry(key, displayName);
    const speakerKeys = entry?.speakerKeys || [entry?.key || key];
    const seasons = characterAppearanceSeasons(key, displayName);
    if (!seasons.length) return { seasons: [], episodes: [] };

    const loaded = await loadSeasons(seasons);
    const episodes: EpisodeAppearance[] = [];
    for (const season of seasons) {
      const rows = loaded.get(season) || [];
      rows.forEach((episode, index) => {
        if (!episodeMentionsCharacter(episode.text, episode.title, aliases, speakerKeys)) return;
        episodes.push({ id: `ep-s${season}-e${index + 1}`, season, episode: index + 1, title: episode.title });
      });
    }
    return { seasons, episodes };
  })();

  appearanceCache.set(cacheKey, request);
  return request;
}
