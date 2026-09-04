import { describe, expect, it } from 'vitest';
import { orchidHierarchy, originalApprentices, teahouseIdentity } from '../src/react/features/teahouse/teahouseData';

describe('The Quaint Teahouse five-year reference', () => {
  it('keeps the covert guild identity distinct from the public tea house', () => {
    expect(teahouseIdentity.publicName).toBe('Second Spring Tea House');
    expect(teahouseIdentity.covertName).toBe('The Quaint Teahouse');
    expect(teahouseIdentity.arc).toBe('Beneath the Crooked Sign');
  });

  it('holds the senior Orchid members with complete cards', () => {
    const keys = orchidHierarchy.map((member) => member.key);
    expect(keys).toEqual(['sera', 'qin', 'tae', 'huo', 'lu', 'black_radiance', 'rhen']);
    for (const member of orchidHierarchy) {
      expect(member.name, member.key).toBeTruthy();
      expect(member.role, member.key).toBeTruthy();
      expect(member.background.length, member.key).toBeGreaterThan(40);
    }
  });

  it('adds Yurushi Amagiri / Black Radiance as the final-arc Sixth Petal', () => {
    const br = orchidHierarchy.find((member) => member.key === 'black_radiance');
    expect(br?.name).toBe('Yurushi Amagiri');
    expect(br?.seat).toBe('Sixth Petal');
    expect(br?.cultivation.toLowerCase()).toContain('established paragon');
    // Twilight Dominion is locked canon for him (he is a Paragon), not future-locked.
    expect(br?.arts?.some((art) => art.name === 'Twilight Dominion')).toBe(true);
  });

  it('keeps Rhen the unranked, immeasurable Hidden Petal who holds no command', () => {
    const rhen = orchidHierarchy.find((member) => member.key === 'rhen');
    expect(rhen?.seat).toBe('Hidden Petal');
    expect(rhen?.cultivation.toLowerCase()).toContain('unranked');
    expect(rhen?.role.toLowerCase()).toContain('holds no command');
  });

  it('marks Sera the First Inner Petal and leaves the Paragon domain future-locked', () => {
    const sera = orchidHierarchy.find((member) => member.key === 'sera');
    expect(sera?.role.toLowerCase()).toContain('first inner petal');
    const dominion = sera?.arts?.find((art) => art.name === 'Orchid Dominion');
    expect(dominion?.status).toBe('future-locked');
  });

  it('locks story use of both explicitly-locked techniques', () => {
    const locked = orchidHierarchy
      .flatMap((member) => member.arts ?? [])
      .filter((art) => art.status === 'story-locked')
      .map((art) => art.name);
    expect(locked).toContain('Petals Beneath a Frozen Moon');
    expect(locked).toContain('The Orchid Blooms Only Once');
  });

  it('lists exactly the twelve original apprentices', () => {
    expect(originalApprentices).toHaveLength(12);
    const captains = originalApprentices.filter((entry) => entry.position.startsWith('Captain'));
    expect(captains).toHaveLength(10);
  });
});
