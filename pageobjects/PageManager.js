const {PageLogin} = require('./PageLogin');
const { PageDashboard } = require('./PageDashboard');
const { PageCart } = require('./PageCart');
const { PageOrdersReview } = require('./PageOrdersReview');
const { PageOrdersHistory } = require('./PageOrdersHistory');


class PageManager
{
    constructor(page)
    {
        this.page = page;
        this.pageLogin = new PageLogin(this.page);
        this.pageDashboard = new PageDashboard(this.page);
        this.pageCart = new PageCart(this.page);
        this.pageOrdersReview = new PageOrdersReview(this.page);
        this.pageOrdersHistory = new PageOrdersHistory(this.page);
    }

    getPageLogin()
    {
        return this.pageLogin;
    }

    getPageDashboard()
    {
        return this.pageDashboard;
    }

    getPageCart()
    {
        return this.pageCart;
    }

    getPageOrdersReview()
    {
        return this.pageOrdersReview;
    }

    getPageOrdersHistory()
    {
        return this.pageOrdersHistory;
    }
}

module.exports = {PageManager};