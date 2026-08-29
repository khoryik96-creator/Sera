import type { CanonRule } from './types';

/**
 * Stable reference rules that existed in the tested legacy Canon panel but are
 * not represented in data.json's newer arc-specific canonRules collection.
 * Keep this list limited to evergreen setting/story constraints; archive UI
 * behavior and obsolete season-specific notes do not belong here.
 */
export const restoredCanonReferences: CanonRule[] = [
  {
    title: 'Season 1 Lock',
    text: 'Season 1 is locked as the established foundation and is not to be casually restructured by later-season work.',
  },
  {
    title: 'Murim Power System',
    text: 'Qi, internal strength, meridians, sword qi, killing intent, qinggong, martial perception, acupoints, cultivation, body refinement, weapons, and formations. No Western magic or spellcasting.',
  },
  {
    title: 'Novel Reveal Ladder',
    text: 'Do not reveal high-tier arts too early. The novel establishes ordinary named techniques first, then Transcended Skills. True Supreme Arts are reserved for later seasons after Transcended Skills already feel established. Ultimate Arts are very-late-story reveals. Seasons 1–3 must not fully reveal Rhen’s or Sera’s true Supreme or Ultimate Arts.',
  },
  {
    title: 'Formal Technique Tier Hierarchy',
    text: 'Named Technique < Transcended Skill < Supreme Art < Ultimate Art. “Transcended Skill” is the canonical name for that tier. A Transcended Skill breaks normal martial limitations; a Supreme Art stands above it in principle, complexity, control, or destructive potential. The hierarchy describes power tier, not permission to reveal everything early. Rhen’s Petals Beneath a Frozen Moon is his absolute Ultimate Art and is revealed once in Season 59 against Aethon.',
  },
  {
    title: 'Rhen Recognition Rule',
    text: 'Only the Five Dukes (#1–#5) know before the main story that Rhen’s face, healer identity, and frozen-petal martial myth belong to the same person. The Five Marquises do not initially know.',
  },
  {
    title: 'Sera + Rhen Center Rule',
    text: 'Sera and Rhen are the two protagonists. Ranked characters, Dukes, Calamities, factions, and historical legends expand their story rather than replace it.',
  },
  {
    title: 'Duke / Marquis Structure',
    text: '#1–#5 are Dukes and #6–#10 are Marquises by board category. Historically there was a huge #5-to-#6 power cliff, but the current board is exceptional: #6 Ilyra is stronger than several Dukes in direct combat while Kael, Tae and Liang remain above her overall. Sera is retired outside the board and later grows beyond Duke level.',
  },
  {
    title: 'Duke Rarity Rule',
    text: 'Living current Dukes are rare story events. They should be built through reputation, consequences, and history before physically appearing. Rui is the primary exception when his personal Rhen connection directly serves the central story.',
  },
  {
    title: 'Visual Motifs',
    text: 'Rhen: frozen sakura petals, winter, moonlight, impossible refinement. Sera: pale orchids, translucent silk, elegance, concealed lethality, and deliberate precision.',
  },
];
