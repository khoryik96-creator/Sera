// Type definitions for The Quiet Regular lore repository data model.
// src/data.json remains the canonical authoring file. Build preparation splits
// it into a small core payload plus independently loadable season payloads.

export interface Character {
  name: string;
  subtitle: string;
  tags?: string[];
  /** Cultivation tier (e.g. "High Sovereign", "Peak Sovereign, approaching Paragon"). */
  cultivation?: string;
  /** Primary faction / army / organization the character belongs to. */
  affiliation?: string;
  /** Internal standing within that affiliation (rank, seat or command role). */
  affiliationRole?: string;
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
  /** Explicit combat/cultivation assessment; may state that a specialist is not formally rated. */
  strength?: string;
  /** Primary faction / order / coalition the figure belongs to. */
  affiliation?: string;
  /** Internal standing within that affiliation (rank, seat or command role). */
  affiliationRole?: string;
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
  /** Historical combat/cultivation assessment in the scale used by that era. */
  strength?: string;
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

export interface CanonRule {
  title: string;
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
  strength?: string;
  affiliation?: string;
  affiliationRole?: string;
}

interface CoreFields {
  characters: Record<string, Character>;
  legends: Legend[];
  arcFigures: ArcFigure[];
  former: Former[];
  seraTimeline: SeraTimelineEntry[];
  rhenSkills: Skill[];
  seraSkills: Skill[];
  topSkills: Record<string, TopSkillEntry[]>;
  ranks: RankEntry[];
  seasonCast: Record<string, SeasonCastEntry[]>;
  canonRules?: CanonRule[];
}

/** Runtime core shape consumed by non-episode render code. */
export type Database = CoreFields;

/**
 * Generated core.json shape. Rows are stored as named objects in src/data.json,
 * so this is structurally identical to {@link Database}; the alias is kept for
 * call sites that describe data loaded from disk before it is adopted as DB.
 */
export type RawCoreDatabase = Database;

/** Canonical authoring shape of src/data.json. */
export interface RawDatabase extends RawCoreDatabase {
  [season: `season${number}`]: Episode[];
}
