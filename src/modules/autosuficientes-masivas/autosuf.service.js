import * as XLSX from 'xlsx';
import dotenv from 'dotenv';
import apaAutosufService from './autosuf.playwright.service.js';

dotenv.config();

const autosufMasivasService = async (req) => {
    try {
        console.log('autosufMasivasService working');

        // console.log(req.body);
        const data = await apaAutosufService(
            req.body,
            process.env.APA_BASE_URL
        );
        // const file = req.body.file;

        

        // console.log(data.data?.excelData.jsonData);

        return {
            data: data,
            status: data.status
        };
    } catch (error) {
        console.error('Error in autosufMasivasService', error);
        return {
            success: false,
            message: 'Error in autosufMasivasService',
            error: error.message,
            status: 500
        };
    }
}

export default autosufMasivasService;