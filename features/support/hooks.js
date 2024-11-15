const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const {PageObjectManager} = require('../../pageObjects/PageObjectManager');
const playwright = require('@playwright/test');


Before(async function(){
    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pageObjectManager = new PageObjectManager(this.page);
})

After(async function () {
    console.log("Last step to execute");
})

BeforeStep(async function () {
    
})

AfterStep(async function ({result}) {
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'scrrenshot1.jpeg'});
    }

})