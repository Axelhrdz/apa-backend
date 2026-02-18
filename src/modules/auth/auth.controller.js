import authService from './auth.service.js';

const authController = async (req, res) => {
    try {
        const serviceResponse = await authService(req, res);

        console.log(serviceResponse);

        // res.status(200).send(serviceResponse);
        res.status(201).json(serviceResponse);
    } catch (error) {
        res.status(500).json({
            message: 'Error in auth controller',
            error: error.message
        });
    }
};


export default authController;