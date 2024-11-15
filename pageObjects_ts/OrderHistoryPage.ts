import { Locator, Page } from "@playwright/test";

export class OrderHistoryPage {
    page: Page;
    ordersTable: Locator;
    rows: Locator;
    orderDetails: Locator;
    constructor(page:Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator(".tbody tr");
        this.orderDetails = page.locator(".col-text");
    }

    async searchOrderAndSelect(orderId:any){
        await this.ordersTable.waitFor();
        const rows = this.rows;
    
        for(let i =0; i<await rows.count(); ++i){
            const  rowOrderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)){
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId(){
        return await this.orderDetails.textContent();
    }
}
module.exports = {OrderHistoryPage};