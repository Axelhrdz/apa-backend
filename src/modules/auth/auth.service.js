import bcrypt from 'bcryptjs';
import User from '../users/user.model.js';
import jwt from 'jsonwebtoken';

const authService = async (req, res) => {

    //-----hashing here ----
    const hashPassword = async (password) => {
        const saltPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltPassword);
        // console.log(hashedPassword);
        return hashedPassword;
    }

    const generateToken = (id) => {
        return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
    }




    


    try {
        // console.log('getting response from auth service');

       
        const { username, numEmpleado, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);
        
        
        //check missing fields
        if (!username || !numEmpleado || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            console.log('User already exists');
            
            return {
                message: 'User already exists',
                status: 400
            }
        }else{
            //all validations passed, create user
            // console.log('New user to be created/registered');
            // console.log(req.body);


            const user = await User.create({
                username,
                numEmpleado,
                email,
                password: hashedPassword,
            });
            const token = generateToken(user._id);

            // console.log(user);
            const userData = {
                username: user.username,
                numEmpleado: user.numEmpleado,
                email: user.email,
                token: token
            }
           
            return {
                message: 'User created successfully',
                user: userData,
                token,
                status: 201
            }



        }
        




    } catch (error) {
        console.error('Error in auth service', error);
        return {
            message: 'Error in auth service',
            error: error.message
        }
    }







    

}

export default authService;