import { Router } from 'express';
import autosufMasivasController from './autosuf.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send({message: 'Autosuficientes Masivos module route working'});
});

router.post('/autosuf', autosufMasivasController);


export default router;