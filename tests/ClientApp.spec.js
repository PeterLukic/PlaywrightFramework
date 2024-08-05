const { test, expect } = require('@playwright/test');
const { count } = require('console');

test('client app 1', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("input#userEmail").fill("peter.lukic@gmail.com");
  await page.locator("input#userPassword").fill("12345");
  await page.locator("input#login").click();
  await page.waitForLoadState('networkidle');
  //await page.locator(".card-body b").first().waitFor();
  const allTitles = await page.locator(".card-body b").allTextContents();
  console.log(allTitles);

});


test('client app 2', async ({ page }) => {
  const prodctName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("input#userEmail").fill("peter.lukic@gmail.com");
  await page.locator("input#userPassword").fill("12345");
  await page.locator("input#login").click();
  await page.waitForLoadState('networkidle');
  const allTitles = await page.locator(".card-body b").allTextContents();
  console.log(allTitles);
  const countProducts = await products.count();
  for (let i = 0; i < countProducts; ++i) {
    if (await products.nth(i).locator("b").textContent() === prodctName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator(".subtotal .btn-primary").click();
  //await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:100});
  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator("label[type='text']").first()).toHaveText("peter.lukic@gmail.com");
  await page.locator(".action__submit.btnn.ng-star-inserted").click();
  await expect(page.locator("td > .hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 > .ng-star-inserted").textContent();
  console.log(orderId);
  
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");


  for (let i = 0; i < await rows.count(); ++i) {
     const rowOrderId = await rows.nth(i).locator("th").textContent();
     if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
     }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

});