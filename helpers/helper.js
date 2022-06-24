const faker = require("@faker-js/faker").faker;

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let postCode = faker.address.zipCode();
let customerInfo = [];
let alertMessage;

module.exports = {
    setInfo: [firstName, lastName, postCode],
    gottenInfo: customerInfo,
    addCustomerSuccessMessage: alertMessage,
    areArraysTheSame(arr1, arr2) {
        return arr1.every((val, index) => val === arr2[index]);
    }
}