import { getEl } from './dom';
import { colorKeyItems } from './characterRegistry';

export { colorKeyItems } from './characterRegistry';

export function renderColorKey(): void {
  getEl('colorKey').innerHTML = colorKeyItems.map(([key, name]) => `<span class="character-${key}"><strong>${name}</strong></span>`).join('');
}
