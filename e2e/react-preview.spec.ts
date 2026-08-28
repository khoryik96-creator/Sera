import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

async function coreCounts(page: import('@playwright/test').Page): Promise<CoreCounts> {
  await openProduction(page);
  return page.evaluate(async () => {
    const resourceUrl = performance.getEntriesByType('resource')
      .map((entry) => (entry as PerformanceResourceTiming).name)
      .find((name) => /\/(?:assets\/core-[^/]+|src\/generated\/core)\.json(?:\?|$)/.test(name));
    if (!resourceUrl) throw new Error('Production core lore resource was not observed');
    const response = await fetch(resourceUrl);
    if (!response.ok) throw new Error(`Unable to reload core lore resource: ${response.status}`);
    const core = await response.json() as CoreCountShape;
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
      canon: (core.canonRules || []).length,
    };
  });
}

test('production React shell renders and routes between core features', async ({ page }) => {
  await openProduction(page);
  await expect(page.getByText('Second Spring,', { exact: false })).toBeVisible();
  const visibleCharacterNav = page.locator('.primary-nav button:visible, .mobile-tabs button:visible').filter({ hasText: /Characters|Cast/ }).first();
  await visibleCharacterNav.click();
  await expect(page).toHaveURL(/#characters$/);
  await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible();
});

test('legacy production hashes remain valid in the React reader', async ({ page }) => {
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

test('production React archive renders every canonical core record', async ({ page }) => {
  const expected = await coreCounts(page);
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
  await page.getByRole('button', { name: 'Sera', exact: true }).click();
  await expect(page.locator('.technique-card')).toHaveCount(expected.seraSkills);

  await openProduction(page, 'chapters');
  await expect(page.locator('.season-card')).toHaveCount(64);
});

test('season Read action loads the chosen season and opens its first episode', async ({ page }, testInfo) => {
  await openProduction(page, 'chapters');
  const season12 = page.locator('.season-card').nth(11);
  await season12.click();
  await expect(season12).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.season-selected-heading__meta')).toHaveText('Season 12');
  await expect(page.locator('.season-start-button')).toBeEnabled({ timeout: 20_000 });

  if (testInfo.project.name.includes('mobile')) {
    await expect.poll(async () => page.locator('.season-reader-panel').evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    })).toBe(true);
  }

  await page.locator('.season-start-button').click();
  await expect(page).toHaveURL(/#chapter\/12\/1$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('production React reader is mobile-safe with swipeable navigation and no page overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only layout assertion');
  await openProduction(page, 'characters/sera');
  await expect(page.locator('.mobile-tabs')).toBeVisible();
  await expect(page.locator('.sidebar')).toBeHidden();
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await expect(page.locator('.portrait-card > img')).toHaveCount(1);
});

test('all production React archive sections render without mobile overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile parity assertion');
  const sections = ['overview', 'characters', 'villains', 'techniques', 'chapters', 'bookmarks', 'rankings', 'legends', 'former', 'timeline', 'canon'];
  for (const section of sections) {
    await openProduction(page, section);
    await expect(page.locator('.content')).toBeVisible();
    const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(dimensions.scroll, `${section} should not overflow horizontally`).toBeLessThanOrEqual(dimensions.width + 2);
  }
});

test('React reader text controls change scale and persist on the device', async ({ page }) => {
  await openProduction(page, 'chapter/1/1');
  const prose = page.locator('.reader-prose');
  await expect(prose).toBeVisible({ timeout: 20_000 });
  const before = await prose.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  await page.getByRole('button', { name: 'A+' }).click();
  const after = await prose.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  expect(after).toBeGreaterThan(before);
  await page.reload();
  await expect(prose).toBeVisible({ timeout: 20_000 });
  const persisted = await prose.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize));
  expect(persisted).toBeGreaterThan(before);
});

test('React reader controls and episode navigation stay in-flow on mobile', async ({ page }, testInfo) => {
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

test('production React reader keeps deceased, retired, and former rank states distinct', async ({ page }) => {
  await openProduction(page, 'characters/han');
  await expect(page.locator('.character-name-line .react-rank-badge--deceased')).toContainText('†');
  await page.goto('/#characters/qin');
  await expect(page.locator('.character-name-line .react-rank-badge--retired')).toContainText('RET');
  await page.goto('/#characters/sera');
  await expect(page.locator('.character-name-line .react-rank-badge--former')).toContainText('FORMER');
});

test('production React reader declares the PWA manifest and registers the service worker', async ({ page }) => {
  await openProduction(page);
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', './manifest.webmanifest');
  const registration = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const ready = await Promise.race([
      navigator.serviceWorker.ready.then(() => true),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 10_000)),
    ]);
    return ready;
  });
  expect(registration).toBe(true);
});

test('production React surface has no critical automated accessibility violations', async ({ page }) => {
  await openProduction(page, 'characters/sera');
  const result = await new AxeBuilder({ page }).analyze();
  const critical = result.violations.filter((violation) => violation.impact === 'critical');
  expect(critical, critical.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([]);
});

test('React preview alias remains available after production cutover', async ({ page }) => {
  await page.goto('/react-preview.html#characters/sera');
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.character-name-line')).toContainText('Sera');
});

test('capture production React visual review surfaces', async ({ page }, testInfo) => {
  await openProduction(page, 'characters/sera');
  await page.screenshot({ path: `test-results/react-production-${testInfo.project.name}-character.png`, fullPage: true });
  await openProduction(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await page.screenshot({ path: `test-results/react-production-${testInfo.project.name}-reader.png`, fullPage: true });
});
