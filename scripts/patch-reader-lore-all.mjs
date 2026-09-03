import { readFileSync, writeFileSync } from 'node:fs';

function replaceOnce(text, oldText, newText, label) {
  if (!text.includes(oldText)) throw new Error(`${label} anchor not found`);
  return text.replace(oldText, newText);
}

const readerPath = 'src/react/features/reader/ReaderPage.tsx';
let reader = readFileSync(readerPath, 'utf8');

reader = replaceOnce(
  reader,
  `  const loreEntry = loreKey ? characterRegistry.find((entry) => entry.key === loreKey) : undefined;\n  const loreProfile = loreKey ? DB.characters[loreKey] : undefined;\n  const loreName = loreProfile ? cleanCharacterName(loreProfile.name) : loreEntry?.displayName || '';\n  const loreRank = loreName ? rankLabel(loreName, season) : '';\n  const loreStatus = loreName ? rankStatus(loreName, season) : 'current';\n  const loreStrength = loreProfile?.cultivation?.trim() || 'Not recorded';\n  const loreAffiliation = loreProfile?.affiliation?.trim() || 'Not recorded';\n  const loreRole = loreProfile?.affiliationRole?.trim() || 'No formal role recorded';\n  const showResumePosition = Boolean(resumePosition && resumePosition.progress >= 0.05 && resumePosition.progress <= 0.96 && !resumeDismissed);\n`,
  `  const loreEntry = loreKey ? characterRegistry.find((entry) => entry.key === loreKey) : undefined;\n  const loreProfile = loreKey ? DB.characters[loreKey] : undefined;\n  const loreArcFigure = loreKey ? DB.arcFigures.find((figure) => figure.key === loreKey || cleanCharacterName(figure.name) === loreEntry?.displayName) : undefined;\n  const loreFormer = loreEntry ? DB.former.find((entry) => cleanCharacterName(entry.name) === loreEntry.displayName) : undefined;\n  const loreSeasonCast = loreEntry ? Object.values(DB.seasonCast).flat().find((entry) => cleanCharacterName(entry.name) === loreEntry.displayName) : undefined;\n  const loreName = loreProfile ? cleanCharacterName(loreProfile.name) : loreArcFigure ? cleanCharacterName(loreArcFigure.name) : loreEntry?.displayName || '';\n  const loreRank = loreName ? rankLabel(loreName, season) : '';\n  const loreStatus = loreName ? rankStatus(loreName, season) : 'current';\n  const loreStrengthSource = [loreArcFigure?.subtitle, loreArcFigure?.details, loreSeasonCast?.description, loreFormer?.summary].filter(Boolean).join(' ');\n  const loreStrengthMatch = loreStrengthSource.match(/\\b(?:(?:Entry|Stable|Low|Mid|High|Peak)\\s+(?:Paragon|Sovereign|Duke|Marquis|Grandmaster|Master)|Paragon|Sovereign|Duke|Marquis|Grandmaster|High Master|Master|Overlord|Ancient King|Calamity)\\b/i);\n  const loreStrength = loreProfile?.cultivation?.trim() || loreStrengthMatch?.[0] || 'Not recorded';\n  const loreAffiliation = loreProfile?.affiliation?.trim() || loreArcFigure?.affiliation?.trim() || (loreFormer ? 'Historical ranking archive' : 'Not recorded');\n  const loreRole = loreProfile?.affiliationRole?.trim() || loreArcFigure?.affiliationRole?.trim() || loreSeasonCast?.role?.trim() || loreFormer?.title?.trim() || 'No formal role recorded';\n  const loreSummary = loreProfile?.subtitle || loreArcFigure?.subtitle || loreSeasonCast?.description || loreFormer?.summary || 'Referenced in this chapter. No expanded archive entry is currently recorded.';\n  const showResumePosition = Boolean(resumePosition && resumePosition.progress >= 0.05 && resumePosition.progress <= 0.96 && !resumeDismissed);\n`,
  'reader metadata',
);

