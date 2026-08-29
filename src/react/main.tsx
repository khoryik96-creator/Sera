import { createRoot } from 'react-dom/client';
import { loadDB } from '../db';
import { decodedRouteHash } from '../hashRoute';
import { initPwa } from '../pwa';
import { initAccessibilityHardening } from './accessibilityHardening';
import { App } from './app/App';
import { ReaderProvider } from './features/reader/ReaderContext';
import './styles/global.css';
import './styles/archive.css';
import './styles/mobile.css';
import './styles/pwa.css';
import './styles/visual-polish.css';
import './styles/performance.css';
import './styles/ux-audit.css';
import './styles/accessibility-hardening.css';

async function preloadInitialRoute(): Promise<void> {
  const raw = decodedRouteHash();
  if (raw.startsWith('chapter/') || raw.startsWith('episodes/')) {
    await import('./routes/ReaderRoute');
    return;
  }
  if (raw === 'chapters' || raw === 'episodes') await import('./routes/ChaptersRoute');
}

async function boot(): Promise<void> {
  const root = document.getElementById('react-root');
  if (!root) throw new Error('Reader root is missing');

  root.innerHTML = '<div class="app-boot">Loading The Quiet Regular…</div>';
  try {
    await Promise.all([loadDB(), preloadInitialRoute()]);
    createRoot(root).render(<ReaderProvider><App /></ReaderProvider>);
    initAccessibilityHardening();
    initPwa();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown loading error';
    root.innerHTML = `<div class="app-boot app-boot--error"><strong>The lore reader failed to load.</strong><p>${message}</p><a href="./legacy.html">Open the legacy reader</a></div>`;
  }
}

void boot();
