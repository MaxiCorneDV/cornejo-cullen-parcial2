import Vinyl from '../schemas/vinylSchema.js';

export const getAllVinylsService = async (filters = {}) => {
  const query = {};
  if (filters.genre && filters.genre !== 'Todos') {
    query.genre = filters.genre;
  }
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { artist: { $regex: filters.search, $options: 'i' } }
    ];
  }
  return await Vinyl.find(query).sort({ createdAt: -1 });
};

export const getVinylByIdService = async (id) => {
  return await Vinyl.findById(id);
};

export const createVinylService = async (vinylData) => {
  const vinyl = new Vinyl(vinylData);
  return await vinyl.save();
};

export const updateVinylService = async (id, vinylData) => {
  return await Vinyl.findByIdAndUpdate(id, vinylData, { new: true, runValidators: true });
};

export const deleteVinylService = async (id) => {
  return await Vinyl.findByIdAndDelete(id);
};
