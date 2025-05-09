import { test as baseTest, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
// import { ProductsPage } from '../pages/ProductsPage';
// import { ContactFormPage } from '../pages/ContactFormPage';

// Extend the base test with custom fixtures
export const test = baseTest.extend<{
    loginPage: LoginPage;
    // contactFormPage: ContactFormPage;
    // productsPage: ProductsPage;
}>({
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page));
    },
    // contactFormPage: async ({ page, context }, use) => {
    //     await use(new ContactFormPage(page));
    // },
    // productsPage: async ({ page, context }, use) => {
    //     await use(new ProductsPage(page, context.request));
    // }
}); 