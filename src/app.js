import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
// import multer from 'multer';


import connectDB from './config/database.js';
connectDB();


//routes
import aperturasMasivasRoutes from './modules/aperturasMasivas/aperturasMasivas.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/user.routes.js';
import previewExcelRoutes from './modules/preview-excel/previewExcel.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : [];

    

//middleware
app.use(cors({ 
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    }
}));
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//------------- Routes modules -------------
//Aperturas Masivas
app.use('/aperturas_masivas', aperturasMasivasRoutes);
app.use('/aperturas_masivas/test', aperturasMasivasRoutes);
app.use('/aperturas_masivas/apertura', aperturasMasivasRoutes);

//Preview Excel
app.use('/preview-excel', previewExcelRoutes);


//Auth
app.use('/auth', authRoutes);
app.use('/auth/register', authRoutes);

app.use('/auth/login', authRoutes);


//Users
app.use('/users', usersRoutes);
// app.use('/users/me', usersRoutes);

app.get('/', (req, res) => {
    res.send({ message: 'APA BACKEND running from apertuas_masivas branch, new change' });
});




app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});



export default app;