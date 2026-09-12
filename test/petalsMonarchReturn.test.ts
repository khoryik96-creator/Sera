import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const part2 = readFileSync('docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md', 'utf8');
const part3 = readFileSync('docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_3.md', 'utf8');
const seasonMap = readFileSync('docs/FINAL_ARC_PHASE3_SEASON_MAP.md', 'utf8');

describe('Petals Monarch Isgard return', () => {
  it('makes the legend arrive before the man', () => {
    expect(part2).toContain('The color was new.\n\nThe signature was not.');
    expect(part2).toContain('Nobody shouted Rhen.');
    expect(part2).toContain('Petals Monarch.');
    expect(part2).toContain('It did not argue about how the war ended.');
  });

  it('turns the return into a Wuyue and Isgard morale event', () => {
    expect(part2).toContain('Wuyue shouted first. Isgard answered almost immediately.');
    expect(part2).toContain('morale was also a battlefield resource');
    expect(part2).toContain("[[speaker:sera]]“He's here.”");
  });

  it('preserves the intimate Sera reunion after the public mythic reveal', () => {
    expect(part2).toContain('[[speaker:rhen]]Then Rhen said, “You look terrible.”');
    expect(part2).toContain('[[speaker:sera]]“You slept through a war.”');
  });

  it('makes Isgard remember who ended the previous war', () => {
    expect(part3).toContain('Not Rhen.\n\nThe Petals Monarch.');
    expect(part3).toContain("The man who ended Isgard's last war had returned to Isgard by healing it.");
    expect(seasonMap).toContain('the legendary figure who ended the previous Isgard war');
  });
});
