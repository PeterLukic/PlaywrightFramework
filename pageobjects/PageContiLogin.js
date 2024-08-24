class PageContiLogin {

    constructor(page)
    {
        this.page = page;
        this.buttonLogin = page.locator(".btn");
        this.textBoxUserName = page.locator("input[type='text']");
        this.textBoxPassword = page.locator("input[type='password']");
        this.imageCommercial = page.locator(".close > img");
        this.buttonDiamonImage = page.locator(".db.tac > li:nth-of-type(3) > div > img");

    }

    async goTo()
    {
        await this.page.goto('https://conti.vip/user/login');
    }

    async validLogin(userName, password)
    {
        await this.textBoxUserName.fill(userName);
        await this.textBoxPassword.fill(password);
        await this.buttonLogin.click();
        await this.page.waitForLoadState('networkidle');
        //await this.imageCommercial.click();
        await this.buttonDiamonImage.click();

    }

}

module.exports = {PageContiLogin};