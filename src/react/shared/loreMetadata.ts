const STRENGTH_PATTERN = /\b(?:(?:Entry|Established|Stable|Low|Mid|High|Peak)\s+(?:Paragon|Sovereign|Duke|Marquis|Grandmaster|Master)|Paragon|Sovereign|Duke|Marquis|Grandmaster|High Master|Master|Overlord|Ancient King|Calamity)\b/i;

const NORTHERN_AFFILIATIONS: Array<[RegExp, string]> = [
  [/\bDuskvein\b/i, 'Duskvein Guild — Isgard'],
  [/\bVeyrhald\b/i, 'Veyrhald — Unbroken Banner, Isgard'],
  [/\bDravaryn\b/i, 'Dravaryn — Crimson Vanguard, Isgard'],
  [/\bSkeldran\b/i, 'Skeldran — Thousandfold Hunt, Isgard'],
  [/\bEirholt\b/i, 'Eirholt — Winter Physicians, Isgard'],
  [/\bKharvorn\b/i, 'Kharvorn — Isgard'],
  [/\bSolvane\b/i, 'Solvane — Isgard'],
  [/\bVardrenn\b/i, 'Vardrenn — Isgard'],
  [/\bNorrvek\b/i, 'Norrvek — Isgard'],
  [/\bYsmark\b/i, 'Ysmark — Isgard'],
  [/\bHaldren\b/i, 'Haldren — Isgard'],
];

export function loreStrengthFrom(values: Array<string | null | undefined>): string {
  for (const value of values) {
    const match = value?.match(STRENGTH_PATTERN)?.[0];
    if (match) return match;
  }
  return '';
}

export function cleanLoreRole(value: string | null | undefined): string {
  if (!value) return '';
  const strength = value.match(STRENGTH_PATTERN)?.[0];
  const withoutStrength = strength ? value.replace(strength, '') : value;
  return withoutStrength
    .replace(/^[\s·•|—,:;-]+/, '')
    .replace(/[\s·•|—,:;-]+$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function inferLoreAffiliation(name: string): string {
  for (const [pattern, affiliation] of NORTHERN_AFFILIATIONS) {
    if (pattern.test(name)) return affiliation;
  }
  return '';
}
