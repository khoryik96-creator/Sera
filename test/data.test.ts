import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { characterImageMap } from '../src/images';
import { normalizeDatabase } from '../src/db';
import { TOTAL_SEASONS } from '../src/episodeMeta';
import type { RawDatabase } from '../src/types';

const raw = rawData as unknown as RawDatabase;
const data = normalizeDatabase(raw);

describe('data integrity', () => {
  it('has every canonical season as a non-empty array', () => {
    for (let season = 1; season <= TOTAL_SEASONS; season++) {
      const episodes = raw[`season${season}` as `season${number}`];
      expect(Array.isArray(episodes), `season${season}`).toBe(true);
      expect(episodes.length, `season${season}`).toBeGreaterThan(0);
    }
  });

  it('every character record has a name', () => {
    for (const [key, character] of Object.entries(data.characters)) expect(character.name, key).toBeTruthy();
  });

  it('gives every dashboard character a cultivation tier, affiliation and internal standing', () => {
    for (const [key, character] of Object.entries(data.characters)) {
      expect(character.cultivation, `${key} cultivation`).toBeTruthy();
      expect(character.affiliation, `${key} affiliation`).toBeTruthy();
      expect(character.affiliationRole, `${key} affiliationRole`).toBeTruthy();
    }
  });

  it('gives every arc figure an affiliation and internal standing', () => {
    for (const figure of data.arcFigures) {
      expect(figure.affiliation, `${figure.key} affiliation`).toBeTruthy();
      expect(figure.affiliationRole, `${figure.key} affiliationRole`).toBeTruthy();
    }
  });

  it('every portrait key maps to a real character', () => {
    for (const key of Object.keys(characterImageMap)) expect(data.characters[key], key).toBeDefined();
  });

  it('normalizes ranking rows into named objects', () => {
    for (const rank of data.ranks) {
      expect(rank.rank).toBeTruthy();
      expect(rank.name).toBeTruthy();
      expect(rank.className).toBeTypeOf('string');
      expect(rank.description).toBeTypeOf('string');
    }
  });

  it('normalizes signature-art rows into named objects', () => {
    for (const rows of Object.values(data.topSkills)) {
      for (const row of rows) {
        expect(row.name).toBeTruthy();
        expect(row.category).toBeTypeOf('string');
        expect(row.signature).toBeTypeOf('string');
        expect(row.rating).toBeTypeOf('string');
        expect(row.description).toBeTypeOf('string');
      }
    }
  });

  it('preserves the Isgard escalation chain and the shared home-power reveal', () => {
    const chapter = (season: number, ep: number) => {
      const episodes = raw[`season${season}` as `season${number}`];
      const match = episodes.find((episode) => episode.ep === `Chapter ${ep}`);
      expect(match, `season${season} chapter ${ep}`).toBeDefined();
      return match!.text;
    };

    const escalation = [chapter(84, 196), chapter(84, 197), chapter(84, 198), chapter(84, 200)].join('\n');
    expect(escalation).toContain('Tor’s road remained open');
    expect(escalation).toContain('Wuyue’s counteroffer remained on the table');
    expect(escalation).toContain('Maedra refused Eirholt as neutral arbiter');
    expect(escalation).not.toContain('Maedra refused any Hearth court');
    expect(escalation).toContain('They did not agree why they were coming.');

    const survivalCipher = chapter(89, 248);
    expect(survivalCipher).toContain('**WUYUE STILL STANDS.**');
    expect(survivalCipher).not.toContain('THREE PEAKS REMAIN');
    expect(survivalCipher).not.toContain('self-sustaining Peak foundations');

    const reveal = chapter(94, 291);
    expect(reveal).toContain('[[speaker:kael]]“You did not know?”');
    expect(reveal).toContain('[[speaker:rhen]]“Protection is not surveillance.”');
    expect(reveal).toContain('Second Inner Petal');
    expect(reveal).toContain('Second Offensive General under conditional custody');

    const ruiRescue = [chapter(78, 139), chapter(79, 141), chapter(79, 143)].join('\n');
    expect(ruiRescue).toContain('help had been dispatched');
    expect(ruiRescue).toContain('Why is he coming?');
    expect(ruiRescue).toContain('That realization frightened Rui almost as much as the nine Wheels.');
  });
});
