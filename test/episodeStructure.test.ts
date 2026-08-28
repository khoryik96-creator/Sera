import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { extractEpisodeStructure } from '../src/episodeStructure';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const dom = new JSDOM(html);
const root = dom.window.document.getElementById('episodes') as HTMLElement;
const structure = extractEpisodeStructure(root);
const seasons = structure.flatMap((arc) => arc.seasons);

describe('episode archive metadata', () => {
  it('captures every season exactly once', () => {
    expect(seasons.map((s) => s.season)).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
  });

  it('preserves the Season 1 lock and final epilogue heading', () => {
    expect(seasons.find((s) => s.season === 1)?.badge).toMatch(/LOCKED/);
    expect(seasons.find((s) => s.season === 64)?.title).toMatch(/Epilogue: Two Years Later/);
  });

  it('preserves arc grouping instead of flattening the story', () => {
    expect(structure.length).toBeGreaterThan(8);
    expect(structure[0].title).toMatch(/Quiet Regular/);
    expect(structure.at(-1)?.title).toMatch(/Second Spring/);
  });
});
