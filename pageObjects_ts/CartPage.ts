import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;
    constructor(page:Page){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }

    async verifyProductIsVisible(productName:string){
    await this.cartProducts.waitFor();
    //including wait for since isvisble is not have autowaiting mechanism in playwright
    const bool = await (await this.getProductByLocator(productName)).isVisible();
    expect(bool).toBeTruthy();

    }

    async checkOut(){
        await this.checkout.click();
    }

    async getProductByLocator(productName){
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports = {CartPage};