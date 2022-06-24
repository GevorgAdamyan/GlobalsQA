const Page = require('./page');

class ManagerPage extends Page {
    get managerToolBar() {
        return $(".ng-scope .center");
    }

    get addCustomerBtn() {
        return $('[ng-click="addCust()"]');
    }

    get customersBtn() {
        return $('[ng-click="showCust()"]');
    }

    async goToAddCustomerPage() {
        let btn = await this.addCustomerBtn;
        await btn.click();
    }

    async openCustomersList() {
        let btn = await this.customersBtn;
        await btn.click();
    }
}

module.exports = new ManagerPage();
