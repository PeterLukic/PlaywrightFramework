const { When, Then, Given } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('Login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const products = this.page.locator(".card-body");
    const pageLogin = this.pageManager.getPageLogin();
    await pageLogin.goTo();
    await pageLogin.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    this.pageDashboard = this.pageManager.getPageDashboard();
    await this.pageDashboard.searchProductAddCart(productName);
    await this.pageDashboard.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    const pageCart = this.pageManager.getPageCart();
    await pageCart.VerifyProductIsDisplayed(productName);
    await pageCart.Checkout();
});


When('Enter valid details and Place the  Order', async function () {
    const pageOrdersReview = this.pageManager.getPageOrdersReview();
    await pageOrdersReview.searchCountryAndSelect("ind", "India");
    this.orderId = await pageOrdersReview.SubmitAndGetOrderId();
    console.log(this.orderId);
});


Then('Verify order in present in the OrderHistory', async function () {
    await this.pageDashboard.navigateToOrders();
    const pageOrdersHistory = this.pageManager.getPageOrdersHistory();
    await pageOrdersHistory.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await pageOrdersHistory.getOrderId())).toBeTruthy();
});

Given(`Login to Ecommerce2 application with {string} and {string}`, { timeout: 100 * 1000 }, async function (username, password) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title());
    await this.page.locator("input#username").fill(username);
    await this.page.locator("input#password").fill(password);
    await this.page.locator("input#signInBtn").click();

});

Then(`I Verify Error message is displayed`, async function () {
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});