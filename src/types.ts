// Type definitions for The Quiet Regular lore repository data model.
// The persisted lore still lives in src/data.json. Legacy positional rows are
// normalized once in db.ts so render modules work with named, typed fields.

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

interface DatabaseCore {
  characters: Record<string, Character>;
  legends: Legend[];
  arcFigures: ArcFigure[];
  former: Former[];
  seraTimeline: SeraTimelineEntry[];
  rhenSkills: Skill[];
  seraSkills: Skill[];
  canonRules?: unknown[];
  [season: `season${number}`]: Episode[];
}

/** Runtime shape consumed by render code. */
export interface Database extends DatabaseCore {
  topSkills: Record<string, TopSkillEntry[]>;
  ranks: RankEntry[];
  seasonCast: Record<string, SeasonCastEntry[]>;
}

/** On-disk shape of data.json during the compatibility migration. */
export interface RawDatabase extends DatabaseCore {
  topSkills: Record<string, LegacyTopSkillRow[]>;
  ranks: LegacyRankRow[];
  seasonCast: Record<string, LegacySeasonCastRow[]>;
}
