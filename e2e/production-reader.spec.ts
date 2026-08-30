import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { restoredCanonReferences } from '../src/canonReference';

interface CoreCounts {
  characters: number;
  villains: number;
  rhenSkills: number;
  seraSkills: number;
  ranks: number;
  legends: number;
  former: number;
  timeline: number;
  canon: number;
}

interface CoreCountShape {
  characters: Record<string, unknown>;
  arcFigures: Array<{ key: string }>;
  rhenSkills: unknown[];
  seraSkills: unknown[];
  ranks: unknown[];
  legends: unknown[];
  former: unknown[];
  seraTimeline: unknown[];
  canonRules?: unknown[];
}

async function openProduction(page: import('@playwright/test').Page, hash = 'overview') {
  await page.goto(`/#${hash}`);
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
}

async function sourceCoreCounts(): Promise<CoreCounts> {
  const source = await readFile(new URL('../src/data.json', import.meta.url), 'utf8');
  const core = JSON.parse(source) as CoreCountShape;
  const mainFigureKeys = new Set(['mo_qingzhao', 'yun_shizhen', 'ilyra_serath']);
  return {
    characters: Object.keys(core.characters).length,
    villains: core.arcFigures.filter((figure) => !mainFigureKeys.has(figure.key)).length,
    rhenSkills: core.rhenSkills.length,
    seraSkills: core.seraSkills.length,
    ranks: core.ranks.length,
    legends: core.legends.length,
    former: core.former.length,
    timeline: core.seraTimeline.length,
    canon: (core.canonRules || []).length + restoredCanonReferences.length,
  };
}

test('production shell renders and routes between core features', async ({ page }) => {
  await openProduction(page);
  await expect(page.getByText('Second Spring,', { exact: false })).toBeVisible();
  const visibleCharacterNav = page.locator('.primary-nav button:visible, .mobile-tabs button:visible').filter({ hasText: /Characters|Cast/ }).first();
  await visibleCharacterNav.click();
  await expect(page).toHaveURL(/#characters$/);
  await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible();
});

test('legacy production hashes remain valid', async ({ page }) => {
  const aliases = [
    ['others', /Other Characters & Villains/],
    ['skills', /Arts & Techniques/],
    ['sera-timeline', /Sera Timeline/],
    ['episodes', /Read The Quiet Regular/],
  ] as const;

  for (const [hash, heading] of aliases) {
    await openProduction(page, hash);
    await expect(page.locator('.content h2').first()).toHaveText(heading);
    await expect(page).toHaveURL(new RegExp(`#${hash}$`));
  }

  await openProduction(page, 'episodes/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page).toHaveURL(/#episodes\/1\/1$/);
});

test('production archive renders every canonical core record', async ({ page }) => {
  const expected = await sourceCoreCounts();
  const sections: Array<[string, string, number]> = [
    ['characters', '.character-nav-card', expected.characters],
    ['villains', '.lore-card', expected.villains],
    ['rankings', '.ranking-card', expected.ranks],
    ['legends', '.lore-card', expected.legends],
    ['former', '.former-card', expected.former],
    ['timeline', '.timeline__item', expected.timeline],
    ['canon', '.canon-card', expected.canon],
  ];

  for (const [hash, selector, count] of sections) {
    await openProduction(page, hash);
    await expect(page.locator(selector), `${hash} should render all canonical records`).toHaveCount(count);
  }

  await openProduction(page, 'techniques');
  await expect(page.locator('.technique-card')).toHaveCount(expected.rhenSkills);
  await page.getByRole('group', { name: 'Technique owner' }).getByRole('button', { name: 'Sera', exact: true }).click();
  await expect(page.locator('.technique-card')).toHaveCount(expected.seraSkills);
});

test('chapter archive exposes all 14 arcs and 74 seasons through direct selectors', async ({ page }) => {
  await openProduction(page, 'chapters');
  const arcSelect = page.getByRole('combobox', { name: 'Story arc' });
  const seasonSelect = page.getByRole('combobox', { name: 'Season' });
  await expect(arcSelect).toBeVisible({ timeout: 20_000 });
  await expect(seasonSelect).toBeVisible();
  await expect(arcSelect.locator('option')).toHaveCount(14);
  await expect(seasonSelect.locator('option')).toHaveCount(74);
  // Assert each option's own value via its attribute. toHaveValue/inputValue on
  // an <option> reads the parent <select>'s selected value (always "1" here),
  // not the option itself, which made the last-option check fail spuriously.
  await expect(seasonSelect.locator('option').first()).toHaveAttribute('value', '1');
  await expect(seasonSelect.locator('option').last()).toHaveAttribute('value', '74');
});

test('Continue Reading is prominent and opens the stored chapter', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:lastRead', JSON.stringify({ id: 'ep-s12-e3', season: 12, title: 'Stored reading position' }));
  });
  await openProduction(page, 'chapters');
  const resume = page.locator('.chapter-quickbar__primary');
  await expect(resume).toContainText('S12 · Ch 3');
  await expect(resume).toContainText('Stored reading position');
  await resume.click();
  await expect(page).toHaveURL(/#chapter\/12\/3$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('season action loads the chosen season and opens its first chapter', async ({ page }) => {
  await openProduction(page, 'chapters');
  const seasonSelect = page.getByRole('combobox', { name: 'Season' });
  await expect(seasonSelect).toBeVisible({ timeout: 20_000 });
  await seasonSelect.selectOption('12');
  await expect(seasonSelect).toHaveValue('12');
  await expect(page.locator('.chapter-list')).toBeVisible({ timeout: 20_000 });
  const action = page.locator('.chapter-season-summary__actions .is-primary');
  await expect(action).toBeEnabled({ timeout: 20_000 });
  await expect(action).toContainText('Read Ch 1');
  await action.click();
  await expect(page).toHaveURL(/#chapter\/12\/1$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('production reader is mobile-safe with contained navigation and no page overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only layout assertion');
  await openProduction(page, 'characters/sera');
  await expect(page.locator('.mobile-tabs')).toBeVisible();
  await expect(page.locator('.sidebar')).toBeHidden();
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await expect(page.locator('.portrait-card > img')).toHaveCount(1);
});

test('active mobile section remains visible inside the tab strip', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only navigation assertion');
  await openProduction(page, 'canon');
  await expect.poll(async () => page.locator('.mobile-tabs').evaluate((nav) => {
    const active = nav.querySelector('button.is-active');
    if (!active) return false;
    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    return activeRect.left >= navRect.left - 2 && activeRect.right <= navRect.right + 2;
  })).toBe(true);
});

