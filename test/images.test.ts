import { describe, it, expect } from 'vitest';
import { characterImageMap, characterExtraImages } from '../src/images';

const EXPECTED_KEYS = ['rhen', 'sera', 'kael', 'liang', 'jin', 'lei', 'rui', 'ilyra', 'mo', 'arin', 'wen', 'yun', 'qin', 'han'];

describe('auto-discovered portraits', () => {
  it('discovers a main portrait for every expected character key', () => {
    for (const k of EXPECTED_KEYS) expect(characterImageMap[k], k).toBeTruthy();
  });

  it('builds galleries for characters that have -extra- images', () => {
    expect(characterExtraImages.sera).toHaveLength(3);
    expect(characterExtraImages.rhen).toHaveLength(4);
  });

  it('gives no gallery to characters without extras', () => {
    expect(characterExtraImages.kael).toBeUndefined();
  });

  it('never treats an -extra- file as a main portrait', () => {
    for (const k of Object.keys(characterImageMap)) expect(k).not.toMatch(/-extra-\d+$/);
  });
});
