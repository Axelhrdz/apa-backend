import { Router } from 'express';
import previewExcelController from './previewExcel.controller.js';


const router = Router();


router.get('/', (req, res) => {
    res.send({message: 'Preview excel module route working'});
});

router.get('/test', (req, res) => {
    res.send({message: 'Preview excel testing'});
});

router.post('/preview', previewExcelController);

export default router;