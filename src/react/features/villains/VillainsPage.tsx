import { useMemo, useState } from 'react';
import { DB } from '../../../db';
import { PageHeader } from '../../components/Shared';

const MAIN_FIGURE_KEYS = new Set(['mo_qingzhao', 'yun_shizhen', 'ilyra_serath']);

export function VillainsPage() {
  const [filter, setFilter] = useState('');
  const figures = useMemo(() => DB.arcFigures.filter((figure) => !MAIN_FIGURE_KEYS.has(figure.key)), []);
  const visible = figures.filter((figure) => JSON.stringify(figure).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Arc figures" title="Other Characters & Villains" description="Recurring allies, sovereigns, antagonists, Crowns, Kings, and other major figures outside the main character dashboard." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter figures, arcs, or techniques…" /></div>
      <div className="lore-card-grid">
        {visible.map((figure) => (
          <details className="lore-card" key={figure.key}>
            <summary>
              <div className="tag-row">{figure.firstSeason ? <><span>S{figure.firstSeason}E{figure.firstEpisode}</span><span>{figure.firstArc}</span></> : null}{figure.affiliation ? <span>{figure.affiliation}</span> : null}</div>
              <h3>{figure.name}</h3>
              <p>{figure.subtitle}</p>
              <small>Expand profile and martial systems ↓</small>
            </summary>
            <div className="lore-card__body">
              {figure.affiliation || figure.affiliationRole ? <section><p className="eyebrow">Affiliation &amp; standing</p><dl className="profile-facts profile-facts--inline">{figure.affiliation ? <div><dt>Affiliation</dt><dd>{figure.affiliation}</dd></div> : null}{figure.affiliationRole ? <div><dt>Standing</dt><dd>{figure.affiliationRole}</dd></div> : null}</dl></section> : null}
              {figure.firstSeason ? <section><p className="eyebrow">First appearance</p><p><strong>{figure.firstArc}</strong> · Season {figure.firstSeason}, Episode {figure.firstEpisode} — {figure.firstEpisodeTitle}</p></section> : null}
              <section><p className="eyebrow">Profile / threat record</p><p>{figure.details}</p></section>
              {figure.skills?.length ? <section><p className="eyebrow">Skills / martial systems</p><div className="technique-list">{figure.skills.map((skill, index) => <article key={`${figure.key}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{skill[0]}</strong><small>{skill[1]}</small><p>{skill[2]}</p></div></article>)}</div></section> : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
