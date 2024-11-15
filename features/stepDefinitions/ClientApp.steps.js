const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require('@playwright/test');
const {PageObjectManager} = require('../../pageObjects/PageObjectManager');
const playwright = require('@playwright/test');

Given("Login to ecommerce application with {string} and {string}",  {timeout: 100*1000}, async function (username, password) {
    //Move to hooks.js file in Before section
    /**const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    this.pageObjectManager = new PageObjectManager(page);**/
    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When("Add item {string} to Cart", async function (productName) {
    const dashboardPage = this.pageObjectManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in Cart", {timeout: 100*1000}, async function (productName) {
    const cartPage = this.pageObjectManager.getCartPage();
    await cartPage.verifyProductIsVisible(productName);
    await cartPage.checkOut();
});

When("Enter valid details and place the order", async function () {
    const ordersReviewPage = this.pageObjectManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", " India");
    let orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderId);
});
Then("Verify order is present in OrderHistory", async function () {
    await dashboardPage.navigateToOrders();
    const orderHistoryPage = this.pageObjectManager.getOrdersHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});
