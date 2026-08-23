import { describe, it, expect } from 'vitest';
import { colorKeyItems } from '../src/colorKey';

const byKey = new Map(colorKeyItems.map(([k, label]) => [k, label]));

describe('colorKeyItems', () => {
  it('includes the current #6-#10 holders that were missing', () => {
    for (const k of ['ilyra', 'mo', 'yun']) expect(byKey.has(k), k).toBe(true);
  });

  it('uses current ranks, not the outdated ones', () => {
    expect(byKey.get('ilyra')).toContain('#6');
    expect(byKey.get('mo')).toContain('#7');
    expect(byKey.get('arin')).toContain('#8');
    expect(byKey.get('luo')).toContain('#9');
    expect(byKey.get('yun')).toContain('#10');
  });

  it('shows Sera as a former holder, not #7', () => {
    expect(byKey.get('sera')).toContain('Former');
    expect(byKey.get('sera')).not.toContain('#7');
  });
});
