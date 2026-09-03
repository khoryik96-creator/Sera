import { readFile, writeFile } from 'node:fs/promises';

async function replaceOnce(path, before, after) {
  const source = await readFile(path, 'utf8');
  const first = source.indexOf(before);
  if (first < 0) throw new Error(`Expected block not found in ${path}`);
  if (source.indexOf(before, first + before.length) >= 0) throw new Error(`Expected block is not unique in ${path}`);
  await writeFile(path, `${source.slice(0, first)}${after}${source.slice(first + before.length)}`);
}

await replaceOnce(
  'src/react/features/reader/ReaderPage.tsx',
  "import { cleanCharacterName, rankLabel, rankStatus } from '../../shared/rankState';\n",
  "import { cleanLoreRole, inferLoreAffiliation, loreStrengthFrom } from '../../shared/loreMetadata';\nimport { cleanCharacterName, rankLabel, rankStatus } from '../../shared/rankState';\n",
);

await replaceOnce(
  'src/react/features/reader/ReaderPage.tsx',
  `  const loreStrengthSource = [loreArcFigure?.subtitle, loreArcFigure?.details, loreSeasonCast?.description, loreFormer?.summary].filter(Boolean).join(' ');\n  const loreStrengthMatch = loreStrengthSource.match(/\\b(?:(?:Entry|Stable|Low|Mid|High|Peak)\\s+(?:Paragon|Sovereign|Duke|Marquis|Grandmaster|Master)|Paragon|Sovereign|Duke|Marquis|Grandmaster|High Master|Master|Overlord|Ancient King|Calamity)\\b/i);\n  const loreStrength = loreProfile?.cultivation?.trim() || loreStrengthMatch?.[0] || 'Not recorded';\n  const loreAffiliation = loreProfile?.affiliation?.trim() || loreArcFigure?.affiliation?.trim() || (loreFormer ? 'Historical ranking archive' : 'Not recorded');\n  const loreRole = loreProfile?.affiliationRole?.trim() || loreArcFigure?.affiliationRole?.trim() || loreSeasonCast?.role?.trim() || loreFormer?.title?.trim() || 'No formal role recorded';\n`,
  `  const loreStrength = loreProfile?.cultivation?.trim()\n    || loreStrengthFrom([loreArcFigure?.subtitle, loreArcFigure?.affiliationRole, loreSeasonCast?.role, loreArcFigure?.details, loreSeasonCast?.description, loreFormer?.summary])\n    || 'Not recorded';\n  const loreAffiliation = loreProfile?.affiliation?.trim()\n    || loreArcFigure?.affiliation?.trim()\n    || inferLoreAffiliation(loreName)\n    || (loreFormer ? 'Historical ranking archive' : 'Not recorded');\n  const loreRole = loreProfile?.affiliationRole?.trim()\n    || loreArcFigure?.affiliationRole?.trim()\n    || cleanLoreRole(loreSeasonCast?.role)\n    || loreFormer?.title?.trim()\n    || 'No formal role recorded';\n`,
);

await replaceOnce(
  'src/react/features/reader/ReaderPage.tsx',
  `  function openLoreProfile(): void {\n    if (!loreEntry || !loreProfile) return;\n    window.location.hash = \`characters/\${loreEntry.key}\`;\n  }\n`,
  `  function openLoreProfile(): void {\n    if (!loreEntry) return;\n    if (loreProfile) {\n      window.location.hash = \`characters/\${loreEntry.key}\`;\n      return;\n    }\n    window.location.hash = loreFormer ? 'former' : 'villains';\n  }\n`,
);

await replaceOnce(
  'src/react/features/reader/ReaderPage.tsx',
  `                {loreProfile ? <button onClick={openLoreProfile} type="button">Open profile →</button> : null}\n`,
  `                {loreProfile || loreArcFigure || loreSeasonCast || loreFormer ? <button onClick={openLoreProfile} type="button">{loreProfile ? 'Open profile →' : loreFormer ? 'Open former archive →' : 'Open archive →'}</button> : null}\n`,
);

await replaceOnce(
  'e2e/contextual-lore.spec.ts',
  `test('contextual lore card is fully opaque', async ({ page }) => {\n`,
  `test('season-cast-only highlighted characters appear in the other-characters archive', async ({ page }) => {\n  await page.goto('/#villains');\n  await expect(page.getByRole('heading', { name: 'Other Characters & Villains' })).toBeVisible({ timeout: 20_000 });\n  await page.locator('.toolbar-row .filter-input').fill('Varok Skeldran');\n  const card = page.locator('.lore-card').filter({ hasText: 'Varok Skeldran' }).first();\n  await expect(card).toBeVisible();\n  await card.locator('summary').click();\n  await expect(card).toContainText('High Sovereign');\n  await expect(card).toContainText('Skeldran — Thousandfold Hunt, Isgard');\n  await expect(card).toContainText('White Huntmaster');\n});\n\ntest('contextual lore card is fully opaque', async ({ page }) => {\n`,
);

await replaceOnce(
  'e2e/production-reader.spec.ts',
  `    await expect(page.locator(selector), \`\${hash} should render all canonical records\`).toHaveCount(count);\n`,
  `    if (hash === 'villains') {\n      expect(await page.locator(selector).count(), \`\${hash} should render all canonical records plus recurring highlighted cast\`).toBeGreaterThanOrEqual(count);\n    } else {\n      await expect(page.locator(selector), \`\${hash} should render all canonical records\`).toHaveCount(count);\n    }\n`,
);
