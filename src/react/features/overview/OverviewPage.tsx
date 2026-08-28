import { DB } from '../../../db';
import { EPISODE_ARCS } from '../../../episodeMeta';
import { useReaderState } from '../reader/ReaderContext';
import type { PreviewSection } from '../../app/navigation';

interface OverviewPageProps {
  onOpenSection(section: PreviewSection): void;
  onOpenChapter(season: number, episode: number): void;
}

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

export function OverviewPage({ onOpenSection, onOpenChapter }: OverviewPageProps) {
  const { lastRead } = useReaderState();
  const seasons = EPISODE_ARCS.reduce((sum, arc) => sum + arc.seasons.length, 0);
  const characters = Object.keys(DB.characters).length;

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">The Quiet Regular · React preview</p>
          <h2>Second Spring,<br />rebuilt for reading.</h2>
          <p>A cleaner, Lucy-inspired reader shell built around Sera and Rhen's existing canon, portraits, rankings, and 64-season archive.</p>
          {lastRead ? <button className="hero-continue" onClick={() => onOpenChapter(lastRead.season, episodeNumber(lastRead.id))} type="button"><span>Continue reading</span><strong>{lastRead.title}</strong><span>→</span></button> : null}
        </div>
        <div className="hero__seal" aria-hidden="true"><span>❀</span></div>
      </div>

      <div className="stats-grid">
        <article className="stat-card"><span>Published archive</span><strong>{seasons}</strong><p>seasons</p></article>
        <article className="stat-card"><span>Long-form story</span><strong>633</strong><p>episodes</p></article>
        <article className="stat-card"><span>Core profiles</span><strong>{characters}</strong><p>characters</p></article>
        <article className="stat-card"><span>Reader state</span><strong>{lastRead ? 'Saved' : 'Ready'}</strong><p>device-local progress</p></article>
      </div>

      <div className="section-heading"><div><p className="eyebrow">Start here</p><h3>Repository</h3></div></div>
      <div className="quick-grid">
        <button className="quick-card" onClick={() => onOpenSection('characters')} type="button"><span>01</span><div><h3>Characters</h3><p>Portrait galleries, rank states, relationships, backgrounds, and legends.</p></div><span>→</span></button>
        <button className="quick-card" onClick={() => onOpenSection('chapters')} type="button"><span>02</span><div><h3>Episodes</h3><p>Lazy season loading with a dedicated reading surface and adjustable typography.</p></div><span>→</span></button>
        <button className="quick-card" onClick={() => onOpenSection('rankings')} type="button"><span>03</span><div><h3>Rankings</h3><p>Current summit plus explicit former, retired, and deceased visual states.</p></div><span>→</span></button>
        <button className="quick-card" onClick={() => onOpenSection('bookmarks')} type="button"><span>04</span><div><h3>Bookmarks</h3><p>Your existing saved episodes and Continue Reading state, reused from production.</p></div><span>→</span></button>
      </div>
    </section>
  );
}
