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
    expect(out).toContain('novel-dialogue');
    expect(out).toContain('character-sera');
    expect(out).toContain('Hello there.');
  });

  it('renders dialogue as a card with the speaker name and quote', () => {
    const out = renderNovel('[[speaker:han]]“One person?”');
    expect(out).toContain('dialogue-card');
    expect(out).toContain('dialogue-speaker');
    expect(out).toContain('Han Myeong');
    expect(out).toContain('dialogue-quote');
  });

  it('marks supreme arts', () => {
    const out = renderNovel('SUPREME ART — Frozen Bloom');
    expect(out).toContain('novel-skill-supreme');
    expect(out).toContain('Frozen Bloom');
  });

  it('annotates a known character name with a separate rank pill', () => {
    const out = renderNovel('Kael arrived at dawn.');
    expect(out).toContain('novel-character-name character-kael');
    expect(out).toContain('rank-badge rank-badge--current">#1</span>');
    expect(out).not.toContain('#1 - Kael');
  });

  it('keeps ordinary render contexts non-interactive by default', () => {
    const out = renderNovel('Sera spoke.\n[[speaker:rhen]]Tea?');
    expect(out).not.toContain('novel-lore-link');
    expect(out).not.toContain('data-character-key');
  });

  it('adds accessible character hooks only for the focused reader', () => {
    const out = renderNovel('Sera spoke.\n[[speaker:rhen]]Tea?', 10, { interactiveNames: true });
    expect(out).toContain('novel-lore-link');
    expect(out).toContain('data-character-key="sera"');
    expect(out).toContain('aria-label="Open lore for Sera"');
    expect(out).toContain('data-character-key="rhen"');
    expect(out).toContain('aria-label="Open lore for Rhen"');
  });

  it('replaces legacy inline rank text instead of duplicating it', () => {
    const out = renderNovel('#1 - Kael arrived beside Former #6 - Sera.', 60);
    expect(out).not.toContain('#1 - Kael');
    expect(out).not.toContain('Former #6 - Sera');
    expect(out).toContain('character-kael">Kael</span><span class="rank-badge rank-badge--current">#1</span>');
    expect(out).toContain('rank-badge rank-badge--former">#6 <span class="rank-badge__state">FORMER</span>');
  });

  it('uses Lucy-style deceased and retired indicators after succession', () => {
    const out = renderNovel('Han Myeong stood in memory beside Qin Luo.', 30);
    expect(out).toContain('character-han">Han Myeong</span><span class="rank-badge rank-badge--deceased">#8 †</span>');
    expect(out).toContain('character-qin">Qin Luo</span><span class="rank-badge rank-badge--retired">#6 <span class="rank-badge__state">RET</span>');
  });

  it('keeps Han and Qin active before the succession arc', () => {
    const out = renderNovel('Han Myeong and Qin Luo arrived.', 20);
    expect(out).toContain('rank-badge rank-badge--current">#8</span>');
    expect(out).toContain('rank-badge rank-badge--current">#6</span>');
    expect(out).not.toContain('rank-badge--deceased');
    expect(out).not.toContain('rank-badge--retired');
  });
});
