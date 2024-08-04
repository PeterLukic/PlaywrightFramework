const { test, expect } = require('@playwright/test');
const { count } = require('console');
const { PageLogin } = require('../pageobjects/PageLogin');
const { PageDashboard } = require('../pageobjects/PageDashboard');
const { PageManager } = require('../pageobjects/PageManager');
const dataset = JSON.parse(JSON.stringify(require('../utils/testData.json')));


test('client app 1', async ({ page }) => {
  const email = "peter.lukic@gmail.com";
  const password = "12345";
  const pageLogin = new PageLogin(page);
  pageLogin.goTo();
  pageLogin.validLogin(email, password);
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const allTitles = await page.locator(".card-body b").allTextContents();
  console.log(allTitles);

});


test('client app 2', async ({ page }) => {
  const email = "peter.lukic@gmail.com";
  const password = "12345";
  const prodctName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  const pageLogin = new PageLogin(page);
  await pageLogin.goTo();
  await pageLogin.validLogin(email, password);
  const pageDashboard = new PageDashboard(page);
  await pageDashboard.searchProductAddCart(prodctName);
  await pageDashboard.navigateToCart();



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

  await expect(page.locator("label[type='text']").first()).toHaveText(email);
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



test('client app 3', async ({ page }) => {
  const pageManager = new PageManager(page);
  const email = "peter.lukic@gmail.com";
  const password = "12345";
  const prodctName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  const pageLogin = pageManager.getPageLogin();
  await pageLogin.goTo();
  await pageLogin.validLogin(email, password);
  const pageDashboard = pageManager.getPageDashboard();
  await pageDashboard.searchProductAddCart(prodctName);
  await pageDashboard.navigateToCart();

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

  await expect(page.locator("label[type='text']").first()).toHaveText(email);
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

test('client app 4', async ({ page }) => {

  const pageManager = new PageManager(page);
  const email = "peter.lukic@gmail.com";
  const password = "12345";
  const productName = "ADIDAS ORIGINAL";

  const pageLogin = pageManager.getPageLogin();
  await pageLogin.goTo();
  await pageLogin.validLogin(email, password);
  const pageDashboard = pageManager.getPageDashboard();
  await pageDashboard.searchProductAddCart(productName);
  await pageDashboard.navigateToCart();

  const pageCart = pageManager.getPageCart();
  await pageCart.VerifyProductIsDisplayed(productName);
  await pageCart.Checkout();

  const pageOrdersReview = pageManager.getPageOrdersReview();
  await pageOrdersReview.searchCountryAndSelect("ind", "India");
  const orderId = await pageOrdersReview.SubmitAndGetOrderId();
  console.log(orderId);
  await pageDashboard.navigateToOrders();

  const pageOrdersHistory = pageManager.getPageOrdersHistory();
  await pageOrdersHistory.searchOrderAndSelect(orderId);
  expect(orderId.includes(await pageOrdersHistory.getOrderId())).toBeTruthy();

});

test('client app 5', async ({ page }) => {

  const pageManager = new PageManager(page);

  const pageLogin = pageManager.getPageLogin();
  await pageLogin.goTo();
  await pageLogin.validLogin(dataset.email, dataset.password);
  const pageDashboard = pageManager.getPageDashboard();
  await pageDashboard.searchProductAddCart(dataset.productName);
  await pageDashboard.navigateToCart();

  const pageCart = pageManager.getPageCart();
  await pageCart.VerifyProductIsDisplayed(dataset.productName);
  await pageCart.Checkout();

  const pageOrdersReview = pageManager.getPageOrdersReview();
  await pageOrdersReview.searchCountryAndSelect("ind", "India");
  const orderId = await pageOrdersReview.SubmitAndGetOrderId();
  console.log(orderId);
  await pageDashboard.navigateToOrders();

  const pageOrdersHistory = pageManager.getPageOrdersHistory();
  await pageOrdersHistory.searchOrderAndSelect(orderId);
  expect(orderId.includes(await pageOrdersHistory.getOrderId())).toBeTruthy();

});


//npx playwright test --grep "@WebTest" --run with parameter
//npm run webTests - run from scripts
test('test login page', {tag: '@WebTest',}, async ({ page })  => {

  const pageManager = new PageManager(page);

  const pageLogin = pageManager.getPageLogin();
  await pageLogin.goTo();
  await pageLogin.validLogin(dataset.email, dataset.password);
  const pageDashboard = pageManager.getPageDashboard();
  await pageDashboard.searchProductAddCart(dataset.productName);
  await pageDashboard.navigateToCart();

  const pageCart = pageManager.getPageCart();
  await pageCart.VerifyProductIsDisplayed(dataset.productName);
  await pageCart.Checkout();

  const pageOrdersReview = pageManager.getPageOrdersReview();
  await pageOrdersReview.searchCountryAndSelect("ind", "India");
  const orderId = await pageOrdersReview.SubmitAndGetOrderId();
  console.log(orderId);
  await pageDashboard.navigateToOrders();

  const pageOrdersHistory = pageManager.getPageOrdersHistory();
  await pageOrdersHistory.searchOrderAndSelect(orderId);
  expect(orderId.includes(await pageOrdersHistory.getOrderId())).toBeTruthy();

});





