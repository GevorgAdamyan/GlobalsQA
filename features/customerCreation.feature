Feature: The new customer creation e2e test

  Scenario: As a user, I can log in as Bank Manager and create new customer

    Given I am on the login page
    When I login as Bank Manager
    And I click on Add Customer button, the customer creation page is opened
    And I fill all necessary fields and click on Add Customer button, the success alert message appears
    And I search the newly created customer by first name, last name or post code in customers list, the customer is filtered from the list
    And I delete the newly created customer and search the deleted customer again
    Then there is no any information about that customer
