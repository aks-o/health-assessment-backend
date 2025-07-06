import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Registration should NOT require auth
router.post('/', createUser);

// Protected route (requires token)
router.get('/', authenticateToken, getUsers);

export default router;