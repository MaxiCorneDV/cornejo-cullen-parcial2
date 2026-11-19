import { apiFetch } from './api';
import { fallbackGenres } from './fallbackData';

export const getGenres = async () => {
  try {
    return await apiFetch('/genres');
  } catch (error) {
    console.warn('Usando géneros locales de respaldo:', error.message);
    return fallbackGenres;
  }
};

export const createGenre = async (genreData) => {
  return await apiFetch('/genres', {
    method: 'POST',
    body: JSON.stringify(genreData)
  });
};

export const updateGenre = async (id, genreData) => {
  return await apiFetch(`/genres/${id}`, {
    method: 'PUT',
    body: JSON.stringify(genreData)
  });
};

export const deleteGenre = async (id) => {
  return await apiFetch(`/genres/${id}`, {
    method: 'DELETE'
  });
};
