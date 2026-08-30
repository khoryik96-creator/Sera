import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { normalizeDatabase, colorKeyMap } from '../src/db';
import { charOrder } from '../src/characters';
import type { RawDatabase } from '../src/types';

const raw = rawData as unknown as RawDatabase;
const data = normalizeDatabase(raw);

function allEpisodes() {
  return Array.from({ length: 74 }, (_, index) => index + 1).flatMap((season) =>
    raw[`season${season}` as `season${number}`].map((episode, index) => ({ season, index, episode })),
  );
}

describe('extended canon integrity', () => {
  it('keeps numeric/former rank identity on every core ranked character except Rhen', () => {
    for (const key of charOrder) {
      const character = data.characters[key];
      if (key === 'rhen') {
        expect(character.name).not.toMatch(/#\d+/);
        continue;
      }
      expect(character.name, key).toMatch(/^(Former\s+)?#\d+/);
    }
  });

  it('keeps former-holder rank metadata wherever a historical figure was ranked', () => {
    for (const person of data.former) expect(person.rank, person.name).toBeTruthy();
  });

  it('keeps Rhen ultimate as the final archived Rhen technique', () => {
    const last = data.rhenSkills[data.rhenSkills.length - 1];
    expect(last?.name).toBe('Petals Beneath a Frozen Moon');
    expect(last?.tier?.toLowerCase()).toContain('ultimate');
  });

  it('has no exact duplicated long episode prose blocks', () => {
    const seen = new Map<string, string>();
    for (const { season, index, episode } of allEpisodes()) {
      const normalized = episode.text.replace(/\s+/g, ' ').trim();
      if (normalized.length < 200) continue;
      const where = `S${season}E${index + 1} ${episode.title}`;
      expect(seen.get(normalized), `duplicate prose: ${where}`).toBeUndefined();
      seen.set(normalized, where);
    }
  });

  it('maps every explicit speaker tag to a known colour key', () => {
    const unknown = new Set<string>();
    for (const { episode } of allEpisodes()) {
      for (const match of episode.text.matchAll(/\[\[speaker:([^\]]+)\]\]/gi)) {
        const key = match[1].trim().toLowerCase();
        if (!colorKeyMap[key]) unknown.add(key);
      }
    }
    expect([...unknown]).toEqual([]);
  });

  it('contains every season from 1 through 74 while preserving the Season 64 epilogue', () => {
    for (let season = 1; season <= 74; season++) {
      expect(raw[`season${season}` as `season${number}`].length, `season${season}`).toBeGreaterThan(0);
    }
    expect(raw.season64[0]?.title.toLowerCase()).toMatch(/second spring|two years|epilogue/);
    expect(raw.season65[0]?.title.toLowerCase()).toMatch(/sign is still crooked/);
  });
});
