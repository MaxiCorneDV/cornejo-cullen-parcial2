import { Router } from 'express';
import {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
} from '../controllers/genreController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';
import { validateGenre } from '../middlewares/validationMiddleware.js';

const router = Router();

// Rutas públicas
router.get('/', getGenres);
router.get('/:id', getGenreById);

// Rutas protegidas con JWT + Rol Administrador
router.post('/', verifyToken, verifyAdmin, validateGenre, createGenre);
router.put('/:id', verifyToken, verifyAdmin, validateGenre, updateGenre);
router.delete('/:id', verifyToken, verifyAdmin, deleteGenre);

export default router;
