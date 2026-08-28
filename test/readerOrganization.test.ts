// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import {
  createReaderCollection,
  deleteReaderCollection,
  emptyReaderOrganization,
  getReaderOrganization,
  readerItemOrganization,
  readerLibraryItemKey,
  saveReaderOrganization,
  setReaderItemTags,
  toggleReaderCollectionItem,
  toggleReaderFavorite,
  validReaderOrganization,
} from '../src/readerOrganization';

beforeEach(() => localStorage.clear());

describe('Reader Library organization', () => {
  it('creates collections and persists favorite, membership, and normalized tags', () => {
    let state = createReaderCollection(emptyReaderOrganization(), '  Best   Rhen Moments  ', 1000);
    expect(state.collections).toEqual([{ id: 'collection-rs', name: 'Best Rhen Moments', createdAt: 1000, updatedAt: 1000 }]);

    const key = readerLibraryItemKey('bookmark', 'ep-s2-e1');
    state = toggleReaderFavorite(state, key);
    state = toggleReaderCollectionItem(state, key, state.collections[0].id);
    state = setReaderItemTags(state, key, [' Rhen ', 'battle', 'rhen', '', 'favorite scene']);
    saveReaderOrganization(state);

    const restored = getReaderOrganization();
    expect(readerItemOrganization(restored, key)).toEqual({
      key,
      favorite: true,
      collectionIds: ['collection-rs'],
      tags: ['Rhen', 'battle', 'favorite scene'],
    });
  });

  it('prevents duplicate collection names and removes deleted membership without losing other organization', () => {
    let state = createReaderCollection(emptyReaderOrganization(), 'Romance', 100);
    state = createReaderCollection(state, 'romance', 200);
    expect(state.collections).toHaveLength(1);

    const key = readerLibraryItemKey('note', 'ep-s3-e2');
    state = toggleReaderFavorite(state, key);
    state = setReaderItemTags(state, key, ['Sera']);
    state = toggleReaderCollectionItem(state, key, state.collections[0].id);
    state = deleteReaderCollection(state, state.collections[0].id);

    expect(state.collections).toEqual([]);
    expect(readerItemOrganization(state, key)).toEqual({ key, favorite: true, collectionIds: [], tags: ['Sera'] });
  });

  it('drops empty item organization after toggles are cleared', () => {
    const key = readerLibraryItemKey('passage', 'ep-s4-e2:123');
    let state = toggleReaderFavorite(emptyReaderOrganization(), key);
    expect(state.items).toHaveLength(1);
    state = toggleReaderFavorite(state, key);
    expect(state.items).toEqual([]);
  });

  it('rejects organization with dangling collection references', () => {
    expect(validReaderOrganization({
      collections: [],
      items: [{ key: 'bookmark:ep-s1-e1', favorite: false, collectionIds: ['collection-missing'], tags: [] }],
    })).toBe(false);
  });
});
