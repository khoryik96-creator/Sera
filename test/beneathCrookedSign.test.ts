import { describe, expect, it } from 'vitest';
import rawData from '../src/data.json';
import type { Episode, RawDatabase } from '../src/types';

const raw = rawData as unknown as RawDatabase;
const continuation = Array.from({ length: 10 }, (_, index) => raw[`season${index + 65}` as `season${number}`] as Episode[]);
const chapters = continuation.flat();
const prose = chapters.map((chapter) => chapter.text).join('\n');

describe('Beneath the Crooked Sign complete first draft', () => {
  it('contains ten ten-chapter seasons in outline order', () => {
    expect(continuation.map((season) => season.length)).toEqual([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    expect(chapters.map((chapter) => chapter.ep)).toEqual(
      Array.from({ length: 100 }, (_, index) => `Chapter ${index + 1}`),
    );
    expect(chapters[0]?.title).toBe('The Sign Is Still Crooked');
    expect(chapters[99]?.title).toBe('The Last Cup Before North');
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

  it('acknowledges locked thresholds without activating them or beginning the Isgard rescue', () => {
    expect(prose.match(/Petals Beneath a Frozen Moon/g)).toHaveLength(1);
    expect(raw.season73[0]?.text).toContain('did not explain or demonstrate the Ultimate');
    expect(prose.match(/Orchid Dominion/g)).toHaveLength(1);
    expect(raw.season73[8]?.text).toContain('No Domain formed');
    expect(prose).not.toContain('Isgard');
    expect(raw.season74[9]?.text).toContain('The arc ended before she spoke');
  });

  it('preserves Sera’s leadership and withdrawal choice through the cliffhanger', () => {
    expect(raw.season71[8]?.text).toContain('Only Sera could authorize lethal force');
    expect(raw.season74[0]?.text).toContain('Withdraw Frozen Petals Garden from me');
    expect(raw.season74[1]?.text).toContain('remained ageless');
    expect(raw.season74[9]?.text).toContain('He did not answer for her');
  });

  it('preserves the two existing long chapters without requiring later chapters to match them', () => {
    expect(raw.season65[0]?.text.trim().split(/\s+/)).toHaveLength(4500);
    expect(raw.season65[1]?.text.trim().split(/\s+/).length).toBeGreaterThanOrEqual(4500);

    const selectivelyExpanded = chapters.slice(2);
    expect(selectivelyExpanded.every((chapter) => chapter.text.trim().split(/\s+/).length <= 2800)).toBe(true);

    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    chapters.forEach((chapter, chapterIndex) => {
      chapter.text.split(/\n\n+/).map((paragraph) => paragraph.replace(/\s+/g, ' ').trim()).filter((paragraph) => paragraph.length >= 120).forEach((paragraph) => {
        const key = paragraph.toLowerCase();
        const location = `Chapter ${chapterIndex + 1}`;
        if (seen.has(key)) duplicates.push(`${seen.get(key)} / ${location}: ${paragraph.slice(0, 80)}`);
        else seen.set(key, location);
      });
    });
    expect(duplicates).toEqual([]);
  });
});
