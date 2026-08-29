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
  const globalSearch = page.getByPlaceholder('Search characters, chapters, canon…');
  await globalSearch.fill('Murim Power System');
  await expect(page.locator('[data-search-result="true"]').filter({ hasText: 'Murim Power System' })).toBeVisible({ timeout: 20_000 });
});

test('Sera character profile uses the same compact skill-card UI as ranked characters', async ({ page }) => {
  await page.goto('/#characters/sera');
  await expect(page.locator('.character-profile--v2')).toBeVisible({ timeout: 20_000 });
  const skills = page.locator('#characterSkillsSection');
  await expect(skills.getByRole('heading', { name: 'Sera — signature techniques' })).toBeVisible();
  expect(await skills.locator('.character-skill-card').count()).toBeGreaterThan(0);
  await expect(skills.locator('.technique-card')).toHaveCount(0);
  const nav = page.getByRole('navigation', { name: 'Sera profile sections' });
  await expect(nav.getByRole('button', { name: 'Skills', exact: true })).toBeVisible();
  await expect(nav.getByRole('button', { name: 'Arts', exact: true })).toHaveCount(0);
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

test('React Chapters restores the selected season character memory guide', async ({ page }) => {
  await page.goto('/#chapters');
  await expect(page.getByRole('heading', { name: 'Read The Quiet Regular' })).toBeVisible({ timeout: 20_000 });
  await page.getByRole('combobox', { name: 'Season' }).selectOption('4');
  await expect(page.getByRole('combobox', { name: 'Season' })).toHaveValue('4');

  const guide = page.locator('.season-cast-guide');
  await expect(guide.getByText('New / Important Characters This Season')).toBeVisible();
  await guide.locator('summary').click();
  await expect(guide.locator('.season-cast-guide__grid article')).toHaveCount(3);
  await expect(guide.getByText('#5 Rui', { exact: true })).toBeVisible();
});

test('React reader restores the compact dialogue color legend', async ({ page }) => {
  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-surface')).toBeVisible({ timeout: 20_000 });
  const key = page.locator('.reader-dialogue-key');
  await expect(key.getByText('Dialogue Colors', { exact: true })).toBeVisible();
  await key.locator('summary').click();
  await expect(key.locator('.reader-dialogue-key__items').getByText('Rhen', { exact: true })).toBeVisible();
  await expect(key.locator('.reader-dialogue-key__items').getByText('Former #6 Sera', { exact: true })).toBeVisible();
  expect(await key.locator('.reader-dialogue-key__items > span').count()).toBeGreaterThan(10);
});
