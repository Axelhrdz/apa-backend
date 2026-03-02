import { Router } from 'express';
import userController from './user.contorller.js';
import authMiddleware from '../auth/auth.middleware.js';

const router = Router();

router.get('/me', authMiddleware, userController);

export default router;