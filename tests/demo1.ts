import { Locator, Page } from "@playwright/test";

//static data typing
let message1: string = "hello";
message1 = "bye";

let age1:number = 20;
let isActive:boolean = true;
let numbers1:number[] = [1,2,3];

function add1(a:number, b: number){
    return a+b;
}

add(3,4);

let user:{name: string, age:number} = {name: "Bob", age: 34};

class CartPage {
    page: Page;
    cartProducts: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;

    constructor(page:any){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }
}