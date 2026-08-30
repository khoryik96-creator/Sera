export interface CharacterRegistryEntry {
  key: string;
  displayName: string;
  colorKey: string;
  aliases: string[];
  speakerKeys?: string[];
  currentRank?: string;
}

/**
 * Canonical identity registry used by dialogue colouring, novel name annotation,
 * rank labels and the visible colour key. Keep aliases here instead of copying
 * identity maps across multiple renderer modules.
 */
export const characterRegistry: CharacterRegistryEntry[] = [
  { key: 'rhen', displayName: 'Rhen', colorKey: 'rhen', aliases: ['Rhen'], speakerKeys: ['rhen'] },
  { key: 'sera', displayName: 'Sera', colorKey: 'sera', aliases: ['Sera'], speakerKeys: ['sera'], currentRank: 'Former #6' },
  { key: 'kael', displayName: 'Kael Veyran', colorKey: 'kael', aliases: ['Kael Veyran', 'Kael'], speakerKeys: ['kael'], currentRank: '#1' },
  { key: 'liang', displayName: 'Liang Yue', colorKey: 'liang', aliases: ['Liang Yue', 'Liang'], speakerKeys: ['liang'], currentRank: '#2' },
  { key: 'jin', displayName: 'Jin Seoryu', colorKey: 'jin', aliases: ['Jin Seoryu', 'Jin'], speakerKeys: ['jin'], currentRank: '#3' },
  { key: 'lei', displayName: 'Lei Zhen', colorKey: 'lei', aliases: ['Lei Zhen', 'Lei'], speakerKeys: ['lei'], currentRank: '#4' },
  { key: 'rui', displayName: 'Shen Rui', colorKey: 'rui', aliases: ['Shen Rui', 'Rui'], speakerKeys: ['rui'], currentRank: '#5' },
  { key: 'ilyra', displayName: 'Ilyra Serath', colorKey: 'ilyra', aliases: ['Ilyra Serath', 'Ilyra'], speakerKeys: ['ilyra'], currentRank: '#6' },
  { key: 'tae', displayName: 'Tae Muyeon', colorKey: 'tae', aliases: ['Tae Muyeon', 'Tae'], speakerKeys: ['tae'] },
  { key: 'mo', displayName: 'Mo Qingzhao', colorKey: 'mo', aliases: ['Mo Qingzhao', 'Mo'], speakerKeys: ['mo'], currentRank: '#7' },
  { key: 'arin', displayName: 'Arin Vale', colorKey: 'arin', aliases: ['Arin Vale', 'Arin'], speakerKeys: ['arin'], currentRank: '#8' },
  { key: 'luo', displayName: 'Luo Wen', colorKey: 'luo', aliases: ['Luo Wen', 'Luo'], speakerKeys: ['luo', 'wen'], currentRank: '#9' },
  { key: 'yun', displayName: 'Yun Shizhen', colorKey: 'yun', aliases: ['Yun Shizhen', 'Yun'], speakerKeys: ['yun'], currentRank: '#10' },
  { key: 'qin', displayName: 'Qin Luo', colorKey: 'qin', aliases: ['Qin Luo', 'Qin'], speakerKeys: ['qin'], currentRank: 'Former #6' },
  { key: 'han', displayName: 'Han Myeong', colorKey: 'han', aliases: ['Han Myeong', 'Han'], speakerKeys: ['han'], currentRank: 'Former #8' },

  { key: 'jianruo', displayName: 'Jian Ruo', colorKey: 'former', aliases: ['Jian Ruo'], currentRank: 'Former #1' },
  { key: 'xuweng', displayName: 'Xu Weng', colorKey: 'former', aliases: ['Xu Weng'], currentRank: 'Former #3' },
  { key: 'moqian', displayName: 'Mo Qian', colorKey: 'former', aliases: ['Mo Qian'], currentRank: 'Former #5' },
  { key: 'yeonhwa', displayName: 'Yeon Hwa', colorKey: 'former', aliases: ['Yeon Hwa'], currentRank: 'Former #6' },
  { key: 'wei', displayName: 'Wei Zhen', colorKey: 'wei', aliases: ['Wei Zhen', 'Wei'], speakerKeys: ['wei'], currentRank: 'Former #5' },

  { key: 'ji', displayName: 'Ji Wuye', colorKey: 'ji', aliases: ['Ji Wuye'], speakerKeys: ['ji'] },
  { key: 'cao', displayName: 'Cao Tian', colorKey: 'cao', aliases: ['Cao Tian'], speakerKeys: ['cao'] },
  { key: 'ye', displayName: 'Ye Mo', colorKey: 'ye', aliases: ['Ye Mo'], speakerKeys: ['ye'] },
  { key: 'zhao', displayName: 'Zhao Keshan', colorKey: 'zhao', aliases: ['Zhao Keshan'], speakerKeys: ['zhao'] },
  { key: 'lin', displayName: 'Lin Yao', colorKey: 'lin', aliases: ['Lin Yao'], speakerKeys: ['lin'] },
  { key: 'yan', displayName: 'Yan Shou', colorKey: 'yan', aliases: ['Yan Shou'], speakerKeys: ['yan'] },
  { key: 'meizhen', displayName: 'Mei Zhen', colorKey: 'meizhen', aliases: ['Mei Zhen'], speakerKeys: ['meizhen'] },
  { key: 'yunke', displayName: 'Yun Ke', colorKey: 'yunke', aliases: ['Yun Ke'], speakerKeys: ['yunke'] },
  { key: 'gaoren', displayName: 'Gao Ren', colorKey: 'gaoren', aliases: ['Gao Ren'], speakerKeys: ['gaoren'] },
  { key: 'shufen', displayName: 'Shu Fen', colorKey: 'shufen', aliases: ['Shu Fen'], speakerKeys: ['shufen'] },
  { key: 'baotien', displayName: 'Bao Tien', colorKey: 'baotien', aliases: ['Bao Tien'], speakerKeys: ['baotien'] },
  { key: 'meilin', displayName: 'Jian Meilin', colorKey: 'meilin', aliases: ['Jian Meilin'], speakerKeys: ['meilin'] },
  { key: 'song', displayName: 'Song Qiren', colorKey: 'song', aliases: ['Song Qiren'], speakerKeys: ['song'] },
  { key: 'shiyue', displayName: 'Yun Shiyue', colorKey: 'shiyue', aliases: ['Yun Shiyue'], speakerKeys: ['shiyue'] },
  { key: 'huo', displayName: 'Huo Wujin', colorKey: 'huo', aliases: ['Huo Wujin'], speakerKeys: ['huo'] },
  { key: 'nam', displayName: 'Nam Gyeol', colorKey: 'nam', aliases: ['Nam Gyeol'], speakerKeys: ['nam'] },
  { key: 'chun', displayName: 'Chun Baek', colorKey: 'chun', aliases: ['Chun Baek'], speakerKeys: ['chun'] },
  { key: 'haejin', displayName: 'Seo Haejin', colorKey: 'haejin', aliases: ['Seo Haejin'], speakerKeys: ['haejin'] },
  { key: 'gwon', displayName: 'Gwon Myeong', colorKey: 'gwon', aliases: ['Gwon Myeong'], speakerKeys: ['gwon'] },
  { key: 'daemun', displayName: 'Dae Mun', colorKey: 'daemun', aliases: ['Dae Mun', 'Mun Daeho'], speakerKeys: ['daemun'] },
  { key: 'baek', displayName: 'Baek Cheon', colorKey: 'baek', aliases: ['Baek Cheon'], speakerKeys: ['baek'] },
  { key: 'gong', displayName: 'Gong Seok', colorKey: 'gong', aliases: ['Gong Seok'], speakerKeys: ['gong'] },
  { key: 'jiang', displayName: 'Jiang Taixuan', colorKey: 'jiang', aliases: ['Jiang Taixuan'], speakerKeys: ['jiang'] },
  { key: 'duan', displayName: 'Duan He', colorKey: 'duan', aliases: ['Duan He'], speakerKeys: ['duan'] },
  { key: 'mi', displayName: 'Mi Suyun', colorKey: 'mi', aliases: ['Mi Suyun'], speakerKeys: ['mi'] },
  { key: 'qiu', displayName: 'Qiu Shen', colorKey: 'qiu', aliases: ['Qiu Shen'], speakerKeys: ['qiu'] },
  { key: 'zhao_renkai', displayName: 'Zhao Renkai', colorKey: 'zhao_renkai', aliases: ['Zhao Renkai'], speakerKeys: ['zhao_renkai'] },
  { key: 'mu', displayName: 'Mu Gyeong', colorKey: 'mu', aliases: ['Mu Gyeong'], speakerKeys: ['mu'] },
  { key: 'seo', displayName: 'Seo Mujin', colorKey: 'seo', aliases: ['Seo Mujin'], speakerKeys: ['seo'] },
  { key: 'tae', displayName: 'Tae Muyeon', colorKey: 'tae', aliases: ['Tae Muyeon'], speakerKeys: ['tae'] },
  { key: 'gu', displayName: 'Gu Xian', colorKey: 'gu', aliases: ['Gu Xian'], speakerKeys: ['gu'] },
  { key: 'ren', displayName: 'Ren Qiao', colorKey: 'ren', aliases: ['Ren Qiao'], speakerKeys: ['ren'] },
  { key: 'qiao', displayName: 'Qiao Ren', colorKey: 'qiao', aliases: ['Qiao Ren'], speakerKeys: ['qiao'] },
  { key: 'miri', displayName: 'Jae Miri', colorKey: 'miri', aliases: ['Jae Miri'], speakerKeys: ['miri'] },
  { key: 'sorin', displayName: 'Sorin Vael', colorKey: 'sorin', aliases: ['Sorin Vael'], speakerKeys: ['sorin'] },
  { key: 'valeria', displayName: 'Valeria Nox', colorKey: 'valeria', aliases: ['Valeria Nox'], speakerKeys: ['valeria'] },
  { key: 'draven', displayName: 'Draven Sol', colorKey: 'draven', aliases: ['Draven Sol'], speakerKeys: ['draven'] },
  { key: 'aurel', displayName: 'Aurel Veyr', colorKey: 'aurel', aliases: ['Aurel Veyr'], speakerKeys: ['aurel'] },
  { key: 'vaelor', displayName: 'Vaelor Veyr', colorKey: 'vaelor', aliases: ['Vaelor Veyr'], speakerKeys: ['vaelor'] },

  { key: 'orun', displayName: 'Orun Vhal', colorKey: 'orun', aliases: ['Orun Vhal', 'Orun'], speakerKeys: ['orun'], currentRank: 'VII' },
  { key: 'iscaryn', displayName: 'Iscaryn Voss', colorKey: 'iscaryn', aliases: ['Iscaryn Voss', 'Iscaryn'], speakerKeys: ['iscaryn'], currentRank: 'VI' },
  { key: 'rhavenn', displayName: 'Rhavenn Korr', colorKey: 'rhavenn', aliases: ['Rhavenn Korr', 'Rhavenn'], speakerKeys: ['rhavenn'], currentRank: 'V' },
  { key: 'tor', displayName: 'Tor Veydan', colorKey: 'tor', aliases: ['Tor Veydan', 'Tor'], speakerKeys: ['tor'], currentRank: 'IV' },
  { key: 'caedros', displayName: 'Caedros Marr', colorKey: 'caedros', aliases: ['Caedros Marr', 'Caedros'], speakerKeys: ['caedros'], currentRank: 'III' },
  { key: 'varesh', displayName: 'Varesh Nhal', colorKey: 'varesh', aliases: ['Varesh Nhal', 'Varesh'], speakerKeys: ['varesh'], currentRank: 'II' },
  { key: 'amon', displayName: 'Amon Serath', colorKey: 'amon', aliases: ['Amon Serath', 'Amon'], speakerKeys: ['amon'], currentRank: 'I' },
  { key: 'aethon', displayName: 'Aethon Vael', colorKey: 'aethon', aliases: ['Aethon Vael', 'Aethon'], speakerKeys: ['aethon'], currentRank: 'OL' },
];

