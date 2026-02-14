import aperturasMasivasService from './aperturasMasivas.service.js';

const aperturasMasivasController = async (req, res) => {
    try {
        const serviceResponse = await aperturasMasivasService(req);

        const filename = req.body['folio'];
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