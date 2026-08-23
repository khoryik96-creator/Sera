// Type definitions for The Quiet Regular lore repository data model.
// The data lives in src/data.json; these interfaces document its shape and
// give the render code compile-time checking over DB access.

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

/** Signature-art row: [name, category, signature, rating, description]. */
export type TopSkillRow = string[];
/** Ranking row: [rank, name, class, description]. */
export type RankRow = string[];
/** Season cast row: [name, role, description]. */
export type SeasonCastRow = string[];

export interface Database {
  characters: Record<string, Character>;
  legends: Legend[];
  arcFigures: ArcFigure[];
  former: Former[];
  seraTimeline: SeraTimelineEntry[];
  rhenSkills: Skill[];
  seraSkills: Skill[];
  topSkills: Record<string, TopSkillRow[]>;
  ranks: RankRow[];
  seasonCast: Record<string, SeasonCastRow[]>;
  canonRules?: unknown[];
  [season: `season${number}`]: Episode[];
}
