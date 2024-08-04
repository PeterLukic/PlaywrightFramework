const { test, expect } = require('@playwright/test');

//test.describe.configure({mode:"parallel"});
//If you want to run yesy in parralel in same file 

//test.describe.configure({mode:"serial"});
//If one test will be failed then other won't be executed 

//test('@smoke Popup validation 1 ', async ({ page }) --if you want to tag test case 
//npx playwright test --grep @smoke

//https://www.npmjs.com/package/allure-playwright
//npx playwright test --grep @smoke --reporter=line,allure-playwright -- generate with alurre report
//allure generate ./allure-results --clean -- generate report folder
//allure open ./allure-report --open report


test('Popup validation 1 ', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://google.com');
    await page.goBack();
    await page.goForward();


});

test('Popup validation 2 ', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator("input#displayed-text")).toBeVisible();
    await page.locator("input#hide-textbox").click();
    await expect(page.locator("input#displayed-text")).toBeHidden();


});


test('Popup validation 3 ', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.pause();
    await page.locator("input#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept());

});


test('Popup validation 4 ', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.pause();
    await page.locator("button#mousehover").hover();

});

test('Popup validation 5 ', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.pause();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li:nth-of-type(3) > .new-navbar-highlighter").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

test('Screenshot ', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li:nth-of-type(3) > .new-navbar-highlighter").click();
    await page.screenshot({path: 'screenshot.png'})
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

//failing because of time on top right is different
test('Visual testing ', async ({ page }) => {

    await page.goto('https://www.google.com/');
    expect(await page.screenshot()).toMatchSnapshot('googleScreenshot.png');

});