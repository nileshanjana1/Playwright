import { expect, Locator, Page } from "@playwright/test";

export class OrdersReviewPage {
  page: Page;
  country: Locator;
  dropdown: Locator;
  email: Locator;
  submit:Locator;
  orderConfirmationText: any;
  orderId: Locator;
  constructor(page:Page) {
    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.email = page.locator(".user-name [type=''text]").first();
    this.submit = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async searchCountryAndSelect(countryCode:string, countryName:string) {
    //enter text one by one using pressSequentially
    await this.country.pressSequentially(countryCode, { delay: 100 });
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text:any = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async VerifyEmailId(username:string)
{
    await expect(this.email).toHaveText(username);
}

  async submitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
    return await this.orderId.textContent();
  }
}
module.exports = { OrdersReviewPage };
