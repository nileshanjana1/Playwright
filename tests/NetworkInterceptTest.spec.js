const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');
const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const createOrderPayload = {orders:[{country:"Cuba",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};
const fakePayload = {
    data: [],
    count: 0,
    message: "No O rders Found"
}
let response;

test.beforeAll(async ()=>{
    //Login API code moved to ApiUtils
    const apiContext = await request.newContext();
    const apiutils = new ApiUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(createOrderPayload);
    
    // Create Order API code moved to ApiUtils

})

test('Network Intercept(Mock) test', async ({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)
  
    await page.goto('https://rahulshettyacademy.com/client/'); 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       async route=>{
            //Intercepting response - API Response -> Fake response using playwright -> browser -> render data on front end
            const fetchedResponse = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayload);
            route.fulfill({
                fetchedResponse,
                body
            })
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    await page.locator("tbody").waitFor();
    const rows = page.locator(".tbody tr");

});
