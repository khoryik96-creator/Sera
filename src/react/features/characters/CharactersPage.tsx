import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@19.0.0';
import { DB } from '../../../db';
import { characterExtraImages, characterImageMap } from '../../../images';
import { rankForStory, rankStateForStory } from '../../../characterRegistry';
import { PageHeader, RankBadge } from '../../components/Shared';

interface CharactersPageProps {
  selectedKey: string | null;
  onOpenCharacter(key: string): void;
}

function text(value: string | undefined): string {
  return value?.trim() || 'Not recorded.';
}

export function CharactersPage({ selectedKey, onOpenCharacter }: CharactersPageProps) {
  const entries = useMemo(() => Object.entries(DB.characters), []);
  const fallbackKey = entries[0]?.[0] || 'sera';
  const activeKey = selectedKey && DB.characters[selectedKey] ? selectedKey : fallbackKey;
  const character = DB.characters[activeKey];
  const [filter, setFilter] = useState('');
  const [portraitIndex, setPortraitIndex] = useState(0);

  useEffect(() => setPortraitIndex(0), [activeKey]);

  const visible = entries.filter(([, item]) => `${item.name} ${item.subtitle} ${(item.tags || []).join(' ')}`.toLowerCase().includes(filter.toLowerCase()));
  const portraits = [characterImageMap[activeKey], ...(characterExtraImages[activeKey] || [])].filter(Boolean);
  const currentRank = rankForStory(character.name);
  const status = rankStateForStory(character.name);

  return (
    <section>
      <PageHeader eyebrow="Character archive" title="Characters" description="The current cast, historical rank states, portrait galleries, relationships, and legends." />
      <div className="character-workspace">
        <aside className="character-browser">
          <input className="filter-input" value={filter} onChange={(event: any) => setFilter(event.target.value)} placeholder="Filter characters…" aria-label="Filter characters" />
          <div className="character-browser__list">
            {visible.map(([key, item]) => {
              const rank = rankForStory(item.name);
              const itemStatus = rankStateForStory(item.name);
              return (
                <button className={`character-nav-card ${key === activeKey ? 'is-active' : ''}`} key={key} onClick={() => onOpenCharacter(key)} type="button">
                  <span className={`character-${key}`}>{item.name}</span>
                  <small>{item.subtitle}</small>
                  {rank ? <RankBadge rank={rank} status={itemStatus} /> : null}
                </button>
              );
            })}
          </div>
        </aside>

        <article className="character-profile">
          <div className="character-profile__hero">
            <div className="portrait-card">
              {portraits.length ? <img src={portraits[Math.min(portraitIndex, portraits.length - 1)]} alt={`${character.name} portrait ${portraitIndex + 1}`} /> : <div className="portrait-placeholder">{character.name.slice(0, 1)}</div>}
              {portraits.length > 1 ? (
                <div className="portrait-thumbs" aria-label={`${character.name} portrait options`}>
                  {portraits.map((url, index) => <button aria-label={`Portrait ${index + 1}`} aria-pressed={portraitIndex === index} className={portraitIndex === index ? 'is-active' : ''} key={url} onClick={() => setPortraitIndex(index)} type="button"><img src={url} alt="" /></button>)}
                </div>
              ) : null}
            </div>

            <div className="character-profile__intro">
              <p className="eyebrow">{character.subtitle}</p>
              <div className="character-name-line"><h2 className={`character-${activeKey}`}>{character.name}</h2>{currentRank ? <RankBadge rank={currentRank} status={status} /> : null}</div>
              <p className="profile-lede">{text(character.reputation)}</p>
              <div className="tag-row">{(character.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <dl className="profile-facts">
                <div><dt>Identity</dt><dd>{text(character.identity)}</dd></div>
                <div><dt>Personality</dt><dd>{text(character.personality)}</dd></div>
                <div><dt>Motif</dt><dd>{text(character.motif)}</dd></div>
                <div><dt>Relationship</dt><dd>{text(character.relationship)}</dd></div>
              </dl>
            </div>
          </div>

          <div className="profile-sections">
            <section><p className="eyebrow">Appearance</p><p>{text(character.appearance)}</p></section>
            <section><p className="eyebrow">Background</p><p>{text(character.background)}</p></section>
            <section><p className="eyebrow">Legend</p><p>{text(character.legend)}</p></section>
            <section><p className="eyebrow">Details</p><p>{text(character.details)}</p></section>
          </div>
        </article>
      </div>
    </section>
  );
}
