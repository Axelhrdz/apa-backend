import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';


// //Get base url
// async function getBaseUrl(page) {
//     const localUrl = 'http://172.16.11.58/apa//';
//     const externalUrl = 'http://services.tlajomulco.gob.mx:1080/apa/';
    
//     try {
//       // Try to access the local URL first
//       const response = await page.goto(localUrl, { timeout: 5000 });
//       if (response && response.status() < 400) {
//         console.log('Using local network URL:', localUrl);
//         return localUrl;
//       }
//     } catch (error) {
//       console.log('Local network not available, trying external URL...');
//     }
    
//     try {
//       // Try external URL
//       const response = await page.goto(externalUrl, { timeout: 10000 });
//       if (response && response.status() < 400) {
//         console.log('Using external network URL:', externalUrl);
//         return externalUrl;
//       }
//     } catch (error) {
//       console.log('External network also not available');
//     }
    
//     // Default to local if both fail
//     console.log('Defaulting to local URL');
//     return localUrl;
//   }

// const aperturasMasivasPlaywright = async ({txtFileOutput, url}) => {

// }

const apaAccessService = async (txtFileOutput, formData, url, timeout = 5000) => {
    console.log('FORM DATA', formData);
    try{
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();


        const response = await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout,
        });


        // console.log('response', response);


        //find input fields to login
        const username = page.locator('input[name="usr"]');
        const password = page.locator('input[name="pwd"]');
        const submit = page.locator('input[type="submit"]');
        const testInput = page.locator('input[name="testing"]');

        await username.waitFor({ state: 'visible', timeout: 5000 });
        await password.waitFor({ state: 'visible', timeout: 5000 });
        await submit.waitFor({ state: 'visible', timeout: 5000 });
        // await testInput.waitFor({ state: 'visible', timeout: 5000 });

        await username.fill('aihdez');
        await password.fill('aihdez');
        await submit.click();

        //Wait for popup window after login
        // const [popup] = await Promise.all([
        //     page.waitForEvent("popup"),
        //     submit.click(),
        // ]);
        // await popup.waitForLoadState("domcontentloaded");
        // console.log('logged in and popup window opened');


        //go to aperturas masivas page
        await page.goto(`${url}main.php?m=1&a=124`);
        await page.waitForLoadState("domcontentloaded");
        console.log('aperturas masivas page opened');

        //find "Seleccionar archivo" input, name="archivo" (it's on the popup, not the original page)
        const selectFile = page.locator('input[name="archivo"]');
        await selectFile.waitFor({ state: 'visible', timeout: 2000 });
        //log file input value
        console.log(await selectFile.inputValue());

        //write temporary .txt file and select it from input file selector
        const tempFilePath = path.join(os.tmpdir(), 'temp.txt');
        fs.writeFileSync(tempFilePath, txtFileOutput);
        await selectFile.setInputFiles(tempFilePath);
        console.log('--------------------------------');
        console.log('tempFilePath', tempFilePath);
        console.log('file input filled');


        //log tempfile content
        console.log('---------temp file content---------')
        const tempFileContent = fs.readFileSync(tempFilePath, 'utf8');
        console.log(tempFileContent);
        console.log('--------------------------------');

        
        

        

        //find "Localidad" select, name="localidad"
        let localidadValue = '';
        const localidad = page.locator('select[name="localidad"]');

        console.log('------localidad not selected-----------')
        await localidad.waitFor({ state: 'visible', timeout: 2000 });
        console.log('localidad input value', await localidad.inputValue());


        //select option with value '222'
        console.log('---------localidad selected---------')
        localidadValue = await localidad.selectOption({ label: formData['localidad'] });
        console.log('localidad option selected', localidadValue);

        //get option text from its value
        const localidadOptionValue = await localidad.inputValue();
        console.log('localidad option value', localidadOptionValue);
        console.log('--------------------------------');





        //find "Colonia" select, name="colonia"
        let coloniaValue = '';
        const colonia = page.locator('select[name="colonia"]');

        console.log('------colonia not selected-----------')
        await colonia.waitFor({ state: 'visible', timeout: 2000 });
        console.log('colonia input value', await colonia.inputValue());


        //select option with textContent
        console.log('---------colonia selected---------')
        coloniaValue = await colonia.selectOption({ label: formData['colonia'] });
        console.log('colonia option selected', coloniaValue);

        //get option text from its value
        const coloniaOptionValue = await colonia.inputValue();
        console.log('colonia option value', coloniaOptionValue);
        console.log('--------------------------------');






        //find Observaciones input, name="observaciones"
        const observaciones = page.locator('input[name="observaciones"]');
        await observaciones.waitFor({ state: 'visible', timeout: 2000 });
        console.log('observaciones input value', await observaciones.inputValue());

        //fill observaciones input
        await observaciones.fill('apa asistente aperturas tool test 0.4 (automated)');
        console.log('observaciones input filled', await observaciones.inputValue());
        console.log('--------------------------------');
        



        //find Enviar button, type="submit"
        const enviar = page.locator('input[type="submit"]');
        await enviar.waitFor({ state: 'visible', timeout: 2000 });
        console.log('enviar button visible');

        //click Enviar button — wait for navigation to results page (ac=importa)
        await Promise.all([
            page.waitForURL(/ac=importa/, { timeout: 60000 }),
            enviar.click(),
        ]);

        // //delete temp file and wait for results page
        fs.unlinkSync(tempFilePath);
        console.log('temporary file deleted');
        console.log('Navigated to results page');






        return response && response.status() < 400;
    }catch(error){
        console.error('Error testing url access', error);
        return false;
    }
}


export { apaAccessService };