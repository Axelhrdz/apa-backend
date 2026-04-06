import { userService, adminService } from './user.service.js';

const userController = async (req, res) => {
    try {
        const serviceResponse = await userService(req);
        res.status(serviceResponse.status ?? 200).json(serviceResponse);
    } catch (error) {
        res.status(500).json({
            message: 'Error in user controller',
            error: error.message,
        });
    }
}

const adminController = async (req, res) => {
    try {
        const serviceResponse = await adminService(req);
        res.status(serviceResponse.status ?? 200).json(serviceResponse);
    } catch (error) {
        res.status(500).json({
            message: 'Error in admin controller',
            error: error.message,
        });
    }
}

export { userController, adminController };