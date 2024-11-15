const { CartPage } = require("./CartPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { OrdersReviewPage } = require("./OrdersReviewPage");

class PageObjectManager {
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderReviewPage = new OrdersReviewPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getOrdersReviewPage(){
        return this.orderReviewPage;
    }

    getOrdersHistoryPage(){
        return this.orderHistoryPage;
    }
}
module.exports = {PageObjectManager};