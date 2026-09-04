import { characterRegistry } from '../../../characterRegistry';
import { DB } from '../../../db';
import type { ArcFigure } from '../../../types';
import { cleanCharacterName } from '../../shared/rankState';
import { cleanLoreRole, inferLoreAffiliation, loreStrengthFrom } from '../../shared/loreMetadata';

/** Figures that belong on the main character dashboard, never in the archive grid. */
export const MAIN_FIGURE_KEYS = new Set(['mo_qingzhao', 'yun_shizhen', 'ilyra_serath']);

export type ArchiveFigure = ArcFigure & {
  strength?: string;
  source: 'arc' | 'season-cast';
};

/** Highlighted recurring season-cast members who are not already an arc figure,
 *  a dashboard character, or a former rank holder. */
function recurringCastFigures(): ArchiveFigure[] {
  const existingNames = new Set(DB.arcFigures.map((figure) => cleanCharacterName(figure.name)));
  const mainNames = new Set(Object.values(DB.characters).map((character) => cleanCharacterName(character.name)));
  const formerNames = new Set(DB.former.map((former) => cleanCharacterName(former.name)));
  const registryByName = new Map(characterRegistry.map((entry) => [entry.displayName, entry] as const));
  const seen = new Set(existingNames);
  const figures: ArchiveFigure[] = [];

  const seasons = Object.entries(DB.seasonCast)
    .map(([season, rows]) => ({ season: Number(season), rows }))
    .filter(({ season }) => Number.isInteger(season))
    .sort((a, b) => a.season - b.season);

  for (const { season, rows } of seasons) {
    for (const row of rows) {
      const name = cleanCharacterName(row.name);
      const registry = registryByName.get(name);
      if (!registry || seen.has(name) || mainNames.has(name) || formerNames.has(name)) continue;

      const strength = row.strength?.trim() || loreStrengthFrom([row.role, row.description]);
      const role = row.affiliationRole?.trim() || cleanLoreRole(row.role);
      const affiliation = row.affiliation?.trim() || inferLoreAffiliation(name);
      seen.add(name);
      figures.push({
        key: registry.key,
        name,
        subtitle: [role, strength].filter(Boolean).join(' · ') || 'Recurring highlighted figure',
        details: row.description,
        affiliation: affiliation || undefined,
        affiliationRole: role || undefined,
        firstSeason: season,
        strength: strength || undefined,
        source: 'season-cast',
      });
    }
  }

  return figures;
}

/** Every highlighted recurring figure outside the main dashboard — arc figures
 *  plus recurring season cast — with affiliation and strength backfilled. */
export function buildArchiveFigures(): ArchiveFigure[] {
  const arcFigures = DB.arcFigures
    .filter((figure) => !MAIN_FIGURE_KEYS.has(figure.key))
    .map((figure) => ({
      ...figure,
      affiliation: figure.affiliation || inferLoreAffiliation(cleanCharacterName(figure.name)) || undefined,
      strength: figure.strength?.trim() || loreStrengthFrom([figure.subtitle, figure.affiliationRole, figure.details]) || undefined,
      source: 'arc' as const,
    }));
  return [...arcFigures, ...recurringCastFigures()];
}
