const { test, expect, request } = require("@playwright/test");

test("Security Network Intercept test", async ({ page }) => {
  //login and reach orders page
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").type("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();

  //before clicking view button
  page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    //continue is used to modify/intercept request, url, body
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=66fa41eeae2afd4c0b894e82",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  //await page.pause();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
