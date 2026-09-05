import { describe, expect, it } from 'vitest';
import rawData from '../src/data.json';
import type { RawDatabase } from '../src/types';
import { rankStatus, rankStatusForEntry } from '../src/react/shared/rankState';
import { rankColorKey } from '../src/ranks';

const data = rawData as unknown as RawDatabase;

describe('final-arc canon synchronization', () => {
  it('sets the Wuyue final-arc current cultivation tiers', () => {
    const cult = (k: string) => data.characters[k].cultivation;
    expect(cult('kael')).toBe('Newly ascended Paragon');
    expect(cult('sera')).toBe('Peak Paragon');
    expect(cult('tae')).toBe('High Paragon');
    expect(cult('huo')).toBe('High Paragon');
    expect(cult('qin')).toBe('High Paragon');
    expect(cult('liang')).toBe('Peak Sovereign');
    expect(cult('ilyra')).toBe('High Sovereign');
    for (const k of ['mo', 'arin', 'wen']) expect(cult(k), k).toBe('Newly Sovereign');
  });

  it('keeps Kael the current public #1 and does not force Sera into a numeric rank', () => {
    expect(data.characters.kael.name).toContain('#1');
    // Sera carries only her historical "Former #6"; she is not forced into a
    // current numeric Top Ten slot (a current rank would start with a bare "#").
    expect(/^#\d/.test(data.characters.sera.name)).toBe(false);
    expect(data.characters.sera.name).toMatch(/Former/);
  });

  it('makes Yurushi / Black Radiance an unranked High Paragon', () => {
    const br = data.characters.black_radiance;
    expect(br.cultivation).toBe('High Paragon');
    expect(JSON.stringify(br)).not.toContain('Established Paragon');
  });

  it('keeps Xie Wuchen a Sovereign with no Dominion', () => {
    expect(data.characters.xie_wuchen.cultivation).toBe('Newly Sovereign');
    const skills = data.topSkills.xie_wuchen || [];
    expect(skills.length).toBeGreaterThan(0);
    expect(skills.some((s) => /Dominion/.test(s.name))).toBe(false);
  });

  it('marks Yun deceased in present/final-arc contexts but alive in shipped seasons', () => {
    expect(rankStatus('Yun Shizhen')).toBe('deceased');
    expect(rankStatus('Yun Shizhen', 80)).toBe('current');
  });

  it('gives Luo Wen his locked final-arc poison roster', () => {
    const names = new Set((data.topSkills.wen || []).map((s) => s.name));
    for (const n of ['Undertaker’s Measure', 'Pulse Debt', 'False Cure', 'Three Pulse Reversal', 'Final Diagnosis']) {
      expect(names.has(n), n).toBe(true);
    }
  });

  it('shows both #10 holders in the rankings — Yun (deceased) kept, Xie (current) added', () => {
    const tens = data.ranks.filter((r) => r.rank === '#10');
    const yun = tens.find((r) => /Yun/.test(r.name));
    const xie = tens.find((r) => /Xie Wuchen/.test(r.name));
    expect(yun, 'Yun #10 preserved').toBeTruthy();
    expect(xie, 'Xie #10 added').toBeTruthy();
    expect(rankStatusForEntry(yun!.name.split(' — ')[0], yun!.rank, yun!.className)).toBe('deceased');
    expect(rankStatusForEntry(xie!.name.split(' — ')[0], xie!.rank, xie!.className)).toBe('current');
    // Xie's ranking card colours to his own swatch, not the rhen fallback.
    expect(rankColorKey(xie!.name)).toBe('xie_wuchen');
  });

  it('gives Rhen his post-seclusion Monarch’s Winter Law with Winter Essence folded in', () => {
    const law = data.rhenSkills.find((s) => s.name === "Monarch’s Winter Law");
    expect(law, "Monarch’s Winter Law present").toBeTruthy();
    expect(law?.tier).toBe('Supreme Domain Art');
    const blob = JSON.stringify(law);
    expect(blob).toMatch(/50-mile|fifty-mile/);
    expect(blob).toMatch(/one frozen petal|single frozen petal/i);
    // Winter Essence is part of this Law, not a separate art entry.
    expect(blob).toContain('Winter Essence');
    expect(blob).toContain('Calamity');
    expect(blob).toContain('Quiet Snow');
    expect(data.rhenSkills.some((s) => s.name === 'Winter Essence')).toBe(false);
  });

  it('gives Sigrun a Graven Dominion at Paragon', () => {
    const sigrun = data.arcFigures.find((f) => f.key === 'sigrun');
    expect(sigrun?.subtitle).toContain('Newly ascended Paragon');
    expect(sigrun?.skills?.some((s) => s[0] === 'Graven Dominion')).toBe(true);
  });
});