export const neutralSpeakerNames: Record<string, string> = {
  novice: 'Novice', girl: 'Girl', flowerseller: 'Flower Seller', covenant: 'Covenant Envoy',
  duchess: 'Duchess', soldier: 'Soldier', opponent: 'Opponent', captain: 'Captain',
  lieutenant: 'Lieutenant', attacker: 'Attacker', messenger: 'Messenger', grandmaster: 'Grandmaster',
  mira: 'Han Mira', chen: 'Chen Wulian', dabin: 'Seo Dabin', lintao: 'Lin Tao',
  rulan: 'Mei Rulan', mei: 'Mei Rulan', seongho: 'Gu Seongho', nari: 'Bai Nari', bai: 'Bai Nari', renshuo: 'Ren Shuo',
  hwan: 'Yeo Hwan', lumei: 'Tang Lumei', jiangfen: 'Jiang Fen', minseok: 'Oh Minseok',
  official: 'Provincial Official', guard: 'Provincial Guard', enforcer: 'Red Willow Enforcer', sectleader: 'Sect Leader',
  witness: 'Witness', caowen: 'Cao Wen', physician: 'Physician Su', customer: 'Customer',
  luweiran: 'Lu Weiran', seoryeong: 'Han Seoryeong',
};

export const colorKeyMap: Record<string, string> = Object.fromEntries([
  ...characterRegistry.flatMap((entry) => (entry.speakerKeys || [entry.key]).map((key) => [key, entry.colorKey] as const)),
  ...Object.keys(neutralSpeakerNames).map((key) => [key, 'neutral'] as const),
]);

