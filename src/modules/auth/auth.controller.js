// import authService from './auth.service.js';
import { registerService, loginService } from './auth.service.js';

export const registerController = async (req, res) => {
    try {
        const serviceResponse = await registerService(req, res);

        // console.log('auth - register route working');

        console.log(serviceResponse);

        // res.status(200).send(serviceResponse);
        res.status(serviceResponse.status ?? 201).json(serviceResponse);
    } catch (error) {
        res.status(serviceResponse.status ?? 500).json({
            message: 'Error in auth controller',
            error: error.message,
        });
    }
};

/*--------------login controller --------------*/
export const loginController = async (req, res) => {
    try {
        const serviceResponse = await loginService(req, res);

        console.log(serviceResponse);

        res.status(serviceResponse.status ?? 200).json(serviceResponse);
    } catch (error) {
        res.status(serviceResponse.status ?? 500).json({
            message: 'Error in auth controller',
            error: error.message,
        });
    }
}
// export default authController;