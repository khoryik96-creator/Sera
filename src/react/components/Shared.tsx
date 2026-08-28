import type { PreviewRankStatus } from '../shared/rankState';

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

export function RankBadge({ rank, status = 'current' }: { rank: string; status?: PreviewRankStatus }) {
  if (!rank) return null;
  let tone = 'current';
  let suffix = '';
  if (status === 'deceased') { tone = 'deceased'; suffix = ' †'; }
  else if (status === 'retired') { tone = 'retired'; suffix = ' · RET'; }
  else if (status === 'former' || rank.startsWith('Former ')) { tone = 'former'; suffix = ' · FORMER'; }
  return <span className={`react-rank-badge react-rank-badge--${tone}`}>{rank}{suffix}</span>;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="empty-state"><div><strong>{title}</strong><p>{text}</p></div></div>;
}
