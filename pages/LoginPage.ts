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
        try {
            console.log(`Attempting to enter email: ${emailAddress}`);
            const emailField = this.page.locator(ReturningCustomerLocators.EMAIL_PLACEHOLDER);
            
            // Wait for the element to be visible and enabled
            await expect(emailField).toBeVisible({ timeout: LoginPageTimeouts.ELEMENT_VISIBILITY_TIMEOUT });
            await expect(emailField).toBeEnabled({ timeout: LoginPageTimeouts.ELEMENT_VISIBILITY_TIMEOUT });
            
            // Clear any existing value and fill in the email
            await emailField.clear();
            await emailField.fill(emailAddress);
            
            // Verify the email was entered correctly
            const enteredValue = await emailField.inputValue();
            if (enteredValue !== emailAddress) {
                throw new Error(`Email field value mismatch. Expected: ${emailAddress}, Got: ${enteredValue}`);
            }
            
            console.log('Email entered successfully ✅');
        } catch (error) {
            console.error(`Failed to enter email: ${error}`);
            throw new Error(`Email entry failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    // Fill in the password field with validation
    async enterLoginPassword(password: string) {
        try {
            console.log('Attempting to enter password...');
            const passwordField = this.page.locator(ReturningCustomerLocators.PASSWORD_PLACEHOLDER);
            
            // Wait for the element to be visible and enabled
            await expect(passwordField).toBeVisible({ timeout: LoginPageTimeouts.ELEMENT_VISIBILITY_TIMEOUT });
            await expect(passwordField).toBeEnabled({ timeout: LoginPageTimeouts.ELEMENT_VISIBILITY_TIMEOUT });
            
            // Clear any existing value and fill in the password
            await passwordField.clear();
            await passwordField.fill(password);
            
            // Verify the password was entered correctly
            const enteredValue = await passwordField.inputValue();
            if (enteredValue !== password) {
                throw new Error('Password field value mismatch');
            }
            
            console.log('Password entered successfully ✅');
        } catch (error) {
            console.error(`Failed to enter password: ${error}`);
            throw new Error(`Password entry failed: ${error instanceof Error ? error.message : String(error)}`);
        }
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

