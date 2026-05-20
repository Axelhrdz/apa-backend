import { padronOldService } from './padrones.service.js';

const padronOldController = async (req, res) => {
    try {
        const serviceResponse = await padronOldService(req);
        console.log(serviceResponse);
        res.status(serviceResponse.status ?? 200).json(serviceResponse);
    } catch (error) {
        console.log('Error in padronesOldController', error);
        res.status(500).json({
            message: 'Error in padronesOldController',
            error: error.message,
            status: 500
        });
    }
}


export { padronOldController };