import { describe, expect, it } from 'vitest';
import rawData from '../src/data.json';
import type { Episode, RawDatabase } from '../src/types';

const raw = rawData as unknown as RawDatabase;
const warArc = Array.from({ length: 10 }, (_, index) =>
  raw[`season${index + 85}` as `season${number}`] as Episode[],
).flat();
const prose = warArc.map((chapter) => chapter.text).join('\n');

const retiredRhenSkillNames = [
  'Spring After Snow',
  "Heaven's Return",
  'Heaven’s Return',
  'Silent Winter',
  'Invisible Petal Aura Barrier',
  'The Garden Where No Petals Fall',
  'Falling Petal Step',
  'Ten Thousand Li Beneath One Step',
  'One Step Beyond the Endless Horizon',
  'One Petal Before Dawn',
  'Winter Moon Severance',
  'Winter Mirror',
  'Empty Spring',
  'Autumn Without End',
  'All Seasons Return to Stillness',
  'All Seasons Return to Their Natural Course',
  'Winter Has No Horizon',
  'Eternal Spring',
];

describe('When Wuyue Marches North skill continuity', () => {
  it('does not reuse retired Rhen technique names in Seasons 85–94', () => {
    retiredRhenSkillNames.forEach((name) => {
      expect(prose, `retired Rhen technique still used: ${name}`).not.toContain(name);
    });
    expect(prose).not.toContain('**One Petal**');
  });

  it('uses Sanctuary of Petals for the corrected war-arc healing scenes', () => {
    expect(raw.season86[0]?.text).toContain('**Sanctuary of Petals**');
    expect(raw.season88[3]?.text).toContain('**Sanctuary of Petals**');
    expect(raw.season88[8]?.text).toContain('**Sanctuary of Petals**');
    expect(raw.season94[5]?.text).toContain('**Sanctuary of Petals**');
  });
});
