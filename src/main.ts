import './styles.css';
import './styles/portraits.css';
import './styles/rank-badges.css';
import './styles/episodes.css';
import './styles/mobile-reader.css';
import { getEl } from './dom';
import { loadDB } from './db';
import { renderCharacterButtons, mountCharacterEvents } from './characters';
import { renderSkills } from './skills';
import { renderRanks } from './ranks';
import { renderLegends } from './legends';
import { renderFormer } from './former';
import { renderSeraTimeline } from './seraTimeline';
import { renderEpisodes } from './episodes';
import { renderArcFigures } from './arcFigures';
import { navigateToTab, navigateToCharacter, applyCurrentRoute, initRouter } from './router';
import { showAppLoading, hideAppStatus, showAppError } from './appStatus';
import { renderBuildInfo } from './version';
import { initPwa } from './pwa';

function visiblePanelId(): string | undefined {
  return [...document.querySelectorAll('.panel')].find((panel) => !panel.classList.contains('hidden'))?.id;
}

function wireEvents(): void {
  document.querySelectorAll<HTMLElement>('.tab').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.tab) void navigateToTab(button.dataset.tab);
  }));

  const tabStrip = document.querySelector<HTMLElement>('.tab-strip');
  tabStrip?.addEventListener('keydown', (event) => {
    const current = (event.target as HTMLElement).closest<HTMLElement>('.tab');
    if (!current) return;
    const tabs = [...tabStrip.querySelectorAll<HTMLElement>('.tab')];
    const index = tabs.indexOf(current);
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    if (tabs[next].dataset.tab) void navigateToTab(tabs[next].dataset.tab!);
  });

  getEl<HTMLInputElement>('search').addEventListener('input', (event) => {
    const query = (event.target as HTMLInputElement).value;
    const visible = visiblePanelId();
    if (visible === 'characters') renderCharacterButtons(query);
    else if (visible === 'others') renderArcFigures(query);
    else if (visible === 'skills') renderSkills(query);
    else if (visible === 'rankings') renderRanks(query);
    else if (visible === 'legends') renderLegends(query);
    else if (visible === 'former') renderFormer(query);
    else if (visible === 'sera-timeline') renderSeraTimeline(query);
    else if (visible === 'episodes') void renderEpisodes(query);
  });

  getEl<HTMLInputElement>('legendSearch').addEventListener('input', (event) => renderLegends((event.target as HTMLInputElement).value));
  getEl<HTMLInputElement>('otherSearch').addEventListener('input', (event) => renderArcFigures((event.target as HTMLInputElement).value));

  document.querySelectorAll<HTMLElement>('[data-scroll]').forEach((button) => button.addEventListener('click', () => {
    const target = button.dataset.scroll;
    if (target) getEl(target).scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));
}

async function main(): Promise<void> {
  showAppLoading();
  renderBuildInfo();
  initPwa();
  await loadDB();

  wireEvents();
  mountCharacterEvents((key) => { void navigateToCharacter(key); });
  initRouter();
  await applyCurrentRoute();
  hideAppStatus();
}

main().catch((error) => {
  console.error(error);
  showAppError(error instanceof Error ? error.message : 'The lore archive could not be loaded.');
});
