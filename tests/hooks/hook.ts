import { Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { CustomWorld } from "../Utility/CustomFix";


Before(async function(this:CustomWorld){
    this.browser = await chromium.launch({
        headless:false
    })

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

})

After(async function (this:CustomWorld, scenario){
    if(scenario.result?.status==="FAILED"){
        await this.page.screenshot({
            path: `test-results/FailedTestScreenshots/${Date.now()}.png`,
            fullPage: true
        });
        
    }
    
    await this.browser.close();
    await this.context.close()
    await this.page.close();
})