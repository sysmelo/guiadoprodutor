import { GenreChain } from '../types';
import { genreChainsData } from '../data/genreChainsData';

const CUSTOM_GENRES_KEY = 'melo_mix_custom_genres_v1';

export function getCustomGenres(): GenreChain[] {
  try {
    const raw = localStorage.getItem(CUSTOM_GENRES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse custom genres:', err);
    return [];
  }
}

export function saveCustomGenre(genre: GenreChain): GenreChain[] {
  const existing = getCustomGenres();
  const index = existing.findIndex(g => g.id === genre.id);
  let updated: GenreChain[];
  if (index >= 0) {
    updated = existing.map(g => g.id === genre.id ? genre : g);
  } else {
    updated = [genre, ...existing];
  }
  try {
    localStorage.setItem(CUSTOM_GENRES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save custom genres:', err);
  }
  return updated;
}

export function deleteCustomGenre(id: string): GenreChain[] {
  const existing = getCustomGenres();
  const updated = existing.filter(g => g.id !== id);
  try {
    localStorage.setItem(CUSTOM_GENRES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete custom genre:', err);
  }
  return updated;
}

export function getAllGenres(): GenreChain[] {
  const custom = getCustomGenres();
  // Filter out any default genres that might have the same id
  const customIds = new Set(custom.map(c => c.id));
  const baseGenres = genreChainsData.filter(g => !customIds.has(g.id));
  return [...custom, ...baseGenres];
}

export function getGenreById(id: string): GenreChain | undefined {
  const all = getAllGenres();
  return all.find(g => g.id === id) || all[0];
}
