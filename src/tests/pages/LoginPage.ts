import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectores
    private userNameInput = `input[name='username']`;
    private passwordInput = `input[name='password']`;
    private loginButton = `button[type='submit']`;
    private dashboardElement = 'h6:has-text("Dashboard")';
    private loginErrorMessage = 'p:has-text("Invalid credentials")';

    public async navigateTo(): Promise<void> {
        console.log("Navegando a la página de inicio de sesión");
        await this.page.goto('https://opensource-demo.orangehrmlive.com');
    }

    public async login(username: string, password: string): Promise<void> {
        console.log(`Llenando el campo de usuario: ${username}`);
        await this.page.waitForSelector(this.userNameInput, { state: 'visible', timeout: 30000 });
        await this.page.fill(this.userNameInput, username);

        console.log(`Llenando el campo de contraseña`);
        await this.page.waitForSelector(this.passwordInput, { state: 'visible', timeout: 30000 });
        await this.page.fill(this.passwordInput, password);
    }

    public async clickLogin(): Promise<void> {
        console.log("Haciendo clic en el botón de inicio de sesión");
        await this.page.waitForSelector(this.loginButton, { state: 'visible', timeout: 30000 });
        await this.page.click(this.loginButton);
    }

    public async isLoggedIn(): Promise<boolean> {
        console.log("Verificando si el usuario está en el dashboard");
        try {
            await this.page.waitForSelector(this.dashboardElement, { state: 'visible', timeout: 60000 });
            return true;
        } catch {
            return false;
        }
    }

    public async isLoginErrorVisible(): Promise<boolean> {
        console.log("Verificando si se muestra el mensaje de error de inicio de sesión");
        try {
            await this.page.waitForSelector(this.loginErrorMessage, { state: 'visible', timeout: 30000 });
            return true;
        } catch {
            return false;
        }
    }
}
