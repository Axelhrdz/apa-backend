import { Router } from 'express';
import authController from './auth.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send({
        message: 'Auth module route working'
    });
});
router.post('/register', authController);

export default router;