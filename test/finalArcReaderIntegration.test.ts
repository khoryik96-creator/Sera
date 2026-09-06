import { describe, expect, it } from 'vitest';
import season95 from '../src/generated/season-95.json';
import season100 from '../src/generated/season-100.json';
import season108 from '../src/generated/season-108.json';
import season109 from '../src/generated/season-109.json';
import season114 from '../src/generated/season-114.json';
import searchIndex from '../src/generated/search-index.json';
import { TOTAL_CHAPTERS, TOTAL_SEASONS } from '../src/episodeMeta';

describe('final arc reader integration', () => {
  it('extends the archive through Season 114 and 500 total chapters', () => {
    expect(TOTAL_SEASONS).toBe(114);
    expect(TOTAL_CHAPTERS).toBe(500);
  });

  it('generates all 200 final-arc chapters in ten-chapter seasons', () => {
    const finalEpisodes = searchIndex.episodes.filter((episode) => episode.season >= 95 && episode.season <= 114);
    expect(finalEpisodes).toHaveLength(200);
    for (let season = 95; season <= 114; season++) {
      expect(finalEpisodes.filter((episode) => episode.season === season), `season${season}`).toHaveLength(10);
    }
  });

  it('starts Phase I at Chapter 301 and keeps Yun alive through her final season', () => {
    expect(season95[0].ep).toBe('Chapter 301');
    expect(season95[0].title).toBe('Two Years Beneath the Crooked Sign');
    expect(season100[5].ep).toBe('Chapter 356');
    expect(season100[5].text).toContain('Yun');
  });

  it('preserves the exact Phase II to Phase III wake-up seam', () => {
    expect(season108[9].ep).toBe('Chapter 440');
    expect(season108[9].text.trim().endsWith('“How long?”')).toBe(true);
    expect(season109[0].ep).toBe('Chapter 441');
    expect(season109[0].text.trim().startsWith('“Six months.”')).toBe(true);
  });

  it('does not leak source headings or writer handoff notes into reader prose', () => {
    for (const episode of [...season95, ...season108, ...season109, ...season114]) {
      expect(episode.text).not.toMatch(/^##?\s/m);
      expect(episode.text).not.toContain('Reader integration note');
      expect(episode.text).not.toContain('Chapter 441 begins with');
    }
  });

  it('adds dialogue-card hints while preserving unambiguous prose', () => {
    const sample = [...season95, ...season108, ...season109].map((episode) => episode.text).join('\n');
    expect(sample).toMatch(/\[\[speaker:(?:sera|rhen|jin|luweiran|tae|huo|qin)\]\]/);
  });

  it('ends the story at Chapter 500 with the locked private final line', () => {
    expect(season114[9].ep).toBe('Chapter 500');
    expect(season114[9].text).toContain('I want my minis.');
  });
});
