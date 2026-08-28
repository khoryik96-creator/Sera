import React from 'https://esm.sh/react@19.0.0';
import { EmptyState, PageHeader } from '../../components/Shared';
import { useReaderState } from '../reader/ReaderContext';

interface BookmarksPageProps {
  onOpenChapter(season: number, episode: number): void;
}

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

export function BookmarksPage({ onOpenChapter }: BookmarksPageProps) {
  const { bookmarks, toggleSaved } = useReaderState();
  const sorted = bookmarks.slice().sort((a, b) => a.season - b.season || episodeNumber(a.id) - episodeNumber(b.id));

  return (
    <section>
      <PageHeader eyebrow="Saved reading" title="Bookmarks" description="Saved episodes use the same local reader state as the current production reader, so your existing bookmarks carry into this preview." />
      {sorted.length === 0 ? <EmptyState title="No bookmarks yet" text="Open an episode and tap Bookmark. It will appear here and remain saved on this device." /> : (
        <div className="bookmark-grid">
          {sorted.map((bookmark) => {
            const episode = episodeNumber(bookmark.id);
            return (
              <article className="bookmark-card" key={bookmark.id}>
                <button className="bookmark-card__open" onClick={() => onOpenChapter(bookmark.season, episode)} type="button"><p className="eyebrow">Season {bookmark.season} · Episode {episode}</p><h3>{bookmark.title || bookmark.id}</h3><p>Return directly to this episode.</p></button>
                <button className="bookmark-card__remove" onClick={() => toggleSaved(bookmark)} type="button">Remove</button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
