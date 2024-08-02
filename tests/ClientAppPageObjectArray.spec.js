const { test, expect } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataset = JSON.parse(JSON.stringify(require('./utils/multipleTestData.json')));
const {customtest} = require('./utils/test-base');



for (const data of dataset) {

    test(`@Webs Client App login for ${data.productName}`, async ({ page }) => {

        const pageManager = new PageManager(page);

        const pageLogin = pageManager.getPageLogin();
        await pageLogin.goTo();
        await pageLogin.validLogin(data.email, data.password);
        const pageDashboard = pageManager.getPageDashboard();
        await pageDashboard.searchProductAddCart(data.productName);
        await pageDashboard.navigateToCart();

        const pageCart = pageManager.getPageCart();
        await pageCart.VerifyProductIsDisplayed(data.productName);
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

}

customtest("Test customer from test-base", async ({ page, testDataForOrder }) => {

    const pageManager = new PageManager(page);

    const pageLogin = pageManager.getPageLogin();
    await pageLogin.goTo();
    await pageLogin.validLogin(testDataForOrder.email, testDataForOrder.password);
    const pageDashboard = pageManager.getPageDashboard();
    await pageDashboard.searchProductAddCart(testDataForOrder.productName);
    await pageDashboard.navigateToCart();

    const pageCart = pageManager.getPageCart();
    await pageCart.VerifyProductIsDisplayed(testDataForOrder.productName);
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

