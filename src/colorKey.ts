import { getEl } from './dom';

export function renderColorKey(): void {
  const items: [string, string][] = [
    ['rhen', 'Rhen'], ['sera', '#7 Sera'], ['kael', '#1 Kael'], ['liang', '#2 Liang'], ['jin', '#3 Jin'], ['lei', '#4 Lei'], ['rui', '#5 Rui'], ['qin', '#6 Qin'], ['han', '#8 Han'], ['arin', '#9 Arin'], ['luo', '#10 Luo Wen'], ['wei', 'Wei Zhen'], ['ji', 'Ji Wuye'], ['cao', 'Cao Tian'], ['ye', 'Ye Mo'], ['zhao', 'Zhao Keshan'], ['lin', 'Lin Yao'], ['yan', 'Yan Shou'], ['meizhen', 'Mei Zhen'], ['yunke', 'Yun Ke'], ['meilin', 'Jian Meilin'], ['shiyue', 'Yun Shiyue'], ['huo', 'Huo Wujin'], ['nam', 'Nam Gyeol'], ['haejin', 'Seo Haejin'], ['daemun', 'Dae Mun'], ['gong', 'Gong Seok'],
  ];
  getEl('colorKey').innerHTML = items.map(([k, n]) => `<span class="character-${k}"><strong>${n}</strong></span>`).join('');
}
