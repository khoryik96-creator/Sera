export type PreviewSection = 'overview' | 'characters' | 'villains' | 'techniques' | 'chapters' | 'bookmarks' | 'rankings' | 'legends' | 'former' | 'timeline' | 'canon';

export interface PreviewNavItem {
  id: PreviewSection;
  label: string;
  shortLabel: string;
}

export const navigationItems: PreviewNavItem[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Home' },
  { id: 'characters', label: 'Characters', shortLabel: 'Cast' },
  { id: 'villains', label: 'Other Characters / Villains', shortLabel: 'Others' },
  { id: 'techniques', label: 'Arts & Techniques', shortLabel: 'Arts' },
  { id: 'chapters', label: 'Episodes', shortLabel: 'Read' },
  { id: 'bookmarks', label: 'Bookmarks', shortLabel: 'Saved' },
  { id: 'rankings', label: 'Rankings', shortLabel: 'Ranks' },
  { id: 'legends', label: 'Legends', shortLabel: 'Legends' },
  { id: 'former', label: 'Former Rank Holders', shortLabel: 'Former' },
  { id: 'timeline', label: 'Sera Timeline', shortLabel: 'Sera' },
  { id: 'canon', label: 'Canon', shortLabel: 'Canon' },
];
