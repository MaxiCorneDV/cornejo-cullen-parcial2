import Genre from '../schemas/genreSchema.js';

export const getAllGenresService = async () => {
  return await Genre.find().sort({ name: 1 });
};

export const getGenreByIdService = async (id) => {
  return await Genre.findById(id);
};

export const createGenreService = async (genreData) => {
  const genre = new Genre(genreData);
  return await genre.save();
};

export const updateGenreService = async (id, genreData) => {
  return await Genre.findByIdAndUpdate(id, genreData, { new: true, runValidators: true });
};

export const deleteGenreService = async (id) => {
  return await Genre.findByIdAndDelete(id);
};
