import { useState } from 'react';
import { DB } from '../../../db';
import type { Skill } from '../../../types';
import { PageHeader } from '../../components/Shared';

function tierClass(skill: Skill): string {
  const tier = (skill.tier || '').toLowerCase();
  if (tier.includes('ultimate')) return 'ultimate';
  if (tier.includes('supreme')) return 'supreme';
  if (tier.includes('transcended')) return 'transcended';
  return 'named';
}

function tierMark(skill: Skill): string {
  const tier = tierClass(skill);
  if (tier === 'ultimate') return '★';
  if (tier === 'supreme') return '✧';
  if (tier === 'transcended') return '✦';
  return '◆';
}

function SkillCard({ skill }: { skill: Skill }) {
  const tier = tierClass(skill);
  return (
    <details className={`technique-card technique-card--${tier}`}>
      <summary><span className="technique-card__mark">{tierMark(skill)}</span><div><h3>{skill.name}</h3><div className="tag-row"><span>{skill.category}</span>{skill.tier ? <span>{skill.tier}</span> : null}{skill.reveal ? <span>{skill.reveal}</span> : null}</div></div><strong>{skill.rating || '—'}</strong></summary>
      <div className="technique-card__body">
        <p className="signature">{skill.signature || '—'}</p>
        {skill.short ? <p>{skill.short}</p> : null}
        <div className="fact-grid">
          <section><p className="eyebrow">Mechanics</p><p>{skill.mechanics || '—'}</p></section>
          <section><p className="eyebrow">Visual</p><p>{skill.visual || '—'}</p></section>
          <section><p className="eyebrow">Lore</p><p>{skill.lore || '—'}</p></section>
          <section><p className="eyebrow">Novel reveal</p><p>{skill.reveal || 'Unrevealed / not recorded'}</p></section>
        </div>
      </div>
    </details>
  );
}

export function TechniquesPage() {
  const [owner, setOwner] = useState<'rhen' | 'sera'>('rhen');
  const [filter, setFilter] = useState('');
  const source = owner === 'rhen' ? DB.rhenSkills : DB.seraSkills;
  const visible = source.filter((skill) => JSON.stringify(skill).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Martial systems" title="Arts & Techniques" description="Named techniques, Transcended Skills, Supreme Arts, and the sealed Ultimate ladder remain separate from ordinary combat descriptions." />
      <div className="feature-toolbar">
        <div className="segmented-control" role="group" aria-label="Technique owner">
          <button className={owner === 'rhen' ? 'is-active' : ''} onClick={() => setOwner('rhen')} type="button">Rhen</button>
          <button className={owner === 'sera' ? 'is-active' : ''} onClick={() => setOwner('sera')} type="button">Sera</button>
        </div>
        <input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter techniques…" />
      </div>
      <div className="technique-stack">{visible.map((skill) => <SkillCard key={`${owner}-${skill.name}`} skill={skill} />)}</div>
    </section>
  );
}
