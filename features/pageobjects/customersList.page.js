const Page = require('./page');
const helper = require("../../helpers/helper")

class CustomersListPage extends Page {
    get customerSearchBar() {
        return $('[placeholder="Search Customer"]');
    }

    get customersList() {
        return $(".table > tbody");
    }

    get customerInfo() {
        return $(".table > tbody > tr")
    }

    get deleteBtn() {
        return $('[ng-click="deleteCust(cust)"]');
    }
    
    async searchCustomer(arr) {
        let index = Math.floor(Math.random() * arr.length);
        let searchParam = arr[index];
        let searchBar = await this.customerSearchBar;
        let customerInfo = await this.customerInfo;
        await searchBar.click();
        await searchBar.setValue(searchParam);
        let isCutomerFound = await customerInfo.isExisting();
        if (isCutomerFound === true) {
           await this.getCustomerInfoTextArray();
        }
    }

    async getCustomersListArray() {
        let parent = await this.customersList;
        let child = parent.$$("tr");
        return child;
    }

    async getCustomerInfoArray() {
        let parent = await this.customerInfo;
        let child = parent.$$("td");
        return child;
    }

    async getCustomerInfoTextArray() {
        let arr = await this.getCustomerInfoArray();
        let info = helper.gottenInfo;
        for (let i = 0; i <= 2; i++) {
            let val = await arr[i].getText();
            info.push(val);
        }
        return info;
    }

    async deleteCustomer() {
        let btn = await this.deleteBtn;
        let searchBar = await this.customerSearchBar;
        await btn.click();
        await searchBar.clearValue();
    }
}

module.exports = new CustomersListPage();
