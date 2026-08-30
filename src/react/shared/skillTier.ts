/**
 * Power-tier labelling shared by the Characters page and the search palette so
 * every surface derives a skill's rank the same way. Purely presentational — it
 * reads the category and rating already stored in the data and invents no canon.
 * The vocabulary matches Sera's own hand-authored tiers
 * (★★★★☆ → "Named Technique", ★★★★★ → "Transcended Skill").
 */
export function powerTierFromRating(rating: string | undefined): string | undefined {
  const value = (rating || '').trim();
  if (!value) return undefined;
  const upper = value.toUpperCase();
  if (upper.includes('SUPREME')) return 'Supreme Art';
  if (upper.includes('TRANSCENDED')) return 'Transcended Art';
  if (value.includes('★★★★★+')) return 'Evolved Supreme Art';
  if (value.includes('★★★★★')) return 'Transcended Skill';
  if (value.includes('★★★★')) return 'Named Technique';
  return undefined;
}

/**
 * Power-tier label for a ranked skill. A tier word already carried in the
 * skill's own category (e.g. "Supreme Offense", "Transcended Art") is
 * authoritative so the badge never contradicts the category shown beside it;
 * otherwise the label is derived from the star rating.
 */
export function powerTier(category: string | undefined, rating: string | undefined): string | undefined {
  const cat = (category || '').toLowerCase();
  if (cat.includes('ultimate')) return 'Ultimate Art';
  if (cat.includes('supreme')) return 'Supreme Art';
  if (cat.includes('transcended')) return 'Transcended Art';
  return powerTierFromRating(rating);
}
