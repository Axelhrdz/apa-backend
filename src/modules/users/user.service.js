import User from './user.model.js';

const userService = async (req) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return {
                message: 'User not found',
                status: 404
            }
        }
        return {
            message: 'User found successfully',
            user: user,
            status: 200
        }
    } catch (error) {
        console.error('Error in user service', error);
        return {
            message: 'Error in user service',
            error: error.message,
            status: 500
        } 
    }
}

export default userService;