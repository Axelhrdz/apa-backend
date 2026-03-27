import * as XLSX from 'xlsx';

export const baldioToggle  = (file, formData) => {
    console.log('baldio toggle helper working');

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
    
}