const { test, expect } = require('@playwright/test');


test('my test 1', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await page.locator("input#username").fill("rahulshetty");
    await page.locator("input#password").fill("learning");
    await page.locator("input#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    //await page.waitForTimeout(10000);
    //await page.locator("input#username").fill("");
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("learning");
    await page.locator("input#signInBtn").click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    await expect(await page.locator("[class='my-4']")).toContainText("Shop Name");

});

test('my test 2', async ({ page }) => {

    await page.goto("https://google.com/")
    console.log(await page.title);
    await expect(page).toHaveTitle("Google");

});

test('my test 3', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("learning");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").last().click();
    await page.locator("select.form-control").selectOption("teach");
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await page.waitForTimeout(2000);
    await page.locator("#terms").uncheck();
    await page.waitForTimeout(2000);
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    //await page.locator("input#signInBtn").click();
    //await expect(await page.locator("[class='my-4']")).toContainText("Shop Name"); 
});

test('my test 4', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page.locator("body > .blinkingText")).toHaveAttribute("class", "blinkingText");

});


test('my test 5', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),

        ]);

    const redText = await newPage.locator(".im-para.red").textContent(); 
    const arrayRedText = redText.split("@");
    const domain = arrayRedText[1].split(" ")[0];
    console.log(domain);
    page.bringToFront();
    await page.waitForTimeout(3000);
    await page.locator("input#username").fill(domain);
    await page.waitForTimeout(3000);

});
