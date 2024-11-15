
import {LoginPage} from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from '../pageObjects_ts/CartPage';
import { OrderHistoryPage } from '../pageObjects_ts/OrderHistoryPage';
import { OrdersReviewPage } from '../pageObjects_ts/OrdersReviewPage';
import { Page } from '@playwright/test';
//const { DashboardPage } = require("./DashboardPage");
//const { LoginPage } = require("./LoginPage");


export class PageObjectManager {
    loginPage : LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    orderReviewPage : OrdersReviewPage;
    orderHistoryPage: OrderHistoryPage;
    page: Page;
    constructor(page:Page){
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