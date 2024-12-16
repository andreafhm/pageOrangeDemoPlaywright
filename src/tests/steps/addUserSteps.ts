import { Given, When, Then } from '@cucumber/cucumber';
import { PIMPage } from '../pages/PIMPage';
import { expect } from '@playwright/test';

let pimPage: PIMPage;


Given('User navigates to the PIM section', async function () {
    pimPage = new PIMPage(this.page);
    await pimPage.goToPIM();
});

When('User navigates to the Add Employee tab', async function () {
    await pimPage.goToAddEmployee();
});

When('User fills in the mandatory fields with {string}, {string}, {string}', async function (firstName: string, lastName: string , employeeId: string ) {
    this.firstName = firstName;
    this.lastName = lastName;
    await pimPage.fillMandatoryFields(firstName, lastName, employeeId);
});


When('User clicks the Save button', async function () {
    await pimPage.clickSaveButton();
});

Then('A success message should appear', async function () {
    const actualMessage = await pimPage.isSuccessMessageVisible();
    const expectedMessage = `${this.firstName} ${this.lastName}`;
    expect(actualMessage.trim()).toBe(expectedMessage);
});

When('User navigates to the Employee List tab', async function () {
    await pimPage.goToEmployeeList();
});

When('User searches for the employee with ID {string}', async function (employeeId: string) {
    await pimPage.searchEmployeeById(employeeId);
});

Then('The employee should be listed', async function () {
    const isEmployeeFound = await pimPage.isEmployeeInList();
    expect(isEmployeeFound).toBe(true);
});


When('User leaves the mandatory fields empty', async function () {
    await pimPage.leaveFieldsEmpty();
});

Then('A required message should appear for missing mandatory fields', async function () {
    const isRequiredMessageVisible = await pimPage.isRequiredMessageVisible();
    expect(isRequiredMessageVisible).toBe(true);
});
