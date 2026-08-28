import { describe, expect, it } from 'vitest';
import { rankLabel, rankStatus } from '../src/react/shared/rankState';

describe('React seasonal rank state', () => {
  it('keeps Qin and Han active through Season 22 before their present-day states', () => {
    expect(rankLabel('Qin Luo', 22)).toBe('#6');
    expect(rankStatus('Qin Luo', 22)).toBe('current');
    expect(rankLabel('Qin Luo', 23)).toBe('Former #6');
    expect(rankStatus('Qin Luo', 23)).toBe('retired');

    expect(rankLabel('Han Myeong', 22)).toBe('#8');
    expect(rankStatus('Han Myeong', 22)).toBe('current');
    expect(rankLabel('Han Myeong', 23)).toBe('Former #8');
    expect(rankStatus('Han Myeong', 23)).toBe('deceased');
  });

  it('preserves Sera progression and Rhen unranked status', () => {
    expect(rankLabel('Sera', 22)).toBe('#7');
    expect(rankLabel('Sera', 23)).toBe('#6');
    expect(rankLabel('Sera', 44)).toBe('Former #6');
    expect(rankStatus('Sera', 44)).toBe('former');
    expect(rankLabel('Rhen', 1)).toBe('Unranked');
    expect(rankStatus('Rhen', 64)).toBe('unranked');
  });
});
