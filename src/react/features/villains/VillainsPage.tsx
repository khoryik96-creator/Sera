import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/Shared';
import { isIsgardAffiliation } from '../../shared/isgard';
import { ArchiveFigureCard } from './ArchiveFigureCard';
import { buildArchiveFigures } from './archiveFigures';
import type { ArchiveFigure } from './archiveFigures';

export function VillainsPage() {
  const [filter, setFilter] = useState('');
  const figures = useMemo<ArchiveFigure[]>(
    // Isgard figures now live in their own tab, so keep them out of this grid.
    () => buildArchiveFigures().filter((figure) => !isIsgardAffiliation(figure.affiliation)),
    [],
  );
  const visible = figures.filter((figure) => JSON.stringify(figure).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Arc figures" title="Other Characters & Villains" description="Recurring allies, sovereigns, antagonists, Crowns, Kings, and every highlighted recurring figure outside the main character dashboard. Isgard's banners have their own tab." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter figures, arcs, affiliations, or techniques…" /></div>
      <div className="lore-card-grid">
        {visible.map((figure) => <ArchiveFigureCard figure={figure} key={figure.key} />)}
      </div>
    </section>
  );
}
