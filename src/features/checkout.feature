Feature: Checkout Functionality

  As a logged-in user of the Swag Labs application
  I want to be able to add items to my cart and complete a purchase
  So that I can buy products

  Scenario: Successful checkout process
    Given I launch the application
    And I attempt to login with username "standard_user" and password "secret_sauce"
    And I add an item to the cart
    And I navigate to the cart
    When I proceed to checkout
    And I enter my shipping information: "John", "Doe", "12345"
    And I finish the checkout
    Then I should see the checkout complete message
