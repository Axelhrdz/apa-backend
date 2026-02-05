import aperturasMasivasService from './aperturasMasivas.service.js';

const aperturasMasivasController = async (req, res) => {
    try {
        const serviceResponse = await aperturasMasivasService(req);
        console.log('Data received from controller Aperturas Masivas', serviceResponse);
        res.status(200).send({
            message: 'Data received from backend',
            data: serviceResponse
        });
        
        return serviceResponse;


    } catch (error) {
        console.error('Error en controlador aperturas masivas', error);
        res.status(500).send({
            message: 'Error en controlador aperturas masivas'
        })
    }
}

export default aperturasMasivasController;