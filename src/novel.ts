import { escRe } from './dom';
import { characterRegistry, colorKeyMap, novelNameMap, rankForStory, seasonScopedAliases, speakerName } from './characterRegistry';
import { DB } from './db';
import { powerTier } from './react/shared/skillTier';

export { rankForStory } from './characterRegistry';

type NovelRankTone = 'current' | 'former' | 'retired' | 'deceased' | 'unranked';

export interface RenderNovelOptions {
  interactiveNames?: boolean;
}

function entryForAlias(name: string) {
  return characterRegistry.find((entry) => entry.aliases.includes(name));
}

function entryForSpeaker(key: string) {
  return characterRegistry.find((entry) => (entry.speakerKeys || [entry.key]).includes(key));
}

function characterMarkup(name: string, colorKey: string, characterKey: string | undefined, className: string, interactive: boolean): string {
  if (!interactive || !characterKey) return `<span class="${className} character-${colorKey}">${name}</span>`;
  return `<button type="button" class="${className} character-${colorKey} novel-lore-link" data-character-key="${characterKey}" aria-label="Open lore for ${name}">${name}</button>`;
}

function annotateDialogue(text: string, interactiveNames: boolean): string {
  return String(text || '').split('\n').map((line) => {
    const match = line.match(/^\[\[speaker:([a-z0-9_]+)\]\](.*)$/);
    if (!match) return line;
    const speakerKey = match[1];
    const key = colorKeyMap[speakerKey] || speakerKey;
    const name = speakerName(speakerKey);
    const entry = entryForSpeaker(speakerKey);
    const speaker = characterMarkup(name, key, entry?.key, 'novel-speaker dialogue-speaker', interactiveNames);
    return `<span class="novel-dialogue dialogue-card character-${key}">${speaker}<b class="dialogue-quote">${match[2]}</b></span>`;
  }).join('\n');
}

type ArtTone = 'ultimate' | 'supreme' | 'transcended' | 'named';
export interface ArtInfo { name: string; tone: ArtTone; label: string; category: string; blurb: string }

/** Escape a string for safe use inside a double-quoted HTML attribute. */
function escAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Trim a skill description down to a one-or-two-sentence blurb (~220 chars). */
function clipBlurb(text: string): string {
  const value = text.trim().replace(/\s+/g, ' ');
  if (value.length <= 220) return value;
  const cut = value.slice(0, 220);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return stop > 80 ? cut.slice(0, stop + 1) : `${cut.trimEnd()}…`;
}

function artTone(label: string): ArtTone {
  const value = label.toLowerCase();
  if (value.includes('ultimate')) return 'ultimate';
  if (value.includes('supreme')) return 'supreme';
  if (value.includes('transcended')) return 'transcended';
  return 'named';
}

// Named arts are auto-styled in prose from the same skill data the profiles use,
// so a chapter never has to carry explicit skill markup. Built lazily and cached
// against the current DB, longest name first so overlapping names resolve to the
// most specific art.
let artCache: { source: unknown; arts: ArtInfo[] } | null = null;
function knownArts(): ArtInfo[] {
  if (artCache && artCache.source === DB) return artCache.arts;
  const arts: ArtInfo[] = [];
  const add = (name: string | undefined, label: string | undefined, category?: string, blurb?: string): void => {
    const clean = (name || '').trim();
    if (!clean || !label) return;
    arts.push({ name: clean, tone: artTone(label), label, category: (category || '').trim(), blurb: clipBlurb(blurb || '') });
  };
  for (const rows of Object.values(DB?.topSkills || {})) {
    for (const skill of rows) add(skill.name, powerTier(skill.category, skill.rating), skill.category, skill.description || skill.signature);
  }
  for (const skill of [...(DB?.rhenSkills || []), ...(DB?.seraSkills || [])]) {
    add(skill.name, skill.tier || powerTier(skill.category, skill.rating), skill.category, skill.short || skill.signature || skill.mechanics);
  }
  for (const figure of DB?.arcFigures || []) {
    for (const skill of figure.skills || []) {
      if (/(supreme|transcended|ultimate)/i.test(skill[1] || '')) add(skill[0], skill[1], skill[1], skill[2]);
    }
  }
  const seen = new Set<string>();
  const unique = arts.filter((art) => (seen.has(art.name) ? false : (seen.add(art.name), true)));
  unique.sort((a, b) => b.name.length - a.name.length);
  artCache = { source: DB, arts: unique };
  return unique;
}

