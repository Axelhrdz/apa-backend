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
import autosufRoutes from './modules/autosuficientes-masivas/autosuf.routes.js';
import padronesRoutes from './modules/padrones/padrones.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : [];

function isNgrokOrigin(origin) {
    if (!origin) return false;
    try {
        const host = new URL(origin).hostname.toLowerCase();
        return (
            host.endsWith('.ngrok-free.app') ||
            host.endsWith('.ngrok-free.dev') ||
            host.endsWith('.ngrok.app') ||
            host.endsWith('.ngrok.io') ||
            host.endsWith('.ngrok.dev')
        );
    } catch {
        return false;
    }
}

/** Public site on Cloudflare (www, apex, or future subdomains). */
function isApaAsistenteSiteOrigin(origin) {
    if (!origin) return false;
    try {
        const host = new URL(origin).hostname.toLowerCase();
        return host === 'apa-asistente.site' || host.endsWith('.apa-asistente.site');
    } catch {
        return false;
    }
}

//middleware
app.use(cors({ 
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        if (isNgrokOrigin(origin)) {
            return callback(null, true);
        }
        if (isApaAsistenteSiteOrigin(origin)) {
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

//Autosuficientes Masivos
app.use('/autosuficientes_masivas', autosufRoutes);

//Preview Excel
app.use('/preview-excel', previewExcelRoutes);


//Padrones
app.use('/padrones', padronesRoutes);


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


app.get('/testing-dev', (req,res) => {
    console.log('Testing dev from remote dev and linux local home lab');
    res.send({ message: 'Testing dev from remote dev and linux local home lab' });
});



app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});



export default app;