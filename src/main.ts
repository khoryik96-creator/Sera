import './styles.css';
import { getEl } from './dom';
import { loadDB } from './db';
import { renderCharacterButtons, renderCharacter, mountCharacterEvents } from './characters';
import { renderSkills, renderSeraSkills } from './skills';
import { renderRanks } from './ranks';
import { renderLegends } from './legends';
import { renderFormer } from './former';
import { renderSeraTimeline } from './seraTimeline';
import { renderEpisodes, renderSeasonCast } from './episodes';
import { renderArcFigures } from './arcFigures';
import { renderColorKey } from './colorKey';
import { initEpisodeNav } from './episodeNav';
import { activateTab } from './tabs';

/** Attach static-element listeners (tabs, search boxes, quicklinks). */
function wireEvents(): void {
  document.querySelectorAll<HTMLElement>('.tab').forEach((btn) => btn.addEventListener('click', () => {
    if (btn.dataset.tab) activateTab(btn.dataset.tab);
  }));

  getEl<HTMLInputElement>('search').addEventListener('input', (e) => {
    const q = (e.target as HTMLInputElement).value;
    const visible = [...document.querySelectorAll('.panel')].find((p) => !p.classList.contains('hidden'))?.id;
    if (visible === 'characters') renderCharacterButtons(q);
    else if (visible === 'others') renderArcFigures(q);
    else if (visible === 'skills') renderSkills(q);
    else if (visible === 'rankings') renderRanks(q);
    else if (visible === 'legends') renderLegends(q);
    else if (visible === 'former') renderFormer(q);
    else if (visible === 'sera-timeline') renderSeraTimeline(q);
    else if (visible === 'episodes') renderEpisodes(q);
  });

  getEl<HTMLInputElement>('legendSearch').addEventListener('input', (e) => renderLegends((e.target as HTMLInputElement).value));
  getEl<HTMLInputElement>('otherSearch').addEventListener('input', (e) => renderArcFigures((e.target as HTMLInputElement).value));

  // Quicklink scroll buttons (data-scroll="<target id>") replace inline onclick handlers.
  document.querySelectorAll<HTMLElement>('[data-scroll]').forEach((btn) => btn.addEventListener('click', () => {
    const target = btn.dataset.scroll;
    if (target) getEl(target).scrollIntoView({ behavior: 'smooth' });
  }));
}

async function main(): Promise<void> {
  await loadDB();
  wireEvents();
  mountCharacterEvents();
  renderCharacterButtons();
  renderCharacter('sera');
  renderArcFigures();
  renderSkills();
  renderSeraSkills();
  renderRanks();
  renderLegends();
  renderFormer();
  renderSeraTimeline();
  renderEpisodes();
  renderSeasonCast();
  renderColorKey();
  initEpisodeNav();
}

main().catch((err) => {
  console.error(err);
  getEl('charDetail').innerHTML = '<div class="card muted">Failed to load lore data. Please refresh.</div>';
});
