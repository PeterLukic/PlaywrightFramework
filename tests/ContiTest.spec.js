const { test, expect } = require('@playwright/test');
const { PageManager } = require('../pageobjects/PageManager');
const dataset = JSON.parse(JSON.stringify(require('../utils/testData.json')));

test.only('Conti test with POM', async ({ page }) => {

  const pageManager = new PageManager(page);

  const pageContiLogin = pageManager.getPageContiLogin();
  await pageContiLogin.goTo();
  await pageContiLogin.validLogin(dataset.contiUserName, dataset.contiPassword);

  const pageContiMain = pageManager.getPageContiMain();
  pageContiMain.clickButtonDiamonImage();


  const pageContiMemberCenter = pageManager.getPageContiMemberCenter();
  pageContiMemberCenter.clickButtonScoreVip1();

  const pageContiScoringVip1 = pageManager.getPageContiScoringVip1();
  pageContiScoringVip1.clickImageOne();
  await page.waitForTimeout(2000);
  pageContiScoringVip1.clickImageLike();
 
  await page.waitForTimeout(2000);



});



test('Conti test without POM', async ({ page }) => {

  const pageManager = new PageManager(page);

  const pageContiLogin = pageManager.getPageContiLogin();
  await pageContiLogin.goTo();
  await pageContiLogin.validLogin(dataset.contiUserName, dataset.contiPassword);

  const pageContiMain = pageManager.getPageContiMain();
  pageContiMain.clickButtonDiamonImage();


  await page.locator("div:nth-of-type(1) > .btn.btn1").click();

  const pageContiMemberCenter = pageManager.getPageContiMemberCenter();
  pageContiMemberCenter.clickButtonScoreVip1();



});