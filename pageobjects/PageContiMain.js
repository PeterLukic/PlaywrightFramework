class PageContiMain {

    constructor(page)
    {
        this.page = page;
        this.buttonDiamonImage = page.locator(".db.tac > li:nth-of-type(3) > div > img");
        this.buttonScoreVip1 = page.locator("div:nth-of-type(1) > .btn.btn1");

    }


    async clickButtonDiamonImage()
    {
        await this.buttonDiamonImage.click();

    }

}

module.exports = {PageContiMain};