import { Page, expect, Locator } from "@playwright/test";
import { ReturningCustomerLocators } from "../pages/pageLocators/LoginPageLocators";
import { LoginPageTimeouts } from "../pages/pageLocators/LoginPageLocators";
// Defining object structure using interface
interface ValidationAssertion {
    locator: string;
    description: string;
    timeout?: number;
}

export class LoginPage {
    // Defining variables using constructor
    constructor(public page: Page) { }

    async navigateToLoginPage(baseURL: string): Promise<void> {
        await this.page.goto(`${baseURL}/index.php?route=account/login`);
    };

    // Main login method with error handling and logging
    async login(email: string, password: string): Promise<void> {
        try {
            console.log(`Attempting to login with email: ${email}`);
            await this.enterEmail(email);
            await this.enterLoginPassword(password);
            await this.clickLoginBtn();
            console.log("Login successful ✅");
        } catch (error) {
            console.error(`Login failed: ${error}`);
            throw new Error(`Login failed: ${error}`);
        }
    };

    // Fill in the email field with validation
    async enterEmail(emailAddress: string) {
        await this.page.locator(ReturningCustomerLocators.EMAIL_PLACEHOLDER).fill(emailAddress);
    };

    // Fill in the password field with validation
    async enterLoginPassword(password: string) {
        await this.page.locator(ReturningCustomerLocators.PASSWORD_PLACEHOLDER).fill(password);
    };

    /**
     * Clicks the login button and waits for navigation to complete
     * @param {number} [timeout=5000] - Timeout in milliseconds for navigation wait
     * @throws {Error} If login button click fails or navigation timeout occurs
     * @returns {Promise<void>}
     */
    async clickLoginBtn(timeout: number = 5000): Promise<void> {
        try {
            console.log('Attempting to click login button...');

            const loginButton = this.page.locator(ReturningCustomerLocators.LOGIN_BUTTON);

            // Verify button is visible and enabled before clicking
            await expect(loginButton).toBeVisible({ timeout });
            await expect(loginButton).toBeEnabled({ timeout });

            // Click the button and wait for network to be idle
            await Promise.all([
                this.page.waitForLoadState('networkidle', { timeout }),
                loginButton.filter({ hasText: 'Login' }).click(),
            ]);

            console.log('Login button clicked successfully ✅');
        } catch (error) {
            console.error('Failed to click login button:', error);
            throw new Error(`Login button click failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}

