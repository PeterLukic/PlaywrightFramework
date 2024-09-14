
const { PageManager } = require('../../pageobjects/PageManager');
const playwright = require('@playwright/test');
const { Before, After, Status, BeforeStep, AfterStep} = require('@cucumber/cucumber');
const path = require('path');


Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pageManager = new PageManager(this.page);

});

BeforeStep(function () {

});

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshot.png'});
    }

});

After(function () {
    console.log("Closing ...");
});