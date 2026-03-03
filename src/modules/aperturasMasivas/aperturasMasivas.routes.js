import { Router } from 'express';
import aperturasMasivasController from './aperturasMasivas.controller.js';
import { validateData, validate } from './aperturasMasivas.validators.js';

const router = Router();


router.get('/', (req, res) => {
    res.send({message: 'Aperturas Masivas module route working'});
        
});
router.get('/test', (req, res) => {
    res.send({message: 'test of route working v2'});
});
router.post('/apertura', validateData, validate, aperturasMasivasController);

export default router;

