/** Isgard grouping helpers — decide whether an archive figure belongs to Isgard
 *  and derive the guild/house label used to group the Isgard tab. */

/** True when an affiliation places the figure inside Isgard. */
export function isIsgardAffiliation(affiliation?: string | null): boolean {
  return /\bisgard\b/i.test(affiliation || '');
}

/** The guild / house / banner portion of an Isgard affiliation, used as the
 *  grouping heading. The affiliation stores the guild first and an "— Isgard"
 *  or ", Isgard" tail (e.g. "Dravaryn Crimson Host — Isgard",
 *  "Eirholt — Winter Physicians, Isgard"); strip that tail for the heading. */
export function isgardGuild(affiliation?: string | null): string {
  const raw = (affiliation || '').trim();
  if (!raw) return 'Isgard';
  const withoutTail = raw.replace(/\s*[—,-]\s*Isgard\s*$/i, '').trim();
  return withoutTail || 'Isgard';
}

/** A punctuation-insensitive key for grouping, so the same house written two
 *  ways — "Skeldran Thousandfold Hunt" vs "Skeldran — Thousandfold Hunt"
 *  (arc-figure data vs an inferred affiliation) — collapses into one group,
 *  while genuinely distinct banners ("Veyrhald First Banner" vs "Veyrhald
 *  Unbroken Banner") stay apart. */
export function isgardGuildKey(affiliation?: string | null): string {
  return isgardGuild(affiliation)
    .toLowerCase()
    .replace(/[—–-]/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
