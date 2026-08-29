import type { Skill } from '../../../types';

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

export function TechniqueCard({ skill }: { skill: Skill }) {
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
