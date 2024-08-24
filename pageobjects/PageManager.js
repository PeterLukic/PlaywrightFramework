const {PageLogin} = require('./PageLogin');
const { PageDashboard } = require('./PageDashboard');
const { PageCart } = require('./PageCart');
const { PageOrdersReview } = require('./PageOrdersReview');
const { PageOrdersHistory } = require('./PageOrdersHistory');
const { PageContiLogin } = require('./PageContiLogin');
const { PageContiMain } = require('./PageContiMain');
const { PageContiMemberCenter } = require('./PageContiMemberCenter');
const { PageContiScoringVip1 } = require('./PageContiScoringVip1');

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
        this.pageContiLogin = new PageContiLogin(this.page);
        this.pageContiMain = new PageContiMain(this.page);
        this.pageContiMemberCenter = new PageContiMemberCenter(this.page);
        this.pageContiScoringVip1 = new PageContiScoringVip1(this.page);

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

    getPageContiLogin()
    {
        return this.pageContiLogin;
    }

    getPageContiMain()
    {
        return this.pageContiMain;
    }
    
    getPageContiMemberCenter()
    {
        return this.pageContiMemberCenter;
    }

    getPageContiScoringVip1()
    {
        return this.pageContiScoringVip1;
    }

    
}

module.exports = {PageManager};