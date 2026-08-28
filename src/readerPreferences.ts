const STORAGE_KEY = 'tqrReaderPrefsV1';

interface ReaderPrefs {
  scale: number;
  relaxedSpacing: boolean;
}

const DEFAULTS: ReaderPrefs = { scale: 1, relaxedSpacing: false };

function clampScale(value: number): number {
  return Math.min(1.28, Math.max(0.86, Number(value.toFixed(2))));
}

function readPrefs(): ReaderPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<ReaderPrefs>;
    return {
      scale: clampScale(typeof parsed.scale === 'number' ? parsed.scale : DEFAULTS.scale),
      relaxedSpacing: Boolean(parsed.relaxedSpacing),
    };
  } catch {
    return DEFAULTS;
  }
}

function writePrefs(prefs: ReaderPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Reader preferences are optional; private-mode storage failures stay silent.
  }
}

function applyPrefs(prefs: ReaderPrefs): void {
  const episodes = document.getElementById('episodes');
  if (!episodes) return;
  episodes.style.setProperty('--reader-scale', String(prefs.scale));
  episodes.style.setProperty('--reader-line-height', prefs.relaxedSpacing ? '2.05' : '1.82');

  const spacing = document.getElementById('readerSpacing');
  spacing?.classList.toggle('is-active', prefs.relaxedSpacing);
  spacing?.setAttribute('aria-pressed', String(prefs.relaxedSpacing));

  const label = document.getElementById('readerScaleLabel');
  if (label) label.textContent = `${Math.round(prefs.scale * 100)}%`;
}

function button(id: string, label: string, title: string): HTMLButtonElement {
  const el = document.createElement('button');
  el.id = id;
  el.type = 'button';
  el.className = 'reader-pref-button';
  el.textContent = label;
  el.title = title;
  el.setAttribute('aria-label', title);
  return el;
}

export function mountReaderPreferences(): void {
  const core = document.querySelector<HTMLElement>('#episodeJumpBar .nav-core');
  if (!core || document.getElementById('readerPrefs')) return;

  const prefs = readPrefs();
  const group = document.createElement('div');
  group.id = 'readerPrefs';
  group.className = 'reader-prefs';
  group.setAttribute('aria-label', 'Reading controls');

  const label = document.createElement('span');
  label.className = 'reader-prefs__label';
  label.textContent = 'Reading';

  const down = button('readerScaleDown', 'A−', 'Decrease reading text size');
  const scale = document.createElement('span');
  scale.id = 'readerScaleLabel';
  scale.className = 'reader-prefs__scale';
  const up = button('readerScaleUp', 'A+', 'Increase reading text size');
  const spacing = button('readerSpacing', 'Spacing', 'Toggle relaxed line spacing');
  spacing.setAttribute('aria-pressed', 'false');

  group.append(label, down, scale, up, spacing);
  core.append(group);

  down.addEventListener('click', () => {
    prefs.scale = clampScale(prefs.scale - 0.08);
    writePrefs(prefs);
    applyPrefs(prefs);
  });
  up.addEventListener('click', () => {
    prefs.scale = clampScale(prefs.scale + 0.08);
    writePrefs(prefs);
    applyPrefs(prefs);
  });
  spacing.addEventListener('click', () => {
    prefs.relaxedSpacing = !prefs.relaxedSpacing;
    writePrefs(prefs);
    applyPrefs(prefs);
  });

  applyPrefs(prefs);
}
