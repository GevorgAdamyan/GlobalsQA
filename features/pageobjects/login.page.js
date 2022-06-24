const Page = require('./page');

class LoginPage extends Page {
    get logInPanel() {
        return $(".borderM");
    }

    get logInAsBankManagerBtn() {
        return $('[ng-click="manager()"]');
    }

    async logInAsBankManager() {
        let btn = await this.logInAsBankManagerBtn;
        await btn.click();
    }
    
    async goTo() {
        await super.goTo();
        await browser.maximizeWindow();
    }
}

module.exports = new LoginPage();