export const novelNameMap: [string, string][] = characterRegistry
  .flatMap((entry) => entry.aliases.map((alias) => [alias, entry.colorKey] as [string, string]))
  .sort((a, b) => b[0].length - a[0].length);

const aliasEntry = new Map<string, CharacterRegistryEntry>();
for (const entry of characterRegistry) for (const alias of entry.aliases) aliasEntry.set(alias, entry);

const speakerEntry = new Map<string, CharacterRegistryEntry>();
for (const entry of characterRegistry) for (const key of entry.speakerKeys || [entry.key]) speakerEntry.set(key, entry);

export function speakerName(raw: string): string {
  return speakerEntry.get(raw)?.displayName || neutralSpeakerNames[raw] || (raw.charAt(0).toUpperCase() + raw.slice(1));
}

export function rankForStory(name: string, season?: number): string {
  const entry = aliasEntry.get(name);
  if (!entry) return '';
  if (!season) return entry.currentRank || '';

  if (entry.key === 'sera') {
    if (season <= 22) return '#7';
    if (season <= 43) return '#6';
    return 'Former #6';
  }
  if (entry.key === 'ilyra') return season < 44 ? '' : '#6';
  if (entry.key === 'mo') return season <= 22 ? '' : '#7';
  if (entry.key === 'arin') return season <= 22 ? '#9' : '#8';
  if (entry.key === 'luo') return season <= 22 ? '' : '#9';
  if (entry.key === 'yun') return season <= 22 ? '' : '#10';
  return entry.currentRank || '';
}