test('all production archive sections render without mobile overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile parity assertion');
  const sections = ['overview', 'characters', 'villains', 'techniques', 'chapters', 'bookmarks', 'rankings', 'legends', 'former', 'timeline', 'canon'];
  for (const section of sections) {
    await openProduction(page, section);
    await expect(page.locator('.content')).toBeVisible();
    const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(dimensions.scroll, `${section} should not overflow horizontally`).toBeLessThanOrEqual(dimensions.width + 2);
  }
});

test('reader typography and width controls persist on the device', async ({ page }) => {
  await openProduction(page, 'chapter/1/1');
  const prose = page.locator('.reader-prose');
  await expect(prose).toBeVisible({ timeout: 20_000 });
  const before = await prose.evaluate((node) => {
    const style = getComputedStyle(node);
    return { fontSize: Number.parseFloat(style.fontSize), fontFamily: style.fontFamily, lineHeight: Number.parseFloat(style.lineHeight), maxWidth: style.maxWidth };
  });

  await page.getByRole('button', { name: 'A+' }).click();
  await page.getByRole('button', { name: /^Font ·/ }).click();
  await page.getByRole('button', { name: /^Spacing ·/ }).click();
  await page.getByRole('button', { name: /^Width ·/ }).click();

  const changed = await prose.evaluate((node) => {
    const style = getComputedStyle(node);
    return { fontSize: Number.parseFloat(style.fontSize), fontFamily: style.fontFamily, lineHeight: Number.parseFloat(style.lineHeight), maxWidth: style.maxWidth };
  });
  expect(changed.fontSize).toBeGreaterThan(before.fontSize);
  expect(changed.fontFamily).not.toBe(before.fontFamily);
  expect(changed.lineHeight).toBeGreaterThan(before.lineHeight);
  expect(changed.maxWidth).not.toBe(before.maxWidth);

  await page.reload();
  await expect(prose).toBeVisible({ timeout: 20_000 });
  const persisted = await prose.evaluate((node) => {
    const style = getComputedStyle(node);
    return { fontSize: Number.parseFloat(style.fontSize), fontFamily: style.fontFamily, lineHeight: Number.parseFloat(style.lineHeight), maxWidth: style.maxWidth };
  });
  expect(persisted.fontSize).toBeCloseTo(changed.fontSize, 1);
  expect(persisted.fontFamily).toBe(changed.fontFamily);
  expect(persisted.lineHeight).toBeCloseTo(changed.lineHeight, 1);
  expect(persisted.maxWidth).toBe(changed.maxWidth);
});

