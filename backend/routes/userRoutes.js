import { Router } from 'express';
import { getUsers, getUserById, deleteUser } from '../controllers/userController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', verifyToken, verifyAdmin, getUsers);
router.get('/:id', verifyToken, verifyAdmin, getUserById);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;
