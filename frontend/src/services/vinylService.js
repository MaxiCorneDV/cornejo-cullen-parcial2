import { apiFetch } from './api';
import { fallbackVinyls } from './fallbackData';

export const getVinyls = async (genre = 'Todos', search = '') => {
  try {
    const params = new URLSearchParams();
    if (genre && genre !== 'Todos') params.append('genre', genre);
    if (search) params.append('search', search);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return await apiFetch(`/vinyls${queryString}`);
  } catch (error) {
    console.warn('Backend no disponible, mostrando catálogo local de respaldo:', error.message);
    return fallbackVinyls.filter((v) => {
      const matchGenre = genre === 'Todos' || v.genre === genre;
      const matchSearch =
        !search ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.artist.toLowerCase().includes(search.toLowerCase());
      return matchGenre && matchSearch;
    });
  }
};

export const getVinylById = async (id) => {
  try {
    return await apiFetch(`/vinyls/${id}`);
  } catch (error) {
    const found = fallbackVinyls.find((v) => v._id === id);
    if (found) return found;
    throw error;
  }
};

export const createVinyl = async (vinylData) => {
  return await apiFetch('/vinyls', {
    method: 'POST',
    body: JSON.stringify(vinylData)
  });
};

export const updateVinyl = async (id, vinylData) => {
  return await apiFetch(`/vinyls/${id}`, {
    method: 'PUT',
    body: JSON.stringify(vinylData)
  });
};

export const deleteVinyl = async (id) => {
  return await apiFetch(`/vinyls/${id}`, {
    method: 'DELETE'
  });
};
