const Page = require('./page');
const helper = require('../../helpers/helper')

class AddCustomerPage extends Page {
    get addCustomerBtnNotcch() {
        return $('[ng-click="addCust()"] > #notch');
    }

    get firstNameField() {
        return $('[placeholder="First Name"]');
    }

    get lastNameField() {
        return $('[placeholder="Last Name"]');
    }

    get postCodeField() {
        return $('[placeholder="Post Code"]');
    }

    get submitBtn() {
        return $('.btn[type="submit"]');
    }

    async insertFirstName(firstName) {
        let field = await this.firstNameField;
        await field.click();
        await field.setValue(firstName);
    }

    async insertLastName(lastName) {
        let field = await this.lastNameField;
        await field.click();
        await field.setValue(lastName);
    }

    async insertPostCode(postCode) {
        let field = await this.postCodeField;
        await field.click();
        await field.setValue(postCode);
    }

    async submitTheForm() {
        let btn = await this.submitBtn;
        await btn.click();
    }


    async addNewCustomer(arr) {
        await this.insertFirstName(arr[0]);
        await this.insertLastName(arr[1]);
        await this.insertPostCode(arr[2]);
        await this.submitTheForm();
        await browser.waitUntil(async () => {
            return browser.isAlertOpen();
        });
        let message = await browser.getAlertText()
        helper.addCustomerSuccessMessage = message;
        await browser.acceptAlert();
    }
}

module.exports = new AddCustomerPage();
