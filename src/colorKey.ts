import { getEl } from './dom';

/**
 * Character colour legend: [colour-key, label]. Ranks reflect the current
 * board — #6 Ilyra, #7 Mo, #8 Arin, #9 Luo, #10 Yun — with Sera/Qin/Han shown
 * as former holders.
 */
export const colorKeyItems: [string, string][] = [
  ['rhen', 'Rhen'],
  ['kael', '#1 Kael'], ['liang', '#2 Liang'], ['jin', '#3 Jin'], ['lei', '#4 Lei'], ['rui', '#5 Rui'],
  ['ilyra', '#6 Ilyra'], ['mo', '#7 Mo'], ['arin', '#8 Arin'], ['luo', '#9 Luo Wen'], ['yun', '#10 Yun'],
  ['sera', 'Former #6 Sera'], ['qin', 'Former #6 Qin'], ['han', 'Former #8 Han'],
  ['wei', 'Wei Zhen'], ['ji', 'Ji Wuye'], ['cao', 'Cao Tian'], ['ye', 'Ye Mo'], ['zhao', 'Zhao Keshan'], ['lin', 'Lin Yao'], ['yan', 'Yan Shou'], ['meizhen', 'Mei Zhen'], ['yunke', 'Yun Ke'], ['meilin', 'Jian Meilin'], ['shiyue', 'Yun Shiyue'], ['huo', 'Huo Wujin'], ['nam', 'Nam Gyeol'], ['haejin', 'Seo Haejin'], ['daemun', 'Dae Mun'], ['gong', 'Gong Seok'],
];

export function renderColorKey(): void {
  getEl('colorKey').innerHTML = colorKeyItems.map(([k, n]) => `<span class="character-${k}"><strong>${n}</strong></span>`).join('');
}
