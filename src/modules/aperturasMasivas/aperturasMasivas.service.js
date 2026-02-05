import * as fs from 'fs';
import { text } from 'stream/consumers';
import * as XLSX from 'xlsx';

const txtFile = (jsonData) => {
    let textChainFormat = '';
    const accountsToProcess = [];

    jsonData.forEach(account => {
        textChainFormat = `${account['Recaudadora']},${account['Tipo']},${account['Cuenta']},N,,,,4,1,${account['Fecha de otorgamiento']},,H,N,0,${account['Recamaras']},${account['Banios']}`;
        accountsToProcess.push(textChainFormat);
    });

    const txtContent = accountsToProcess.join('\n');
    console.log(txtContent);

    //write string into file
    fs.writeFileSync('output.txt', txtContent, 'utf-8');
    console.log('File written successfully');

    return accountsToProcess;
}

const aperturasMasivasService = async (req) => {
    const file = req.files.file;
    const formData = req.body;

    console.log('Data received from service');
    console.log(file);
    console.log(formData);

    try {
        //read file as buffer
        // const fileBuffer = file.data.toString('base64');
        const workbook = XLSX.read(file.data, {type: 'buffer'});

        //get first worksheet name
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        //convert to an array of json obejcts
        const jsonData = XLSX.utils.sheet_to_json(worksheet);


        return txtFile(jsonData);
        
    } catch (error) {
        console.error('Error in aperturas masivas service', error);
        return {
            message: 'Error in aperturas masivas service',
            error: error.message
        }
    }



    return {
        file,
        formData
    }
    // return 'testing service';


    // return 'Apertura masiva service working, test number 2!!';
}

export default aperturasMasivasService;