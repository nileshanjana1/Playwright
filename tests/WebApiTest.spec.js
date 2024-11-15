const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('../tests/utils/ApiUtils');
const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const createOrderPayload = {orders:[{country:"Cuba",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};
let response;

test.beforeAll(async ()=>{
    //Login API code moved to ApiUtils
    const apiContext = await request.newContext();
    const apiutils = new ApiUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(createOrderPayload);
    
    // Create Order API code moved to ApiUtils

})

test('@API Place Order Web API & UI test', async ({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)
  
    await page.goto('https://rahulshettyacademy.com/client/'); 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator(".tbody tr");

    for(let i =0; i<await rows.count(); ++i){
        const  rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});

// Verify if order created is showing in history page
// Precondition - Create order -
