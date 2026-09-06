import { describe, expect, it } from 'vitest';
import season112 from '../src/generated/season-112.json';
import season109 from '../src/generated/season-109.json';
import season114 from '../src/generated/season-114.json';

// A quote paragraph that carries its own attribution outside the quotation
// marks states its speaker outright, so the auto-tagger must use it rather than
// guessing from neighbouring paragraphs. Regression for lines such as
// `“No,” Eirik said. “I am surprised.”` being tagged as Tsubasa.
function tagFor(episodes: { ep: string; text: string }[], chapter: string, quote: string): string | null {
  const episode = episodes.find((item) => item.ep === chapter);
  if (!episode) return null;
  const paragraph = episode.text.split(/\n{2,}/).find((block) => block.includes(quote));
  return /^\[\[speaker:([a-z0-9_]+)\]\]/.exec(paragraph?.trim() || '')?.[1] ?? null;
}

describe('final-arc speaker attribution', () => {
  it('uses an attribution stated outside the quotes', () => {
    expect(tagFor(season112, 'Chapter 471', '“No,” Eirik said.')).toBe('eirik');
    expect(tagFor(season109, 'Chapter 443', '“Fast,” Huo said.')).toBe('huo');
    expect(tagFor(season109, 'Chapter 443', '“Two of them,” Rhen said.')).toBe('rhen');
    expect(tagFor(season114, 'Chapter 492', '“The lesson,” Tsubasa said slowly')).toBe('tsubasa');
  });

  it('ignores a name reported inside the quoted speech', () => {
    // “Rui said you saved six witnesses…” is someone talking *about* Rui.
    const episode = season112.find((item) => item.ep === 'Chapter 472');
    expect(episode).toBeTruthy();
    for (const block of (episode?.text || '').split(/\n{2,}/)) {
      const match = /^\[\[speaker:([a-z0-9_]+)\]\](“.*)$/s.exec(block.trim());
      if (!match) continue;
      const inner = match[2];
      // A tag must never come from an alias that only appears inside the quote.
      if (/^“[^”]*\bNao said\b/.test(inner)) expect(match[1]).not.toBe('nao');
    }
  });
});
