import { useState } from 'react';
import { DB } from '../../../db';
import { PageHeader } from '../../components/Shared';

export function CanonPage() {
  const [filter, setFilter] = useState('');
  const rules = DB.canonRules || [];
  const visible = rules.filter((rule) => JSON.stringify(rule).toLowerCase().includes(filter.toLowerCase()));

  return (
    <section>
      <PageHeader eyebrow="Canonical constraints" title="Canon" description="Story rules are rendered directly from the canonical data source rather than copied into the React UI." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter canon rules…" /></div>
      <div className="canon-grid">
        {visible.map((rule) => <article className="canon-card" key={rule.title}><p className="eyebrow">Canon rule</p><h3>{rule.title}</h3><p>{rule.text}</p></article>)}
      </div>
    </section>
  );
}
