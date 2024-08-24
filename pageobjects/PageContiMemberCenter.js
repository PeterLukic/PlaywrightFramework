class PageContiMemberCenter {

    constructor(page) {
        
        this.page = page;
        this.buttonScoreVip1 = page.locator("div:nth-of-type(1) > .btn.btn1");
        this.buttonScoreVip2 = page.locator("div:nth-of-type(2) > .btn.btn1");
        this.buttonScoreVip2 = page.locator("div:nth-of-type(3) > .btn.btn1");

    }

    async clickButtonScoreVip1() {
        try {
            await this.buttonScoreVip1.click(); // Click the first button after waiting for 5 seconds
        } catch (error) {
            //console.error("Error clicking the button:", error);
        }

    }

    async clickButtonScoreVip2() {

        try {
            await this.buttonScoreVip2.click(); // Click the first button after waiting for 5 seconds
        } catch (error) {
            //console.error("Error clicking the button:", error);
        }
    }

    async clickButtonScoreVip3() {
        try {
            await this.buttonScoreVip3.click(); // Click the first button after waiting for 5 seconds
        } catch (error) {
            //console.error("Error clicking the button:", error);
        }
    }

}

module.exports = { PageContiMemberCenter };