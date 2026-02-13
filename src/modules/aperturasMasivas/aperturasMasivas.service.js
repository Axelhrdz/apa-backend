import * as XLSX from 'xlsx';


const defineAperturas = (jsonData, formData) => {
    let conexionFormat;
    // let baldioToggle;
    let aperturaFormat;

    conexionFormat = `N,,,,${formData['conexiones']},${formData['cobros']}`;

    // console.log(conexionFormat);
    
    // if(formData['tipo_predio'] === 'casa') {
    //     baldioToggle = 'N';
    // } else {
    //     baldioToggle = 'S';
    // }

    aperturaFormat = `${jsonData['Recaudadora']},${jsonData['Tipo']},${jsonData['Cuenta']},${conexionFormat},${jsonData['Fecha de otorgamiento']},,${formData['tipo_servicio']},${formData['baldio']},0,${jsonData['Recamaras']},${jsonData['Banios']}`;
    console.log(aperturaFormat);
    console.log('--------------');

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
        //read file as buffer
        const workbook = XLSX.read(file.data, {type: 'buffer'});

        //get first worksheet name
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        //convert to an array of json obejcts
        const jsonData = XLSX.utils.sheet_to_json(worksheet);


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