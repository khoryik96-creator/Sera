import fs from 'node:fs';

const dataPath = 'src/data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function upsertArcFigure(patch) {
  const index = data.arcFigures.findIndex((figure) => figure.key === patch.key);
  if (index >= 0) data.arcFigures[index] = { ...data.arcFigures[index], ...patch };
  else data.arcFigures.push(patch);
}

const strengthOnly = {
  ji: 'Calamity-class',
  cao: 'Calamity-class',
  ye: 'Calamity-class',
  lin: 'Specialist — not formally rated for direct combat',
  yan: 'Not formally rated — biological-Seal specialist',
  meizhen: 'Not formally rated — forensic physician',
  yunke: 'Strategist — not formally rated for direct combat',
  gaoren: 'Formation commander — exact cultivation not formally rated',
  shufen: 'Assassin commander — exact cultivation not formally rated',
  baotien: 'Logistics specialist — not formally rated for direct combat',
  shiyue: 'Custodian — exact cultivation not formally rated',
  chun: 'Sealing specialist — exact cultivation not formally rated',
  gwon: 'Assassin — exact cultivation not formally rated',
  daemun: 'Campaign organizer — exact cultivation not formally rated',
  baek: 'Sect leader — exact cultivation not formally rated',
  gong: 'Strategist — exact cultivation not formally rated',
  mi: 'Strategist — exact cultivation not formally rated',
  zhao_renkai: 'Field commander — exact cultivation not formally rated',
  draven: 'Crown III combatant — exact cultivation not formally rated',
};
for (const [key, strength] of Object.entries(strengthOnly)) upsertArcFigure({ key, strength });

