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

  return `<div class="profile-visual portrait-gallery" data-portrait-gallery role="group" aria-label="${safeName} portrait gallery">
    <div class="portrait-gallery__stage">
      <img class="portrait-gallery__main" src="${images[0]}" alt="${safeName} portrait">
    </div>
    <div class="portrait-gallery__controls">
      ${images.map((src, index) => `<button type="button" class="portrait-gallery__thumb${index === 0 ? ' active' : ''}" data-portrait-index="${index}" aria-label="Show ${safeName} portrait ${index + 1}" aria-pressed="${index === 0}"><img src="${src}" alt=""></button>`).join('')}
      <span class="portrait-gallery__count" aria-live="polite">1 / ${images.length}</span>
    </div>
  </div>`;
}

function selectThumb(thumb: HTMLButtonElement): boolean {
  const gallery = thumb.closest<HTMLElement>('[data-portrait-gallery]');
  if (!gallery) return false;
  const main = gallery.querySelector<HTMLImageElement>('.portrait-gallery__main');
  const thumbImage = thumb.querySelector<HTMLImageElement>('img');
  if (!main || !thumbImage) return false;

  main.src = thumbImage.src;
  const thumbs = [...gallery.querySelectorAll<HTMLButtonElement>('[data-portrait-index]')];
  thumbs.forEach((item) => {
    const active = item === thumb;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  const count = gallery.querySelector<HTMLElement>('.portrait-gallery__count');
  if (count) count.textContent = `${Number(thumb.dataset.portraitIndex) + 1} / ${thumbs.length}`;
  return true;
}

export function handlePortraitGalleryClick(target: HTMLElement): boolean {
  const thumb = target.closest<HTMLButtonElement>('[data-portrait-index]');
  return thumb ? selectThumb(thumb) : false;
}

export function handlePortraitGalleryKeydown(event: KeyboardEvent): boolean {
  const thumb = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-portrait-index]');
  if (!thumb) return false;
  const gallery = thumb.closest<HTMLElement>('[data-portrait-gallery]');
  if (!gallery) return false;
  const thumbs = [...gallery.querySelectorAll<HTMLButtonElement>('[data-portrait-index]')];
  const index = thumbs.indexOf(thumb);
  if (index < 0) return false;

  let next = index;
  if (event.key === 'ArrowRight') next = (index + 1) % thumbs.length;
  else if (event.key === 'ArrowLeft') next = (index - 1 + thumbs.length) % thumbs.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = thumbs.length - 1;
  else return false;

  event.preventDefault();
  thumbs[next].focus();
  selectThumb(thumbs[next]);
  return true;
}
