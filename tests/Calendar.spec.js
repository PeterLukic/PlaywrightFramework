const { test, expect } = require('@playwright/test');

test.describe('Calendar Tests', () => {
  test('should select the correct date from the calendar', async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "1991";
    const expectedList = [monthNumber, date, year];
    
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    
    await page.waitForSelector(".react-date-picker__inputGroup");
    await page.locator(".react-date-picker__inputGroup").click();
    
    await page.waitForSelector(".react-calendar__navigation__label");
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator(`//abbr[text()='${date}']`).click();
    
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < await inputs.count(); index++) {
      const value = await inputs.nth(index).getAttribute("value");
      expect(value).toEqual(expectedList[index]);
    }
  });
});
