import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { renderNovel, nameHonorifics } from '../src/novel';
import { characterRegistry } from '../src/characterRegistry';
import type { RawDatabase } from '../src/types';

const raw = rawData as unknown as RawDatabase;

// Every registered alias (full name of a real character) and every single-word alias.
const registeredAliases = new Set<string>();
const singleWordAliases: string[] = [];
for (const entry of characterRegistry) {
  for (const alias of entry.aliases) {
    registeredAliases.add(alias);
    if (!/\s/.test(alias)) singleWordAliases.push(alias);
  }
}

function* allEpisodes(): Generator<{ season: number; text: string; where: string }> {
  for (const key of Object.keys(raw)) {
    const m = /^season(\d+)$/.exec(key);
    if (!m) continue;
    const season = Number(m[1]);
    const episodes = raw[key as `season${number}`];
    for (const ep of episodes) {
      const text = String((ep as { text?: string }).text || '').replace(/\[\[speaker:[a-z0-9_]+\]\]/g, ' ');
      yield { season, text, where: `${key} ${(ep as { ep?: string }).ep || ''}` };
    }
  }
}

// Find every "<alias> <Capitalised word>" in the prose that is NOT itself a
// registered character name — i.e. a different character who shares a surname or
// given name with one of our tracked cast (e.g. "Wei Shuang", "Han Mira").
interface Collision { alias: string; compound: string; season: number; where: string; }
function findForeignCompounds(): Collision[] {
  const found: Collision[] = [];
  const seen = new Set<string>();
  for (const { season, text, where } of allEpisodes()) {
    for (const alias of singleWordAliases) {
      const re = new RegExp('\\b' + alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b[ ]+([A-Z][a-z]+)', 'g');
      let match: RegExpExecArray | null;
      while ((match = re.exec(text)) !== null) {
        const compound = `${alias} ${match[1]}`;
        if (registeredAliases.has(compound)) continue; // a real character, handled by its own alias
        if (nameHonorifics.has(match[1])) continue; // "Rhen Teacher" etc. — the alias IS the character, addressed by title
        const dedup = `${compound}@${season}`;
        if (seen.has(dedup)) continue;
        seen.add(dedup);
        found.push({ alias, compound, season, where });
      }
    }
  }
  return found;
}

describe('name-collision safety net', () => {
  const compounds = findForeignCompounds();

  it('finds the known same-name characters (sanity check the scan works)', () => {
    const names = new Set(compounds.map((c) => c.compound));
    expect(names.has('Wei Shuang')).toBe(true);
    expect(names.has('Han Mira')).toBe(true);
  });

  it('never lets a foreign compound name inherit a tracked character\'s badge', () => {
    // If this fails, a new character was introduced whose name starts with an
    // existing alias, and the reader would stamp them with that alias-holder's
    // rank badge. Either the renderer's compound suppression missed the case, or
    // the following word needs adding to `nameHonorifics` in src/novel.ts.
    const leaks: string[] = [];
    for (const { alias, compound, season, where } of compounds) {
      const html = renderNovel(compound, season);
      const badged = new RegExp(`character-[a-z_]+">${alias}</span><span class="rank-badge`).test(html)
        || new RegExp(`character-[a-z_]+">${alias}</span>`).test(html);
      if (badged) leaks.push(`${compound} (${where}, s${season}) tagged as the "${alias}" character`);
    }
    expect(leaks, `Foreign compound names mis-tagged:\n${leaks.join('\n')}`).toEqual([]);
  });
});
