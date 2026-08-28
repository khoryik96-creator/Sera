import { useEffect, useState } from 'react';
import type { Bookmark } from '../../../bookmarks';
import '../../styles/notes.css';
import { useReaderState } from './ReaderContext';

export function EpisodeNoteEditor({ episode }: { episode: Bookmark }) {
  const { notes, saveNote, deleteNote } = useReaderState();
  const saved = notes.find((note) => note.id === episode.id) || null;
  const [draft, setDraft] = useState(saved?.text || '');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setDraft(saved?.text || '');
  }, [episode.id, saved?.text]);

  useEffect(() => {
    setNotice('');
  }, [episode.id]);

  function save(): void {
    if (!draft.trim()) {
      deleteNote(episode.id);
      setDraft('');
      setNotice('Empty note removed.');
      return;
    }
    saveNote({ id: episode.id, season: episode.season, title: episode.title, text: draft });
    setNotice('Note saved on this device.');
  }

  function remove(): void {
    deleteNote(episode.id);
    setDraft('');
    setNotice('Note removed.');
  }

  const dirty = draft.trim() !== (saved?.text || '').trim();

  return (
    <details className={`episode-note ${saved ? 'has-note' : ''}`}>
      <summary>
        <span><strong>{saved ? 'Note saved' : 'Add a note'}</strong><small>{saved ? saved.text.slice(0, 96) : 'Private to this browser unless you export your Reader Library backup.'}</small></span>
        <b>{saved ? 'Edit' : 'Write'} ↓</b>
      </summary>
      <div className="episode-note__body">
        <label htmlFor={`note-${episode.id}`}>Your note for Season {episode.season}</label>
        <textarea
          id={`note-${episode.id}`}
          maxLength={12000}
          onChange={(event) => { setDraft(event.target.value); setNotice(''); }}
          placeholder="Thoughts, callbacks, theories, favorite moments…"
          rows={6}
          value={draft}
        />
        <div className="episode-note__footer">
          <span>{draft.length.toLocaleString()} / 12,000</span>
          {notice ? <em role="status">{notice}</em> : null}
          {saved ? <button className="episode-note__delete" onClick={remove} type="button">Delete note</button> : null}
          <button className="episode-note__save" disabled={!dirty && Boolean(saved)} onClick={save} type="button">{saved ? 'Save changes' : 'Save note'}</button>
        </div>
      </div>
    </details>
  );
}
