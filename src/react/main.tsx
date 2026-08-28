import React from 'https://esm.sh/react@19.0.0';
import { createRoot } from 'https://esm.sh/react-dom@19.0.0/client';
import { loadDB } from '../db';
import { App } from './app/App';
import { ReaderProvider } from './features/reader/ReaderContext';
import './styles/global.css';
import './styles/reader.css';
import './styles/archive.css';

async function boot(): Promise<void> {
  const root = document.getElementById('react-root');
  if (!root) throw new Error('React preview root is missing');

  root.innerHTML = '<div class="preview-boot">Loading The Quiet Regular…</div>';
  try {
    await loadDB();
    createRoot(root).render(<ReaderProvider><App /></ReaderProvider>);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown loading error';
    root.innerHTML = `<div class="preview-boot preview-boot--error"><strong>React preview failed to load.</strong><p>${message}</p><a href="./index.html">Return to the production reader</a></div>`;
  }
}

void boot();
