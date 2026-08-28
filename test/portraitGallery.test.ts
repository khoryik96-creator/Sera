// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { portraitGalleryMarkup, handlePortraitGalleryClick } from '../src/portraitGallery';

describe('portraitGallery', () => {
  beforeEach(() => {
    document.body.innerHTML = portraitGalleryMarkup('Test Character', ['/one.jpg', '/two.jpg', '/three.jpg']);
  });

  it('is generic and contains no Sera-specific implementation names', () => {
    expect(document.body.innerHTML).not.toMatch(/seraOnlyPortrait|sera-v101|seraSingle/i);
    expect(document.querySelectorAll('[data-portrait-index]')).toHaveLength(3);
  });

  it('can switch forward and back without trapping gallery state', () => {
    const main = document.querySelector<HTMLImageElement>('.portrait-gallery__main');
    const thumbs = [...document.querySelectorAll<HTMLElement>('[data-portrait-index]')];
    expect(main?.src).toContain('/one.jpg');
    expect(handlePortraitGalleryClick(thumbs[2])).toBe(true);
    expect(main?.src).toContain('/three.jpg');
    expect(handlePortraitGalleryClick(thumbs[0])).toBe(true);
    expect(main?.src).toContain('/one.jpg');
    expect(document.querySelector('.portrait-gallery__count')?.textContent).toBe('1 / 3');
  });
});
