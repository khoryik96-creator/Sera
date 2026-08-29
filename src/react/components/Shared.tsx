import type { RankStatus } from '../shared/rankState';
import { rankStatusFromText } from '../shared/rankState';

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

export function RankBadge({ rank, status }: { rank: string; status?: RankStatus }) {
  if (!rank) return null;
  const resolved = status ?? rankStatusFromText(rank);
  const cleaned = rank.replace(/^Former\s+/i, '').trim();
  const displayRank = resolved === 'unranked' ? 'UNRANKED' : cleaned;
  let suffix = '';
  if (resolved === 'deceased') suffix = ' †';
  else if (resolved === 'retired') suffix = ' · RET';
  else if (resolved === 'former') suffix = ' · FORMER';
  return <span className={`react-rank-badge react-rank-badge--${resolved}`}>{displayRank}{suffix}</span>;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><div><strong>{title}</strong><p>{text}</p></div></div>;
}