test('reader controls and chapter navigation remain in-flow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile reader layout assertion');
  await openProduction(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  const positions = await page.evaluate(() => ({
    controls: getComputedStyle(document.querySelector('.reader-controls') as HTMLElement).position,
    navigation: getComputedStyle(document.querySelector('.reader-nav') as HTMLElement).position,
  }));
  expect(positions.controls).not.toBe('fixed');
  expect(positions.navigation).not.toBe('fixed');
});

test('mobile navigation chrome moves away while reading and returns on upward scroll', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile reading chrome assertion');
  await openProduction(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await page.evaluate(() => window.scrollTo(0, Math.min(1600, document.documentElement.scrollHeight - window.innerHeight)));
  await expect.poll(() => page.locator('.app-shell').evaluate((node) => node.classList.contains('is-mobile-chrome-hidden'))).toBe(true);
  await page.evaluate(() => window.scrollBy(0, -360));
  await expect.poll(() => page.locator('.app-shell').evaluate((node) => node.classList.contains('is-mobile-chrome-hidden'))).toBe(false);
});

test('rank badges remain distinct and appear in global search', async ({ page }) => {
  await openProduction(page, 'characters/han');
  await expect(page.locator('.character-name-line .react-rank-badge--deceased')).toContainText('†');
  await page.goto('/#characters/qin');
  await expect(page.locator('.character-name-line .react-rank-badge--retired')).toContainText('RET');
  await page.goto('/#characters/sera');
  await expect(page.locator('.character-name-line .react-rank-badge--former')).toContainText('FORMER');
  await page.goto('/#characters/rhen');
  await expect(page.locator('.character-name-line .react-rank-badge--unranked')).toContainText('UNRANKED');

  await openProduction(page);
  const search = page.locator('.search-box input');
  await search.fill('Kael');
  await expect(page.locator('.search-result .react-rank-badge').first()).toBeVisible();
});

test('production reader declares PWA metadata, registers the worker, and supports controlled updates', async ({ page }) => {
  await openProduction(page);
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', './manifest.webmanifest');
  await expect(page.locator('#updateBanner')).toBeHidden();
  const registration = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const ready = await Promise.race([
      navigator.serviceWorker.ready.then(() => true),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 10_000)),
    ]);
    return ready;
  });
  expect(registration).toBe(true);
  const workerSource = await page.evaluate(async () => (await fetch('./sw.js')).text());
  expect(workerSource).toContain('SKIP_WAITING');
  expect(workerSource).not.toContain('cache.addAll(SHELL)).then(() => self.skipWaiting())');
});

test('production surface has no critical automated accessibility violations', async ({ page }) => {
  await openProduction(page, 'characters/sera');
  const result = await new AxeBuilder({ page }).analyze();
  const critical = result.violations.filter((violation) => violation.impact === 'critical');
  expect(critical, critical.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([]);
});

test('compatibility alias remains available after production cutover', async ({ page }) => {
  await page.goto('/react-preview.html#characters/sera');
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.character-name-line')).toContainText('Sera');
  await expect(page).toHaveTitle(/Compatibility Reader/);
});

test('capture production visual review surfaces', async ({ page }, testInfo) => {
  await openProduction(page, 'chapters');
  await page.screenshot({ path: `test-results/production-${testInfo.project.name}-chapters.png`, fullPage: true });
  await openProduction(page, 'characters/sera');
  await page.screenshot({ path: `test-results/production-${testInfo.project.name}-character.png`, fullPage: true });
  await openProduction(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await page.screenshot({ path: `test-results/production-${testInfo.project.name}-reader.png`, fullPage: true });
});
