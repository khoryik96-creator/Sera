import { readFile, writeFile } from 'node:fs/promises';

async function replaceOnce(path, before, after) {
  const source = await readFile(path, 'utf8');
  const count = source.split(before).length - 1;
  if (count !== 1) throw new Error(`${path}: expected one integration anchor, found ${count}`);
  await writeFile(path, source.replace(before, after));
}

const finalArcs = `      season(94, 'No Banner Owns a Continent', '10 CHAPTERS · FIRST DRAFT'),
    ],
  },
  {
    title: 'Final Arc Phase I — The Warning From Shinrin',
    badge: 'Seasons 95–100 · Complete prose',
    description: 'Two peaceful years fracture when Axtaya leads Yun Shizhen into Shinrin. Her investigation exposes Shinsei, costs Wuyue its No.10, and leaves a warning that arrives one day after Rhen enters an irreversible seclusion.',
    seasons: [
      season(95, 'Two Years Beneath the Crooked Sign', '10 CHAPTERS · FINAL PROSE'),
      season(96, 'The Road to Shinrin', '10 CHAPTERS · FINAL PROSE'),
      season(97, 'No.2 Hunts the Pale Venom', '10 CHAPTERS · FINAL PROSE'),
      season(98, 'Three Months Under One Government', '10 CHAPTERS · FINAL PROSE'),
      season(99, 'The Locked Room', '10 CHAPTERS · FINAL PROSE'),
      season(100, 'The Warning She Carried', '10 CHAPTERS · FINAL PROSE'),
    ],
  },
  {
    title: 'Final Arc Phase II — The War That Rhen Slept Through',
    badge: 'Seasons 101–108 · Complete prose',
    description: 'Shinsei invades Isgard while Rhen remains sealed away. Isgard bleeds, Wuyue marches, hidden Quaint High Paragons are exposed, Axtaya becomes an industrial weapon, and Sera holds the alliance together through six months of adaptive war.',
    seasons: [
      season(101, 'The Remaining Weeks', '10 CHAPTERS · FINAL PROSE'),
      season(102, 'Isgard Bleeds Alone', '10 CHAPTERS · FINAL PROSE'),
      season(103, 'Wuyue Comes North', '10 CHAPTERS · FINAL PROSE'),
      season(104, 'The House They Thought Empty', '10 CHAPTERS · FINAL PROSE'),
      season(105, 'Five Minutes of Borrowed Life', '10 CHAPTERS · FINAL PROSE'),
      season(106, 'The Physician Who Makes Monsters Stand Again', '10 CHAPTERS · FINAL PROSE'),
      season(107, 'Winning Battles, Losing the Arithmetic', '10 CHAPTERS · FINAL PROSE'),
      season(108, 'Winning Too Slowly', '10 CHAPTERS · FINAL PROSE'),
    ],
  },
  {
    title: 'Final Arc Phase III — When Winter Wakes',
    badge: 'Seasons 109–114 · Complete prose',
    description: 'Rhen wakes after six months and twelve days, but Sera still owns the central martial confrontation. Shinsei fractures around truth and choice, Monarch winter ends the war, and the story closes with reconstruction, a third teashop and one private future.',
    seasons: [
      season(109, 'The Day Winter Woke', '10 CHAPTERS · FINAL PROSE'),
      season(110, 'The War Changes Shape', '10 CHAPTERS · FINAL PROSE'),
      season(111, 'The Man Who Would Not Stay Down', '10 CHAPTERS · FINAL PROSE'),
      season(112, 'The Strongest Beneath Heaven', '10 CHAPTERS · FINAL PROSE'),
      season(113, "Monarch's Winter", '10 CHAPTERS · FINAL PROSE'),
      season(114, 'When Spring Finally Comes', '10 CHAPTERS · FINAL PROSE'),
    ],
  },
];`;

await replaceOnce(
  'src/episodeMeta.ts',
  `      season(94, 'No Banner Owns a Continent', '10 CHAPTERS · FIRST DRAFT'),\n    ],\n  },\n];`,
  finalArcs,
);

