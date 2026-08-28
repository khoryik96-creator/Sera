import { DB } from '../../../db';
import { EPISODE_ARCS } from '../../../episodeMeta';
import { RankBadge } from '../../components/Shared';
import type { AppSection } from '../../app/navigation';
import { cleanCharacterName, rankLabel, rankStatus } from '../../shared/rankState';
import { useReaderState } from '../reader/ReaderContext';

interface OverviewPageProps {
  onOpenSection(section: AppSection): void;
  onOpenChapter(season: number, episode: number): void;
  onOpenCharacter(key: string): void;
}

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

export function OverviewPage({ onOpenSection, onOpenChapter, onOpenCharacter }: OverviewPageProps) {
  const { bookmarks, lastRead } = useReaderState();
  const seasons = EPISODE_ARCS.reduce((sum, arc) => sum + arc.seasons.length, 0);
  const activeEpisode = lastRead ? episodeNumber(lastRead.id) : 1;
  const activeArc = lastRead ? EPISODE_ARCS.find((arc) => arc.seasons.some((entry) => entry.season === lastRead.season)) : EPISODE_ARCS[0];
  const protagonists = ['sera', 'rhen'].map((key) => ({ key, profile: DB.characters[key] })).filter((item) => Boolean(item.profile));
  const topTen = DB.ranks.slice(0, 10);

  return (
    <section className="overview-dashboard">
      <div className="overview-hero">
        <div className="overview-hero__main">
          <div className="overview-hero__meta"><span>THE QUIET REGULAR</span><span>{seasons} seasons</span><span>633 episodes</span></div>
          <p className="eyebrow">Second Spring, complete lore repository</p>
          <h2>A quieter way to return<br />to Sera and Rhen.</h2>
          <p className="overview-hero__lede">Read the full story, move through the martial-world archive, and keep characters, rankings, legends, techniques, and canon within reach without leaving the reader.</p>
          <div className="overview-hero__actions">
            {lastRead ? (
              <button className="overview-primary-action" onClick={() => onOpenChapter(lastRead.season, activeEpisode)} type="button">
                <span>Continue reading</span><strong>S{lastRead.season} · E{activeEpisode}</strong><small>{lastRead.title}</small><b>→</b>
              </button>
            ) : (
              <button className="overview-primary-action" onClick={() => onOpenChapter(1, 1)} type="button">
                <span>Begin the story</span><strong>Season 1 · Episode 1</strong><small>Start at Second Spring.</small><b>→</b>
              </button>
            )}
            <button className="overview-secondary-action" onClick={() => onOpenSection('chapters')} type="button">Browse story arcs <span>→</span></button>
          </div>
        </div>

        <aside className="overview-pulse" aria-label="Reader status">
          <div className="overview-pulse__seal" aria-hidden="true">❀</div>
          <div className="overview-pulse__section">
            <span>Reading position</span>
            <strong>{lastRead ? `Season ${lastRead.season} · Episode ${activeEpisode}` : 'Ready to begin'}</strong>
            <p>{activeArc?.title || 'Opening arc'}</p>
          </div>
          <div className="overview-pulse__stats">
            <div><strong>{bookmarks.length}</strong><span>bookmarks</span></div>
            <div><strong>13</strong><span>story arcs</span></div>
            <div><strong>64</strong><span>seasons</span></div>
          </div>
        </aside>
      </div>

      <section className="overview-section">
        <div className="overview-section__heading">
          <div><p className="eyebrow">At the heart of the story</p><h3>Two legends. One quiet tea shop.</h3></div>
          <button className="overview-text-link" onClick={() => onOpenSection('characters')} type="button">All characters →</button>
        </div>
        <div className="protagonist-grid">
          {protagonists.map(({ key, profile }) => {
            if (!profile) return null;
            const rank = rankLabel(profile.name);
            return (
              <button className={`protagonist-card protagonist-card--${key}`} key={key} onClick={() => onOpenCharacter(key)} type="button">
                <span className="protagonist-card__mark" aria-hidden="true">{key === 'sera' ? 'SO' : 'RM'}</span>
                <span className="protagonist-card__copy">
                  <small>{key === 'sera' ? 'THE PALE ORCHID' : 'PETALS MONARCH'}</small>
                  <span className="protagonist-card__name"><strong>{cleanCharacterName(profile.name)}</strong>{rank ? <RankBadge rank={rank} status={rankStatus(profile.name)} /> : null}</span>
                  <span>{profile.subtitle}</span>
                </span>
                <b>→</b>
              </button>
            );
          })}
        </div>
      </section>

      <div className="overview-columns">
        <section className="overview-panel overview-panel--rankings">
          <div className="overview-section__heading overview-section__heading--compact">
            <div><p className="eyebrow">Current summit</p><h3>Top Ten</h3></div>
            <button className="overview-text-link" onClick={() => onOpenSection('rankings')} type="button">Full ranking →</button>
          </div>
          <div className="overview-rank-list">
            {topTen.map((entry) => (
              <button key={`${entry.rank}-${entry.name}`} onClick={() => onOpenSection('rankings')} type="button">
                <RankBadge rank={entry.rank} />
                <span><strong>{entry.name}</strong><small>{entry.className}</small></span>
                <b>→</b>
              </button>
            ))}
          </div>
        </section>

        <section className="overview-panel overview-panel--explore">
          <div className="overview-section__heading overview-section__heading--compact"><div><p className="eyebrow">Move through the archive</p><h3>Explore</h3></div></div>
          <div className="overview-explore-grid">
            <button onClick={() => onOpenSection('techniques')} type="button"><span>Martial archive</span><strong>Arts & Techniques</strong><small>Rhen and Sera’s named arts.</small><b>→</b></button>
            <button onClick={() => onOpenSection('timeline')} type="button"><span>Pale Orchid</span><strong>Sera Timeline</strong><small>Her chronology and rank journey.</small><b>→</b></button>
            <button onClick={() => onOpenSection('legends')} type="button"><span>World memory</span><strong>Legends</strong><small>Feats that shaped reputations.</small><b>→</b></button>
            <button onClick={() => onOpenSection('canon')} type="button"><span>Source of truth</span><strong>Canon</strong><small>Rules that keep the world consistent.</small><b>→</b></button>
            <button onClick={() => onOpenSection('bookmarks')} type="button"><span>Your reader</span><strong>Bookmarks</strong><small>{bookmarks.length ? `${bookmarks.length} saved episode${bookmarks.length === 1 ? '' : 's'}.` : 'Save episodes for later.'}</small><b>→</b></button>
            <button onClick={() => onOpenSection('chapters')} type="button"><span>Complete story</span><strong>13 Story Arcs</strong><small>Jump directly into all 64 seasons.</small><b>→</b></button>
          </div>
        </section>
      </div>
    </section>
  );
}
