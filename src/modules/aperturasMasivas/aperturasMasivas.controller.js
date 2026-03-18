import aperturasMasivasService from './aperturasMasivas.service.js';
// import { body,dataValidation } from './aperturasMasivas.service.js';



const aperturasMasivasController = async (req, res) => {
    try {
        const serviceResponse = await aperturasMasivasService(req);
        console.log(serviceResponse);
        const filename = req.validatedData['folio'];

        res.status(serviceResponse.status || 200).json(serviceResponse);
    } catch (error) {
        console.error('Error en controlador aperturas masivas', error);
        res.status(500).json({
            message: 'Error en controlador aperturas masivas',
            error: error.message,
            status: 500,
        })
    }
}

export default aperturasMasivasController;