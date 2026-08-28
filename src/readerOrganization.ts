export const READER_ORGANIZATION_KEY = 'tqr:readerOrganization:v1';

const MAX_COLLECTIONS = 24;
const MAX_COLLECTION_NAME = 48;
const MAX_ITEM_KEY = 280;
const MAX_TAGS_PER_ITEM = 8;
const MAX_TAG_LENGTH = 28;
const MAX_ORGANIZED_ITEMS = 2500;
const ITEM_KEY = /^(bookmark|note|passage):.+$/;
const COLLECTION_ID = /^collection-[a-z0-9-]+$/;

export type ReaderLibraryItemKind = 'bookmark' | 'note' | 'passage';

export interface ReaderCollection {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface ReaderItemOrganization {
  key: string;
  favorite: boolean;
  collectionIds: string[];
  tags: string[];
}

export interface ReaderOrganizationState {
  collections: ReaderCollection[];
  items: ReaderItemOrganization[];
}

export function emptyReaderOrganization(): ReaderOrganizationState {
  return { collections: [], items: [] };
}

export function readerLibraryItemKey(kind: ReaderLibraryItemKind, id: string): string {
  return `${kind}:${id}`;
}

function normalizeCollectionName(value: string): string {
  return value.trim().replace(/\s+/g, ' ').slice(0, MAX_COLLECTION_NAME);
}

function normalizeTags(values: string[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const value of values) {
    const tag = value.trim().replace(/\s+/g, ' ').slice(0, MAX_TAG_LENGTH);
    const canonical = tag.toLowerCase();
    if (!tag || seen.has(canonical)) continue;
    seen.add(canonical);
    tags.push(tag);
    if (tags.length >= MAX_TAGS_PER_ITEM) break;
  }
  return tags;
}

function validCollection(value: unknown): value is ReaderCollection {
  if (!value || typeof value !== 'object') return false;
  const collection = value as Partial<ReaderCollection>;
  return typeof collection.id === 'string'
    && COLLECTION_ID.test(collection.id)
    && typeof collection.name === 'string'
    && normalizeCollectionName(collection.name) === collection.name
    && collection.name.length > 0
    && typeof collection.createdAt === 'number'
    && Number.isFinite(collection.createdAt)
    && typeof collection.updatedAt === 'number'
    && Number.isFinite(collection.updatedAt);
}

function validItem(value: unknown): value is ReaderItemOrganization {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<ReaderItemOrganization>;
  return typeof item.key === 'string'
    && item.key.length <= MAX_ITEM_KEY
    && ITEM_KEY.test(item.key)
    && typeof item.favorite === 'boolean'
    && Array.isArray(item.collectionIds)
    && item.collectionIds.every((id) => typeof id === 'string' && COLLECTION_ID.test(id))
    && Array.isArray(item.tags)
    && item.tags.every((tag) => typeof tag === 'string' && tag.length > 0 && tag.length <= MAX_TAG_LENGTH)
    && normalizeTags(item.tags).length === item.tags.length;
}

export function validReaderOrganization(value: unknown): value is ReaderOrganizationState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<ReaderOrganizationState>;
  if (!Array.isArray(state.collections) || !Array.isArray(state.items)) return false;
  if (state.collections.length > MAX_COLLECTIONS || state.items.length > MAX_ORGANIZED_ITEMS) return false;
  if (!state.collections.every(validCollection) || !state.items.every(validItem)) return false;

  const collectionIds = state.collections.map((collection) => collection.id);
  if (new Set(collectionIds).size !== collectionIds.length) return false;
  const itemKeys = state.items.map((item) => item.key);
  if (new Set(itemKeys).size !== itemKeys.length) return false;
  const knownCollections = new Set(collectionIds);
  return state.items.every((item) => new Set(item.collectionIds).size === item.collectionIds.length
    && item.collectionIds.every((id) => knownCollections.has(id)));
}

function normalizedState(state: ReaderOrganizationState): ReaderOrganizationState {
  const collections = state.collections.slice(0, MAX_COLLECTIONS).map((collection) => ({
    ...collection,
    name: normalizeCollectionName(collection.name),
  })).filter((collection) => collection.name);
  const knownCollections = new Set(collections.map((collection) => collection.id));
  const seenItems = new Set<string>();
  const items: ReaderItemOrganization[] = [];
  for (const item of state.items) {
    if (!ITEM_KEY.test(item.key) || item.key.length > MAX_ITEM_KEY || seenItems.has(item.key)) continue;
    seenItems.add(item.key);
    const normalized: ReaderItemOrganization = {
      key: item.key,
      favorite: Boolean(item.favorite),
      collectionIds: Array.from(new Set(item.collectionIds.filter((id) => knownCollections.has(id)))),
      tags: normalizeTags(item.tags),
    };
    if (normalized.favorite || normalized.collectionIds.length || normalized.tags.length) items.push(normalized);
    if (items.length >= MAX_ORGANIZED_ITEMS) break;
  }
  return { collections, items };
}

