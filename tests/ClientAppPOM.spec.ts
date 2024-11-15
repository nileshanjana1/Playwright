const { test, expect } = require('@playwright/test');
import {customtest} from '../utils_ts/test-base';
import {PageObjectManager} from '../pageObjects_ts/PageObjectManager';

//Json -> string -> JS Object
const dataset = JSON.parse(JSON.stringify(require('../testData/placeOrderTestData.json')));

//Trigger below test for multiple set of data
for (const data of dataset){


test(`POM E2E Playwright ${data.productName} test`, async ({page}) => {
    //Instead of below two classes call use PageObjectManager for all pages
    //const loginPage = new LoginPage(page);
   // const dashboardPage = new DashboardPage(page);
    const pageObjectManager = new PageObjectManager(page);

    //read all products
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
   
    
    //go to cart page
    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = pageObjectManager.getCartPage();
    await cartPage.verifyProductIsVisible(data.productName);
    await cartPage.checkOut();
    
    
    const ordersReviewPage = pageObjectManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", " India");
    let orderId:any;
    orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const orderHistoryPage = pageObjectManager.getOrdersHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});

//Custom test and sending data using Custom fixtures
customtest(`POM E2E Playwright ${data.productName} with custom test`, async ({page, testDataForOrder}) => {
    //Instead of below two classes call use PageObjectManager for all pages
    //const loginPage = new LoginPage(page);
   // const dashboardPage = new DashboardPage(page);
    const pageObjectManager = new PageObjectManager(page);

    //read all products
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
   
    
    //go to cart page
    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = pageObjectManager.getCartPage();
    await cartPage.verifyProductIsVisible(testDataForOrder.productName);
    await cartPage.checkOut();
    
    
    const ordersReviewPage = pageObjectManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", " India");
    let orderId:any = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const orderHistoryPage = pageObjectManager.getOrdersHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});

}

