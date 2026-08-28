import { test, expect } from '@playwright/test';

async function openSearch(page: import('@playwright/test').Page) {
  await page.goto('/#overview');
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog', { name: 'Search The Quiet Regular' })).toBeVisible();
  const input = page.locator('.search-box input');
  await expect(input).toBeFocused();
  return input;
}

test('command palette opens with grouped search guidance', async ({ page }) => {
  await openSearch(page);
  const palette = page.locator('.search-palette');
  await expect(palette).toContainText('Global command palette');
  await expect(palette).toContainText('Sera');
  await expect(palette).toContainText('Season 23');
  await expect(palette).toContainText('633 episodes');
});

test('character search preserves rank state and Enter opens the best match', async ({ page }) => {
  const input = await openSearch(page);
  await input.fill('Sera');
  const group = page.locator('.search-group').filter({ hasText: 'Characters' });
  await expect(group).toBeVisible();
  await expect(group.locator('.search-result-v2').first()).toContainText('Sera');
  await expect(group.locator('.react-rank-badge--former').first()).toContainText('FORMER');
  await input.press('Enter');
  await expect(page).toHaveURL(/#characters\/sera$/);
  await expect(page.locator('.character-name-line')).toContainText('Sera');
});

test('season search jumps directly to the selected season', async ({ page }) => {
  const input = await openSearch(page);
  await input.fill('Season 23');
  const seasonResult = page.locator('[data-search-result="true"]').filter({ hasText: 'Season 23' }).first();
  await expect(seasonResult).toBeVisible();
  await seasonResult.click();
  await expect(page).toHaveURL(/#chapter\/23\/1$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('lazy episode index supports direct S/E lookup without loading all chapter bodies at startup', async ({ page }) => {
  const input = await openSearch(page);
  await input.fill('s12 e3');
  const episodeResult = page.locator('[data-search-result="true"]').filter({ hasText: 'S12 · E3' }).first();
  await expect(episodeResult).toBeVisible({ timeout: 20_000 });
  await episodeResult.click();
  await expect(page).toHaveURL(/#chapter\/12\/3$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('keyboard navigation enters results and Escape closes the palette', async ({ page }) => {
  const input = await openSearch(page);
  await input.fill('Kael');
  await expect(page.locator('[data-search-result="true"]').first()).toBeVisible();
  await input.press('ArrowDown');
  await expect.poll(() => page.evaluate(() => document.activeElement?.getAttribute('data-search-result'))).toBe('true');
  await page.keyboard.press('Escape');
  await expect(page.locator('.search-palette')).toBeHidden();
});

test('Search v2 remains contained on phone and desktop', async ({ page }, testInfo) => {
  const input = await openSearch(page);
  await input.fill('frozen petals');
  await expect(page.locator('.search-palette')).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('search-v2.png'), fullPage: true });
});
