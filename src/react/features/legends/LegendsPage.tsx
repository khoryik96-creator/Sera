import React, { useState } from 'https://esm.sh/react@19.0.0';
import { DB } from '../../../db';
import { renderNovel } from '../../../novel';
import { PageHeader } from '../../components/Shared';

export function LegendsPage() {
  const [filter, setFilter] = useState('');
  const visible = DB.legends.filter((legend) => JSON.stringify(legend).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Recorded legends" title="Legends" description="The incidents that built the world’s reputations, rendered with the same dialogue colours, technique treatment, and rank pills as the novel reader." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter legends…" /></div>
      <div className="lore-card-grid lore-card-grid--single">
        {visible.map((legend) => (
          <details className="lore-card" key={`${legend.rank}-${legend.title}`}>
            <summary><div className="tag-row"><span>{legend.rank}</span><span>{legend.kind}</span></div><h3>{legend.title}</h3><small>Read full legend ↓</small></summary>
            <div className="lore-card__body">
              <div className="reader-prose reader-prose--compact" dangerouslySetInnerHTML={{ __html: renderNovel(legend.text) }} />
              <section className="legend-callout"><p className="eyebrow">Why it matters</p><p>{legend.significance}</p></section>
              <section><p className="eyebrow">Memorable line</p><p>{legend.quote}</p></section>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
