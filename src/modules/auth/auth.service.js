import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';

const authService = async (req) => {

    //-----hashing here ----
    const hashPassword = async (password) => {
        const saltPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltPassword);
        // console.log(hashedPassword);
        return hashedPassword;
    }


    //----- generate token ----
    const generateToken = (id) => {
        return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30m'});
    }




    try {
        // console.log('getting response from auth service');

       
        const { username, numEmpleado, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);
        
        
        //check missing fields
        if (!username || !numEmpleado || !email || !password) {
            return {
                message: 'All fields are required',
                status: 400
            }
        }
        
        //check if user already exists
        const emailExists = await User.findOne({email});
        const numEmpleadoExists = await User.findOne({numEmpleado});
        if(emailExists){
            console.log('Email ya registrado');
            return {
                message: 'Email ya registrado',
                status: 400
            }


        } else if (numEmpleadoExists){
            console.log('Numero de empleado ya registrado');
            return {
                message: 'Numero de empleado ya registrado',
                status: 400
            }
        }
        else{
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
                // message: 'User created successfully',
                // user: userData,
                // token,
                userData,
                token,
                status: 201
            }



        }
        




    } catch (error) {
        console.error('Error in auth service', error);
        return {
            message: 'Error in auth service',
            error: error.message,
            status: 500
        }
    }
}



export default authService;