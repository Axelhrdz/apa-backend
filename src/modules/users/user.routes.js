import { Router } from 'express';
import { userController, adminController } from './user.contorller.js';
import authMiddleware from '../auth/auth.middleware.js';
import requireAdminMiddleware from '../../middlewares/requireAdmin.middleware.js';

const router = Router();

router.get('/me', authMiddleware, userController);


//admin routes
router.get('/admin', authMiddleware, requireAdminMiddleware, adminController);

export default router;