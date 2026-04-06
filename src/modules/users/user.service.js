import User from './user.model.js';

const userService = async (req) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).select('-password');
        // console.log(user);


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


const adminService = async (req) => {
    const { id } = req.user;
    // console.log(id);
    return {
        message: 'From admin service',
        status: 200
    }
}

export { userService, adminService };