import { Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { setDefaultTimeout } from '@cucumber/cucumber';

let browser: Browser | null;
let context: BrowserContext | null;
setDefaultTimeout(60 * 1000);

Before({ tags: '@add_employee' }, async function () {
    console.log('Inicializando navegador y contexto...');
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    const page = await context.newPage();
    this.page = page;

    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();

    console.log('Realizando login...');
    await loginPage.login('Admin', 'admin123');
    await loginPage.clickLogin();
    await loginPage.isLoggedIn();
    console.log('Login exitoso.');
});

After(async function () {
    console.log('Cerrando navegador y contexto...');
   if (browser) {
        await browser.close();
    }
});
