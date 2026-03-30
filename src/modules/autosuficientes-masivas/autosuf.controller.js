import autosufMasivasService from './autosuf.service.js';

const autosufMasivasController = async (req, res) => {
    try {
        const serviceResponse = await autosufMasivasService(req);
        console.log(serviceResponse);
        res.status(serviceResponse.status ?? 200).json(serviceResponse);
    } catch (error) {
        console.error('Error in autosufMasivasController', error);
        res.status(500).json({
            message: 'Error in autosufMasivasController',
            error: error.message,
            status: 500
        });
    }
}


export default autosufMasivasController;