export const colorKeyItems: [string, string][] = [
  ['rhen', 'Rhen'], ['tae', 'Co-#1 Tae'],
  ['kael', '#1 Kael'], ['liang', '#2 Liang'], ['jin', '#3 Jin'], ['lei', '#4 Lei'], ['rui', '#5 Rui'],
  ['ilyra', '#6 Ilyra'], ['mo', '#7 Mo'], ['arin', '#8 Arin'], ['luo', '#9 Luo Wen'], ['yun', '#10 Yun'],
  ['sera', 'Former #6 Sera'], ['qin', 'Former #6 Qin'], ['han', 'Former #8 Han'],
  ['wei', 'Wei Zhen'], ['ji', 'Ji Wuye'], ['cao', 'Cao Tian'], ['ye', 'Ye Mo'], ['zhao', 'Zhao Keshan'], ['lin', 'Lin Yao'], ['yan', 'Yan Shou'], ['meizhen', 'Mei Zhen'], ['yunke', 'Yun Ke'], ['meilin', 'Jian Meilin'], ['shiyue', 'Yun Shiyue'], ['huo', 'Huo Wujin'], ['nam', 'Nam Gyeol'], ['haejin', 'Seo Haejin'], ['daemun', 'Dae Mun'], ['gong', 'Gong Seok'],
];
