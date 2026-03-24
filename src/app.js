import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
// import multer from 'multer';


import connectDB from './config/database.js';
connectDB();


//xlsx test
import * as XLSX from 'xlsx';
import * as fs from 'fs';

//routes
import aperturasMasivasRoutes from './modules/aperturasMasivas/aperturasMasivas.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/user.routes.js';

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



app.post('/preview', (req, res) => {
    const file = req.files.file;
    const formData = req.body;
    

    const baldioToggle = (file, formData) => {
        let sheetName;
        const workbook = XLSX.read(file.data, {type: 'buffer'});
    
        if(formData['baldio'] === 'S') {
            sheetName = workbook.SheetNames[1];
        } else if(formData['baldio'] === 'N') {
            sheetName = workbook.SheetNames[0];
        } else {
            return {
                message: 'Error in baldioToggle',
                error: 'Baldio is not selected',
                status: 400
            }
        }
        
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        // console.log(jsonData);
    
        return jsonData;
    };


    const jsonData = baldioToggle(file, formData);
    console.log(jsonData);

    
    res.send({
        message: 'Preview of excel file',
        jsonData: jsonData,
        status: 200
    });
});
    


//Process xlsx file test
function processXlsxFile() {
    const testFile = 'Libro1.xlsx';

    try {
        // Read file as buffer (most reliable approach in Node.js)
        const fileBuffer = fs.readFileSync(testFile);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        //get the first worksheet name
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];


        //convert to an array of json objects
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // console.log(jsonData);

        // return `this is the xlsx: ${jsonData}`;
        return jsonData;

        
    }catch (error) {
        console.error('Error processing the xlsx file', error);
        return `Error processing the xlsx file: ${error.message}`;
    }
}



//process json file as a result, and return .txt
function txtFile (jsonData) {

    let textChainformat = '';
    const accountsToProcess = [];

    jsonData.forEach(item => {
        textChainformat = `${item['Recaudadora']},${item['Tipo']},${item['Cuenta']},N,,,,4,1,${item['Fecha de otorgamiento']},,H,N,0,${item['Recamaras']},${item['Banios']}`;

        accountsToProcess.push(textChainformat);
    });


    const txtContent = accountsToProcess.join('\n');
    console.log(txtContent);

    //write string into file
    fs.writeFileSync('output.txt', txtContent, 'utf-8');
    console.log('File written successfully');
    
    return accountsToProcess;
}

app.get('/process-xlsx', (req, res) => {
    const jsonData = processXlsxFile();
    txtFile(jsonData);

    res.send(txtFile(jsonData));
});


app.post('/api/submit-xlsx', (req, res) => {
    const formData = req.body;
    // console.log(req.files);
    console.log('data received from backend', formData, req.files.file);

    res.status(200).send({
        message: 'Data received from back',
        data: formData
    });
});








app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});



export default app;