const richFigures = [
  {
    key: 'ren', name: 'Ren Qiao', strength: 'Non-combatant physician',
    subtitle: 'Yuecheng physician and innkeeper', affiliation: 'Yuecheng — independent', affiliationRole: 'City physician and innkeeper',
    details: 'A Yuecheng physician whose hands are permanently stained with herbal ink. She runs the inn where Sera and Rhen first stay in the moonless city and explains that its people have gone years without a moon or restful sleep.',
    firstSeason: 13, firstEpisode: 1, firstEpisodeTitle: 'The City Without a Moon', firstArc: 'The City Without a Moon',
  },
  {
    key: 'miri', name: 'Jae Miri', strength: 'Mid Marquis',
    subtitle: 'Unranked mid-Marquis weapon specialist', affiliation: 'Independent', affiliationRole: 'Weapon specialist / Arin’s Season 23 test opponent',
    details: 'An unranked mid-Marquis specialist whose segmented staff changes between short staff, spear and linked blades through internal tension. She tests Arin Vale in the temple courtyard and forces Arin to adapt to changing weapon geometry before surrendering cleanly.',
    firstSeason: 23, firstEpisode: 6, firstEpisodeTitle: 'Arin’s Lesson', firstArc: 'Rank Transition',
  },
  {
    key: 'mareth', name: 'Mareth Duskvein', strength: 'Peak Sovereign, approaching Paragon',
    subtitle: 'Keeper of the Last Pulse · Head of Duskvein', affiliation: 'Duskvein Guild — Isgard', affiliationRole: 'Guild head / Keeper of the Last Pulse',
    details: 'Duskvein’s austere leader and the primary antagonist of the Bannerfall crisis. His basin lattice reaches Peak Sovereign pressure approaching Paragon by borrowing force from prepared poison anchors and dependent bodies; it resembles a Dominion from outside but is not one.',
    firstSeason: 80, firstEpisode: 152, firstEpisodeTitle: 'Duskvein Brings Five Living Trophies', firstArc: 'Where the Black Wick Leads',
  },
  {
    key: 'garran', name: 'Garran Duskvein', strength: 'High Sovereign',
    subtitle: 'The Iron Leech · Duskvein First Executioner', affiliation: 'Duskvein Guild — Isgard', affiliationRole: 'First Executioner',
    details: 'Duskvein’s High Sovereign execution chief. Garran uses iron-ring circulation systems linked to the prison lattice and is responsible for breaking prestigious captives for public display, concentrating his cruelty on Ilyra when her dual meridians resist the poison network.',
    firstSeason: 77, firstEpisode: 124, firstEpisodeTitle: 'Ilyra Holds Two Poisons', firstArc: 'Where the Black Wick Leads',
  },
  {
    key: 'eira', name: 'Eira Eirholt', strength: 'Established Sovereign',
    subtitle: 'Winter Physician · defensive Sovereign and mass stabilizer', affiliation: 'Eirholt — Winter Physicians, Isgard', affiliationRole: 'Senior physician / Winter Physician',
    details: 'A senior Eirholt physician assessed by Quiet Hands at Established Sovereign. Her cultivation is built around defense, survival and mass stabilization rather than dueling. She turns Eirholt against Duskvein’s Rank Four claim after proving its treatment records and medical neutrality were falsified.',
    firstSeason: 80, firstEpisode: 154, firstEpisodeTitle: 'Eirholt’s Physician Counts the Lies', firstArc: 'Where the Black Wick Leads',
  },
  {
    key: 'tor_veyrhald', name: 'Tor Veyrhald', strength: 'High Sovereign',
    subtitle: 'Iron Witness · Veyrhald envoy and Ledger authority', affiliation: 'Veyrhald — Unbroken Banner, Isgard', affiliationRole: 'Iron Witness / senior envoy',
    details: 'An older High Sovereign spear practitioner sent by first-ranked Veyrhald. Tor is explicitly not among Veyrhald’s strongest three; he carries Gate Seal and Ledger authority, protects lawful surrender and insists that evidence survive scrutiny before continental force is committed.',
    firstSeason: 80, firstEpisode: 153, firstEpisodeTitle: 'The First Banner Does Not Applaud', firstArc: 'Where the Black Wick Leads',
  },
  {
    key: 'brynja', name: 'Brynja Kharvorn', strength: 'Established Sovereign',
    subtitle: 'Kharvorn Sovereign commander · Iron Fjord', affiliation: 'Kharvorn — Iron Fjord, Isgard', affiliationRole: 'Sovereign commander / shore-engine commander',
    details: 'Commander of Kharvorn’s Iron Fjord forces, specializing in amphibious heavy infantry, landing denial and iron-hulled shore engines. During the Rimewall encirclement she controls the shore engines and anchors used to trap Shen Rui’s retreat routes.',
    firstSeason: 90, firstEpisode: 258, firstEpisodeTitle: 'Six Sovereigns Close the Water', firstArc: 'When Wuyue Marches North',
  },
  {
    key: 'oskar', name: 'Oskar Solvane', strength: 'Established Sovereign',
    subtitle: 'Solvane Sovereign commander · Winterglass Lances', affiliation: 'Solvane — Winterglass Lances, Isgard', affiliationRole: 'Sovereign commander',
    details: 'Commander of Solvane’s Winterglass Lances, a nine-thousand-strong long-spear cavalry force built to punish retreat. At Rimewall he seals Shen Rui’s northern withdrawal routes and repeatedly attacks the exact supply roads Rui had maintained for the hospital fleet.',
    firstSeason: 90, firstEpisode: 258, firstEpisodeTitle: 'Six Sovereigns Close the Water', firstArc: 'When Wuyue Marches North',
  },
  {
    key: 'astrid', name: 'Astrid Vardrenn', strength: 'Mid Sovereign',
    subtitle: 'Vardrenn Sovereign commander · Black Pine Wardens', affiliation: 'Vardrenn — Black Pine Wardens, Isgard', affiliationRole: 'Sovereign commander',
    details: 'Commander of Vardrenn’s Black Pine Wardens, an eight-thousand-strong force specializing in forest scouts, longbows, hidden roads and defensive ambush corridors. She holds fire when Sera exposes both armies and moves civilians through the contested corridor in plain sight.',
    firstSeason: 91, firstEpisode: 262, firstEpisodeTitle: 'Veiled Moon Cannot Hide an Army', firstArc: 'When Wuyue Marches North',
  },
  {
    key: 'jorek', name: 'Jorek Norrvek', strength: 'Established Sovereign',
    subtitle: 'Norrvek Sovereign commander · Chainforge Assembly', affiliation: 'Norrvek — Chainforge Assembly, Isgard', affiliationRole: 'Sovereign commander',
    details: 'Commander of Norrvek’s eight-thousand-strong Chainforge Assembly. His institution links siege chains, mobile walls, bridge capture and anti-fortification engineering into one command rhythm, making Norrvek structurally vital even when stronger Sovereigns exist elsewhere in the coalition.',
    firstSeason: 92, firstEpisode: 272, firstEpisodeTitle: 'Twenty Percent Does Not March Like an Army', firstArc: 'When Wuyue Marches North',
  },
  {
    key: 'freya', name: 'Freya Ysmark', strength: 'Mid Sovereign',
    subtitle: 'Ysmark Sovereign commander · Pale Wolf Banner', affiliation: 'Ysmark — Pale Wolf Banner, Isgard', affiliationRole: 'Sovereign commander',
    details: 'Commander of Ysmark’s seven-thousand-strong Pale Wolf Banner, specializing in pack pursuit, broken-ground skirmishing and recovery of isolated units. She suspends Pale Wolf recovery operations and demands an internal hearing after released prisoners prove that Duskvein falsified the deaths and routes of Ysmark companies.',
    firstSeason: 90, firstEpisode: 252, firstEpisodeTitle: 'Jin Cannot Spend Mo’s Citizens', firstArc: 'When Wuyue Marches North',
  },
  {
    key: 'kellan', name: 'Kellan Haldren', strength: 'Established Sovereign',
    subtitle: 'Haldren Sovereign commander · Ash-Horn Spears', affiliation: 'Haldren — Ash-Horn Spears, Isgard', affiliationRole: 'Sovereign commander',
    details: 'Commander of Haldren’s six-thousand Ash-Horn Spears, known for dense spear blocks, reserve reinforcement and disciplined attritional defense. Bound by an old oath to Veyrhald’s lawful continental defense, Kellan refuses Maedra’s unsigned Hearth order and withdraws rather than turn civilians into a military roadblock.',
    firstSeason: 90, firstEpisode: 251, firstEpisodeTitle: 'Five Pairs, One Exit', firstArc: 'When Wuyue Marches North',
  },
];
for (const figure of richFigures) upsertArcFigure(figure);

