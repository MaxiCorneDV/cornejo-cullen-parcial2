import {
  getAllGenresService,
  getGenreByIdService,
  createGenreService,
  updateGenreService,
  deleteGenreService
} from '../services/genreService.js';

export const getGenres = async (req, res) => {
  try {
    const genres = await getAllGenresService();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los géneros', error: error.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const genre = await getGenreByIdService(req.params.id);
    if (!genre) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el género', error: error.message });
  }
};

export const createGenre = async (req, res) => {
  try {
    const newGenre = await createGenreService(req.body);
    res.status(201).json({
      message: 'Género creado correctamente',
      genre: newGenre
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el género', error: error.message });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const updatedGenre = await updateGenreService(req.params.id, req.body);
    if (!updatedGenre) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }
    res.status(200).json({
      message: 'Género actualizado correctamente',
      genre: updatedGenre
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el género', error: error.message });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const deletedGenre = await deleteGenreService(req.params.id);
    if (!deletedGenre) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }
    res.status(200).json({ message: 'Género eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el género', error: error.message });
  }
};
