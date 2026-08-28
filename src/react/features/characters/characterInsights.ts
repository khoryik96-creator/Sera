import { characterRegistry } from '../../../characterRegistry';
import { DB } from '../../../db';
import type { Former, Legend, TopSkillEntry } from '../../../types';
import { cleanCharacterName, rankLabel, rankStatus, rankStatusFromText } from '../../shared/rankState';
import type { RankStatus } from '../../shared/rankState';

export interface CharacterRelationshipLink {
  key: string;
  name: string;
  subtitle: string;
  source: 'relationship' | 'profile' | 'reciprocal';
}

export interface CharacterRankMoment {
  seasonLabel: string;
  rank: string;
  status: RankStatus;
}

export interface CharacterInsights {
  relationships: CharacterRelationshipLink[];
  legends: Legend[];
  rankJourney: CharacterRankMoment[];
  formerRecord: Former | null;
  signatureArts: TopSkillEntry[];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function aliasesForDisplayName(displayName: string): string[] {
  const registry = characterRegistry.find((entry) => entry.displayName === displayName);
  const aliases = registry?.aliases || [displayName];
  return [...new Set(aliases)].filter(Boolean).sort((a, b) => b.length - a.length);
}

function containsAlias(text: string, aliases: string[]): boolean {
  return aliases.some((alias) => new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i').test(text));
}

function profileText(key: string): { relationship: string; rest: string } {
  const profile = DB.characters[key];
  if (!profile) return { relationship: '', rest: '' };
  return {
    relationship: profile.relationship || '',
    rest: [profile.identity, profile.reputation, profile.background, profile.legend, profile.details]
      .filter(Boolean)
      .join(' '),
  };
}

function relationshipsForCharacter(key: string): CharacterRelationshipLink[] {
  const selected = DB.characters[key];
  if (!selected) return [];
  const selectedName = cleanCharacterName(selected.name);
  const selectedAliases = aliasesForDisplayName(selectedName);
  const own = profileText(key);
  const rows: CharacterRelationshipLink[] = [];

  for (const [candidateKey, candidate] of Object.entries(DB.characters)) {
    if (candidateKey === key) continue;
    const candidateName = cleanCharacterName(candidate.name);
    const candidateAliases = aliasesForDisplayName(candidateName);
    let source: CharacterRelationshipLink['source'] | null = null;
    if (containsAlias(own.relationship, candidateAliases)) source = 'relationship';
    else if (containsAlias(own.rest, candidateAliases)) source = 'profile';
    else {
      const reciprocal = profileText(candidateKey);
      if (containsAlias(`${reciprocal.relationship} ${reciprocal.rest}`, selectedAliases)) source = 'reciprocal';
    }
    if (source) rows.push({ key: candidateKey, name: candidateName, subtitle: candidate.subtitle, source });
  }

  const order = { relationship: 0, profile: 1, reciprocal: 2 } as const;
  return rows.sort((a, b) => order[a.source] - order[b.source] || a.name.localeCompare(b.name)).slice(0, 10);
}

function legendsForCharacter(displayName: string): Legend[] {
  const aliases = aliasesForDisplayName(displayName);
  const direct: Legend[] = [];
  const related: Legend[] = [];
  for (const legend of DB.legends) {
    if (containsAlias(legend.rank, aliases)) direct.push(legend);
    else if (containsAlias(`${legend.title} ${legend.text} ${legend.significance} ${legend.quote}`, aliases)) related.push(legend);
  }
  return [...direct, ...related].filter((item, index, all) => all.findIndex((other) => other.title === item.title) === index).slice(0, 8);
}

function rankJourneyForCharacter(key: string, rawName: string): CharacterRankMoment[] {
  const displayName = cleanCharacterName(rawName);
  if (key === 'rhen') return [{ seasonLabel: 'All eras', rank: 'Unranked', status: 'unranked' }];

  if (key === 'qin' || key === 'han') {
    const current = rankLabel(rawName);
    return current ? [{ seasonLabel: 'Present record', rank: current, status: rankStatus(rawName) }] : [];
  }

  const milestones = [
    { season: 1, label: 'Season 1' },
    { season: 23, label: 'Season 23' },
    { season: 44, label: 'Season 44' },
    { season: 64, label: 'Season 64' },
  ];
  const rows: CharacterRankMoment[] = [];
  for (const milestone of milestones) {
    const rank = rankLabel(displayName, milestone.season);
    if (!rank || rows[rows.length - 1]?.rank === rank) continue;
    rows.push({ seasonLabel: milestone.label, rank, status: rankStatus(displayName, milestone.season) });
  }

  if (!rows.length) {
    const current = rankLabel(rawName);
    if (current) rows.push({ seasonLabel: 'Present record', rank: current, status: rankStatus(rawName) });
  }
  return rows;
}

function formerRecordForCharacter(displayName: string): Former | null {
  return DB.former.find((entry) => cleanCharacterName(entry.name) === displayName) || null;
}

export function insightsForCharacter(key: string): CharacterInsights {
  const character = DB.characters[key];
  if (!character) return { relationships: [], legends: [], rankJourney: [], formerRecord: null, signatureArts: [] };
  const displayName = cleanCharacterName(character.name);
  const formerRecord = formerRecordForCharacter(displayName);
  const rankJourney = rankJourneyForCharacter(key, character.name);
  if (formerRecord && !rankJourney.length) {
    rankJourney.push({ seasonLabel: formerRecord.era || 'Historical record', rank: formerRecord.rank, status: rankStatusFromText(formerRecord.rank, formerRecord.status) });
  }
  return {
    relationships: relationshipsForCharacter(key),
    legends: legendsForCharacter(displayName),
    rankJourney,
    formerRecord,
    signatureArts: (DB.topSkills[key] || []).slice(0, 4),
  };
}