for (const former of data.former) {
  const name = former.name.replace(/^(?:Former\s+)?#\d+\s*-\s*/i, '').trim();
  if (name === 'Jian Ruo') former.strength = 'Duke-class · historical Top Five apex';
  if (name === 'Mo Qian') former.strength = 'Duke-class · historical Top Five';
  if (name === 'Yeon Hwa') former.strength = 'Marquis-class · historical #6';
}

for (const rows of Object.values(data.seasonCast || {})) {
  for (const row of rows || []) {
    const name = row.name.replace(/^(?:Former\s+)?#\d+\s*-\s*/i, '').trim();
    if (name === 'Luo Wen') {
      row.affiliation = 'Wuyue — Global Top Ten';
      row.affiliationRole = 'Global Top Ten swordsman';
    }
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data));

function replaceOrThrow(path, from, to) {
  const current = fs.readFileSync(path, 'utf8');
  if (!current.includes(from)) throw new Error(`Expected source block not found in ${path}`);
  fs.writeFileSync(path, current.replace(from, to));
}

replaceOrThrow('src/types.ts',
`export interface ArcFigure {\n  key: string;\n  name: string;\n  subtitle: string;\n  details: string;`,
`export interface ArcFigure {\n  key: string;\n  name: string;\n  subtitle: string;\n  details: string;\n  /** Explicit combat/cultivation assessment; may state that a specialist is not formally rated. */\n  strength?: string;`);
replaceOrThrow('src/types.ts',
`export interface Former {\n  name: string;\n  rank: string;`,
`export interface Former {\n  name: string;\n  rank: string;\n  /** Historical combat/cultivation assessment in the scale used by that era. */\n  strength?: string;`);
replaceOrThrow('src/types.ts',
`export interface SeasonCastEntry {\n  name: string;\n  role: string;\n  description: string;\n}`,
`export interface SeasonCastEntry {\n  name: string;\n  role: string;\n  description: string;\n  strength?: string;\n  affiliation?: string;\n  affiliationRole?: string;\n}`);

const readerOld = `  const loreFormer = loreEntry ? DB.former.find((entry) => cleanCharacterName(entry.name) === loreEntry.displayName) : undefined;\n  const loreSeasonCast = loreEntry ? Object.values(DB.seasonCast).flat().find((entry) => cleanCharacterName(entry.name) === loreEntry.displayName) : undefined;\n  const loreName = loreProfile ? cleanCharacterName(loreProfile.name) : loreArcFigure ? cleanCharacterName(loreArcFigure.name) : loreEntry?.displayName || '';\n  const loreRank = loreName ? rankLabel(loreName, season) : '';\n  const loreStatus = loreName ? rankStatus(loreName, season) : 'current';\n  const loreStrength = loreProfile?.cultivation?.trim()\n    || loreStrengthFrom([loreArcFigure?.subtitle, loreArcFigure?.affiliationRole, loreSeasonCast?.role, loreArcFigure?.details, loreSeasonCast?.description, loreFormer?.summary])\n    || 'Not recorded';\n  const loreAffiliation = loreProfile?.affiliation?.trim()\n    || loreArcFigure?.affiliation?.trim()\n    || inferLoreAffiliation(loreName)\n    || (loreFormer ? 'Historical ranking archive' : 'Not recorded');\n  const loreRole = loreProfile?.affiliationRole?.trim()\n    || loreArcFigure?.affiliationRole?.trim()\n    || cleanLoreRole(loreSeasonCast?.role)\n    || loreFormer?.title?.trim()\n    || 'No formal role recorded';\n  const loreSummary = loreProfile?.subtitle || loreArcFigure?.subtitle || loreSeasonCast?.description || loreFormer?.summary || 'Referenced in this chapter. No expanded archive entry is currently recorded.';`;
const readerNew = `  const loreFormer = loreEntry ? DB.former.find((entry) => cleanCharacterName(entry.name) === loreEntry.displayName) : undefined;\n  const loreSeasonCasts = loreEntry ? Object.entries(DB.seasonCast)\n    .flatMap(([castSeason, entries]) => entries.map((entry) => ({ ...entry, season: Number(castSeason) })))\n    .filter((entry) => cleanCharacterName(entry.name) === loreEntry.displayName)\n    .sort((a, b) => a.season - b.season) : [];\n  const lorePastSeasonCasts = loreSeasonCasts.filter((entry) => entry.season <= season);\n  const loreSeasonCast = lorePastSeasonCasts[lorePastSeasonCasts.length - 1] || loreSeasonCasts[0];\n  const loreName = loreProfile ? cleanCharacterName(loreProfile.name) : loreArcFigure ? cleanCharacterName(loreArcFigure.name) : loreEntry?.displayName || '';\n  const loreRank = loreName ? rankLabel(loreName, season) : '';\n  const loreStatus = loreName ? rankStatus(loreName, season) : 'current';\n  const loreStrength = loreProfile?.cultivation?.trim()\n    || loreArcFigure?.strength?.trim()\n    || loreSeasonCast?.strength?.trim()\n    || loreFormer?.strength?.trim()\n    || loreStrengthFrom([loreArcFigure?.subtitle, loreArcFigure?.affiliationRole, ...loreSeasonCasts.flatMap((entry) => [entry.role, entry.description]), loreArcFigure?.details, loreFormer?.summary])\n    || 'Not formally rated';\n  const loreAffiliation = loreProfile?.affiliation?.trim()\n    || loreArcFigure?.affiliation?.trim()\n    || loreSeasonCast?.affiliation?.trim()\n    || inferLoreAffiliation(loreName)\n    || (loreFormer ? 'Historical ranking archive' : 'Independent / no formal affiliation');\n  const loreRole = loreProfile?.affiliationRole?.trim()\n    || loreArcFigure?.affiliationRole?.trim()\n    || loreSeasonCast?.affiliationRole?.trim()\n    || cleanLoreRole(loreSeasonCast?.role)\n    || loreFormer?.title?.trim()\n    || 'Referenced figure';\n  const loreSummary = loreProfile?.subtitle || loreArcFigure?.subtitle || loreSeasonCast?.description || loreFormer?.summary || 'Referenced in this chapter.';`;
replaceOrThrow('src/react/features/reader/ReaderPage.tsx', readerOld, readerNew);

replaceOrThrow('src/react/features/villains/VillainsPage.tsx',
`      const strength = loreStrengthFrom([row.role, row.description]);\n      const role = cleanLoreRole(row.role);\n      const affiliation = inferLoreAffiliation(name);`,
`      const strength = row.strength?.trim() || loreStrengthFrom([row.role, row.description]);\n      const role = row.affiliationRole?.trim() || cleanLoreRole(row.role);\n      const affiliation = row.affiliation?.trim() || inferLoreAffiliation(name);`);
replaceOrThrow('src/react/features/villains/VillainsPage.tsx',
`        strength: loreStrengthFrom([figure.subtitle, figure.affiliationRole, figure.details]) || undefined,`,
`        strength: figure.strength?.trim() || loreStrengthFrom([figure.subtitle, figure.affiliationRole, figure.details]) || undefined,`);

console.log('Applied highlighted lore backfill and explicit strength support.');
