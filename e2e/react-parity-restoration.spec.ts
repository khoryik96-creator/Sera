import { expect, test } from '@playwright/test';

test('React Canon restores stable legacy reference rules and Search v2 can find them', async ({ page }) => {
  await page.goto('/#canon');
  await expect(page.getByRole('heading', { name: 'World & reveal rules' })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('heading', { name: 'Murim Power System' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Season 1 Lock' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Formal Technique Tier Hierarchy' })).toBeVisible();

  const filter = page.getByRole('textbox', { name: 'Filter canon rules' });
  await filter.fill('Western magic');
  await expect(page.getByRole('heading', { name: 'Murim Power System' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Season 1 Lock' })).toHaveCount(0);

  await page.goto('/#overview');
  const globalSearch = page.getByPlaceholder('Search characters, episodes, canon…');
  await globalSearch.fill('Murim Power System');
  await expect(page.locator('[data-search-result="true"]').filter({ hasText: 'Murim Power System' })).toBeVisible({ timeout: 20_000 });
});

test('Sera character profile restores her dedicated Pale Orchid technique archive', async ({ page }) => {
  await page.goto('/#characters/sera');
  await expect(page.locator('.character-profile--v2')).toBeVisible({ timeout: 20_000 });
  const arts = page.locator('#characterLeadArtsSection');
  await expect(arts.getByRole('heading', { name: 'Sera — signature martial system' })).toBeVisible();
  expect(await arts.locator('.technique-card').count()).toBeGreaterThan(0);
  await expect(page.getByRole('group', { name: 'Sera profile sections' }).getByRole('button', { name: 'Arts', exact: true })).toBeVisible();
});

test('React exposes Install Reader when the browser provides an install prompt', async ({ page }) => {
  await page.goto('/#overview');
  await expect(page.locator('.topbar')).toBeVisible({ timeout: 20_000 });

  await page.evaluate(() => {
    const event = new Event('beforeinstallprompt', { cancelable: true });
    Object.defineProperty(event, 'prompt', {
      value: async () => {
        (window as typeof window & { __readerInstallPrompted?: boolean }).__readerInstallPrompted = true;
      },
    });
    Object.defineProperty(event, 'userChoice', {
      value: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
    });
    window.dispatchEvent(event);
  });

  const install = page.getByRole('button', { name: 'Install The Quiet Regular reader' });
  await expect(install).toBeVisible();
  await install.click();
  await expect.poll(() => page.evaluate(() => Boolean((window as typeof window & { __readerInstallPrompted?: boolean }).__readerInstallPrompted))).toBe(true);
  await expect(install).toHaveCount(0);
});
