import React, { useState } from 'https://esm.sh/react@19.0.0';
import { DB } from '../../../db';
import { renderNovel } from '../../../novel';
import { PageHeader } from '../../components/Shared';

export function TimelinePage() {
  const [filter, setFilter] = useState('');
  const visible = DB.seraTimeline.filter((entry) => JSON.stringify(entry).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Pale Orchid chronology" title="Sera Timeline" description="Sera’s progression from assassin prodigy to retired former #6, Duke-level return, and post-war life at Second Spring." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter Sera’s timeline…" /></div>
      <div className="timeline">
        {visible.map((entry, index) => (
          <article className="timeline__item" key={`${entry.age}-${entry.title}-${index}`}>
            <div className="timeline__rail"><span /></div>
            <details className="timeline__card">
              <summary><div className="tag-row"><span>{entry.age}</span><span>{entry.phase}</span></div><h3>{entry.title}</h3><small>Expand chronology ↓</small></summary>
              <div className="reader-prose reader-prose--compact" dangerouslySetInnerHTML={{ __html: renderNovel(entry.text) }} />
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
