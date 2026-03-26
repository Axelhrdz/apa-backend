import previewExcelService from './previewExcel.service.js';

const previewExcelController = async (req, res) => {
    try {
        const serviceResponse = await previewExcelService(req);
        res.status(serviceResponse.status ?? 200).json(serviceResponse);
    } catch (error) {
        console.error('Error in previewExcelController', error);
        res.status(500).json({
            message: 'Error in previewExcelController',
            error: error.message,
            status: 500
        });
    }
}


export default previewExcelController;