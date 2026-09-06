import { readFile, writeFile } from 'node:fs/promises';

async function patch(path, edits) {
  let text = (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');
  for (const [from, to] of edits) {
    const count = text.split(from).length - 1;
    if (count !== 1) throw new Error(`${path}: expected one match for ${JSON.stringify(from)}, found ${count}`);
    text = text.replace(from, to);
  }
  await writeFile(path, text);
}

await patch('e2e/overview-dashboard.spec.ts', [
  ["import { test, expect } from '@playwright/test';", "import { test, expect } from '@playwright/test';\nimport { TOTAL_ARCS } from '../src/episodeMeta';"],
  ["await expect(page.getByText('16 Story Arcs')).toBeVisible();", "await expect(page.getByText(`${TOTAL_ARCS} Story Arcs`)).toBeVisible();"],
]);

await patch('e2e/production-reader.spec.ts', [
  ["import { restoredCanonReferences } from '../src/canonReference';", "import { restoredCanonReferences } from '../src/canonReference';\nimport { TOTAL_ARCS, TOTAL_SEASONS } from '../src/episodeMeta';"],
  ["test('chapter archive exposes all 16 arcs and 94 seasons through direct selectors', async ({ page }) => {", "test('chapter archive exposes every canonical arc and season through direct selectors', async ({ page }) => {"],
  ["await expect(arcSelect.locator('option')).toHaveCount(16);", "await expect(arcSelect.locator('option')).toHaveCount(TOTAL_ARCS);"],
  ["await expect(seasonSelect.locator('option')).toHaveCount(94);", "await expect(seasonSelect.locator('option')).toHaveCount(TOTAL_SEASONS);"],
  ["await expect(seasonSelect.locator('option').last()).toHaveAttribute('value', '94');", "await expect(seasonSelect.locator('option').last()).toHaveAttribute('value', String(TOTAL_SEASONS));"],
]);

await patch('e2e/reading-insights.spec.ts', [
  ["import { test, expect } from '@playwright/test';", "import { test, expect } from '@playwright/test';\nimport { TOTAL_ARCS, TOTAL_CHAPTERS } from '../src/episodeMeta';"],
  ["await expect(page.locator('.insights-hero')).toContainText('10 of 933 episodes');", "await expect(page.locator('.insights-hero')).toContainText(`10 of ${TOTAL_CHAPTERS} episodes`);"],
  ["await expect(page.locator('.insights-arc-card')).toHaveCount(16);", "await expect(page.locator('.insights-arc-card')).toHaveCount(TOTAL_ARCS);"],
]);

await patch('e2e/search-v2.spec.ts', [
  ["import { test, expect } from '@playwright/test';", "import { test, expect } from '@playwright/test';\nimport { TOTAL_CHAPTERS } from '../src/episodeMeta';"],
  ["await expect(palette).toContainText('933 chapters');", "await expect(palette).toContainText(`${TOTAL_CHAPTERS} chapters`);"],
]);

console.log('Updated E2E archive-count assertions to canonical metadata constants.');
