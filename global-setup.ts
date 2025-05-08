import { chromium, FullConfig } from "@playwright/test";
import { POManager } from "./pages/POManager";
import { testConfig } from "./Data/login_data";
import fs from "fs-extra";


const AUTH_FILE = ".auth/user.json";
const folderPath = './my-allure-results';

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState} = config.projects[0].use;
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    try {
        // Navigate to the login page
        await loginPage.navigateToLoginPage(baseURL);
        // Perform login
        await loginPage.login(testConfig.useremail, testConfig.password);
        await context.storageState({ path: AUTH_FILE });
        await fs.rm(folderPath, { recursive: true, force: true }); //Deletes the Allure results folder if it exists, so test results start fresh.
        // Close the browser
        await browser.close();

    } catch (error) {
        console.error((error as Error).message);
        await context.tracing.stop({
            path: './test-results/failed-setup-trace.zip',
          });
        await browser.close();
        throw error; // Rethrow the error to fail the test run
    }
    // Clean up allure results folder if it exists
    // if (fs.existsSync(folderPath)) {
    //     fs.removeSync(folderPath);
    //     console.log(`Allure results folder ${folderPath} removed.`);
    // } else {
    //     console.log(`Allure results folder ${folderPath} does not exist.`);
  // }
}

export default globalSetup; 