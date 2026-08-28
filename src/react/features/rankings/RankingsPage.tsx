import { DB } from '../../../db';
import { rankColorKey } from '../../../ranks';
import { rankStatusForEntry } from '../../shared/rankState';
import { PageHeader, RankBadge } from '../../components/Shared';

export function RankingsPage() {
  return (
    <section>
      <PageHeader eyebrow="World ranking" title="The Current Summit" description="Current-ranked martial artists stay gold; former, retired, unranked, and deceased states use the same badge language everywhere in the reader." />
      <div className="ranking-grid">
        {DB.ranks.map((entry) => {
          const key = rankColorKey(entry.name);
          const cleanName = entry.name.split(' — ')[0].trim();
          const status = rankStatusForEntry(cleanName, entry.rank, entry.className);
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
