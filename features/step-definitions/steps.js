const { Given, When, Then } = require('@wdio/cucumber-framework');

const loginPage = require("../pageobjects/login.page");
const managerPage = require("../pageobjects/manager.page");
const addCustomerPage = require("../pageobjects/addCustomer.page");
const customersListPage = require("../pageobjects/customersList.page");
const constants = require("../../helpers/constants")
const helper = require('../../helpers/helper');
const expectChai = require("chai").expect;



Given("I am on the login page", async () => {
    await loginPage.goTo();
    let pageTitle = constants.pageTitle;
    let loginPagePath = constants.loginPagePath;
    let logInPanel = await loginPage.logInPanel;
    await expect(browser).toHaveTitle(pageTitle);
    await expect(browser).toHaveUrlContaining(loginPagePath);
    await expect(logInPanel).toBeDisplayed();
});

When("I login as Bank Manager", async () => {
    await loginPage.logInAsBankManager();
    let managerPagePath = constants.managerPagePath;
    let managerToolBar = await managerPage.managerToolBar;
    await expect(browser).toHaveUrlContaining(managerPagePath);
    await expect(managerToolBar).toBeDisplayed();
});

When("I click on Add Customer button, the customer creation page is opened", async () => {
    await managerPage.goToAddCustomerPage();
    let addCustomerPagePath = constants.addCustomerPagePath;
    let notch = await addCustomerPage.addCustomerBtnNotcch;
    await expect(browser).toHaveUrlContaining(addCustomerPagePath);
    await expect(notch).toBeDisplayed();

});


When("I fill all necessary fields and click on Add Customer button, the success alert message appears", async () => {
    let info = helper.setInfo;
    await addCustomerPage.addNewCustomer(info);
    let sucessMessageText = constants.alertMessageText;
    let sucessMessage = helper.addCustomerSuccessMessage;
    expectChai(sucessMessage).to.contain(sucessMessageText);
});

When("I search the newly created customer by first name, last name or post code in customers list, the customer is filtered from the list", async () => {
    await managerPage.openCustomersList();
    let customersListPagePath = constants.customersListPagePath;
    await expect(browser).toHaveUrlContaining(customersListPagePath);
    let infoToSet = helper.setInfo;
    await customersListPage.searchCustomer(infoToSet);
    let infoToCheck = helper.gottenInfo;
    let filteredCustomers = await customersListPage.getCustomersListArray();
    let areArraysTheSame = helper.areArraysTheSame(infoToSet, infoToCheck);
    await expect(filteredCustomers).toHaveLength(1);
    expectChai(areArraysTheSame).to.be.true;
});

When("I delete the newly created customer and search the deleted customer again", async () => {
    await customersListPage.deleteCustomer();
    let info = helper.setInfo;
    await customersListPage.searchCustomer(info);
});

Then("there is no any information about that customer", async () => {
    let userInfo = await customersListPage.customerInfo;
    await expect(userInfo).not.toBeExisting();
});
