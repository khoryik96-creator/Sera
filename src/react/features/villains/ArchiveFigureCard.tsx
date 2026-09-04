import type { ArchiveFigure } from './archiveFigures';

/** One expandable archive profile card, shared by the Other Characters/Villains
 *  grid and the Isgard tab so both render figures identically. */
export function ArchiveFigureCard({ figure }: { figure: ArchiveFigure }) {
  return (
    <details className="lore-card">
      <summary>
        <div className="tag-row">
          {figure.firstSeason ? <span>{figure.firstEpisode ? `S${figure.firstSeason}E${figure.firstEpisode}` : `S${figure.firstSeason}`}</span> : null}
          {figure.firstArc ? <span>{figure.firstArc}</span> : null}
          {figure.affiliation ? <span>{figure.affiliation}</span> : null}
        </div>
        <h3>{figure.name}</h3>
        <p>{figure.subtitle}</p>
        <small>Expand profile and martial systems ↓</small>
      </summary>
      <div className="lore-card__body">
        {figure.strength || figure.affiliation || figure.affiliationRole ? (
          <section>
            <p className="eyebrow">Strength, affiliation &amp; standing</p>
            <dl className="profile-facts profile-facts--inline">
              {figure.strength ? <div><dt>Strength</dt><dd>{figure.strength}</dd></div> : null}
              {figure.affiliation ? <div><dt>Affiliation</dt><dd>{figure.affiliation}</dd></div> : null}
              {figure.affiliationRole ? <div><dt>Standing</dt><dd>{figure.affiliationRole}</dd></div> : null}
            </dl>
          </section>
        ) : null}
        {figure.firstSeason ? (
          <section>
            <p className="eyebrow">First indexed appearance</p>
            <p>{figure.firstArc ? <><strong>{figure.firstArc}</strong> · </> : null}Season {figure.firstSeason}{figure.firstEpisode ? `, Episode ${figure.firstEpisode}` : ''}{figure.firstEpisodeTitle ? ` — ${figure.firstEpisodeTitle}` : ''}</p>
          </section>
        ) : null}
        <section><p className="eyebrow">Profile / threat record</p><p>{figure.details}</p></section>
        {figure.skills?.length ? <section><p className="eyebrow">Skills / martial systems</p><div className="technique-list">{figure.skills.map((skill, index) => <article key={`${figure.key}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{skill[0]}</strong><small>{skill[1]}</small><p>{skill[2]}</p></div></article>)}</div></section> : null}
      </div>
    </details>
  );
}
