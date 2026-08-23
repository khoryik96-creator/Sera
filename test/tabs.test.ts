// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { clearSearchInputs, SEARCH_INPUT_IDS } from '../src/tabs';

describe('clearSearchInputs', () => {
  beforeEach(() => {
    document.body.innerHTML = SEARCH_INPUT_IDS.map((id) => `<input id="${id}" value="stale query">`).join('');
  });

  it('clears every search box, not just the global one', () => {
    for (const id of SEARCH_INPUT_IDS) {
      expect((document.getElementById(id) as HTMLInputElement).value).toBe('stale query');
    }
    clearSearchInputs();
    for (const id of SEARCH_INPUT_IDS) {
      expect((document.getElementById(id) as HTMLInputElement).value, id).toBe('');
    }
  });

  it('does not throw when a search box is absent', () => {
    document.body.innerHTML = '<input id="search" value="x">';
    expect(() => clearSearchInputs()).not.toThrow();
    expect((document.getElementById('search') as HTMLInputElement).value).toBe('');
  });
});
