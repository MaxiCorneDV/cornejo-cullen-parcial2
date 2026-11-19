import {
  getAllVinylsService,
  getVinylByIdService,
  createVinylService,
  updateVinylService,
  deleteVinylService
} from '../services/vinylService.js';

export const getVinyls = async (req, res) => {
  try {
    const { genre, search } = req.query;
    const vinyls = await getAllVinylsService({ genre, search });
    res.status(200).json(vinyls);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vinilos', error: error.message });
  }
};

export const getVinylById = async (req, res) => {
  try {
    const vinyl = await getVinylByIdService(req.params.id);
    if (!vinyl) {
      return res.status(404).json({ message: 'Vinilo no encontrado' });
    }
    res.status(200).json(vinyl);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el vinilo', error: error.message });
  }
};

export const createVinyl = async (req, res) => {
  try {
    const newVinyl = await createVinylService(req.body);
    res.status(201).json({
      message: 'Vinilo creado correctamente',
      vinyl: newVinyl
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el vinilo', error: error.message });
  }
};

export const updateVinyl = async (req, res) => {
  try {
    const updatedVinyl = await updateVinylService(req.params.id, req.body);
    if (!updatedVinyl) {
      return res.status(404).json({ message: 'Vinilo no encontrado' });
    }
    res.status(200).json({
      message: 'Vinilo actualizado correctamente',
      vinyl: updatedVinyl
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el vinilo', error: error.message });
  }
};

export const deleteVinyl = async (req, res) => {
  try {
    const deletedVinyl = await deleteVinylService(req.params.id);
    if (!deletedVinyl) {
      return res.status(404).json({ message: 'Vinilo no encontrado' });
    }
    res.status(200).json({ message: 'Vinilo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el vinilo', error: error.message });
  }
};
