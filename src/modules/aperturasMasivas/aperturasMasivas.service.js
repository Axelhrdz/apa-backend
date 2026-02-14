import * as XLSX from 'xlsx';


const baldioToggle = (file, formData) => {
    let sheetName;
    const workbook = XLSX.read(file.data, {type: 'buffer'});

    if(formData['baldio'] === 'S') {
        sheetName = workbook.SheetNames[1];
    } else {
        sheetName = workbook.SheetNames[0];
    }
    
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    // console.log(jsonData);

    return jsonData;
};

const defineAperturas = (jsonData, formData) => {
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
    const formData = req.body;

    try {
        const jsonData = baldioToggle(file, formData);

        //txt file into variable
        const txtFileOutput = txtFile(jsonData, formData);

        return txtFileOutput;
        
    } catch (error) {
        console.error('Error in aperturas masivas service', error);
        return {
            message: 'Error in aperturas masivas service',
            error: error.message
        }
    }
}

export default aperturasMasivasService;