const { test, expect } = require('@playwright/test');
const exp = require('constants');

test('Browser context Playwright test', async ({page}) => {
    
    const productName = 'Zara Coat 4';  
    const email = "anshika@gmail.com";
    //read all products
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client/');
    //css
    await page.locator('#userEmail').fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //wait for all service to load in network tab
    await page.waitForLoadState('networkidle');
    // OR
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //iterate through products
    const count = await products.count();
    for (let i =0; i<count; ++i){
        if (await products.nth(i).locator("b").textContent() === productName) {
            // add to cart
            await products.nth(i).locator("text=' Add To Cart'").click();
            break;
        }
    }

    //go to cart page
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    //including wait for since isvisble is not have autowaiting mechanism in playwright
    const bool = await page.locator("h3:has-text(productName)").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    //enter text one by one using pressSequentially
    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i = 0; i< optionsCount; ++i){
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India"){
        await dropdown.locator("button").nth(i).click();
        break;
    }
    }

    await expect(page.locator(".user-name [type=''text]").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator(".tbody tr");

    for(let i =0; i<await rows.count(); ++i){
        const  rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});



