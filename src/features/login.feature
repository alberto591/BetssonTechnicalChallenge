Feature: Login Functionality

  As a user of the Swag Labs mobile application
  I want to be able to log in with valid credentials
  So that I can access the inventory and purchase items

  Scenario: Successful login with valid credentials
    Given I launch the application
    When I attempt to login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the "PRODUCTS" page

  Scenario Outline: Failed login with invalid credentials
    Given I launch the application
    When I attempt to login with username "<username>" and password "<password>"
    Then I should see the error message "<expected_error>"

    Examples:
      | username        | password       | expected_error                                              |
      | locked_out_user | secret_sauce   | Sorry, this user has been locked out.                       |
      | standard_user   | wrong_password | Username and password do not match any user in this service. |
      |                 | secret_sauce   | Username is required                                        |
