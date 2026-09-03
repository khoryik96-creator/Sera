import { describe, expect, it } from 'vitest';
import { cleanLoreRole, inferLoreAffiliation, loreStrengthFrom } from '../src/react/shared/loreMetadata';

describe('lore metadata fallbacks', () => {
  it('extracts cultivation from season-cast roles', () => {
    expect(loreStrengthFrom(['White Huntmaster · High Sovereign'])).toBe('High Sovereign');
  });

  it('keeps role and cultivation in separate fields', () => {
    expect(cleanLoreRole('White Huntmaster · High Sovereign')).toBe('White Huntmaster');
  });

  it('infers canonical northern affiliation from highlighted surnames', () => {
    expect(inferLoreAffiliation('Varok Skeldran')).toBe('Skeldran — Thousandfold Hunt, Isgard');
  });
});
