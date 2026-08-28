import { useRef, useState } from 'react';
import { completedSeasonCount, nextUnreadTarget, overallReadingProgress } from '../../../readingProgress';
import { getChapterPositions } from '../../../readerPositions';
import { EmptyState, PageHeader } from '../../components/Shared';
import '../../styles/library.css';
import '../../styles/notes.css';
import '../../styles/passages.css';
import { useReaderState } from '../reader/ReaderContext';

interface BookmarksPageProps {
  onOpenChapter(season: number, episode: number): void;
}

type LibraryTab = 'saved' | 'history' | 'notes' | 'passages' | 'backup';

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function fileStamp(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function BookmarksPage({ onOpenChapter }: BookmarksPageProps) {
  const { bookmarks, toggleSaved, lastRead, readEpisodes, history, notes, deleteNote, passages, deletePassage, exportBackup, restoreBackup, clearHistory } = useReaderState();
  const [tab, setTab] = useState<LibraryTab>('saved');
  const [noteQuery, setNoteQuery] = useState('');
  const [passageQuery, setPassageQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sorted = bookmarks.slice().sort((a, b) => a.season - b.season || episodeNumber(a.id) - episodeNumber(b.id));
  const overall = overallReadingProgress(readEpisodes);
  const completedSeasons = completedSeasonCount(readEpisodes);
  const lastEpisode = lastRead ? episodeNumber(lastRead.id) : 1;
  const nextUnread = nextUnreadTarget(readEpisodes, lastRead ? { season: lastRead.season, episode: lastEpisode } : null);
  const positionCount = getChapterPositions().length;
  const normalizedNoteQuery = noteQuery.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => {
    if (!normalizedNoteQuery) return true;
    const episode = episodeNumber(note.id);
    return `${note.title} ${note.text} season ${note.season} episode ${episode} s${note.season} e${episode}`.toLowerCase().includes(normalizedNoteQuery);
  });
  const normalizedPassageQuery = passageQuery.trim().toLowerCase();
  const filteredPassages = passages.filter((passage) => {
    if (!normalizedPassageQuery) return true;
    const episode = episodeNumber(passage.id);
    return `${passage.title} ${passage.text} season ${passage.season} episode ${episode} s${passage.season} e${episode}`.toLowerCase().includes(normalizedPassageQuery);
  });

  function downloadBackup(): void {
    const blob = new Blob([exportBackup()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiet-regular-reader-${fileStamp()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setError('');
    setNotice('Reader backup exported.');
  }

  async function importBackup(file: File | undefined): Promise<void> {
    if (!file) return;
    setNotice('');
    setError('');
    try {
      restoreBackup(await file.text());
      setNotice('Reader backup restored on this device.');
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : 'The reader backup could not be restored.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <section className="reader-library">
      <PageHeader eyebrow="Your reader" title="Reader Library" description="Bookmarks, recent reading, private notes, saved passages, exact chapter positions, progress, and a portable backup of your local reader state—all kept on your device unless you export it yourself." />

      <div className="library-summary" aria-label="Reader library summary">
        <button className="library-summary__continue" disabled={!lastRead} onClick={() => lastRead && onOpenChapter(lastRead.season, lastEpisode)} type="button">
          <span>{lastRead ? 'Continue reading' : 'Ready to begin'}</span>
          <strong>{lastRead ? `S${lastRead.season} · E${lastEpisode}` : 'Season 1 · Episode 1'}</strong>
          <small>{lastRead?.title || 'Open the story archive to begin.'}</small>
          <b>→</b>
        </button>
        <article><span>Story progress</span><strong>{overall.percent}%</strong><small>{overall.read} / {overall.total} episodes opened</small></article>
        <article><span>Completed seasons</span><strong>{completedSeasons}</strong><small>of 64 seasons</small></article>
        <article><span>Saved / recent</span><strong>{bookmarks.length} / {history.length}</strong><small>bookmarks · recent episodes</small></article>
      </div>

      {nextUnread ? <button className="library-next-unread" onClick={() => onOpenChapter(nextUnread.season, nextUnread.episode)} type="button"><span>Next unread</span><strong>S{nextUnread.season} · E{nextUnread.episode}</strong><small>Continue beyond your current reading position.</small><b>Read →</b></button> : null}

      <div className="library-tabs" role="tablist" aria-label="Reader library sections">
        <button aria-selected={tab === 'saved'} className={tab === 'saved' ? 'is-active' : ''} onClick={() => setTab('saved')} role="tab" type="button">Saved <span>{bookmarks.length}</span></button>
        <button aria-selected={tab === 'history'} className={tab === 'history' ? 'is-active' : ''} onClick={() => setTab('history')} role="tab" type="button">Recently Read <span>{history.length}</span></button>
        <button aria-selected={tab === 'notes'} className={tab === 'notes' ? 'is-active' : ''} onClick={() => setTab('notes')} role="tab" type="button">Notes <span>{notes.length}</span></button>
        <button aria-selected={tab === 'passages'} className={tab === 'passages' ? 'is-active' : ''} onClick={() => setTab('passages')} role="tab" type="button">Passages <span>{passages.length}</span></button>
        <button aria-selected={tab === 'backup'} className={tab === 'backup' ? 'is-active' : ''} onClick={() => setTab('backup')} role="tab" type="button">Backup</button>
      </div>

      {tab === 'saved' ? (
        <div role="tabpanel">
          {sorted.length === 0 ? <EmptyState title="No bookmarks yet" text="Open an episode and tap Bookmark. It will appear here and remain saved on this device." /> : (
            <div className="bookmark-grid library-bookmark-grid">
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
        </div>
      ) : null}

      {tab === 'history' ? (
        <div className="library-history-panel" role="tabpanel">
          <div className="library-panel-heading"><div><p className="eyebrow">Device history</p><h3>Recently opened episodes</h3></div>{history.length ? <button onClick={clearHistory} type="button">Clear history</button> : null}</div>
          {history.length === 0 ? <EmptyState title="No recent reading yet" text="Episodes you open from this version onward will appear here, newest first." /> : (
            <div className="library-history-list">
              {history.map((entry) => {
                const episode = episodeNumber(entry.id);
                return <button key={`${entry.id}-${entry.openedAt}`} onClick={() => onOpenChapter(entry.season, episode)} type="button"><span><small>S{entry.season} · E{episode}</small><strong>{entry.title}</strong></span><time dateTime={new Date(entry.openedAt).toISOString()}>{new Date(entry.openedAt).toLocaleString()}</time><b>→</b></button>;
              })}
            </div>
          )}
        </div>
      ) : null}

      {tab === 'notes' ? (
        <div className="library-notes-panel" role="tabpanel">
          <div className="library-panel-heading"><div><p className="eyebrow">Private reader notes</p><h3>Episode notes</h3></div><span>{notes.length} saved note{notes.length === 1 ? '' : 's'}</span></div>
          {notes.length ? <div className="library-note-tools"><input className="filter-input" aria-label="Search episode notes" onChange={(event) => setNoteQuery(event.target.value)} placeholder="Search notes, episode titles, S12 E3…" value={noteQuery} /></div> : null}
          {notes.length === 0 ? <EmptyState title="No episode notes yet" text="Open any episode and expand Add a note beneath the reading controls. Your notes stay on this device unless you export a Reader Library backup." /> : filteredNotes.length === 0 ? <EmptyState title="No matching notes" text="Try another phrase, episode title, season, or episode number." /> : (
            <div className="library-note-list">
              {filteredNotes.map((note) => {
                const episode = episodeNumber(note.id);
                return (
                  <article className="library-note-card" key={note.id}>
                    <button className="library-note-card__open" onClick={() => onOpenChapter(note.season, episode)} type="button"><small>S{note.season} · E{episode}</small><strong>{note.title}</strong><p>{note.text}</p></button>
                    <div className="library-note-card__meta"><time dateTime={new Date(note.updatedAt).toISOString()}>{new Date(note.updatedAt).toLocaleString()}</time><button onClick={() => deleteNote(note.id)} type="button">Delete</button></div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      {tab === 'passages' ? (
        <div className="library-passages-panel" role="tabpanel">
          <div className="library-panel-heading"><div><p className="eyebrow">Saved from the prose</p><h3>Passages</h3></div><span>{passages.length} saved passage{passages.length === 1 ? '' : 's'}</span></div>
          {passages.length ? <div className="library-passage-tools"><input className="filter-input" aria-label="Search saved passages" onChange={(event) => setPassageQuery(event.target.value)} placeholder="Search quotes, episode titles, S12 E3…" value={passageQuery} /></div> : null}
          {passages.length === 0 ? <EmptyState title="No saved passages yet" text="Select a line or paragraph while reading, then tap Save passage in the reading controls. Your saved text stays on this device unless you export a backup." /> : filteredPassages.length === 0 ? <EmptyState title="No matching passages" text="Try another phrase, episode title, season, or episode number." /> : (
            <div className="library-passage-list">
              {filteredPassages.map((passage) => {
                const episode = episodeNumber(passage.id);
                return (
                  <article className="library-passage-card" key={passage.key}>
                    <button className="library-passage-card__open" onClick={() => onOpenChapter(passage.season, episode)} type="button"><small>S{passage.season} · E{episode}</small><strong>{passage.title}</strong><blockquote>“{passage.text}”</blockquote></button>
                    <div className="library-passage-card__meta"><time dateTime={new Date(passage.createdAt).toISOString()}>{new Date(passage.createdAt).toLocaleString()}</time><button onClick={() => deletePassage(passage.key)} type="button">Delete</button></div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      {tab === 'backup' ? (
        <div className="library-backup" role="tabpanel">
          <article className="library-backup__card">
            <p className="eyebrow">Portable reader state</p>
            <h3>Move your reading state between devices</h3>
            <p>The backup contains only The Quiet Regular reader data: bookmarks, Continue Reading, opened-episode progress, exact in-chapter positions, recent history, private episode notes, saved passages, and your font/spacing/width preferences. It does not include account data or anything else from your browser.</p>
            <div className="library-backup__facts"><span>{bookmarks.length} bookmarks</span><span>{overall.read} opened episodes</span><span>{positionCount} exact positions</span><span>{history.length} recent entries</span><span>{notes.length} notes</span><span>{passages.length} passages</span></div>
            <div className="library-backup__actions">
              <button className="library-backup__primary" onClick={downloadBackup} type="button">Export backup</button>
              <button onClick={() => fileInputRef.current?.click()} type="button">Import backup</button>
              <input ref={fileInputRef} accept="application/json,.json" hidden onChange={(event) => { void importBackup(event.target.files?.[0]); }} type="file" />
            </div>
            <small>Import replaces the reader state on this device with the validated backup. Story content, portraits, and site settings outside the reader are never imported.</small>
          </article>
          {notice ? <div className="library-backup__notice" role="status">{notice}</div> : null}
          {error ? <div className="library-backup__error" role="alert">{error}</div> : null}
        </div>
      ) : null}
    </section>
  );
}
