import type { Episode } from '../../../types';
import '../../styles/reader-season-switcher.css';

interface SeasonEpisodeSwitcherProps {
  season: number;
  episode: number;
  episodes: Episode[];
  readEpisodes: string[];
  onOpenChapter(season: number, episode: number): void;
}

export function SeasonEpisodeSwitcher({ season, episode, episodes, readEpisodes, onOpenChapter }: SeasonEpisodeSwitcherProps) {
  const opened = new Set(readEpisodes);
  const openedCount = episodes.reduce((count, _item, index) => opened.has(`ep-s${season}-e${index + 1}`) ? count + 1 : count, 0);

  return (
    <details className="reader-season-switcher">
      <summary>
        <span className="reader-season-switcher__label">Season {season} episodes</span>
        <strong>Episode {episode} of {episodes.length}</strong>
        <small>{openedCount} / {episodes.length} opened</small>
        <b aria-hidden="true">⌄</b>
      </summary>
      <nav className="reader-season-switcher__episodes" aria-label={`Season ${season} episode switcher`}>
        {episodes.map((item, index) => {
          const number = index + 1;
          const id = `ep-s${season}-e${number}`;
          const isCurrent = number === episode;
          const isRead = opened.has(id);
          return (
            <button
              aria-current={isCurrent ? 'page' : undefined}
              className={`${isCurrent ? 'is-current' : ''} ${isRead ? 'is-read' : ''}`.trim()}
              key={id}
              onClick={() => onOpenChapter(season, number)}
              type="button"
            >
              <span className="reader-season-switcher__number">E{number}</span>
              <span className="reader-season-switcher__copy"><strong>{item.title}</strong><small>{isCurrent ? 'Reading now' : isRead ? '✓ Opened' : 'Unread'}</small></span>
              <b aria-hidden="true">→</b>
            </button>
          );
        })}
      </nav>
    </details>
  );
}
