// Type definitions for The Quiet Regular lore repository data model.
// src/data.json remains the canonical authoring file. Build preparation splits
// it into a small core payload plus independently loadable season payloads.

export interface Character {
  name: string;
  subtitle: string;
  tags?: string[];
  identity?: string;
  appearance?: string;
  personality?: string;
  reputation?: string;
  motif?: string;
  relationship?: string;
  background?: string;
  legend?: string;
  details?: string;
}

export interface Skill {
  name: string;
  category: string;
  signature?: string;
  rating?: string;
  tier?: string;
  short?: string;
  mechanics?: string;
  visual?: string;
  lore?: string;
  reveal?: string;
}

export interface Legend {
  rank: string;
  title: string;
  kind: string;
  text: string;
  significance: string;
  quote: string;
}

export interface ArcFigure {
  key: string;
  name: string;
  subtitle: string;
  details: string;
  /** Each skill row: [name, category, description]. */
  skills?: string[][];
  firstSeason?: number;
  firstEpisode?: number;
  firstEpisodeTitle?: string;
  firstArc?: string;
}

export interface Former {
  name: string;
  rank: string;
  status: string;
  title: string;
  era: string;
  summary: string;
  connections: string;
  death: string;
}

export interface SeraTimelineEntry {
  age: string;
  title: string;
  phase: string;
  text: string;
}

export interface Episode {
  ep: string;
  title: string;
  text: string;
}

export interface TopSkillEntry {
  name: string;
  category: string;
  signature: string;
  rating: string;
  description: string;
}

export interface RankEntry {
  rank: string;
  name: string;
  className: string;
  description: string;
}

export interface SeasonCastEntry {
  name: string;
  role: string;
  description: string;
}

/** Persisted JSON compatibility rows. They are converted in normalizeDatabase(). */
export type LegacyTopSkillRow = [string, string, string, string, string];
export type LegacyRankRow = [string, string, string, string];
export type LegacySeasonCastRow = [string, string, string];

interface CoreFields {
  characters: Record<string, Character>;
  legends: Legend[];
  arcFigures: ArcFigure[];
  former: Former[];
  seraTimeline: SeraTimelineEntry[];
  rhenSkills: Skill[];
  seraSkills: Skill[];
  canonRules?: unknown[];
}

/** Runtime core shape consumed by non-episode render code. */
export interface Database extends CoreFields {
  topSkills: Record<string, TopSkillEntry[]>;
  ranks: RankEntry[];
  seasonCast: Record<string, SeasonCastEntry[]>;
}

/** Generated core.json shape before positional compatibility rows are normalized. */
export interface RawCoreDatabase extends CoreFields {
  topSkills: Record<string, LegacyTopSkillRow[]>;
  ranks: LegacyRankRow[];
  seasonCast: Record<string, LegacySeasonCastRow[]>;
}

/** Canonical authoring shape of src/data.json. */
export interface RawDatabase extends RawCoreDatabase {
  [season: `season${number}`]: Episode[];
}
