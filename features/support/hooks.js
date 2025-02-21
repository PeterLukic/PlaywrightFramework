
const { PageManager } = require('../../pageobjects/PageManager');
const playwright = require('@playwright/test');
const { Before, After, Status, BeforeAll } = require('@cucumber/cucumber');
const fs = require('fs-extra');
const path = require('path');
const screenshotDir = path.join(__dirname, '..', 'screenshots');



BeforeAll(async () => {
    // Ensure the screenshots directory exists
    fs.ensureDirSync(screenshotDir);
})

Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false, args: ["--start-maximized"], });
    const context = await browser.newContext({ viewport: null });
    this.page = await context.newPage();
    this.pageManager = new PageManager(this.page);

    // Automatically maximize the browser


});


After(async function (scenario) {

    if (scenario.result.status === Status.FAILED) {
        // Create a unique name for the screenshot based on the test name and current time
        const screenshotPath = `${screenshotDir}/${scenario.pickle.name.replace(/\s+/g, '_')}_${Date.now()}.png`;

        // Take a screenshot
        await this.page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved at ${screenshotPath}`);

        // Attach the screenshot to the report
        const screenshotBuffer = await fs.readFile(screenshotPath);
        this.attach(screenshotBuffer, 'image/png');
    }
});