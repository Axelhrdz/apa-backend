import express from 'express';
import User from '../models/User.js';
import Router from 'express';
import protect from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
const router = Router();

//------ Test route ------
router.get('/test', (req, res) => {
    res.send({ message: 'Test route working!' });
});

//------ Register Route ------
router.post('/register', async (req, res) => {
    const { username, email, numEmpleado, password} = req.body;

    try{
        //check missing fields
        if(!username || !email || !password){
            return res.status(400).json({ message: 'All fields are required'});
        }

        //check user exist
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({ messgae: 'User already exists ' });
        }

        //All validation passed, create user
        const user = await User.create({ username, email, numEmpleado, password });
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            numEmpleado: user.numEmpleado,
            token: token
        });

    }
    catch(error){
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}); 


//------ Login Route ------
router.post('/login', async (req, res) => {
    try{
        const { email, numEmpleado, password } = req.body;

        //check missing fields
        if(!email || !password || !numEmpleado){
            return res.status(400).json({ message: 'All fields are required' });
        }

        //find user with email
        const user = await User.findOne({ email });

        //validate credentials
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //if all good
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            numEmpleado: user.numEmpleado,
            token: token
        });

        
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

//------ Me Route ------
router.get('/me', protect, async (req, res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

//------ Generate Token ------
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d' });
}


export default router;