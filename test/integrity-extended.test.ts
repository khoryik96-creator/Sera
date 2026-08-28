import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { normalizeDatabase, colorKeyMap } from '../src/db';
import { charOrder } from '../src/characters';
import type { RawDatabase } from '../src/types';

const data = normalizeDatabase(rawData as unknown as RawDatabase);

function allEpisodes() {
  return Array.from({ length: 64 }, (_, i) => i + 1).flatMap((season) =>
    data[`season${season}` as `season${number}`].map((episode, index) => ({ season, index, episode })),
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
    for (const person of data.former) {
      expect(person.rank, person.name).toBeTruthy();
    }
  });

  it('keeps Rhen ultimate as the final archived Rhen technique', () => {
    const last = data.rhenSkills.at(-1);
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

  it('contains every season from 1 through 64 and the epilogue remains season 64', () => {
    for (let season = 1; season <= 64; season++) {
      expect(data[`season${season}` as `season${number}`].length, `season${season}`).toBeGreaterThan(0);
    }
    expect(data.season64[0]?.title.toLowerCase()).toMatch(/second spring|two years|epilogue/);
  });
});
