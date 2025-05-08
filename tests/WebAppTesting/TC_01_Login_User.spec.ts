import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { POManager } from '../../pages/POManager';
import { testConfig } from '../../Data/login_data';


test.describe('Smoke Suite', () => {

    test('TC_01 Login User with correct email and password', async ({ page }: { page: Page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        await loginpage.navigateToLoginPage(testConfig.url);
        await loginpage.enterEmail(testConfig.useremail);
        await loginpage.enterLoginPassword(testConfig.password);
        await loginpage.clickLoginBtn();
    });

    // test('TC_02 Logout User', async ({ page }: { page: Page }) => {

    // });
});