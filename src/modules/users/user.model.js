import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    numEmpleado: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 5,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    }, 
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
    }
}, { timestamps: true });



//create user model
const User = mongoose.model('User', userSchema);


export default User;