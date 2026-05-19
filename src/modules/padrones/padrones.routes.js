import { Router } from 'express';
import { padronOldController } from './padrones.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send({ message: 'Padrones module route working' });
});


router.get('/padron-old', padronOldController);


// router.get('/padron-old', async (req, res) => {
//     try {
//         const padrones = await padron_old.find();
//         console.log(padrones);
//         res.status(200).json(padrones);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener los padrones', error: error.message });
//     }
// });



export default router;