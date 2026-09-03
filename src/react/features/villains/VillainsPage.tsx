import { useMemo, useState } from 'react';
import { characterRegistry } from '../../../characterRegistry';
import { DB } from '../../../db';
import type { ArcFigure } from '../../../types';
import { PageHeader } from '../../components/Shared';
import { cleanCharacterName } from '../../shared/rankState';
import { cleanLoreRole, inferLoreAffiliation, loreStrengthFrom } from '../../shared/loreMetadata';

const MAIN_FIGURE_KEYS = new Set(['mo_qingzhao', 'yun_shizhen', 'ilyra_serath']);

type ArchiveFigure = ArcFigure & {
  strength?: string;
  source: 'arc' | 'season-cast';
};

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

export function VillainsPage() {
  const [filter, setFilter] = useState('');
  const figures = useMemo<ArchiveFigure[]>(() => {
    const arcFigures = DB.arcFigures
      .filter((figure) => !MAIN_FIGURE_KEYS.has(figure.key))
      .map((figure) => ({
        ...figure,
        affiliation: figure.affiliation || inferLoreAffiliation(cleanCharacterName(figure.name)) || undefined,
        strength: figure.strength?.trim() || loreStrengthFrom([figure.subtitle, figure.affiliationRole, figure.details]) || undefined,
        source: 'arc' as const,
      }));
    return [...arcFigures, ...recurringCastFigures()];
  }, []);
  const visible = figures.filter((figure) => JSON.stringify(figure).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Arc figures" title="Other Characters & Villains" description="Recurring allies, sovereigns, antagonists, Crowns, Kings, and every highlighted recurring figure outside the main character dashboard." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter figures, arcs, affiliations, or techniques…" /></div>
      <div className="lore-card-grid">
        {visible.map((figure) => (
          <details className="lore-card" key={figure.key}>
            <summary>
              <div className="tag-row">
                {figure.firstSeason ? <span>{figure.firstEpisode ? `S${figure.firstSeason}E${figure.firstEpisode}` : `S${figure.firstSeason}`}</span> : null}
                {figure.firstArc ? <span>{figure.firstArc}</span> : null}
                {figure.affiliation ? <span>{figure.affiliation}</span> : null}
              </div>
              <h3>{figure.name}</h3>
              <p>{figure.subtitle}</p>
              <small>Expand profile and martial systems ↓</small>
            </summary>
            <div className="lore-card__body">
              {figure.strength || figure.affiliation || figure.affiliationRole ? (
                <section>
                  <p className="eyebrow">Strength, affiliation &amp; standing</p>
                  <dl className="profile-facts profile-facts--inline">
                    {figure.strength ? <div><dt>Strength</dt><dd>{figure.strength}</dd></div> : null}
                    {figure.affiliation ? <div><dt>Affiliation</dt><dd>{figure.affiliation}</dd></div> : null}
                    {figure.affiliationRole ? <div><dt>Standing</dt><dd>{figure.affiliationRole}</dd></div> : null}
                  </dl>
                </section>
              ) : null}
              {figure.firstSeason ? (
                <section>
                  <p className="eyebrow">First indexed appearance</p>
                  <p>{figure.firstArc ? <><strong>{figure.firstArc}</strong> · </> : null}Season {figure.firstSeason}{figure.firstEpisode ? `, Episode ${figure.firstEpisode}` : ''}{figure.firstEpisodeTitle ? ` — ${figure.firstEpisodeTitle}` : ''}</p>
                </section>
              ) : null}
              <section><p className="eyebrow">Profile / threat record</p><p>{figure.details}</p></section>
              {figure.skills?.length ? <section><p className="eyebrow">Skills / martial systems</p><div className="technique-list">{figure.skills.map((skill, index) => <article key={`${figure.key}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{skill[0]}</strong><small>{skill[1]}</small><p>{skill[2]}</p></div></article>)}</div></section> : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
