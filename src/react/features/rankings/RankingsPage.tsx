import React from 'https://esm.sh/react@19.0.0';
import { DB } from '../../../db';
import { rankColorKey } from '../../../ranks';
import { rankStateForStory } from '../../../characterRegistry';
import type { RankStatus } from '../../../characterRegistry';
import { PageHeader, RankBadge } from '../../components/Shared';

function statusFor(name: string, rank: string, className: string): RankStatus {
  const cleanName = name.split(' — ')[0].trim();
  const registered = rankStateForStory(cleanName);
  if (registered !== 'current') return registered;
  if (/deceased/i.test(className)) return 'deceased';
  if (/retired/i.test(className)) return 'retired';
  if (/former/i.test(`${rank} ${className}`)) return 'former';
  return 'current';
}

export function RankingsPage() {
  return (
    <section>
      <PageHeader eyebrow="World ranking" title="The Current Summit" description="Current-ranked martial artists stay gold; former, retired, and deceased states use the same explicit visual language as the reader." />
      <div className="ranking-grid">
        {DB.ranks.map((entry) => {
          const key = rankColorKey(entry.name);
          const cleanName = entry.name.split(' — ')[0].trim();
          const status = statusFor(cleanName, entry.rank, entry.className);
          return (
            <article className="ranking-card" key={`${entry.rank}-${entry.name}`}>
              <div className="ranking-card__rank"><RankBadge rank={entry.rank} status={status} /></div>
              <div><p className="eyebrow">{entry.className}</p><h3 className={`character-${key}`}>{entry.name}</h3><p>{entry.description}</p></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
