import { describe, it, expect } from 'vitest';
import { renderNovel, rankForStory } from '../src/novel';

describe('rankForStory', () => {
  it('returns the static rank when no season is given', () => {
    expect(rankForStory('Kael')).toBe('#1');
    expect(rankForStory('Sera')).toBe('Former #6');
  });

  it('applies season-based ranks for Sera', () => {
    expect(rankForStory('Sera', 10)).toBe('#7');
    expect(rankForStory('Sera', 30)).toBe('#6');
    expect(rankForStory('Sera', 60)).toBe('Former #6');
  });

  it('reveals Ilyra only from season 44', () => {
    expect(rankForStory('Ilyra', 40)).toBe('');
    expect(rankForStory('Ilyra', 44)).toBe('#6');
  });

  it('keeps ancient-king ranks regardless of season', () => {
    expect(rankForStory('Amon Serath', 5)).toBe('I');
    expect(rankForStory('Aethon', 60)).toBe('OL');
  });
});

describe('renderNovel', () => {
  it('colours dialogue by speaker', () => {
    const out = renderNovel('[[speaker:sera]]Hello there.');
    expect(out).toContain('novel-dialogue character-sera');
    expect(out).toContain('Hello there.');
  });

  it('labels dialogue with the speaker name', () => {
    const out = renderNovel('[[speaker:han]]“One person?”');
    expect(out).toContain('novel-speaker');
    expect(out).toContain('Han Myeong');
  });

  it('marks supreme arts', () => {
    const out = renderNovel('SUPREME ART — Frozen Bloom');
    expect(out).toContain('novel-skill-supreme');
    expect(out).toContain('Frozen Bloom');
  });

  it('annotates a known character name with its rank', () => {
    const out = renderNovel('Kael arrived at dawn.');
    expect(out).toContain('novel-character-name character-kael');
    expect(out).toContain('#1 - Kael');
  });
});
