import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/Shared';
import { isIsgardAffiliation, isgardGuild, isgardGuildKey } from '../../shared/isgard';
import { ArchiveFigureCard } from '../villains/ArchiveFigureCard';
import { buildArchiveFigures } from '../villains/archiveFigures';
import type { ArchiveFigure } from '../villains/archiveFigures';

interface GuildGroup {
  guild: string;
  affiliation: string;
  figures: ArchiveFigure[];
  firstSeason: number;
}

const FAR_FUTURE = Number.MAX_SAFE_INTEGER;

/** Group every Isgard figure under its guild/house/banner, ordering the guilds
 *  by earliest appearance and the members within each by appearance then name. */
function groupByGuild(figures: ArchiveFigure[]): GuildGroup[] {
  const groups = new Map<string, GuildGroup>();
  for (const figure of figures) {
    // Group by a punctuation-insensitive key so one house isn't split by two
    // spellings; keep the first (arc-figure) spelling as the display label.
    const key = isgardGuildKey(figure.affiliation);
    const group = groups.get(key) || { guild: isgardGuild(figure.affiliation), affiliation: figure.affiliation || key, figures: [], firstSeason: FAR_FUTURE };
    group.figures.push(figure);
    group.firstSeason = Math.min(group.firstSeason, figure.firstSeason ?? FAR_FUTURE);
    groups.set(key, group);
  }
  const ordered = [...groups.values()];
  ordered.sort((a, b) => (a.firstSeason - b.firstSeason) || a.guild.localeCompare(b.guild));
  for (const group of ordered) {
    group.figures.sort((a, b) => ((a.firstSeason ?? FAR_FUTURE) - (b.firstSeason ?? FAR_FUTURE)) || a.name.localeCompare(b.name));
  }
  return ordered;
}

export function IsgardPage() {
  const [filter, setFilter] = useState('');
  const groups = useMemo<GuildGroup[]>(
    () => groupByGuild(buildArchiveFigures().filter((figure) => isIsgardAffiliation(figure.affiliation))),
    [],
  );

  const needle = filter.trim().toLowerCase();
  const visibleGroups = groups
    .map((group) => ({ ...group, figures: group.figures.filter((figure) => !needle || JSON.stringify(figure).toLowerCase().includes(needle)) }))
    .filter((group) => group.figures.length > 0);
  const total = visibleGroups.reduce((sum, group) => sum + group.figures.length, 0);

  return (
    <section>
      <PageHeader eyebrow="Northern coalition" title="Isgard" description="The northern banners, guilds and houses of Isgard, grouped by allegiance — every highlighted Isgard figure gathered in one place." />
      <div className="toolbar-row">
        <input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter Isgard figures, guilds, or standing…" />
        <span className="archive-count">{total} figure{total === 1 ? '' : 's'} · {visibleGroups.length} guild{visibleGroups.length === 1 ? '' : 's'}</span>
      </div>
      {visibleGroups.length === 0 ? (
        <p className="empty-note">No Isgard figures match “{filter}”.</p>
      ) : (
        visibleGroups.map((group) => (
          <div className="isgard-guild" key={group.guild}>
            <div className="isgard-guild__heading">
              <h3>{group.guild}</h3>
              <span>{group.figures.length} figure{group.figures.length === 1 ? '' : 's'}</span>
            </div>
            <div className="lore-card-grid">
              {group.figures.map((figure) => <ArchiveFigureCard figure={figure} key={figure.key} />)}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
