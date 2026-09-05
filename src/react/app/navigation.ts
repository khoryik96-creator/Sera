export type AppSection = 'overview' | 'characters' | 'villains' | 'isgard' | 'shinrin' | 'techniques' | 'teahouse' | 'chapters' | 'bookmarks' | 'insights' | 'rankings' | 'legends' | 'former' | 'timeline' | 'canon';

export interface NavItem {
  id: AppSection;
  label: string;
  shortLabel: string;
}

export const navigationItems: NavItem[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Home' },
  { id: 'characters', label: 'Characters', shortLabel: 'Cast' },
  { id: 'villains', label: 'Other Characters / Villains', shortLabel: 'Others' },
  { id: 'isgard', label: 'Isgard', shortLabel: 'Isgard' },
  { id: 'shinrin', label: 'Shinrin', shortLabel: 'Shinrin' },
  { id: 'techniques', label: 'Arts & Techniques', shortLabel: 'Arts' },
  { id: 'teahouse', label: 'The Quaint Teahouse', shortLabel: 'Teahouse' },
  { id: 'chapters', label: 'Chapters', shortLabel: 'Read' },
  { id: 'bookmarks', label: 'Reader Library', shortLabel: 'Library' },
  { id: 'insights', label: 'Reading Insights', shortLabel: 'Stats' },
  { id: 'rankings', label: 'Rankings', shortLabel: 'Ranks' },
  { id: 'legends', label: 'Legends', shortLabel: 'Legends' },
  { id: 'former', label: 'Former Rank Holders', shortLabel: 'Former' },
  { id: 'timeline', label: 'Sera Timeline', shortLabel: 'Sera' },
  { id: 'canon', label: 'Canon', shortLabel: 'Canon' },
];
