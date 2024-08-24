class PageContiScoringVip1{

    constructor(page) {
        
        this.page = page;
        this.imageOne = page.locator('//*[@id="content"]/div/div[3]/div/div[2]/div[1]/ul/li[1]/div/img');
        this.imageLike = page.locator(".icon > img");


    }

    async clickImageOne() {
        try {
            await this.imageOne.click(); // Click the first button after waiting for 5 seconds
        } catch (error) {
            //console.error("Error clicking the button:", error);
        }

    }

    
    async clickImageLike() {
        try {
            await this.imageLike.click(); // Click the first button after waiting for 5 seconds
        } catch (error) {
            //console.error("Error clicking the button:", error);
        }

    }

}

module.exports = { PageContiScoringVip1 };