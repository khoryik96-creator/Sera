import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/Shared';
import { ArchiveFigureCard } from '../villains/ArchiveFigureCard';
import type { ArchiveFigure } from '../villains/archiveFigures';
import { SHINRIN_TIER_ORDER, shinrinParagons } from './shinrinData';

interface TierGroup {
  tier: string;
  figures: ArchiveFigure[];
}

/** Group the ten Paragons by cultivation tier, strongest first, keeping roster
 *  order within each tier. */
function groupByTier(figures: ArchiveFigure[]): TierGroup[] {
  const groups = new Map<string, ArchiveFigure[]>();
  for (const figure of figures) {
    const tier = figure.strength || 'Paragon';
    (groups.get(tier) || groups.set(tier, []).get(tier)!).push(figure);
  }
  const rank = (tier: string) => {
    const i = SHINRIN_TIER_ORDER.indexOf(tier);
    return i === -1 ? SHINRIN_TIER_ORDER.length : i;
  };
  return [...groups.entries()]
    .map(([tier, list]) => ({ tier, figures: list }))
    .sort((a, b) => rank(a.tier) - rank(b.tier));
}

export function ShinrinPage() {
  const [filter, setFilter] = useState('');
  const groups = useMemo(() => groupByTier(shinrinParagons), []);

  const needle = filter.trim().toLowerCase();
  const visibleGroups = groups
    .map((group) => ({ ...group, figures: group.figures.filter((figure) => !needle || JSON.stringify(figure).toLowerCase().includes(needle)) }))
    .filter((group) => group.figures.length > 0);
  const total = visibleGroups.reduce((sum, group) => sum + group.figures.length, 0);

  return (
    <section>
      <PageHeader eyebrow="Final arc · Northern invaders" title="Shinrin" description="The Shinsei Guild’s ten official Paragon officers — their martial styles, signature skills and Paragon Domains — grouped by cultivation tier." />
      <div className="toolbar-row">
        <input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter Shinrin Paragons, styles, or Domains…" />
        <span className="archive-count">{total} of 10 Paragons</span>
      </div>
      {visibleGroups.length === 0 ? (
        <p className="empty-note">No Shinrin Paragon matches “{filter}”.</p>
      ) : (
        visibleGroups.map((group) => (
          <div className="isgard-guild" key={group.tier}>
            <div className="isgard-guild__heading">
              <h3>{group.tier}</h3>
              <span>{group.figures.length} Paragon{group.figures.length === 1 ? '' : 's'}</span>
            </div>
            <div className="lore-card-grid">
              {group.figures.map((figure) => <ArchiveFigureCard figure={figure} key={figure.key} />)}
            </div>
          </div>
        ))
      )}
      <p className="empty-note">Yurushi Amagiri (Black Radiance) is a deliberately-unranked Established Paragon outside the official ten — he appears on the Quaint Teahouse tab as the Sixth Petal.</p>
    </section>
  );
}
