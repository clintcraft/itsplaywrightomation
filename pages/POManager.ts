import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";



export class POManager {
    public page: Page
    public loginPage: LoginPage;

    constructor(page:Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);

     }


    getLoginPage(): LoginPage {
        return this.loginPage;
    }


}