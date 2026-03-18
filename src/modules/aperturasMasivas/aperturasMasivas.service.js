import * as XLSX from 'xlsx';
import { apaAccessService } from './aperturasMasivas.playwright.service.js';
// import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';


dotenv.config();

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


const defineAperturas = (jsonData, formData) => {

    console.log(jsonData);
    console.log(formData);
    


    let conexionFormat;
    let aperturaFormat;
    let baldioValue;
    // console.log(baldioValue);


    if(formData['baldio'] === 'S') {
        baldioValue = jsonData['Metros cuadrados'];
    } else {
        baldioValue = '0';
    }

    conexionFormat = `N,,,,${formData['conexiones']},${formData['cobros']}`;

    aperturaFormat = `${jsonData['Recaudadora']},${jsonData['Tipo']},${jsonData['Cuenta']},${conexionFormat},${jsonData['Fecha de otorgamiento']},,${formData['tipo_servicio']},${formData['baldio']},${baldioValue},${jsonData['Recamaras']},${jsonData['Banios']}`;
    

    return aperturaFormat;

};


const txtFile = (jsonData, formData) => {
    


    const accountsToProcess = [];

    jsonData.forEach(account => {
       const accountFormat =  defineAperturas(account, formData);
       accountsToProcess.push(accountFormat);
    });
    const txtContent = accountsToProcess.join('\n');

    return txtContent;
}


const aperturasMasivasService = async (req) => {
    const file = req.files.file;
    const formData = req.validatedData;
    let response = {};

    try {
        const jsonData = baldioToggle(file, formData);

        //txt file into variable
        const txtFileOutput = txtFile(jsonData, formData);

        // const aperturasAPAOutput = await aperturasMasivasPlaywright(txtFileOutput, 'http://services.tlajomulco.gob.mx:1080/apa/');

        const urlAccess = await apaAccessService(
            txtFileOutput, 
            formData, 
            // 'http://services.tlajomulco.gob.mx:1080/apa/',
            // 'http://172.16.11.58/apa/',
            process.env.APA_BASE_URL
        );


        // console.log(urlAccess);

        if(urlAccess.success && urlAccess.status === 200) {
            response = {
                success: true,
                message: urlAccess.message,
                status: urlAccess.status,
            }
        } else if(!urlAccess.success && urlAccess.status === 502) {
            response = {
                success: false,
                message: urlAccess.message,
                status: urlAccess.status,
                error: urlAccess.error,
            }
        } else if (!urlAccess.success) {
            response = {
                success: false,
                message: 'Error en aperturas masivas service',
                error: urlAccess.error,
                status: 500,
            }
        }

        return response;
        
        
    } catch (error) {
         return {
            success: false,
            message: 'Error en aperturas masivas service',
            error: 'Error en aperturas masivas service',
            status: 500,
         };
    }



    
}

export default aperturasMasivasService;