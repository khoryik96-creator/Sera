import { useState } from 'react';
import { DB } from '../../../db';
import { PageHeader } from '../../components/Shared';
import { TechniqueCard } from './TechniqueCard';

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
      <div className="technique-stack">{visible.map((skill) => <TechniqueCard key={`${owner}-${skill.name}`} skill={skill} />)}</div>
    </section>
  );
}
