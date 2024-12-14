import { Page } from '@playwright/test';

export class PIMPage {
    private page: Page;

    private pimMenu = '//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a';

    // Selectores comunes
    private employeeListTab = 'a:visible:has-text("Employee List")';
    private addEmployeeTab = 'a:visible:has-text("Add Employee")';

    // Selectores de la vista Add Employee - Primer formulario
    private firstNameInput = 'input[name="firstName"]';
    private middleNameInput = 'input[name="middleName"]';
    private lastNameInput = 'input[name="lastName"]';
    private employeeIdInput = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input';
    private saveButton = 'button[type="submit"]';
    private successMessage = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[1]/div[1]/div[1]/h6';
    private requiredMessage = '.error-message';

    // Selectores de la vista Employee List
    private searchEmployeeInput = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/input';
    private searchButton = '//button[@type="submit"]';
    private employeeTableRow = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div/div/div[2]';



    constructor(page: Page) {
        this.page = page;
    }

    public async goToPIM(): Promise<void> {
        await this.page.waitForSelector(this.pimMenu);
        await this.page.click(this.pimMenu);
    }

    public async goToEmployeeList(): Promise<void> {
        await this.page.click(this.employeeListTab);
    }

    public async goToAddEmployee(): Promise<void> {
        await this.page.click(this.addEmployeeTab);
    }

    // Métodos para la vista Add Employee
    public async fillMandatoryFields(firstName: string, lastName: string, employeeId: string): Promise<void> {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.employeeIdInput, employeeId);
    }


    public async leaveFieldsEmpty(): Promise<void> {
        await this.page.fill(this.firstNameInput, '');
        await this.page.fill(this.lastNameInput, '');
    }

    public async clickSaveButton(): Promise<void> {
        await this.page.click(this.saveButton);
    }

    public async isSuccessMessageVisible(): Promise<string> {
        await this.page.waitForSelector(this.successMessage, { state: 'visible' }); // Espera hasta que sea visible
        const message = await this.page.textContent(this.successMessage);
        return message?.trim() || '';
    }

    public async isRequiredMessageVisible(): Promise<boolean> {
        return this.page.isVisible(this.requiredMessage);
    }

    public async searchEmployeeById(employeeId: string): Promise<void> {
        await this.page.fill(this.searchEmployeeInput, employeeId);
        await this.page.click(this.searchButton);
    }

    public async isEmployeeInList(employeeId: string): Promise<boolean> {
        // const employeeRow = await this.page.locator(`${this.employeeTableRow}[contains(text(),"${employeeId}")]`);
        // return employeeRow.isVisible();
        // Usar XPath para localizar directamente el texto dentro de las filas
        const matchingRows = await this.page.locator('.oxd-table-row').filter({
            hasText: employeeId,
        });

        console.log(`Number of matching rows for ID ${employeeId}:`, await matchingRows.count());
        return await matchingRows.count() > 0;
    }
}