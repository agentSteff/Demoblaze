Feature: Product Cart Operations

  Scenario: Adding and deleting product from cart
    Given I visit the home page
    When I log in using valid credentials
    When I add a product to the cart
    Then I should see the product in the cart
    When I delete the product from the cart
    Then The cart should be empty
    
  Scenario: Successful purchase
    Given I visit the home page
    When I log in using valid credentials
    When I add a product to the cart
    Then I should see the product in the cart
    When I place the order

