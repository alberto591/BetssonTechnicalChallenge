Feature: Navigation Functionality

  As a logged-in user of the Swag Labs application
  I want to be able to navigate between the different pages
  So that I can view products and my cart

  Scenario: Navigate between Products and Cart pages
    Given I launch the application
    And I attempt to login with username "standard_user" and password "secret_sauce"
    When I navigate to the cart
    Then I should be on the Cart page
    When I navigate back to the products page
    Then I should be redirected to the "PRODUCTS" page

  Scenario: Logout from the application
    Given I launch the application
    And I attempt to login with username "standard_user" and password "secret_sauce"
    When I open the side menu
    And I select logout
    Then I should be redirected to the login page