reader = replaceOnce(
  reader,
  `                {loreProfile ? (\n                  <div className="reader-lore-context__facts" aria-label={\`Quick facts for \${loreName}\`}>\n                    <div className="reader-lore-context__fact"><span>Ranking</span><div>{loreRank ? <RankBadge rank={loreRank} status={loreStatus} /> : <strong>Not ranked</strong>}</div></div>\n                    <div className="reader-lore-context__fact"><span>Strength</span><strong>{loreStrength}</strong></div>\n                    <div className="reader-lore-context__fact"><span>Affiliation</span><strong>{loreAffiliation}</strong></div>\n                    <div className="reader-lore-context__fact"><span>Role</span><strong>{loreRole}</strong></div>\n                  </div>\n                ) : null}\n                <p>{loreProfile?.subtitle || 'Referenced in this chapter. A full profile is not currently part of the main character archive.'}</p>\n`,
  `                <div className="reader-lore-context__facts" aria-label={\`Quick facts for \${loreName}\`}>\n                  <div className="reader-lore-context__fact"><span>Ranking</span><div>{loreRank ? <RankBadge rank={loreRank} status={loreStatus} /> : <strong>Not ranked</strong>}</div></div>\n                  <div className="reader-lore-context__fact"><span>Strength</span><strong>{loreStrength}</strong></div>\n                  <div className="reader-lore-context__fact"><span>Affiliation</span><strong>{loreAffiliation}</strong></div>\n                  <div className="reader-lore-context__fact"><span>Role</span><strong>{loreRole}</strong></div>\n                </div>\n                <p>{loreSummary}</p>\n`,
  'reader facts',
);

writeFileSync(readerPath, reader);

const cssPath = 'src/react/styles/contextual-lore.css';
let css = readFileSync(cssPath, 'utf8');
css = replaceOnce(
  css,
  'background:linear-gradient(120deg,rgba(111,201,183,.095),rgba(15,18,21,.985));',
  'background:#101719;',
  'opaque lore card background',
);
writeFileSync(cssPath, css);

const specPath = 'e2e/contextual-lore.spec.ts';
let spec = readFileSync(specPath, 'utf8');
const insertionAnchor = `test('clicking a name deep in the episode produces visible feedback', async ({ page }) => {`;
const added = `test('arc-only highlighted characters get the same quick facts card', async ({ page }) => {\n  await page.goto('/#chapter/87/1');\n  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });\n  const sigrun = page.getByRole('button', { name: 'Open lore for Sigrun Veyrhald' }).first();\n  await expect(sigrun).toBeVisible();\n  await sigrun.click();\n  const tray = page.locator('.reader-lore-context');\n  await expect(tray).toBeVisible();\n  await expect(tray.getByText('Ranking', { exact: true })).toBeVisible();\n  await expect(tray.getByText('Strength', { exact: true })).toBeVisible();\n  await expect(tray.getByText('Affiliation', { exact: true })).toBeVisible();\n  await expect(tray.getByText('Role', { exact: true })).toBeVisible();\n  await expect(tray.locator('.reader-lore-context__fact').nth(1)).toContainText('Peak Sovereign');\n  await expect(tray.locator('.reader-lore-context__fact').nth(2)).not.toContainText('Not recorded');\n  await expect(tray.locator('.reader-lore-context__fact').nth(3)).not.toContainText('No formal role recorded');\n});\n\ntest('contextual lore card is fully opaque', async ({ page }) => {\n  await openReader(page);\n  await page.getByRole('button', { name: 'Open lore for Sera' }).first().click();\n  const background = await page.locator('.reader-lore-context').evaluate((node) => getComputedStyle(node).backgroundColor);\n  expect(background).toMatch(/^rgb\\(/);\n  expect(background).not.toContain('rgba');\n});\n\n`;
if (!spec.includes(added)) spec = replaceOnce(spec, insertionAnchor, added + insertionAnchor, 'e2e insertion');
writeFileSync(specPath, spec);

// Audit the authoring database so the specific screenshot case is guaranteed to
// resolve through arcFigures rather than relying on the fallback labels.
const data = JSON.parse(readFileSync('src/data.json', 'utf8'));
const sigrun = data.arcFigures.find((figure) => figure.key === 'sigrun' || figure.name === 'Sigrun Veyrhald');
if (!sigrun) throw new Error('Sigrun is missing from arcFigures');
if (!sigrun.affiliation || !sigrun.affiliationRole) throw new Error('Sigrun arc metadata is incomplete');
const sigrunText = `${sigrun.subtitle || ''} ${sigrun.details || ''}`;
if (!/Peak Sovereign/i.test(sigrunText)) throw new Error('Sigrun strength is not recoverable from arc metadata');

console.log('Sigrun arc metadata:', { affiliation: sigrun.affiliation, role: sigrun.affiliationRole });
console.log('Reader lore resolver patched for all highlighted registry characters.');
