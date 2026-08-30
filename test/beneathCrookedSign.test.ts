import { describe, expect, it } from 'vitest';
import rawData from '../src/data.json';
import type { Episode, RawDatabase } from '../src/types';

const raw = rawData as unknown as RawDatabase;
const continuation = Array.from({ length: 5 }, (_, index) => raw[`season${index + 65}` as `season${number}`] as Episode[]);
const chapters = continuation.flat();
const prose = chapters.map((chapter) => chapter.text).join('\n');

describe('Beneath the Crooked Sign first-half draft', () => {
  it('contains five ten-chapter seasons in outline order', () => {
    expect(continuation.map((season) => season.length)).toEqual([10, 10, 10, 10, 10]);
    expect(chapters.map((chapter) => chapter.ep)).toEqual(
      Array.from({ length: 50 }, (_, index) => `Chapter ${index + 1}`),
    );
    expect(chapters[0]?.title).toBe('The Sign Is Still Crooked');
    expect(chapters[49]?.title).toBe('The Upper Room');
  });

  it('preserves Qin Luo canon and treats congenital blindness as identity, not damage', () => {
    expect(raw.season65[6]?.text).toContain('Qin Luo');
    expect(raw.season65[7]?.text).toContain('Congenitally blind');
    expect(raw.season65[8]?.text).toContain('You never needed it');
    expect(raw.season65[8]?.text).not.toMatch(/cured? (?:his )?blindness/i);
  });

  it('keeps Sera in command and Rhen in the medical role', () => {
    expect(raw.season68[5]?.text).toContain('medical veto');
    expect(raw.season68[7]?.text).toContain('Sera held the First Inner Petal');
    expect(raw.season68[7]?.text).toContain('Rhen received the Hidden Petal');
  });

  it('does not reveal future-locked endgame techniques or begin Isgard', () => {
    expect(prose).not.toContain('Petals Beneath a Frozen Moon');
    expect(prose).not.toContain('Orchid Dominion');
    expect(prose).not.toContain('Isgard');
  });
});
