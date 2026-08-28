import { test, expect } from '@playwright/test';

function chunkLoaded(paths: string[], feature: string): boolean {
  return paths.some((path) => new RegExp(`/${feature}-[^/]+\\.js$`).test(path));
}

test('direct chapter entry loads only the active feature route', async ({ page }) => {
  const scripts: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() !== 'script') return;
    scripts.push(new URL(request.url()).pathname);
  });

  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });

  expect(chunkLoaded(scripts, 'ReaderRoute')).toBe(true);
  for (const inactive of ['CharactersRoute', 'RankingsPage', 'CanonPage', 'TimelinePage', 'SearchRoute']) {
    expect(chunkLoaded(scripts, inactive), `${inactive} should stay unloaded on direct reader entry`).toBe(false);
  }

  const characterNav = page.locator('.primary-nav button:visible, .mobile-tabs button:visible').filter({ hasText: /Characters|Cast/ }).first();
  await characterNav.click();
  await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible({ timeout: 20_000 });
  await expect.poll(() => chunkLoaded(scripts, 'CharactersRoute')).toBe(true);
});

test('Search v2 chunk loads only when the command palette opens', async ({ page }) => {
  const scripts: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() !== 'script') return;
    scripts.push(new URL(request.url()).pathname);
  });

  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  expect(chunkLoaded(scripts, 'SearchRoute')).toBe(false);

  await page.locator('.search-box input').focus();
  await expect(page.locator('.search-palette')).toBeVisible({ timeout: 20_000 });
  await expect.poll(() => chunkLoaded(scripts, 'SearchRoute')).toBe(true);
});
