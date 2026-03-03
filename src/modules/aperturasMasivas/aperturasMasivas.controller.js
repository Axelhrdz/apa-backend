import aperturasMasivasService from './aperturasMasivas.service.js';
// import { body,dataValidation } from './aperturasMasivas.service.js';



const aperturasMasivasController = async (req, res) => {
    try {
        const serviceResponse = await aperturasMasivasService(req);

        // console.log('------ this is the body ------');
        // console.log(req.body);

        // console.log('this is the validated data');
        // console.log(req.validatedData);

        const filename = req.validatedData['folio'];
        console.log(filename);

        res.set({
            'Content-Disposition': `attachment; filename=${filename}`,
            'Content-Type': 'text/plain',
            'Content-Length': serviceResponse.length,
        });

        res.send(serviceResponse);
    } catch (error) {
        console.error('Error en controlador aperturas masivas', error);
        res.status(500).send({
            message: 'Error en controlador aperturas masivas'
        })
    }
}

export default aperturasMasivasController;