/** Look up the tier, type and short description for a named art by its exact
 *  name — used by the reader to render the mini-card for a clicked gold skill. */
export function artLore(name: string): ArtInfo | undefined {
  return knownArts().find((art) => art.name === name);
}

/**
 * Style named arts inline (rank symbol + tier-toned colour) wherever they appear
 * in prose. Case-sensitive, whole-name matches only, so the capitalised art
 * "Veiled Moon" is styled while the descriptive "veiled moon" is left alone.
 */
function annotateArtNames(text: string, interactive: boolean): string {
  const arts = knownArts();
  if (!arts.length) return String(text || '');
  let out = String(text || '');
  const held: string[] = [];
  out = out.replace(/<[\s\S]*?>/g, (markup) => { const token = `@@TAG${held.length}@@`; held.push(markup); return token; });
  const placeholders: string[] = [];
  for (const art of arts) {
    // Prose uses typographic apostrophes while the skill data uses straight ones
    // (and vice-versa), so match either — otherwise "Sovereign's March" is missed.
    const pattern = escRe(art.name).replace(/[’']/g, "[\\u2019']");
    const re = new RegExp('\\b' + pattern + '\\b', 'g');
    out = out.replace(re, (match) => {
      const token = `@@ART${placeholders.length}@@`;
      // In the focused reader the art is a real button that opens its mini-card;
      // elsewhere it stays a non-interactive styled span.
      placeholders.push(interactive
        ? `<button type="button" class="novel-art novel-art--${art.tone} novel-art-link" data-art-name="${escAttr(art.name)}" title="${escAttr(art.label)}" aria-label="What is ${escAttr(art.name)}?">${match}</button>`
        : `<span class="novel-art novel-art--${art.tone}" title="${escAttr(art.label)}">${match}</span>`);
      return token;
    });
  }
  placeholders.forEach((value, index) => { out = out.replaceAll(`@@ART${index}@@`, value); });
  held.forEach((value, index) => { out = out.replaceAll(`@@TAG${index}@@`, value); });
  return out;
}

function annotateSkills(text: string): string {
  let out = String(text || '');
  out = out.replace(/(^|\n)(✦\s*)?(SUPREME PASSIVE ART|SUPREME ART|TRANSCENDED SKILL|TRANSCENDED ART|ULTIMATE ART)\s*[—-]\s*([^\n<]+)/gi, (_m, prefix, _star, tier, name) =>
    `${prefix}<span class="novel-skill-supreme"><strong>✦ ${tier.toUpperCase()} — ${name.trim()}</strong></span>`);
  const known = ['The Orchid Blooms Only Once'];
  known.forEach((name) => {
    const re = new RegExp('(^|\\n)(?:✦\\s*)?' + escRe(name) + '(?=\\n|$|\\.)', 'gi');
    out = out.replace(re, (_m, prefix) => `${prefix}<span class="novel-skill-supreme"><strong>✦ SUPREME ART — ${name}</strong></span>`);
  });
  out = out.replace(/(^|\n)✦ TECHNIQUE\s*[—-]\s*([^\n<]+)/gi, (_m, prefix, name) => `${prefix}<span class="novel-skill-callout"><strong>✦ TECHNIQUE — ${name.trim()}</strong></span>`);
  return out;
}

function effectiveRank(name: string, season?: number): string {
  // Qin and Han are active #6/#8 before the Ranking Succession arc. Their
  // registry stores present-day status, so preserve the historical badge in prose.
  if (season && season <= 22) {
    if (name === 'Qin Luo' || name === 'Qin') return '#6';
    if (name === 'Han Myeong' || name === 'Han') return '#8';
  }
  return rankForStory(name, season);
}

function rankTone(name: string, rank: string, season?: number): NovelRankTone {
  if (rank === 'UNR') return 'unranked';
  const currentEra = !season || season >= 23;
  if (currentEra && (name === 'Han Myeong' || name === 'Han')) return 'deceased';
  if (currentEra && (name === 'Qin Luo' || name === 'Qin')) return 'retired';
  if (rank.startsWith('Former ')) return 'former';
  return 'current';
}

function rankBadgeMarkup(rank: string, name: string, season?: number): string {
  if (!rank) return '';
  const tone = rankTone(name, rank, season);
  const base = rank.replace(/^Former\s+/i, '').trim();
  const label = tone === 'deceased'
    ? `${base} †`
    : tone === 'retired'
      ? `${base} <span class="rank-badge__state">RET</span>`
      : tone === 'former'
        ? `${base} <span class="rank-badge__state">FORMER</span>`
        : base;
  return `<span class="rank-badge rank-badge--${tone}">${label}</span>`;
}

// Some short aliases are reused by a later, unrelated character, so auto-tagging
// them past a cut-off would mislabel that character. Keyed by alias, value is the
// last season in which the alias still resolves to its registry character. The
// Beneath the Crooked Sign seasons (65+) reuse two surnames the earlier cast
// owned: "Han" (Former #8 Han Myeong → the apprentice Han Mira) and "Wei"
// (Former #5 Wei Zhen → the physician Wei An). Both original holders appear only
// through the epilogue, so from season 65 the bare surname renders as plain text.
// "Tor" is likewise retired after season 74: the Isgard seasons (75+) reuse the
// bare given name for Tor Veyrhald, handled season-aware via seasonScopedAliases
// below so it never inherits Tor Veydan's rank IV badge.
const aliasLastSeason: Record<string, number> = { Han: 64, Wei: 64, Tor: 74 };

// A bare single-word alias immediately followed by another capitalised name-word
// is almost always a *different* character whose surname or given name happens to
// match the alias (e.g. "Wei Shuang" the Hollow Saint vs Former #5 Wei Zhen, or
// the apprentice "Han Mira" vs Han Myeong). Any such compound that is a genuine
// registry character is consumed earlier by its own longer alias, so whatever
// reaches this stage is an unregistered new character and must not inherit the
// alias-holder's badge. The exception is a following honorific/relationship word,
// where the alias really is the registry character being addressed by title.
export const nameHonorifics = new Set([
  'Teacher', 'Master', 'Mother', 'Father', 'Sister', 'Brother', 'Elder', 'Sovereign',
  'Lord', 'Lady', 'Aunt', 'Uncle', 'Sir', 'Madam', 'Miss', 'Doctor', 'Physician',
  'General', 'Captain', 'Commander', 'Governor', 'Grandmother', 'Grandfather', 'Senior', 'Junior',
]);

/** True when a single-word alias at this position is the head of a different
 *  character's compound name (followed by a capitalised non-honorific word). */
function startsForeignCompound(alias: string, rest: string): boolean {
  if (/\s/.test(alias)) return false;
  const next = /^\s+([A-Z][a-z]+)/.exec(rest);
  return next !== null && !nameHonorifics.has(next[1]);
}

function annotateNamesForSeason(text: string, season: number | undefined, interactiveNames: boolean): string {
  let out = String(text || '');
  const held: string[] = [];
  const hold = (markup: string): string => {
    const token = `@@SPAN${held.length}@@`;
    held.push(markup);
    return token;
  };
  // Protect existing markup from the name pass. Spans first (a dialogue span
  // wraps its speaker button, so holding spans keeps that button inside it),
  // then any standalone art buttons that remain in ordinary prose.
  out = out.replace(/<span[\s\S]*?<\/span>/g, hold);
  out = out.replace(/<button[\s\S]*?<\/button>/g, hold);

  const placeholders: string[] = [];
  novelNameMap.forEach(([name, key]) => {
    // Skip an alias that has been retired for this season (a later character
    // reuses the bare name), so the newer character is not stamped with the
    // original holder's badge.
    const lastSeason = aliasLastSeason[name];
    if (lastSeason !== undefined && season !== undefined && season > lastSeason) return;
    // Consume any legacy inline numeric rank immediately before the name so the
    // reader always shows one canonical Lucy-style badge instead of "#1 - Name".
    const re = new RegExp('(?:(?:Former\\s+)?#\\d+\\s*(?:—|-)?\\s*)?\\b' + escRe(name) + '\\b', 'g');
    out = out.replace(re, (match: string, offset: number, full: string) => {
      // Leave the alias untagged when it heads a different character's compound
      // name, so e.g. "Wei Shuang" never inherits Wei Zhen's badge.
      if (startsForeignCompound(name, full.slice(offset + match.length))) return match;
      const rank = effectiveRank(name, season);
      const badge = rankBadgeMarkup(rank, name, season);
      const token = `@@NAME${placeholders.length}@@`;
      const entry = entryForAlias(name);
      const label = characterMarkup(name, key, entry?.key, 'novel-character-name', interactiveNames);
      placeholders.push(`<span class="ranked-name">${label}${badge}</span>`);
      return token;
    });
  });

  // Second pass: bare aliases that a later character reuses (e.g. "Tor" →
  // Tor Veyrhald from season 75). The original holder was retired above via
  // aliasLastSeason, so from the handover season the bare name resolves to the
  // newcomer instead — coloured, but with no rank badge, since the Isgard cast
  // sits outside the numeric world ranking.
  if (season !== undefined) {
    seasonScopedAliases.forEach(({ alias, fromSeason, key }) => {
      if (season < fromSeason) return;
      const entry = characterRegistry.find((item) => item.key === key);
      if (!entry) return;
      const re = new RegExp('\\b' + escRe(alias) + '\\b', 'g');
      out = out.replace(re, (match: string, offset: number, full: string) => {
        // Leave it untagged when it heads a different character's compound name.
        if (startsForeignCompound(alias, full.slice(offset + match.length))) return match;
        const token = `@@NAME${placeholders.length}@@`;
        const label = characterMarkup(match, entry.colorKey, entry.key, 'novel-character-name', interactiveNames);
        placeholders.push(`<span class="ranked-name">${label}</span>`);
        return token;
      });
    });
  }

  placeholders.forEach((value, index) => { out = out.replaceAll(`@@NAME${index}@@`, value); });
  held.forEach((value, index) => { out = out.replaceAll(`@@SPAN${index}@@`, value); });
  return out;
}

/** Convert Markdown-style **bold** emphasis into real bold, so the authoring
 *  marker never shows as literal asterisks in the reader. */
function annotateBold(text: string): string {
  return String(text || '').replace(/\*\*(?=\S)([^*\n]+?)\*\*/g, '<strong>$1</strong>');
}

/** Render an episode/legend body: dialogue cards, skill callouts, and ranked names. */
export function renderNovel(text: string, season?: number, options: RenderNovelOptions = {}): string {
  const interactive = Boolean(options.interactiveNames);
  const html = annotateNamesForSeason(annotateSkills(annotateDialogue(annotateArtNames(annotateBold(text), interactive), interactive)), season, interactive);
  return html.replace(/\n*(<span class="novel-dialogue[\s\S]*?<\/span>)\n*/g, '$1');
}
