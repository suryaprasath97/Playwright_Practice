import { Page } from '@playwright/test'
import { BaseMethod } from "../Utility/BaseMethod";

export class OrangeHRMPage extends BaseMethod {

    // private actions: OrangeHRM;

    constructor(page: Page) {
        super(page)
        
    }

    username = () => this.page.locator('input[name="username"]');
    Password = () => this.page.locator('input[name="password"]');
    loginbtn = () => this.page.locator('button[type="submit"]')

    adminMenu = ()=> this.page.locator("//a[contains(@href,'viewAdminModule')]");

    async launchOragngeHRMURL(url: string){
        await this.launchURL(url)
    }

    async enterUserName(username:string){
        await this.typetext(this.username(),username,100)
    }

     async enterPassword(password:string){
        await this.sentText(this.Password(),password)

    }

    async ClickSubmit(){
        await this.clickElement(this.loginbtn())
    }

    async OrangeHRMTitle(title:string){
        await this.WaitLoadstate();
        await this.verifyTitle(title);    
        await this.clickElement(this.adminMenu())
        const URL  = this.page.url()
        console.log (URL);
        await this.WaitTimeout(5000)
        await this.fullPagescreenshot("E:/Learning/PlaywrightTypescript/Project Class/test.png")
        
    }






}