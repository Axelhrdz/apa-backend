import * as XLSX from 'xlsx';
// import baldioToggle from '../aperturasMasivas/aperturasMasivas.service.js';
import { baldioToggle } from '../../utils/helpers.js';



const ExcelandData = (req, baldioToggle = null) => {
    const file = req.files.file;
    const formData = req.body;

    const workbook = XLSX.read(file.data, {type: 'buffer'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // console.log(jsonData);
    

    return {
        jsonData: jsonData,
        message: 'Sucess from ExcelandData',
        status: 200
    }
}


const previewExcelService = async (req) => {
    try {
        // console.log('sucess from preview excel service');
        const jsonData = ExcelandData(req);
        console.log(jsonData);

        return {
            message: 'Sucess from preview excel service',
            jsonData: jsonData,
            status: 200
        };

        
    } catch (error) {
        console.error('Error in previewExcelService', error);
        return {
            message: 'Error in previewExcelService',
            error: error.message,
            status: 500
        };
    }
}


export default previewExcelService;