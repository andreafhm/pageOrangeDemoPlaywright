import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage'
import { Browser, chromium } from 'playwright';

let browser: Browser;
let loginPage: LoginPage;


Given('User navigates to the OrangeHRM login page', async function () {
  browser = await chromium.launch({ headless: false }); //Cambiar a true para ejecuciones sin interfaz
  const context = await browser.newContext();
  const page = await context.newPage();
  loginPage = new LoginPage(page);

  await loginPage.navigateTo();
});

When('User enter the credentials as {string}, {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

When('User click on the login button', async function () {
  await loginPage.clickLogin();
});

Then('Login should be success', async function () {
  const isLoggedIn = await loginPage.isLoggedIn();
  if (!isLoggedIn) {
    throw new Error('Login failed, but it was expected to succeed.');
  }
  // await browser.close();
});

Then('Login should be fail', async function () {
  const isErrorVisible = await loginPage.isLoginErrorVisible();
  if (!isErrorVisible) {
    throw new Error('Login succeeded, but it was expected to fail.');
  }
  // await browser.close();
});


Given('User is logged in', async function () {
 
});