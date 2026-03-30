import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

const apaAutosufService = async (data, url, timeout = 5000) => {
    try {
        console.log('autosuficientesMasivasPlaywright service working');

        // console.log(data);

        const jsonData = data.excelData.jsonData;
        const formData = {
            folio: data.folio,
            observaciones: data.observaciones,
        }

        console.log(jsonData);
        console.log(formData);


        const browser = await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-extensions',
                '--single-process',
            ],
        });

        const context = await browser.newContext();
        const page = await context.newPage();

        const response = await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout,
        })


        //find input fields to login
        const username = page.locator('input[name="usr"]');
        const password = page.locator('input[name="pwd"]');
        const submit = page.locator('input[type="submit"]');
        const testInput = page.locator('input[name="testing"]');

        await username.waitFor({ state: 'visible', timeout: 5000 });
        await password.waitFor({ state: 'visible', timeout: 5000 });
        await submit.waitFor({ state: 'visible', timeout: 5000 });
        // await testInput.waitFor({ state: 'visible', timeout: 5000 });

        await username.fill(process.env.APA_USERNAME);
        await password.fill(process.env.APA_PASSWORD);
        await submit.click();

        /* PENDING STEPS TO BE DONE, ONCE APA SYSTEM IS BACK */

        //go to administrador page
        //go to administrador page
        //go to administrador page

        //go to autosuficientes masivas page
        //go to autosuficientes masivas page
        //go to autosuficientes masivas page

        //go to nuevo registro
        //go to nuevo registro
        //go to nuevo registro

        //pending steps... waiting for APA to take the steps from here
        //pending steps... waiting for APA to take the steps from here
        //pending steps... waiting for APA to take the steps from here


    
        return {
            success: true,
            message: 'autosuficientesMasivasPlaywright service working',
            data: data,
            status: 200
        };
    } catch (error) {
        console.error('Error in autosuficientesMasivasPlaywright', error);
        return {
            success: false,
            message: 'Error in autosuficientesMasivasPlaywright service',
            error: error.message,
            status: 502
        };
    }
}


export default apaAutosufService;