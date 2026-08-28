import { test, expect } from '@playwright/test';

async function openPreview(page: import('@playwright/test').Page, hash = 'overview') {
  await page.goto(`/react-preview.html#${hash}`);
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
}

test('React preview shell renders and routes between core features', async ({ page }) => {
  await openPreview(page);
  await expect(page.getByText('Second Spring,', { exact: false })).toBeVisible();
  const visibleCharacterNav = page.locator('.primary-nav button:visible, .mobile-tabs button:visible').filter({ hasText: /Characters|Cast/ }).first();
  await visibleCharacterNav.click();
  await expect(page).toHaveURL(/react-preview\.html#characters$/);
  await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible();
});

test('React preview is mobile-safe with swipeable navigation and no page overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile-only layout assertion');
  await openPreview(page, 'characters/sera');
  await expect(page.locator('.mobile-tabs')).toBeVisible();
  await expect(page.locator('.sidebar')).toBeHidden();
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await expect(page.locator('.portrait-card > img')).toHaveCount(1);
});

test('all migrated React archive sections render without mobile overflow', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'mobile parity assertion');
  const sections = ['overview', 'characters', 'villains', 'techniques', 'chapters', 'bookmarks', 'rankings', 'legends', 'former', 'timeline', 'canon'];
  for (const section of sections) {
    await openPreview(page, section);
    await expect(page.locator('.content')).toBeVisible();
    const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(dimensions.scroll, `${section} should not overflow horizontally`).toBeLessThanOrEqual(dimensions.width + 2);
  }
});

test('React reader text controls change scale and persist on the device', async ({ page }) => {
  await openPreview(page, 'chapter/1/1');
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
  await openPreview(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  const positions = await page.evaluate(() => ({
    controls: getComputedStyle(document.querySelector('.reader-controls') as HTMLElement).position,
    navigation: getComputedStyle(document.querySelector('.reader-nav') as HTMLElement).position,
  }));
  expect(positions.controls).not.toBe('fixed');
  expect(positions.navigation).not.toBe('fixed');
});

test('React preview keeps deceased, retired, and former rank states distinct', async ({ page }) => {
  await openPreview(page, 'characters/han');
  await expect(page.locator('.character-name-line .react-rank-badge--deceased')).toContainText('†');
  await page.goto('/react-preview.html#characters/qin');
  await expect(page.locator('.character-name-line .react-rank-badge--retired')).toContainText('RET');
  await page.goto('/react-preview.html#characters/sera');
  await expect(page.locator('.character-name-line .react-rank-badge--former')).toContainText('FORMER');
});

test('capture React preview visual review surfaces', async ({ page }, testInfo) => {
  await openPreview(page, 'characters/sera');
  await page.screenshot({ path: `test-results/react-preview-${testInfo.project.name}-character.png`, fullPage: true });
  await openPreview(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await page.screenshot({ path: `test-results/react-preview-${testInfo.project.name}-reader.png`, fullPage: true });
});
