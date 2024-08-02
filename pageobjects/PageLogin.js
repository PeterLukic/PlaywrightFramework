class PageLogin {

    constructor(page)
    {
        this.page = page;
        this.buttonLogin = page.locator("input#login");
        this.textBoxEmail = page.locator("input#userEmail");
        this.textBoxPassword = page.locator("input#userPassword");

    }

    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(email, password)
    {
        await this.textBoxEmail.fill(email);
        await this.textBoxPassword.fill(password);
        await this.buttonLogin.click();
        await this.page.waitForLoadState('networkidle');

    }

}

module.exports = {PageLogin};