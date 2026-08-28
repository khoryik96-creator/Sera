import { test, expect } from '@playwright/test';

function moduleLoaded(paths: string[], feature: string): boolean {
  return paths.some((path) => {
    const built = new RegExp(`/${feature}-[^/]+\\.js$`).test(path);
    const source = path.endsWith(`/${feature}.ts`) || path.endsWith(`/${feature}.tsx`);
    return built || source;
  });
}

function watchModules(page: import('@playwright/test').Page): string[] {
  const paths: string[] = [];
  page.on('request', (request) => {
    const path = new URL(request.url()).pathname;
    if (/\.(?:js|ts|tsx)$/.test(path)) paths.push(path);
  });
  return paths;
}

const inactiveReaderRoutes = [
  'OverviewRoute',
  'CharactersRoute',
  'VillainsRoute',
  'TechniquesRoute',
  'ChaptersRoute',
  'RankingsRoute',
  'BookmarksRoute',
  'InsightsRoute',
  'LegendsRoute',
  'FormerRoute',
  'TimelineRoute',
  'CanonRoute',
  'SearchRoute',
];

test('direct chapter entry loads only the active feature route', async ({ page }) => {
  const modules = watchModules(page);

  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });

  expect(moduleLoaded(modules, 'ReaderRoute')).toBe(true);
  for (const inactive of inactiveReaderRoutes) {
    expect(moduleLoaded(modules, inactive), `${inactive} should stay unloaded on direct reader entry`).toBe(false);
  }

  const characterNav = page.locator('.primary-nav button:visible, .mobile-tabs button:visible').filter({ hasText: /Characters|Cast/ }).first();
  await characterNav.click();
  await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible({ timeout: 20_000 });
  await expect.poll(() => moduleLoaded(modules, 'CharactersRoute')).toBe(true);
});

test('Search v2 route loads only when the command palette opens', async ({ page }) => {
  const modules = watchModules(page);

  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  expect(moduleLoaded(modules, 'SearchRoute')).toBe(false);

  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog', { name: 'Search The Quiet Regular' })).toBeVisible({ timeout: 20_000 });
  await expect.poll(() => moduleLoaded(modules, 'SearchRoute')).toBe(true);
});
