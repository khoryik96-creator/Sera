import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { powerTier, powerTierFromRating } from '../src/react/shared/skillTier';
import type { RawDatabase } from '../src/types';

const data = rawData as unknown as RawDatabase;

// Which ladder tier a label belongs to, for the "no contradiction" property.
function ladder(label: string | undefined): string | undefined {
  const value = (label || '').toLowerCase();
  if (value.includes('ultimate')) return 'ultimate';
  if (value.includes('supreme')) return 'supreme';
  if (value.includes('transcended')) return 'transcended';
  if (value.includes('named')) return 'named';
  return undefined;
}

describe('powerTierFromRating', () => {
  it('maps each rating to Sera’s tier vocabulary', () => {
    expect(powerTierFromRating('★★★★☆')).toBe('Named Technique');
    expect(powerTierFromRating('★★★★★')).toBe('Transcended Skill');
    expect(powerTierFromRating('★★★★★+')).toBe('Evolved Supreme Art');
    expect(powerTierFromRating('SUPREME')).toBe('Supreme Art');
    expect(powerTierFromRating('TRANSCENDED')).toBe('Transcended Art');
  });

  it('prefers the strongest rating token (★★★★★+ over ★★★★★)', () => {
    expect(powerTierFromRating('★★★★★+')).toBe('Evolved Supreme Art');
    expect(powerTierFromRating('★★★★★')).not.toBe('Evolved Supreme Art');
  });

  it('is case-insensitive for word ratings', () => {
    expect(powerTierFromRating('supreme')).toBe('Supreme Art');
    expect(powerTierFromRating('Transcended')).toBe('Transcended Art');
  });

  it('returns undefined for empty or unknown ratings', () => {
    expect(powerTierFromRating('')).toBeUndefined();
    expect(powerTierFromRating(undefined)).toBeUndefined();
    expect(powerTierFromRating('★★★')).toBeUndefined();
    expect(powerTierFromRating('mythic')).toBeUndefined();
  });
});

describe('powerTier (category-aware)', () => {
  it('lets a tier word in the category win over the rating', () => {
    // A ★★★★★+ art the data calls "Transcended Art" must not read "Evolved Supreme".
    expect(powerTier('Transcended Art', '★★★★★+')).toBe('Transcended Art');
    expect(powerTier('Supreme Defense', '★★★★★+')).toBe('Supreme Art');
    expect(powerTier('Ultimate', '★★★★★')).toBe('Ultimate Art');
  });

  it('falls back to the rating when the category names no tier', () => {
    expect(powerTier('Heavy Offense', '★★★★★')).toBe('Transcended Skill');
    expect(powerTier('Movement', '★★★★☆')).toBe('Named Technique');
    expect(powerTier('Counter', 'SUPREME')).toBe('Supreme Art');
  });

  it('returns undefined when neither category nor rating carries a tier', () => {
    expect(powerTier('Counter', '★★★')).toBeUndefined();
    expect(powerTier(undefined, undefined)).toBeUndefined();
  });
});

describe('powerTier over real data', () => {
  it('labels every ranked skill in the database', () => {
    for (const [key, rows] of Object.entries(data.topSkills)) {
      for (const skill of rows) {
        expect(powerTier(skill.category, skill.rating), `${key}: ${skill.name}`).toBeTruthy();
      }
    }
  });

  it('never contradicts the tier word a skill’s own category states', () => {
    for (const [key, rows] of Object.entries(data.topSkills)) {
      for (const skill of rows) {
        const fromCategory = ladder(skill.category);
        const badge = ladder(powerTier(skill.category, skill.rating));
        if (fromCategory && badge) {
          expect(badge, `${key}: ${skill.name} (${skill.category})`).toBe(fromCategory);
        }
      }
    }
  });
});