export function getReaderOrganization(): ReaderOrganizationState {
  try {
    const raw = localStorage.getItem(READER_ORGANIZATION_KEY);
    if (!raw) return emptyReaderOrganization();
    const parsed: unknown = JSON.parse(raw);
    return validReaderOrganization(parsed) ? parsed : emptyReaderOrganization();
  } catch {
    return emptyReaderOrganization();
  }
}

export function saveReaderOrganization(state: ReaderOrganizationState): ReaderOrganizationState {
  const next = normalizedState(state);
  try {
    if (!next.collections.length && !next.items.length) localStorage.removeItem(READER_ORGANIZATION_KEY);
    else localStorage.setItem(READER_ORGANIZATION_KEY, JSON.stringify(next));
  } catch {
    // Organization is optional when browser storage is unavailable.
  }
  return next;
}

export function persistReaderOrganization(state: ReaderOrganizationState): void {
  const next = normalizedState(state);
  if (!validReaderOrganization(next)) throw new Error('Reader Library organization data is invalid.');
  try {
    if (!next.collections.length && !next.items.length) localStorage.removeItem(READER_ORGANIZATION_KEY);
    else localStorage.setItem(READER_ORGANIZATION_KEY, JSON.stringify(next));
  } catch {
    throw new Error('This browser blocked Reader Library organization storage.');
  }
}

function nextCollectionId(state: ReaderOrganizationState, now: number): string {
  const base = `collection-${Math.max(0, Math.floor(now)).toString(36)}`;
  const existing = new Set(state.collections.map((collection) => collection.id));
  if (!existing.has(base)) return base;
  let suffix = 2;
  while (existing.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export function createReaderCollection(state: ReaderOrganizationState, name: string, now = Date.now()): ReaderOrganizationState {
  const normalizedName = normalizeCollectionName(name);
  if (!normalizedName || state.collections.length >= MAX_COLLECTIONS) return state;
  if (state.collections.some((collection) => collection.name.toLowerCase() === normalizedName.toLowerCase())) return state;
  return normalizedState({
    ...state,
    collections: [...state.collections, { id: nextCollectionId(state, now), name: normalizedName, createdAt: now, updatedAt: now }],
  });
}

export function renameReaderCollection(state: ReaderOrganizationState, id: string, name: string, now = Date.now()): ReaderOrganizationState {
  const normalizedName = normalizeCollectionName(name);
  if (!normalizedName || !state.collections.some((collection) => collection.id === id)) return state;
  if (state.collections.some((collection) => collection.id !== id && collection.name.toLowerCase() === normalizedName.toLowerCase())) return state;
  return normalizedState({
    ...state,
    collections: state.collections.map((collection) => collection.id === id ? { ...collection, name: normalizedName, updatedAt: now } : collection),
  });
}

export function deleteReaderCollection(state: ReaderOrganizationState, id: string): ReaderOrganizationState {
  return normalizedState({
    collections: state.collections.filter((collection) => collection.id !== id),
    items: state.items.map((item) => ({ ...item, collectionIds: item.collectionIds.filter((collectionId) => collectionId !== id) })),
  });
}

function updateItem(state: ReaderOrganizationState, key: string, update: (item: ReaderItemOrganization) => ReaderItemOrganization): ReaderOrganizationState {
  if (!ITEM_KEY.test(key) || key.length > MAX_ITEM_KEY) return state;
  const current = state.items.find((item) => item.key === key) || { key, favorite: false, collectionIds: [], tags: [] };
  const nextItem = update(current);
  const items = state.items.filter((item) => item.key !== key);
  if (nextItem.favorite || nextItem.collectionIds.length || nextItem.tags.length) items.push(nextItem);
  return normalizedState({ ...state, items });
}

export function toggleReaderFavorite(state: ReaderOrganizationState, key: string): ReaderOrganizationState {
  return updateItem(state, key, (item) => ({ ...item, favorite: !item.favorite }));
}

export function toggleReaderCollectionItem(state: ReaderOrganizationState, key: string, collectionId: string): ReaderOrganizationState {
  if (!state.collections.some((collection) => collection.id === collectionId)) return state;
  return updateItem(state, key, (item) => ({
    ...item,
    collectionIds: item.collectionIds.includes(collectionId)
      ? item.collectionIds.filter((id) => id !== collectionId)
      : [...item.collectionIds, collectionId],
  }));
}

export function setReaderItemTags(state: ReaderOrganizationState, key: string, tags: string[]): ReaderOrganizationState {
  return updateItem(state, key, (item) => ({ ...item, tags: normalizeTags(tags) }));
}

export function readerItemOrganization(state: ReaderOrganizationState, key: string): ReaderItemOrganization {
  return state.items.find((item) => item.key === key) || { key, favorite: false, collectionIds: [], tags: [] };
}
