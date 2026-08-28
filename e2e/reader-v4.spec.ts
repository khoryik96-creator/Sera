import { test, expect } from '@playwright/test';

async function openChapter(page: import('@playwright/test').Page, season = 1, episode = 1) {
  await page.goto(`/#chapter/${season}/${episode}`);
  await expect(page.locator('.reader-page--v4')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
}

test('saved exact position is offered and resumes inside the chapter', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:chapterPositions:v1', JSON.stringify([
      { id: 'ep-s1-e1', season: 1, episode: 1, progress: 0.45, updatedAt: 1234 },
    ]));
  });
  await openChapter(page);

  const resume = page.locator('.reader-position-resume');
  await expect(resume).toContainText('45%');
  const before = await page.evaluate(() => window.scrollY);
  await resume.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 40);
  await expect(page.locator('.reader-position-resume')).toBeHidden();
});

test('scrolling a chapter persists a reusable exact position', async ({ page }) => {
  await openChapter(page, 12, 3);
  await page.evaluate(() => {
    const prose = document.querySelector('.reader-prose') as HTMLElement;
    const top = window.scrollY + prose.getBoundingClientRect().top;
    window.scrollTo(0, top + prose.offsetHeight * 0.46);
  });

  await expect.poll(async () => Number.parseInt((await page.locator('.reader-chapter-position strong').textContent()) || '0', 10)).toBeGreaterThan(5);
  await page.waitForTimeout(850);
  await page.evaluate(() => window.scrollBy(0, 1));

  await expect.poll(async () => page.evaluate(() => {
    const rows = JSON.parse(localStorage.getItem('tqr:chapterPositions:v1') || '[]') as Array<{ id: string; progress: number }>;
    return rows.find((row) => row.id === 'ep-s12-e3')?.progress || 0;
  })).toBeGreaterThan(0.05);

  const stored = await page.evaluate(() => {
    const rows = JSON.parse(localStorage.getItem('tqr:chapterPositions:v1') || '[]') as Array<{ id: string; progress: number }>;
    return rows.find((row) => row.id === 'ep-s12-e3')?.progress || 0;
  });
  expect(stored).toBeLessThan(0.96);

  await page.reload();
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.reader-position-resume')).toBeVisible();
  await expect(page.locator('.reader-position-resume strong')).toHaveText(`${Math.round(stored * 100)}%`);
});

test('focus mode removes app chrome but keeps reading and resume controls usable', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:chapterPositions:v1', JSON.stringify([
      { id: 'ep-s1-e1', season: 1, episode: 1, progress: 0.42, updatedAt: 1234 },
    ]));
  });
  await openChapter(page);

  const toggle = page.getByRole('button', { name: 'Focus · Off' });
  await toggle.click();
  await expect(page.locator('body')).toHaveClass(/reader-focus-mode/);
  await expect(page.getByRole('button', { name: 'Focus · On' })).toBeVisible();
  await expect(page.locator('.topbar')).toBeHidden();
  await expect(page.locator('.sidebar')).toBeHidden();
  await expect(page.locator('.mobile-tabs')).toBeHidden();
  await expect(page.locator('.reader-prose')).toBeVisible();
  await expect(page.locator('.reader-position-resume')).toBeVisible();
  await expect(page.locator('.reader-controls')).toBeVisible();

  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('reader-v4-focus.png'), fullPage: true });

  await page.keyboard.press('Escape');
  await expect(page.locator('body')).not.toHaveClass(/reader-focus-mode/);
  await expect(page.getByRole('button', { name: 'Focus · Off' })).toBeVisible();
});

test('focus preference survives chapter navigation and can be switched off', async ({ page }) => {
  await openChapter(page);
  await page.getByRole('button', { name: 'Focus · Off' }).click();
  await expect(page.locator('body')).toHaveClass(/reader-focus-mode/);
  await page.locator('.reader-nav--v3 > button').last().click();
  await expect(page).toHaveURL(/#chapter\/1\/2$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('body')).toHaveClass(/reader-focus-mode/);
  await page.getByRole('button', { name: 'Focus · On' }).click();
  await expect(page.locator('body')).not.toHaveClass(/reader-focus-mode/);
});
