import { test, expect } from '@playwright/test';


//determine base url based on network availability
async function getBaseUrl(page) {
    const localUrl = 'http://172.16.11.58/apa//';
    const externalUrl = 'http://services.tlajomulco.gob.mx:1080/apa/';
    
    try {
      // Try to access the local URL first
      const response = await page.goto(localUrl, { timeout: 5000 });
      if (response && response.status() < 400) {
        console.log('Using local network URL:', localUrl);
        return localUrl;
      }
    } catch (error) {
      console.log('Local network not available, trying external URL...');
    }
    
    try {
      // Try external URL
      const response = await page.goto(externalUrl, { timeout: 10000 });
      if (response && response.status() < 400) {
        console.log('Using external network URL:', externalUrl);
        return externalUrl;
      }
    } catch (error) {
      console.log('External network also not available');
    }
    
    // Default to local if both fail
    console.log('Defaulting to local URL');
    return localUrl;
  }

test('go to aperturas masivas page', async ({page}) => {
    //determine base url
    const baseUrl = await getBaseUrl(page);

    const username = page.locator('input[name="usr"]');
    const password = page.locator('input[name="pwd"]');
    const submit = page.locator('input[type="submit"]');

    const account = '891100163';
    let idAccount = '';

    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(submit).toBeVisible();


    await username.fill('aihdez');
    await password.fill('aihdez');
    

    //Wait for popup window after login
    const [popup] = await Promise.all([
        page.waitForEvent("popup"),
        submit.click(),
    ]);
    await popup.waitForLoadState("domcontentloaded");
    expect(await popup.title()).not.toBe("");

    //go to Administrador
    // await popup.goto(`${baseUrl}main.php?m=2`);
    // await popup.goto(`${baseUrl}main.php?m=1`);


    //go to Aperturas Masivas cuentas
    await popup.goto(`${baseUrl}main.php?m=1&a=124`);



    //find "Seleccionar archivo" input, name="archivo" (it's on the popup, not the original page)
    const selectFile = popup.locator('input[name="archivo"]');
    await expect(selectFile).toBeVisible();
    

    //find "Localidad" select, name="localidad"
    const localidad = popup.locator('select[name="localidad"]');
    await expect(localidad).toBeVisible();
    //select option with value "102"
    await localidad.selectOption({ value: '1' });

    


    //find "Colonia" select, name="colonia"
    const colonia = popup.locator('select[name="colonia"]');
    await expect(colonia).toBeVisible();
    //select option by visible text (label); use label when you only have the text, not the value
    await colonia.selectOption({ label: 'VILLAS SANTA SOFIA' });




    //find Observaciones input, name="observaciones"
    const observaciones = popup.locator('input[name="observaciones"]');
    await expect(observaciones).toBeVisible();
    //fill "Observaciones" with "Test"
    await observaciones.fill('Test observacion');

    
    //find Enviar button, type="submit"
    // const enviar = popup.locator('input[type="submit"]');
    // await expect(enviar).toBeVisible();
    



});