import { describe, it, expect, beforeAll } from 'vitest';
import data from '../src/data.json';
import { setDB } from '../src/db';
import { renderNovel, rankForStory, artLore } from '../src/novel';
import type { RawDatabase } from '../src/types';

beforeAll(() => setDB(data as unknown as RawDatabase));

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

  it('renders **bold** markdown as real bold without leaving asterisks', () => {
    const out = renderNovel('His evolved **Boundless Horizon** held the line.');
    expect(out).toContain('<strong>');
    expect(out).not.toContain('**');
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

  it('tags the bare alias "Han" as Han Myeong through the epilogue', () => {
    const out = renderNovel('Han carried the furnace gauntlets.', 8);
    expect(out).toContain('character-han">Han</span>');
    expect(out).toContain('rank-badge');
  });

  it('does not tag the bare "Han" as Han Myeong in Beneath the Crooked Sign seasons', () => {
    // Season 65+ introduce the living apprentice Han Mira; her surname must not
    // inherit the deceased Former #8 Han Myeong's badge.
    const out = renderNovel('Han Mira arrived first. Han reached the bandages.', 65);
    expect(out).not.toContain('rank-badge');
    expect(out).not.toContain('character-han">Han</span>');
    expect(out).toContain('Han Mira arrived first.');
  });

  it('still tags the full name Han Myeong even after the epilogue', () => {
    const out = renderNovel('They remembered Han Myeong.', 65);
    expect(out).toContain('character-han">Han Myeong</span>');
  });

  it('tags the bare alias "Wei" as Wei Zhen through the epilogue', () => {
    const out = renderNovel('Wei listened, then smiled.', 12);
    expect(out).toContain('character-wei">Wei</span>');
    expect(out).toContain('rank-badge');
  });

  it('does not tag the bare "Wei" as Wei Zhen in Beneath the Crooked Sign seasons', () => {
    // Season 65+ introduce the physician Wei An; his surname must not inherit
    // the Former #5 Wei Zhen's badge.
    const out = renderNovel('A physician named Wei An was arrested.', 65);
    expect(out).not.toContain('rank-badge');
    expect(out).not.toContain('character-wei">Wei</span>');
    expect(out).toContain('Wei An');
  });

  it('styles an art whose name has an apostrophe, matching typographic quotes', () => {
    // The skill data stores a straight apostrophe; the prose uses a curly one.
    const out = renderNovel('Kael anchored the road with Sovereign’s March.', 70);
    expect(out).toContain('novel-art');
    expect(out).toContain('Sovereign’s March');
  });

  it('renders a named art as a clickable button only when interactiveNames is on', () => {
    const text = 'Kael anchored the road with Sovereign’s March.';
    const plain = renderNovel(text, 70);
    expect(plain).toContain('<span class="novel-art');
    expect(plain).not.toContain('data-art-name');

    const interactive = renderNovel(text, 70, { interactiveNames: true });
    expect(interactive).toContain('novel-art-link');
    expect(interactive).toContain("data-art-name=\"Sovereign's March\"");
    expect(interactive).toContain('Sovereign’s March');
  });

  it('exposes a tier, type and short blurb for a named art through artLore', () => {
    const info = artLore("Sovereign's March");
    expect(info).toBeDefined();
    expect(info?.label.length).toBeGreaterThan(0);
    expect(info?.blurb.length).toBeGreaterThan(0);
    expect(artLore('not a real art')).toBeUndefined();
  });

  it('colours the bare alias "Huo" as Huo Wujin', () => {
    const out = renderNovel('Tae and Huo trained the recruits.', 70);
    expect(out).toContain('character-huo">Huo</span>');
  });

  it('tags the bare alias "Tor" as rank-IV Tor Veydan through the pre-Isgard seasons', () => {
    const out = renderNovel('Tor advanced without a word.', 60);
    expect(out).toContain('character-tor">Tor</span>');
    expect(out).toContain('rank-badge rank-badge--current">IV</span>');
  });

  it('hands the bare alias "Tor" to Tor Veyrhald, with no rank badge, from the Isgard seasons', () => {
    // Seasons 75+ reuse the bare given name "Tor" for the Isgard commander Tor
    // Veyrhald; he sits outside the numeric world ranking, so he must not inherit
    // Tor Veydan's rank IV badge or colour.
    const out = renderNovel('Tor watched the basin fill.', 78);
    expect(out).toContain('character-tor_veyrhald">Tor</span>');
    expect(out).not.toContain('character-tor">Tor</span>');
    expect(out).not.toContain('rank-badge');
  });

  it('still tags the full name Tor Veydan even in the Isgard seasons', () => {
    const out = renderNovel('The archive remembered Tor Veydan.', 80);
    expect(out).toContain('character-tor">Tor Veydan</span>');
    expect(out).toContain('rank-badge');
  });

  it('colours dialogue for a new Isgard speaker', () => {
    const out = renderNovel('[[speaker:mareth]]The banners answer to no water.', 80);
    expect(out).toContain('character-mareth');
    expect(out).toContain('Mareth Duskvein');
  });

  it('colours dialogue for the Southern Isgard Paragons without a rank badge', () => {
    const aldric = renderNovel('[[speaker:aldric]]The Ledger does not forgive an unanswered Guild.', 90);
    expect(aldric).toContain('character-aldric');
    expect(aldric).toContain('Aldric Veyrhald');
    const maedra = renderNovel('[[speaker:maedra]]Every wound is a road.', 90);
    expect(maedra).toContain('character-maedra');
    expect(maedra).toContain('Maedra Dravaryn');
  });

  it('highlights the bare Paragon given names as their own characters, not by surname', () => {
    const out = renderNovel('Aldric held the line while Maedra opened the Red Miles.', 90);
    expect(out).toContain('character-aldric">Aldric</span>');
    expect(out).toContain('character-maedra">Maedra</span>');
    // Paragon sits above the numeric world ranking, so no rank pill.
    expect(out).not.toContain('rank-badge');
  });
});
