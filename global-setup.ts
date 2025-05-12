import { chromium, FullConfig } from "@playwright/test";
import { POManager } from "./pages/POManager";
import { testConfig } from "./Data/login_data";
// Removed unused import as 'TestConfig' is not exported from './testconfig'
import fs from "fs-extra";


// const AUTH_FILE = ".auth/user.json";
const folderPath = './my-allure-results';

async function globalSetup(config: FullConfig) {
    // Clean up Allure results folder at the start (before any browser actions)
    try {
        await fs.rm(folderPath, { recursive: true, force: true });
        console.log(`🧹 Cleared Allure results at: ${folderPath}`);
    } catch (err) {
        console.warn(`⚠️ Failed to clean Allure folder: ${(err as Error).message}`);
    }
    const { baseURL, storageState } = config.projects[0].use;

    //Launch the browser and create a new context
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Create an instance of POManager and get the LoginPage
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    try {
        //Start tracing (for debugging if login fails)
        await context.tracing.start({ screenshots: true, snapshots: true });


        // Navigate to the login page
        if (!baseURL) {
            throw new Error("⚠️ baseURL is undefined in playwright.config.ts");
        }
        await loginPage.navigateToLoginPage(baseURL);
        // Perform login
        await loginPage.login(testConfig.useremail, testConfig.password);

        // Save storage state for login reuse
        if (typeof storageState === 'string') {
            await context.storageState({ path: storageState });
            console.log(`✅ Saved authenticated state to:  ${storageState}`);
        } else {
            throw new Error("⚠️ storageState must be a string in playwright.config.ts");
        }

    } catch (error) {
        console.error(`🔥 [globalSetup] Login/setup failed: ${(error as Error).message}`);

        //Stop tracing and save file for debugging
        await context.tracing.stop({ path: './test-results/failed-setup-trace.zip' });

        await browser.close();
        throw error; // Rethrow the error to fail the test run

    }
    //Stop tracing (succes case)
    await context.tracing.stop();

    //close the browser
    await browser.close();
}

export default globalSetup; 