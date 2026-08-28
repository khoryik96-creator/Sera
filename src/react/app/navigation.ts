export type PreviewSection = 'overview' | 'characters' | 'chapters' | 'bookmarks' | 'rankings';

export interface PreviewNavItem {
  id: PreviewSection;
  label: string;
  shortLabel: string;
}

export const navigationItems: PreviewNavItem[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Home' },
  { id: 'characters', label: 'Characters', shortLabel: 'Cast' },
  { id: 'chapters', label: 'Episodes', shortLabel: 'Read' },
  { id: 'bookmarks', label: 'Bookmarks', shortLabel: 'Saved' },
  { id: 'rankings', label: 'Rankings', shortLabel: 'Ranks' },
];
