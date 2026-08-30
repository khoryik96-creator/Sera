import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { characterRegistry, colorKeyItems } from '../src/characterRegistry';
import { characterImageMap, characterExtraImages } from '../src/images';
import type { RawDatabase } from '../src/types';

const data = rawData as unknown as RawDatabase;
const characterKeys = Object.keys(data.characters);

// The React app colours a character's name with `className={`character-${key}`}`,
// which resolves to `.character-<key>{color:var(--char-<colorKey>)}` in this
// stylesheet. These tests enforce that contract so a character can never be
// added (as Huo Wujin was) without its colour wiring — the drift the manual
// duplication used to allow.
const globalCss = readFileSync(resolve(process.cwd(), 'src/react/styles/global.css'), 'utf8');

const definedClasses = new Set([...globalCss.matchAll(/\.character-([a-z_]+)\b/g)].map((m) => m[1]));
const definedVars = new Set([...globalCss.matchAll(/--char-([a-z_]+)\s*:/g)].map((m) => m[1]));
const referencedVars = new Set([...globalCss.matchAll(/var\(--char-([a-z_]+)\)/g)].map((m) => m[1]));

describe('character registry / data / stylesheet consistency', () => {
  it('has no duplicate registry keys', () => {
    const seen = new Set<string>();
    for (const entry of characterRegistry) {
      expect(seen.has(entry.key), `duplicate registry key: ${entry.key}`).toBe(false);
      seen.add(entry.key);
    }
  });

  it('gives every profiled character a .character-<key> colour class', () => {
    for (const key of characterKeys) {
      expect(definedClasses.has(key), `missing .character-${key} in global.css`).toBe(true);
    }
  });

  it('backs every --char-* colour reference with a definition', () => {
    for (const name of referencedVars) {
      expect(definedVars.has(name), `.character rule references undefined --char-${name}`).toBe(true);
    }
  });

  it('defines the --char-<colorKey> variable each registry entry points at', () => {
    // `former` is a shared grouping colour for historical figures (Jian Ruo,
    // Xu Weng, …) who are not profiled characters; it intentionally has no
    // dedicated swatch and falls back to the base text colour.
    const sharedGroupingKeys = new Set(['former']);
    for (const entry of characterRegistry) {
      if (sharedGroupingKeys.has(entry.colorKey)) continue;
      expect(definedVars.has(entry.colorKey), `${entry.key} → undefined --char-${entry.colorKey}`).toBe(true);
    }
  });

  it('only lists real characters in the colour key legend', () => {
    const registryKeys = new Set(characterRegistry.map((entry) => entry.key));
    for (const [key] of colorKeyItems) {
      expect(registryKeys.has(key), `colour key legend references unknown character: ${key}`).toBe(true);
    }
  });

  it('maps every portrait (main and gallery) to a real character', () => {
    for (const key of Object.keys(characterImageMap)) expect(data.characters[key], key).toBeDefined();
    for (const key of Object.keys(characterExtraImages)) expect(data.characters[key], key).toBeDefined();
  });

  it('maps every top-skill roster to a real character', () => {
    for (const key of Object.keys(data.topSkills)) expect(data.characters[key], key).toBeDefined();
  });
});
