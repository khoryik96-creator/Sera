import { useMemo, useState } from 'react';
import { restoredCanonReferences } from '../../../canonReference';
import { DB } from '../../../db';
import { PageHeader } from '../../components/Shared';

export function CanonPage() {
  const [filter, setFilter] = useState('');
  const needle = filter.trim().toLowerCase();
  const referenceRules = useMemo(() => restoredCanonReferences.filter((rule) => !needle || JSON.stringify(rule).toLowerCase().includes(needle)), [needle]);
  const currentRules = useMemo(() => (DB.canonRules || []).filter((rule) => !needle || JSON.stringify(rule).toLowerCase().includes(needle)), [needle]);

  return (
    <section>
      <PageHeader eyebrow="Canonical constraints" title="Canon" description="Stable world rules and current story constraints, including reference material restored from the tested legacy reader." />
      <div className="toolbar-row"><input className="filter-input" value={filter} onChange={(event: { target: HTMLInputElement }) => setFilter(event.target.value)} placeholder="Filter canon rules…" aria-label="Filter canon rules" /></div>

      {referenceRules.length ? (
        <section aria-labelledby="canonCoreReferencesHeading">
          <div className="section-heading"><div><p className="eyebrow">Core reference</p><h3 id="canonCoreReferencesHeading">World & reveal rules</h3></div><span>{referenceRules.length} reference{referenceRules.length === 1 ? '' : 's'}</span></div>
          <div className="canon-grid">
            {referenceRules.map((rule) => <article className="canon-card" key={rule.title}><p className="eyebrow">Core reference</p><h3>{rule.title}</h3><p>{rule.text}</p></article>)}
          </div>
        </section>
      ) : null}

      {currentRules.length ? (
        <section aria-labelledby="canonCurrentRulesHeading" style={{ marginTop: referenceRules.length ? 42 : 0 }}>
          <div className="section-heading"><div><p className="eyebrow">Current canon</p><h3 id="canonCurrentRulesHeading">Story constraints</h3></div><span>{currentRules.length} rule{currentRules.length === 1 ? '' : 's'}</span></div>
          <div className="canon-grid">
            {currentRules.map((rule) => <article className="canon-card" key={rule.title}><p className="eyebrow">Canon rule</p><h3>{rule.title}</h3><p>{rule.text}</p></article>)}
          </div>
        </section>
      ) : null}

      {!referenceRules.length && !currentRules.length ? <div className="empty-state"><strong>No matching canon rules</strong><p>Try a world rule, technique tier, character, season, or arc.</p></div> : null}
    </section>
  );
}