const registryEntries = `  { key: 'kellan', displayName: 'Kellan Haldren', colorKey: 'kellan', aliases: ['Kellan Haldren', 'Kellan'], speakerKeys: ['kellan'] },

  // Final arc — Quaint additions and Shinsei's official Paragon seats.
  { key: 'luweiran', displayName: 'Lu Weiran', colorKey: 'luweiran', aliases: ['Lu Weiran', 'Lu'], speakerKeys: ['luweiran', 'lu'] },
  { key: 'xie_wuchen', displayName: 'Xie Wuchen', colorKey: 'xie_wuchen', aliases: ['Xie Wuchen', 'Xie'], speakerKeys: ['xie_wuchen', 'xie'], currentRank: '#10' },
  { key: 'black_radiance', displayName: 'Yurushi Amagiri', colorKey: 'black_radiance', aliases: ['Yurushi Amagiri', 'Yurushi', 'Black Radiance'], speakerKeys: ['yurushi', 'black_radiance'], currentRank: 'UNR' },
  { key: 'tsubasa', displayName: 'Tsubasa Kurokawa', colorKey: 'tsubasa', aliases: ['Tsubasa Kurokawa', 'Tsubasa'], speakerKeys: ['tsubasa'], currentRank: 'Shinsei #1' },
  { key: 'shunto', displayName: 'Shunto Takamori', colorKey: 'shunto', aliases: ['Shunto Takamori', 'Shunto'], speakerKeys: ['shunto'], currentRank: 'Shinsei #2' },
  { key: 'kai', displayName: 'Kai Moriyama', colorKey: 'kai', aliases: ['Kai Moriyama', 'Kai'], speakerKeys: ['kai'], currentRank: 'Shinsei #3' },
  { key: 'haru', displayName: 'Haru Ishikawa', colorKey: 'haru', aliases: ['Haru Ishikawa', 'Haru'], speakerKeys: ['haru'], currentRank: 'Shinsei #4' },
  { key: 'eirik', displayName: 'Eirik Voss', colorKey: 'eirik', aliases: ['Eirik Voss', 'Eirik'], speakerKeys: ['eirik'], currentRank: 'Shinsei #5' },
  { key: 'hana', displayName: 'Hana Arakawa', colorKey: 'hana', aliases: ['Hana Arakawa', 'Hana'], speakerKeys: ['hana'], currentRank: 'Shinsei #6' },
  { key: 'aya', displayName: 'Aya Katsuragi', colorKey: 'aya', aliases: ['Aya Katsuragi', 'Aya'], speakerKeys: ['aya'], currentRank: 'Shinsei #7' },
  { key: 'kenji', displayName: 'Kenji Narukami', colorKey: 'kenji', aliases: ['Kenji Narukami', 'Kenji'], speakerKeys: ['kenji'], currentRank: 'Shinsei #8' },
  { key: 'jun', displayName: 'Jun Kajihara', colorKey: 'jun', aliases: ['Jun Kajihara', 'Jun'], speakerKeys: ['jun'], currentRank: 'Shinsei #9' },
  { key: 'nao', displayName: 'Nao Shibasaki', colorKey: 'nao', aliases: ['Nao Shibasaki', 'Nao'], speakerKeys: ['nao'], currentRank: 'Shinsei #10' },
];`;

