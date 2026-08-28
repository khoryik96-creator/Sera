import { createRoot } from 'react-dom/client';
import { loadDB } from '../db';
import { initPwa } from '../pwa';
import { App } from './app/App';
import { ReaderProvider } from './features/reader/ReaderContext';
import './styles/global.css';
import './styles/reader.css';
import './styles/archive.css';
import './styles/mobile.css';
import './styles/pwa.css';
import './styles/overview.css';
import './styles/visual-polish.css';
import './styles/progress.css';
import './styles/characters-v2.css';

async function boot(): Promise<void> {
  const root = document.getElementById('react-root');
  if (!root) throw new Error('Reader root is missing');

  root.innerHTML = '<div class="app-boot">Loading The Quiet Regular…</div>';
  try {
    await loadDB();
    createRoot(root).render(<ReaderProvider><App /></ReaderProvider>);
    initPwa();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown loading error';
    root.innerHTML = `<div class="app-boot app-boot--error"><strong>The lore reader failed to load.</strong><p>${message}</p><a href="./legacy.html">Open the legacy reader</a></div>`;
  }
}

void boot();
