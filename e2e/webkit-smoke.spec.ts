import { test, expect } from '@playwright/test';

test('production overview, reader, and library work in WebKit', async ({ page }) => {
  await page.goto('/#overview');
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });

  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);

  await page.goto('/#bookmarks/journey');
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('tab', { name: /Journey/ })).toHaveAttribute('aria-selected', 'true');
});
