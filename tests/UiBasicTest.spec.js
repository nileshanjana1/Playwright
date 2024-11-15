const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("Browser context Playwright test", async ({ browser }) => {
  //Chrome - plugins, cookies
  //Create Fresh/ New instance

  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("#username");
  const signinbtn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  //css
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("[type='password']").fill("learning");
  await page.locator("#signInBtn").click();
  //wait until this locator shown up
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  //type - fill
  await username.fill("");
  await username.fill("rahulshettyacademy");
  await signinbtn.click();
  console.log(await page.locator(".card-body a").first().textContent());
  console.log(await page.locator(".card-body a").nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://www.google.com");
  //Get page title -- assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test.only("Dropdown test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const signinbtn = page.locator("#signInBtn");
  const blinkText = page.locator("[href*='documents-request']");
  //radio button
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  //assertion
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  //checkbox
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  //Pause before exiting (Playwright Inspector)
  //await page.pause();

  // To check if text is blinking using class

  await expect(blinkText).toHaveAttribute("class", "blinkingText");
});

test("@Web Child Window handle test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //To block images or call to browser
  // page.route("**/*.{jpg,css,jpeg,png}", route=> route.abort());
  //To list all request/reponse and status call through playwright
  // page.on('request', request => console.log(request.url()));
  //page.on('response', response => console.log(response.url(), response.status()));

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const signinbtn = page.locator("#signInBtn");
  const blinkText = page.locator("[href*='documents-request']");
  //when we need to execute 2 statemens parallely withough synchronus mode use promise.all
  // wait for child page to launch

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkText.click(), // listen for any new page pending, rejected, fulfilled
  ]);

  //child page
  const text = await newPage.locator(".red").textContent();
  //split to get only email
  const arrText = text.split("@");
  const domain = arrText[1].split(" ")[0];
  console.log(text);
  console.log(domain);

  //enter domain value to username edit box
  await page.locator("#username").fill(domain);
  console.log(await page.locator("#username").textContent());
});
