import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
// import multer from 'multer';

//xlsx test
import * as XLSX from 'xlsx';
import * as fs from 'fs';

//routes
import aperturasMasivasRoutes from './modules/aperturasMasivas/aperturasMasivas.routes.js';


const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();

//middleware
app.use(cors({ 
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'     
}));
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//------------- Routes modules -------------
app.use('/aperturas_masivas', aperturasMasivasRoutes);
app.use('/aperturas_masivas/test', aperturasMasivasRoutes);
app.use('/aperturas_masivas/apertura', aperturasMasivasRoutes);



app.get('/', (req, res) => {
    res.send({ message: 'APA BACKEND running from apertuas_masivas branch, new change' });
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