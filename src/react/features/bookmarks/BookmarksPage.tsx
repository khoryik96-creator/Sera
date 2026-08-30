import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { completedSeasonCount, nextUnreadTarget, overallReadingProgress } from '../../../readingProgress';
import { readerItemOrganization, readerLibraryItemKey } from '../../../readerOrganization';
import type { ReaderLibraryItemKind } from '../../../readerOrganization';
import { getChapterPositions } from '../../../readerPositions';
import { EmptyState, PageHeader } from '../../components/Shared';
import '../../styles/library.css';
import '../../styles/notes.css';
import '../../styles/passages.css';
import { useReaderState } from '../reader/ReaderContext';
import { ReadingJourneyPanel } from './ReadingJourneyPanel';

type LibraryTab = 'saved' | 'history' | 'notes' | 'passages' | 'organize' | 'backup';
const LIBRARY_TABS: LibraryTab[] = ['saved', 'history', 'notes', 'passages', 'organize', 'backup'];

interface BookmarksPageProps {
  initialTab?: LibraryTab;
  onOpenChapter(season: number, episode: number): void;
}

type OrganizedLibraryItem = {
  key: string;
  kind: ReaderLibraryItemKind;
  season: number;
  episode: number;
  title: string;
  preview: string;
};

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function fileStamp(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function itemKindLabel(kind: ReaderLibraryItemKind): string {
  if (kind === 'bookmark') return 'Bookmark';
  if (kind === 'note') return 'Note';
  return 'Passage';
}

function tabId(tab: LibraryTab): string { return `library-tab-${tab}`; }
function panelId(tab: LibraryTab): string { return `library-panel-${tab}`; }

export function BookmarksPage({ initialTab = 'saved', onOpenChapter }: BookmarksPageProps) {
  const {
    bookmarks, toggleSaved, lastRead, readEpisodes, history, journey, notes, deleteNote, passages, deletePassage,
    organization, createCollection, renameCollection, deleteCollection, toggleFavorite, toggleCollectionItem, setItemTags,
    exportBackup, restoreBackup, clearHistory,
  } = useReaderState();
  const [tab, setTab] = useState<LibraryTab>(initialTab);
  const [noteQuery, setNoteQuery] = useState('');
  const [passageQuery, setPassageQuery] = useState('');
  const [organizeQuery, setOrganizeQuery] = useState('');
  const [organizeFilter, setOrganizeFilter] = useState('all');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setTab(initialTab), [initialTab]);

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
  const organizedItems: OrganizedLibraryItem[] = [
    ...bookmarks.map((bookmark) => ({ key: readerLibraryItemKey('bookmark', bookmark.id), kind: 'bookmark' as const, season: bookmark.season, episode: episodeNumber(bookmark.id), title: bookmark.title || bookmark.id, preview: 'Saved episode bookmark' })),
    ...notes.map((note) => ({ key: readerLibraryItemKey('note', note.id), kind: 'note' as const, season: note.season, episode: episodeNumber(note.id), title: note.title, preview: note.text })),
    ...passages.map((passage) => ({ key: readerLibraryItemKey('passage', passage.key), kind: 'passage' as const, season: passage.season, episode: episodeNumber(passage.id), title: passage.title, preview: passage.text })),
  ].sort((a, b) => a.season - b.season || a.episode - b.episode || a.kind.localeCompare(b.kind));
  const favoriteCount = organizedItems.filter((item) => readerItemOrganization(organization, item.key).favorite).length;
  const normalizedOrganizeQuery = organizeQuery.trim().toLowerCase();
  const selectedCollection = organization.collections.find((collection) => collection.id === organizeFilter) || null;
  const visibleOrganizedItems = organizedItems.filter((item) => {
    const metadata = readerItemOrganization(organization, item.key);
    if (organizeFilter === 'favorites' && !metadata.favorite) return false;
    if (selectedCollection && !metadata.collectionIds.includes(selectedCollection.id)) return false;
    if (!normalizedOrganizeQuery) return true;
    return `${itemKindLabel(item.kind)} ${item.title} ${item.preview} season ${item.season} episode ${item.episode} ${metadata.tags.join(' ')}`.toLowerCase().includes(normalizedOrganizeQuery);
  });

  function selectTab(next: LibraryTab, focus = false): void {
    setTab(next);
    if (focus) window.requestAnimationFrame(() => document.getElementById(tabId(next))?.focus());
  }

  function handleTabKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, current: LibraryTab): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = LIBRARY_TABS.indexOf(current);
    const next = event.key === 'Home'
      ? LIBRARY_TABS[0]
      : event.key === 'End'
        ? LIBRARY_TABS[LIBRARY_TABS.length - 1]
        : event.key === 'ArrowRight'
          ? LIBRARY_TABS[(index + 1) % LIBRARY_TABS.length]
          : LIBRARY_TABS[(index - 1 + LIBRARY_TABS.length) % LIBRARY_TABS.length];
    if (next) selectTab(next, true);
  }

  function tabProps(value: LibraryTab) {
    return {
      id: tabId(value),
      'aria-controls': panelId(value),
      'aria-selected': tab === value,
      className: tab === value ? 'is-active' : '',
      onClick: () => selectTab(value),
      onKeyDown: (event: ReactKeyboardEvent<HTMLButtonElement>) => handleTabKeyDown(event, value),
      role: 'tab' as const,
      tabIndex: tab === value ? 0 : -1,
      type: 'button' as const,
    };
  }

  function panelProps(value: LibraryTab) {
    return { id: panelId(value), 'aria-labelledby': tabId(value), role: 'tabpanel' as const };
  }

  function submitCollection(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const name = newCollectionName.trim();
    if (!name) return;
    createCollection(name);
    setNewCollectionName('');
  }

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
    setNotice(''); setError('');
    try {
      restoreBackup(await file.text());
      setOrganizeFilter('all');
      setNotice('Reader backup restored on this device.');
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : 'The reader backup could not be restored.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <section className="reader-library">
      <PageHeader eyebrow="Your reader" title="Reader Library" description="Bookmarks, reading journey, private notes, saved passages, collections, tags, favorites, exact chapter positions, progress, and a portable backup of your local reader state—all kept on your device unless you export it yourself." />

      <div className="library-summary" aria-label="Reader library summary">
        <button className="library-summary__continue" disabled={!lastRead} onClick={() => lastRead && onOpenChapter(lastRead.season, lastEpisode)} type="button"><span>{lastRead ? 'Continue reading' : 'Ready to begin'}</span><strong>{lastRead ? `S${lastRead.season} · E${lastEpisode}` : 'Season 1 · Episode 1'}</strong><small>{lastRead?.title || 'Open the story archive to begin.'}</small><b>→</b></button>
        <article><span>Story progress</span><strong>{overall.percent}%</strong><small>{overall.read} / {overall.total} episodes opened</small></article>
        <article><span>Completed seasons</span><strong>{completedSeasons}</strong><small>of 74 seasons</small></article>
        <article><span>Saved / journey</span><strong>{bookmarks.length} / {journey.visits.length}</strong><small>bookmarks · visits tracked</small></article>
      </div>

      {nextUnread ? <button className="library-next-unread" onClick={() => onOpenChapter(nextUnread.season, nextUnread.episode)} type="button"><span>Next unread</span><strong>S{nextUnread.season} · E{nextUnread.episode}</strong><small>Continue beyond your current reading position.</small><b>Read →</b></button> : null}

      <div className="library-tabs" role="tablist" aria-label="Reader library sections">
        <button {...tabProps('saved')}>Saved <span>{bookmarks.length}</span></button>
        <button {...tabProps('history')}>Journey <span>{journey.visits.length || history.length}</span></button>
        <button {...tabProps('notes')}>Notes <span>{notes.length}</span></button>
        <button {...tabProps('passages')}>Passages <span>{passages.length}</span></button>
        <button {...tabProps('organize')}>Organize <span>{organizedItems.length}</span></button>
        <button {...tabProps('backup')}>Backup</button>
      </div>

      {tab === 'saved' ? <div {...panelProps('saved')}>
        {sorted.length === 0 ? <EmptyState title="No bookmarks yet" text="Open an episode and tap Bookmark. It will appear here and remain saved on this device." /> : <div className="bookmark-grid library-bookmark-grid">{sorted.map((bookmark) => { const episode = episodeNumber(bookmark.id); return <article className="bookmark-card" key={bookmark.id}><button className="bookmark-card__open" onClick={() => onOpenChapter(bookmark.season, episode)} type="button"><p className="eyebrow">Season {bookmark.season} · Episode {episode}</p><h3>{bookmark.title || bookmark.id}</h3><p>Return directly to this episode.</p></button><button className="bookmark-card__remove" onClick={() => toggleSaved(bookmark)} type="button">Remove</button></article>; })}</div>}
      </div> : null}

      {tab === 'history' ? <div {...panelProps('history')}><ReadingJourneyPanel journey={journey} recent={history} onClear={clearHistory} onOpenChapter={onOpenChapter} /></div> : null}

      {tab === 'notes' ? <div className="library-notes-panel" {...panelProps('notes')}>
        <div className="library-panel-heading"><div><p className="eyebrow">Private reader notes</p><h3>Episode notes</h3></div><span>{notes.length} saved note{notes.length === 1 ? '' : 's'}</span></div>
        {notes.length ? <div className="library-note-tools"><input className="filter-input" aria-label="Search episode notes" onChange={(event) => setNoteQuery(event.target.value)} placeholder="Search notes, episode titles, S12 E3…" value={noteQuery} /></div> : null}
        {notes.length === 0 ? <EmptyState title="No episode notes yet" text="Open any episode and expand Add a note beneath the reading controls. Your notes stay on this device unless you export a Reader Library backup." /> : filteredNotes.length === 0 ? <EmptyState title="No matching notes" text="Try another phrase, episode title, season, or episode number." /> : <div className="library-note-list">{filteredNotes.map((note) => { const episode = episodeNumber(note.id); return <article className="library-note-card" key={note.id}><button className="library-note-card__open" onClick={() => onOpenChapter(note.season, episode)} type="button"><small>S{note.season} · E{episode}</small><strong>{note.title}</strong><p>{note.text}</p></button><div className="library-note-card__meta"><time dateTime={new Date(note.updatedAt).toISOString()}>{new Date(note.updatedAt).toLocaleString()}</time><button onClick={() => deleteNote(note.id)} type="button">Delete</button></div></article>; })}</div>}
      </div> : null}

      {tab === 'passages' ? <div className="library-passages-panel" {...panelProps('passages')}>
        <div className="library-panel-heading"><div><p className="eyebrow">Saved from the prose</p><h3>Passages</h3></div><span>{passages.length} saved passage{passages.length === 1 ? '' : 's'}</span></div>
        {passages.length ? <div className="library-passage-tools"><input className="filter-input" aria-label="Search saved passages" onChange={(event) => setPassageQuery(event.target.value)} placeholder="Search quotes, episode titles, S12 E3…" value={passageQuery} /></div> : null}
        {passages.length === 0 ? <EmptyState title="No saved passages yet" text="Select a line or paragraph while reading, then tap Save passage in the reading controls. Your saved text stays on this device unless you export a backup." /> : filteredPassages.length === 0 ? <EmptyState title="No matching passages" text="Try another phrase, episode title, season, or episode number." /> : <div className="library-passage-list">{filteredPassages.map((passage) => { const episode = episodeNumber(passage.id); return <article className="library-passage-card" key={passage.key}><button className="library-passage-card__open" onClick={() => onOpenChapter(passage.season, episode)} type="button"><small>S{passage.season} · E{episode}</small><strong>{passage.title}</strong><blockquote>“{passage.text}”</blockquote></button><div className="library-passage-card__meta"><time dateTime={new Date(passage.createdAt).toISOString()}>{new Date(passage.createdAt).toLocaleString()}</time><button onClick={() => deletePassage(passage.key)} type="button">Delete</button></div></article>; })}</div>}
      </div> : null}

      {tab === 'organize' ? <div className="library-organize" {...panelProps('organize')}>
        <div className="library-panel-heading"><div><p className="eyebrow">Reader Library v4</p><h3>Collections, tags & favorites</h3></div><span>{favoriteCount} favorite{favoriteCount === 1 ? '' : 's'} · {organization.collections.length} collection{organization.collections.length === 1 ? '' : 's'}</span></div>
        <div className="library-organize__tools"><form className="library-collection-create" onSubmit={submitCollection}><input aria-label="New collection name" maxLength={48} onChange={(event) => setNewCollectionName(event.target.value)} placeholder="New collection, e.g. Best Rhen Moments" value={newCollectionName} /><button disabled={!newCollectionName.trim()} type="submit">Create collection</button></form><input className="filter-input" aria-label="Search organized library" onChange={(event) => setOrganizeQuery(event.target.value)} placeholder="Search titles, notes, passages, tags…" value={organizeQuery} /></div>
        <div className="library-collection-strip" aria-label="Library collection filter"><button aria-pressed={organizeFilter === 'all'} className={organizeFilter === 'all' ? 'is-active' : ''} onClick={() => setOrganizeFilter('all')} type="button">All <span>{organizedItems.length}</span></button><button aria-pressed={organizeFilter === 'favorites'} className={organizeFilter === 'favorites' ? 'is-active' : ''} onClick={() => setOrganizeFilter('favorites')} type="button">★ Favorites <span>{favoriteCount}</span></button>{organization.collections.map((collection) => { const count = organizedItems.filter((item) => readerItemOrganization(organization, item.key).collectionIds.includes(collection.id)).length; return <button aria-pressed={organizeFilter === collection.id} className={organizeFilter === collection.id ? 'is-active' : ''} key={collection.id} onClick={() => setOrganizeFilter(collection.id)} type="button">{collection.name} <span>{count}</span></button>; })}</div>
        {selectedCollection ? <div className="library-collection-edit"><label><span>Collection name</span><input aria-label="Rename selected collection" defaultValue={selectedCollection.name} key={`${selectedCollection.id}-${selectedCollection.name}`} maxLength={48} onBlur={(event) => { const name = event.currentTarget.value.trim(); if (name && name !== selectedCollection.name) renameCollection(selectedCollection.id, name); event.currentTarget.value = selectedCollection.name; }} /></label><button onClick={() => { deleteCollection(selectedCollection.id); setOrganizeFilter('all'); }} type="button">Delete collection</button></div> : null}
        {organizedItems.length === 0 ? <EmptyState title="Nothing to organize yet" text="Save a bookmark, write an episode note, or save a passage. Those items will appear here for favorites, tags, and collections." /> : visibleOrganizedItems.length === 0 ? <EmptyState title="No matching library items" text="Try another collection, favorites, tag, title, or search phrase." /> : <div className="library-organize-list">{visibleOrganizedItems.map((item) => { const metadata = readerItemOrganization(organization, item.key); const collectionNames = metadata.collectionIds.map((id) => organization.collections.find((collection) => collection.id === id)?.name).filter((name): name is string => Boolean(name)); return <article className="library-organize-card" key={item.key}><button className="library-organize-card__open" onClick={() => onOpenChapter(item.season, item.episode)} type="button"><small>{itemKindLabel(item.kind)} · S{item.season} · E{item.episode}</small><strong>{item.title}</strong><p>{item.preview}</p>{(metadata.tags.length || collectionNames.length) ? <span className="library-organize-card__chips">{collectionNames.map((name) => <i key={`collection-${name}`}>{name}</i>)}{metadata.tags.map((tag) => <i key={`tag-${tag}`}>#{tag}</i>)}</span> : null}</button><button aria-label={metadata.favorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={metadata.favorite} className={`library-favorite ${metadata.favorite ? 'is-active' : ''}`} onClick={() => toggleFavorite(item.key)} title={metadata.favorite ? 'Remove from favorites' : 'Add to favorites'} type="button">★</button><details className="library-item-organizer"><summary>Organize</summary><div className="library-item-organizer__body"><fieldset><legend>Collections</legend>{organization.collections.length ? organization.collections.map((collection) => <label key={collection.id}><input checked={metadata.collectionIds.includes(collection.id)} onChange={() => toggleCollectionItem(item.key, collection.id)} type="checkbox" /><span>{collection.name}</span></label>) : <small>Create a collection above to group this item.</small>}</fieldset><label className="library-tag-editor"><span>Tags</span><input aria-label={`Tags for ${item.title}`} defaultValue={metadata.tags.join(', ')} key={`${item.key}-${metadata.tags.join('|')}`} maxLength={240} onBlur={(event) => setItemTags(item.key, event.currentTarget.value.split(','))} placeholder="romance, Rhen, battle" /><small>Comma-separated · up to 8 tags</small></label></div></details></article>; })}</div>}
      </div> : null}

      {tab === 'backup' ? <div className="library-backup" {...panelProps('backup')}>
        <article className="library-backup__card"><p className="eyebrow">Portable reader state</p><h3>Move your reading state between devices</h3><p>The backup contains only The Quiet Regular reader data: bookmarks, Continue Reading, opened-episode progress, exact in-chapter positions, recent history, Reading Journey visits and season-completion milestones, private episode notes, saved passages, Reader Library collections/tags/favorites, and your font/spacing/width preferences. It does not include account data or anything else from your browser.</p><div className="library-backup__facts"><span>{bookmarks.length} bookmarks</span><span>{overall.read} opened episodes</span><span>{positionCount} exact positions</span><span>{journey.visits.length} journey visits</span><span>{journey.seasonCompletions.length} milestones</span><span>{notes.length} notes</span><span>{passages.length} passages</span><span>{organization.collections.length} collections</span><span>{favoriteCount} favorites</span></div><div className="library-backup__actions"><button className="library-backup__primary" onClick={downloadBackup} type="button">Export backup</button><button onClick={() => fileInputRef.current?.click()} type="button">Import backup</button><input ref={fileInputRef} accept="application/json,.json" hidden onChange={(event) => { void importBackup(event.target.files?.[0]); }} type="file" /></div><small>Import replaces the reader state on this device with the validated backup. Story content, portraits, and site settings outside the reader are never imported.</small></article>
        {notice ? <div className="library-backup__notice" role="status">{notice}</div> : null}{error ? <div className="library-backup__error" role="alert">{error}</div> : null}
      </div> : null}
    </section>
  );
}
