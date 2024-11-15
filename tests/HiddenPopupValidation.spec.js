const {test, expect} = require("@playwright/test");

test("Hidden Popup Validations", async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //web based alert popup handling
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    
    //Mouse hover operation
    await page.locator("#mousehover").hover();

    //handle frame using playwright
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})

test.only("Capture Screenshot and Visual comparison", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //Capture screenshot on element level
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    //Whole page SS
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

//Actual Screenshot -> Store -> Expected Screenshot

test("Visual Testing", async({page})=>{
    await page.goto("https://www.flightaware.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})