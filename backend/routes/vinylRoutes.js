import { Router } from 'express';
import {
  getVinyls,
  getVinylById,
  createVinyl,
  updateVinyl,
  deleteVinyl
} from '../controllers/vinylController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';
import { validateVinyl } from '../middlewares/validationMiddleware.js';

const router = Router();

// Rutas públicas
router.get('/', getVinyls);
router.get('/:id', getVinylById);

// Rutas protegidas con JWT + Rol Administrador
router.post('/', verifyToken, verifyAdmin, validateVinyl, createVinyl);
router.put('/:id', verifyToken, verifyAdmin, validateVinyl, updateVinyl);
router.delete('/:id', verifyToken, verifyAdmin, deleteVinyl);

export default router;
