import { useEffect, useMemo, useState } from 'react';
import { DB } from '../../../db';
import { characterExtraImages, characterImageMap } from '../../../images';
import { characterAppearanceSeasons, characterLegends, rankJourney, relatedCharacters, scanCharacterAppearances } from '../../shared/characterInsights';
import type { AppearanceScan } from '../../shared/characterInsights';
import { cleanCharacterName, rankLabel, rankStatus } from '../../shared/rankState';
import { PageHeader, RankBadge } from '../../components/Shared';
import { TechniqueCard } from '../techniques/TechniqueCard';
import '../../styles/characters-v2-hardening.css';

interface CharactersPageProps {
  selectedKey: string | null;
  onOpenCharacter(key: string): void;
  onOpenChapter(season: number, episode: number): void;
}

function text(value: string | undefined): string {
  return value?.trim() || 'Not recorded.';
}

function seasonRange(fromSeason: number, toSeason: number): string {
  return fromSeason === toSeason ? `Season ${fromSeason}` : `Seasons ${fromSeason}–${toSeason}`;
}

function jumpToProfileSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function CharactersPage({ selectedKey, onOpenCharacter, onOpenChapter }: CharactersPageProps) {
  const entries = useMemo(() => Object.entries(DB.characters), []);
  const fallbackKey = entries[0]?.[0] || 'sera';
  const activeKey = selectedKey && DB.characters[selectedKey] ? selectedKey : fallbackKey;
  const character = DB.characters[activeKey];
  const displayName = cleanCharacterName(character.name);
  const [filter, setFilter] = useState('');
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [appearanceScan, setAppearanceScan] = useState<AppearanceScan | null>(null);
  const [appearanceLoading, setAppearanceLoading] = useState(false);
  const [appearanceError, setAppearanceError] = useState('');
  const [appearanceLimit, setAppearanceLimit] = useState(12);

  useEffect(() => {
    setPortraitIndex(0);
    setAppearanceScan(null);
    setAppearanceLoading(false);
    setAppearanceError('');
    setAppearanceLimit(12);
  }, [activeKey]);

  const visible = entries.filter(([, item]) => `${item.name} ${item.subtitle} ${(item.tags || []).join(' ')}`.toLowerCase().includes(filter.toLowerCase()));
  const portraits = [characterImageMap[activeKey], ...(characterExtraImages[activeKey] || [])].filter(Boolean);
  const currentRank = rankLabel(character.name);
  const status = rankStatus(character.name);
  const journey = useMemo(() => rankJourney(displayName), [displayName]);
  const relationships = useMemo(() => relatedCharacters(activeKey, displayName), [activeKey, displayName]);
  const legends = useMemo(() => characterLegends(activeKey, displayName), [activeKey, displayName]);
  const appearanceSeasons = useMemo(() => characterAppearanceSeasons(activeKey, displayName), [activeKey, displayName]);
  const signatureSkills = DB.topSkills[activeKey] || [];
  const profileArts = activeKey === 'sera' ? DB.seraSkills : [];

  async function loadAppearances(): Promise<void> {
    setAppearanceLoading(true);
    setAppearanceError('');
    try {
      setAppearanceScan(await scanCharacterAppearances(activeKey, displayName));
    } catch (cause: unknown) {
      setAppearanceError(cause instanceof Error ? cause.message : 'Unable to build episode links for this character.');
    } finally {
      setAppearanceLoading(false);
    }
  }

  return (
    <section>
      <PageHeader eyebrow="Character archive" title="Characters" description="Profiles, signature martial arts, rank history, relationship links, major legends, and story appearances derived from the same canon data that drives the reader." />
      <div className="character-workspace character-workspace--v2">
        <aside className="character-browser">
          <input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter characters…" aria-label="Filter characters" />
          <div className="character-browser__list">
            {visible.map(([key, item]) => {
              const name = cleanCharacterName(item.name);
              const rank = rankLabel(item.name);
              const itemStatus = rankStatus(item.name);
              return (
                <button className={`character-nav-card ${key === activeKey ? 'is-active' : ''}`} key={key} onClick={() => onOpenCharacter(key)} type="button">
                  <span className={`character-${key}`}>{name}</span>
                  <small>{item.subtitle}</small>
                  {rank ? <RankBadge rank={rank} status={itemStatus} /> : null}
                </button>
              );
            })}
          </div>
        </aside>

        <article className="character-profile character-profile--v2">
          <div className="character-profile__hero" id="characterProfileTop">
            <div className="portrait-card">
              {portraits.length ? <img src={portraits[Math.min(portraitIndex, portraits.length - 1)]} alt={`${displayName} portrait ${portraitIndex + 1}`} /> : <div className="portrait-placeholder">{displayName.slice(0, 1)}</div>}
              {portraits.length > 1 ? (
                <div className="portrait-thumbs" aria-label={`${displayName} portrait options`}>
                  {portraits.map((url, index) => <button aria-label={`Portrait ${index + 1}`} aria-pressed={portraitIndex === index} className={portraitIndex === index ? 'is-active' : ''} key={url} onClick={() => setPortraitIndex(index)} type="button"><img src={url} alt="" /></button>)}
                </div>
              ) : null}
            </div>

            <div className="character-profile__intro">
              <p className="eyebrow">{character.subtitle}</p>
              <div className="character-name-line"><h2 className={`character-${activeKey}`}>{displayName}</h2>{currentRank ? <RankBadge rank={currentRank} status={status} /> : null}</div>
              <p className="profile-lede">{text(character.reputation)}</p>
              <div className="tag-row">{(character.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="character-v2-stats" aria-label={`${displayName} profile summary`}>
                <div><span>Rank states</span><strong>{journey.length || 1}</strong><small>{currentRank || 'Unranked / outside system'}</small></div>
                <div><span>Signature arts</span><strong>{signatureSkills.length}</strong><small>{signatureSkills.length ? 'archived techniques' : 'no ranked skill table'}</small></div>
                <div><span>Story footprint</span><strong>{appearanceSeasons.length}</strong><small>season{appearanceSeasons.length === 1 ? '' : 's'} in cast data</small></div>
                <div><span>Linked legends</span><strong>{legends.length}</strong><small>repository legend{legends.length === 1 ? '' : 's'}</small></div>
              </div>
              <dl className="profile-facts">
                <div><dt>Identity</dt><dd>{text(character.identity)}</dd></div>
                <div><dt>Personality</dt><dd>{text(character.personality)}</dd></div>
                <div><dt>Motif</dt><dd>{text(character.motif)}</dd></div>
                <div><dt>Relationship</dt><dd>{text(character.relationship)}</dd></div>
              </dl>
            </div>
          </div>

          <nav className="character-section-nav" aria-label={`${displayName} profile sections`}>
            <button onClick={() => jumpToProfileSection('characterProfileTop')} type="button">Profile</button>
            <button onClick={() => jumpToProfileSection('characterRankSection')} type="button">Rank</button>
            {signatureSkills.length ? <button onClick={() => jumpToProfileSection('characterSkillsSection')} type="button">Skills</button> : null}
            {profileArts.length ? <button onClick={() => jumpToProfileSection('characterLeadArtsSection')} type="button">Arts</button> : null}
            <button onClick={() => jumpToProfileSection('characterRelationshipsSection')} type="button">Relations</button>
            <button onClick={() => jumpToProfileSection('characterLegendsSection')} type="button">Legends</button>
            <button onClick={() => jumpToProfileSection('characterAppearancesSection')} type="button">Episodes</button>
            <button onClick={() => jumpToProfileSection('characterDetailsSection')} type="button">Details</button>
          </nav>

          <section className="character-v2-section" id="characterRankSection" aria-labelledby="rankJourneyHeading">
            <div className="character-v2-heading"><div><p className="eyebrow">Rank history</p><h3 id="rankJourneyHeading">Journey through the ranking world</h3></div><span>Canonical seasonal states</span></div>
            {journey.length ? (
              <div className="rank-journey">
                {journey.map((step) => <article className={`rank-journey__step ${step.current ? 'is-current' : ''}`} key={`${step.rank}-${step.fromSeason}`}><div><RankBadge rank={step.rank} status={step.status} /><span>{step.current ? 'Current recorded state' : 'Historical state'}</span></div><strong>{seasonRange(step.fromSeason, step.toSeason)}</strong></article>)}
              </div>
            ) : <div className="character-v2-empty">No numeric ranking history is recorded for this character.</div>}
          </section>

          {signatureSkills.length ? (
            <section className="character-v2-section" id="characterSkillsSection" aria-labelledby="characterSkillsHeading">
              <div className="character-v2-heading"><div><p className="eyebrow">Signature martial arts</p><h3 id="characterSkillsHeading">Ranked techniques</h3></div><span>{signatureSkills.length} archived skill{signatureSkills.length === 1 ? '' : 's'}</span></div>
              <div className="character-skill-grid">
                {signatureSkills.map((skill, index) => (
                  <article className="character-skill-card" key={`${skill.name}-${index}`}>
                    <span className="character-skill-card__index">{index === signatureSkills.length - 1 ? 'Ω' : String(index + 1).padStart(2, '0')}</span>
                    <div className="character-skill-card__copy">
                      <div><h4>{skill.name}</h4><span className="character-skill-card__rating">{skill.rating}</span></div>
                      <div className="character-skill-card__meta"><span>{skill.category}</span>{skill.signature ? <span className="character-skill-card__signature">{skill.signature}</span> : null}</div>
                      <p>{skill.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {profileArts.length ? (
            <section className="character-v2-section" id="characterLeadArtsSection" aria-labelledby="characterLeadArtsHeading">
              <div className="character-v2-heading"><div><p className="eyebrow">Pale Orchid arts</p><h3 id="characterLeadArtsHeading">Sera — signature martial system</h3></div><span>{profileArts.length} archived technique{profileArts.length === 1 ? '' : 's'}</span></div>
              <div className="technique-stack">{profileArts.map((skill) => <TechniqueCard key={`sera-profile-${skill.name}`} skill={skill} />)}</div>
            </section>
          ) : null}

          <section className="character-v2-section" id="characterRelationshipsSection" aria-labelledby="relationshipsHeading">
            <div className="character-v2-heading"><div><p className="eyebrow">Relationships</p><h3 id="relationshipsHeading">Connections</h3></div><span>Derived from existing profile records</span></div>
            {relationships.length ? (
              <div className="relationship-grid">
                {relationships.map((item) => <button key={item.key} onClick={() => onOpenCharacter(item.key)} type="button"><span className={`character-${item.key}`}><strong>{item.name}</strong></span><small>{item.subtitle}</small><b>Open profile →</b></button>)}
              </div>
            ) : <div className="character-v2-empty">No other main-profile relationship is explicitly linked in the current records.</div>}
          </section>

          <section className="character-v2-section" id="characterLegendsSection" aria-labelledby="legendsHeading">
            <div className="character-v2-heading"><div><p className="eyebrow">Major feats & legends</p><h3 id="legendsHeading">What the martial world remembers</h3></div><span>{legends.length ? `${legends.length} linked repository record${legends.length === 1 ? '' : 's'}` : 'Profile legend'}</span></div>
            <div className="character-legend-grid">
              <article className="character-legend-card character-legend-card--profile"><span>Profile legend</span><p>{text(character.legend)}</p></article>
              {legends.map((legend) => <article className="character-legend-card" key={`${legend.rank}-${legend.title}`}><span>{legend.kind}</span><h4>{legend.title}</h4><p>{legend.text}</p><small>{legend.significance}</small></article>)}
            </div>
          </section>

          <section className="character-v2-section" id="characterAppearancesSection" aria-labelledby="appearancesHeading">
            <div className="character-v2-heading"><div><p className="eyebrow">Story appearances</p><h3 id="appearancesHeading">Jump back into their chapters</h3></div><span>{appearanceSeasons.length ? `${appearanceSeasons.length} candidate seasons` : 'No cast-index seasons'}</span></div>
            {appearanceSeasons.length ? (
              <>
                <div className="appearance-season-strip" aria-label={`${displayName} seasons`}>
                  {appearanceSeasons.map((season) => <button key={season} onClick={() => onOpenChapter(season, 1)} type="button">S{season}</button>)}
                </div>
                {!appearanceScan && !appearanceLoading ? <button className="appearance-scan-button" onClick={() => { void loadAppearances(); }} type="button"><span>Find exact episode links</span><small>Lazy-load only this character’s indexed seasons.</small><b>→</b></button> : null}
                {appearanceLoading ? <div className="character-v2-empty" role="status">Finding {displayName} across indexed episodes…</div> : null}
                {appearanceError ? <div className="character-v2-error"><strong>Episode links failed to load</strong><p>{appearanceError}</p><button onClick={() => { void loadAppearances(); }} type="button">Retry</button></div> : null}
                {appearanceScan ? (
                  <div className="appearance-results">
                    <div className="appearance-results__summary"><span><strong>{appearanceScan.episodes.length}</strong> linked episodes</span><span>across {appearanceScan.seasons.length} indexed seasons</span></div>
                    <div className="appearance-episode-grid">
                      {appearanceScan.episodes.slice(0, appearanceLimit).map((item) => <button key={item.id} onClick={() => onOpenChapter(item.season, item.episode)} type="button"><span>S{item.season} · E{item.episode}</span><strong>{item.title}</strong><b>Read →</b></button>)}
                    </div>
                    {appearanceLimit < appearanceScan.episodes.length ? <button className="appearance-show-more" onClick={() => setAppearanceLimit((limit) => limit + 18)} type="button">Show more appearances ({appearanceScan.episodes.length - appearanceLimit} remaining)</button> : null}
                  </div>
                ) : null}
              </>
            ) : <div className="character-v2-empty">This profile does not yet have season-cast records that can be converted into episode links.</div>}
          </section>

          <div className="profile-sections profile-sections--v2" id="characterDetailsSection">
            <section><p className="eyebrow">Appearance</p><p>{text(character.appearance)}</p></section>
            <section><p className="eyebrow">Background</p><p>{text(character.background)}</p></section>
            <section><p className="eyebrow">Details</p><p>{text(character.details)}</p></section>
          </div>
        </article>
      </div>
    </section>
  );
}
