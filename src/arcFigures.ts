import { DB } from './db';
import { getEl } from './dom';

export function renderArcFigures(q = ''): void {
  const lower = q.toLowerCase();
  const mainFigureKeys = new Set(['mo_qingzhao', 'yun_shizhen', 'ilyra_serath']);
  const arr = DB.arcFigures.filter((x) => !mainFigureKeys.has(x.key) && JSON.stringify(x).toLowerCase().includes(lower));
  getEl('arcFigureGrid').innerHTML = arr.map((x) => {
    const skills = x.skills || [];
    const first = x.firstSeason ? `<span class="badge">FIRST: S${x.firstSeason}E${x.firstEpisode}</span><span class="badge">${x.firstArc}</span>` : '';
    return `<details class="card arc-figure character-${x.key}">
      <summary>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">${first}</div>
        <h3 style="margin:6px 0">${x.name}</h3>
        <p class="muted" style="margin:0">${x.subtitle}</p>
        <div class="muted" style="margin-top:8px">Click to expand profile, first appearance and skills ▾</div>
      </summary>
      <div class="skill-body">
        ${x.firstSeason ? `<div class="detail-block"><h4>First Appearance</h4><p><strong>${x.firstArc}</strong> · Season ${x.firstSeason}, Episode ${x.firstEpisode} — ${x.firstEpisodeTitle}</p></div>` : ''}
        <div class="detail-block"><h4>Profile / Threat Record</h4><p>${x.details}</p></div>
        ${skills.length ? `<h4 style="color:var(--text);margin:14px 0 8px">Skills / Martial Systems</h4>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:650px">
          <thead><tr><th>#</th><th>Technique / System</th><th>Category</th><th>Description</th></tr></thead>
          <tbody>${skills.map((sk, i) => `<tr><td><span class="badge">${String(i + 1).padStart(2, '0')}</span></td><td><strong class="character-${x.key}">${sk[0]}</strong></td><td>${sk[1]}</td><td>${sk[2]}</td></tr>`).join('')}</tbody>
        </table></div>` : "<p class='muted'>No named martial system has been recorded.</p>"}
      </div>
    </details>`;
  }).join('');
}
