import { describe, expect, it } from 'vitest';
import { artLore, renderNovel } from '../src/novel';
import { setDB, DB } from '../src/db';
import core from '../src/generated/core.json';
import season112 from '../src/generated/season-112.json';
import { characterRegistry } from '../src/characterRegistry';
import { cleanCharacterName } from '../src/react/shared/rankState';
import { shinrinParagons } from '../src/react/features/shinrin/shinrinData';
import type { RawCoreDatabase } from '../src/types';

setDB(core as unknown as RawCoreDatabase);

// The Shinsei roster is authored in shinrinData.ts rather than data.json. Until
// it was wired into the renderer, every Shinsei art in the final arc rendered as
// plain text and every Shinsei name opened a card of generic placeholders.
describe('final-arc highlighting and click-through', () => {
  it('knows every Shinsei art, so they style and open a mini-card', () => {
    const shinseiArts = shinrinParagons.flatMap((figure) => (figure.skills || []).map((skill) => skill[0]));
    expect(shinseiArts.length).toBeGreaterThan(30);
    for (const name of shinseiArts) {
      const lore = artLore(name);
      expect(lore, `artLore("${name}")`).toBeTruthy();
      expect(lore?.blurb.trim(), `blurb for "${name}"`).toBeTruthy();
    }
  });

  it('styles Tsubasa’s apex arts as clickable links in the prose', () => {
    const text = season112.map((episode) => episode.text).join('\n');
    const html = renderNovel(text, 112, { interactiveNames: true });
    for (const art of ['One Chain Binds Heaven', 'Heaven Returns What It Receives', 'Tethered Heaven Dominion']) {
      expect(html, art).toContain(`data-art-name="${art}"`);
    }
  });

  it('resolves every highlighted final-arc name to a real record, not placeholders', () => {
    const html = renderNovel(season112.map((episode) => episode.text).join('\n'), 112, { interactiveNames: true });
    const keys = new Set([...html.matchAll(/data-character-key="([^"]+)"/g)].map((match) => match[1]));
    expect(keys.size).toBeGreaterThan(5);
    for (const key of keys) {
      const entry = characterRegistry.find((item) => item.key === key);
      expect(entry, `registry entry for "${key}"`).toBeTruthy();
      const profile = DB.characters[key]
        || Object.values(DB.characters).find((character) => cleanCharacterName(character.name) === entry?.displayName);
      const arcFigure = DB.arcFigures.find((figure) => figure.key === key || cleanCharacterName(figure.name) === entry?.displayName)
        || shinrinParagons.find((figure) => figure.key === key || cleanCharacterName(figure.name) === entry?.displayName);
      const former = DB.former.find((item) => cleanCharacterName(item.name) === entry?.displayName);
      const inCast = Object.values(DB.seasonCast || {}).some((rows) => rows.some((row) => cleanCharacterName(row.name) === entry?.displayName));
      expect(Boolean(profile || arcFigure || former || inCast), `lore source for "${key}"`).toBe(true);
    }
  });

  it('reaches Luo Wen’s profile despite the registry/profile key difference', () => {
    // Registry key is "luo"; the data.json profile key is "wen".
    expect(DB.characters.luo).toBeUndefined();
    const entry = characterRegistry.find((item) => item.key === 'luo');
    const resolved = Object.keys(DB.characters).find((key) => cleanCharacterName(DB.characters[key].name) === entry?.displayName);
    expect(resolved).toBe('wen');
    expect(DB.characters[resolved!].cultivation).toBe('Newly Sovereign');
  });
});
