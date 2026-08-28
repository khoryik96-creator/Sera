/** Generic character portrait gallery. No character-specific ids, classes or state. */

function escAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function portraitGalleryMarkup(characterName: string, images: string[]): string {
  if (images.length === 0) return '';
  const safeName = escAttr(characterName);
  if (images.length === 1) {
    return `<div class="profile-visual portrait-gallery portrait-gallery--single"><div class="portrait-gallery__stage"><img class="portrait-gallery__main" src="${images[0]}" alt="${safeName} portrait"></div></div>`;
  }

  return `<div class="profile-visual portrait-gallery" data-portrait-gallery>
    <div class="portrait-gallery__stage">
      <img class="portrait-gallery__main" src="${images[0]}" alt="${safeName} portrait">
    </div>
    <div class="portrait-gallery__controls" aria-label="${safeName} portrait gallery">
      ${images.map((src, index) => `<button type="button" class="portrait-gallery__thumb${index === 0 ? ' active' : ''}" data-portrait-index="${index}" aria-label="Show ${safeName} portrait ${index + 1}"><img src="${src}" alt=""></button>`).join('')}
      <span class="portrait-gallery__count" aria-live="polite">1 / ${images.length}</span>
    </div>
  </div>`;
}

/** Handle one delegated click. Returns true when a gallery thumbnail was used. */
export function handlePortraitGalleryClick(target: HTMLElement): boolean {
  const thumb = target.closest<HTMLButtonElement>('[data-portrait-index]');
  if (!thumb) return false;
  const gallery = thumb.closest<HTMLElement>('[data-portrait-gallery]');
  if (!gallery) return false;
  const main = gallery.querySelector<HTMLImageElement>('.portrait-gallery__main');
  const thumbImage = thumb.querySelector<HTMLImageElement>('img');
  if (!main || !thumbImage) return false;

  main.src = thumbImage.src;
  const thumbs = [...gallery.querySelectorAll<HTMLElement>('[data-portrait-index]')];
  thumbs.forEach((item) => item.classList.toggle('active', item === thumb));
  const count = gallery.querySelector<HTMLElement>('.portrait-gallery__count');
  if (count) count.textContent = `${Number(thumb.dataset.portraitIndex) + 1} / ${thumbs.length}`;
  return true;
}
