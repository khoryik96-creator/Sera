import React, { useState } from 'https://esm.sh/react@19.0.0';
import { DB } from '../../../db';
import type { Former } from '../../../types';
import { PageHeader, RankBadge } from '../../components/Shared';
import type { PreviewRankStatus } from '../../shared/rankState';

function status(entry: Former): PreviewRankStatus {
  if (/deceased|dead|killed/i.test(entry.status)) return 'deceased';
  if (/retired|semi[- ]?retired/i.test(entry.status)) return 'retired';
  return 'former';
}

function cleanRank(rank: string): string {
  return rank.replace(/^Former\s+/i, '').trim();
}

export function FormerPage() {
  const [filter, setFilter] = useState('');
  const visible = DB.former.filter((entry) => JSON.stringify(entry).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Ranking history" title="Former Rank Holders" description="Past summit figures, retired rankers, and the dead use explicit historical status rather than looking like current holders." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter former rankers…" /></div>
      <div className="former-grid">
        {visible.map((entry) => {
          const tone = status(entry);
          const ranked = entry.rank && !/unranked/i.test(entry.rank);
          return (
            <article className="former-card" key={`${entry.rank}-${entry.name}`}>
              <div className="former-card__topline"><span className="status-chip">{entry.status}</span>{ranked ? <RankBadge rank={cleanRank(entry.rank)} status={tone} /> : null}</div>
              <h3>{entry.name}</h3><p className="former-card__title">{entry.title}</p><small>{entry.era}</small>
              <p>{entry.summary}</p>
              <div className="fact-grid"><section><p className="eyebrow">Connections</p><p>{entry.connections}</p></section><section><p className="eyebrow">Fate</p><p>{entry.death}</p></section></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