await replaceOnce(
  'src/characterRegistry.ts',
  `  { key: 'kellan', displayName: 'Kellan Haldren', colorKey: 'kellan', aliases: ['Kellan Haldren', 'Kellan'], speakerKeys: ['kellan'] },\n];`,
  registryEntries,
);
await replaceOnce(
  'src/characterRegistry.ts',
  `  luweiran: 'Lu Weiran', seoryeong: 'Han Seoryeong',`,
  `  seoryeong: 'Han Seoryeong',`,
);
await replaceOnce(
  'src/characterRegistry.ts',
  `  if (entry.key === 'yun') return season <= 22 ? '' : '#10';\n  return entry.currentRank || '';`,
  `  if (entry.key === 'yun') return season <= 22 ? '' : '#10';\n  if (entry.key === 'xie_wuchen') return season >= 101 ? '#10' : '';\n  return entry.currentRank || '';`,
);
await replaceOnce(
  'src/characterRegistry.ts',
  `  ['brynja', 'Brynja Kharvorn'], ['oskar', 'Oskar Solvane'], ['astrid', 'Astrid Vardrenn'], ['jorek', 'Jorek Norrvek'], ['freya', 'Freya Ysmark'], ['kellan', 'Kellan Haldren'],\n];`,
  `  ['brynja', 'Brynja Kharvorn'], ['oskar', 'Oskar Solvane'], ['astrid', 'Astrid Vardrenn'], ['jorek', 'Jorek Norrvek'], ['freya', 'Freya Ysmark'], ['kellan', 'Kellan Haldren'],\n  ['luweiran', 'Lu Weiran'], ['xie_wuchen', '#10 Xie Wuchen'], ['black_radiance', 'UNR Yurushi Amagiri'],\n  ['tsubasa', 'Shinsei #1 Tsubasa'], ['shunto', 'Shinsei #2 Shunto'], ['kai', 'Shinsei #3 Kai'], ['haru', 'Shinsei #4 Haru'], ['eirik', 'Shinsei #5 Eirik'],\n  ['hana', 'Shinsei #6 Hana'], ['aya', 'Shinsei #7 Aya'], ['kenji', 'Shinsei #8 Kenji'], ['jun', 'Shinsei #9 Jun'], ['nao', 'Shinsei #10 Nao'],\n];`,
);

await replaceOnce(
  'src/novel.ts',
  `  if (season !== undefined && season >= 95 && (name === 'Yun Shizhen' || name === 'Yun')) return 'deceased';`,
  `  if (season !== undefined && season > 100 && (name === 'Yun Shizhen' || name === 'Yun')) return 'deceased';`,
);

await replaceOnce(
  'src/react/styles/global.css',
  `--char-ilyra:#E76A6A;--char-jiang:#CE6AE7;--char-wei:#E7CE6A;--char-huo:#D7E8B0;--char-black_radiance:#B99CE8;--char-xie_wuchen:#7FD8E8;--char-nam:#C08BE4;`,
  `--char-ilyra:#E76A6A;--char-jiang:#CE6AE7;--char-wei:#E7CE6A;--char-huo:#D7E8B0;--char-black_radiance:#B99CE8;--char-xie_wuchen:#7FD8E8;--char-luweiran:#86EFAC;--char-tsubasa:#FBBF24;--char-shunto:#FB7185;--char-kai:#FDBA74;--char-haru:#A7F3D0;--char-eirik:#CBD5E1;--char-hana:#67E8F9;--char-aya:#F9A8D4;--char-kenji:#C4B5FD;--char-jun:#FDE68A;--char-nao:#93C5FD;--char-nam:#C08BE4;`,
);

await replaceOnce(
  'test/data.test.ts',
  `  it('has every canonical season as a non-empty array', () => {\n    for (let season = 1; season <= TOTAL_SEASONS; season++) {\n      const episodes = raw[\`season\${season}\` as \`season\${number}\`];\n      expect(Array.isArray(episodes), \`season\${season}\`).toBe(true);\n      expect(episodes.length, \`season\${season}\`).toBeGreaterThan(0);\n    }\n  });`,
  `  it('keeps legacy src/data.json seasons contiguous while generated sources extend the archive', () => {\n    const sourceSeasons = Object.keys(raw)\n      .filter((key) => /^season\\d+$/.test(key))\n      .map((key) => Number(key.slice(6)))\n      .sort((a, b) => a - b);\n    const expected = Array.from({ length: sourceSeasons.at(-1) || 0 }, (_, index) => index + 1);\n    expect(sourceSeasons).toEqual(expected);\n    expect(sourceSeasons.at(-1)).toBeLessThanOrEqual(TOTAL_SEASONS);\n    for (const season of sourceSeasons) {\n      const episodes = raw[\`season\${season}\` as \`season\${number}\`];\n      expect(Array.isArray(episodes), \`season\${season}\`).toBe(true);\n      expect(episodes.length, \`season\${season}\`).toBeGreaterThan(0);\n    }\n  });`,
);

console.log('Applied final-arc reader metadata, registry, rank and test integration patches.');
