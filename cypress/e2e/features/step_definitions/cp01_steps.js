import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const cartButtonDashboard = '[id="cartur"]';
const product = "Samsung galaxy s6";
const productPrice = "360";
const cartCallToAction = "Add to cart";
const purchaseCallToAction = "Place Order";
const deleteText = "Delete";
const cartTable = '[id="tbodyid"]';

const buyer = "test.admin";
const nameInput = '[id="name"]';
const countryInput = '[id="country"]';
const cityInput = '[id="city"]';
const ccInput = '[id="card"]';
const monthInput = '[id="month"]';
const yearInput = '[id="year"]';
const purchaseButtonText = "Purchase";
const successfulPurchase = "Thank you for your purchase!";

When("I add a product to the cart", () => {
  // Select the product, then add it to the cart
  cy.get("a").contains(product).click();
  cy.get("a").contains(cartCallToAction).click();
});

When("I delete the product from the cart", () => {
  // Delete only the specified product
  cy.intercept("POST", "https://api.demoblaze.com/deleteitem").as(
    "deleteItemCall"
  );
  cy.get(cartTable)
    .contains("tr", product)
    .within(() => {
      cy.get("a").contains(deleteText).click();
    });
});

When("I place the order", () => {
  // Select the product, then add it to the cart
  cy.intercept("POST", "https://api.demoblaze.com/deletecart").as(
    "deleteCartCall"
  );
  cy.contains(purchaseCallToAction).click();
  cy.get(nameInput).type(buyer, { force: true });
  cy.get(ccInput).type("12345678", { force: true });
  cy.contains("button", purchaseButtonText).click();
});

Then("I should see the product in the cart", () => {
  // Go to cart and check product is displayed correctly
  cy.get(cartButtonDashboard).click();
  cy.get("td").contains(product);
  cy.get("td").contains(productPrice);
});

Then("The cart should be empty", () => {
  cy.wait("@deleteItemCall").then(() => {
    cy.wait(1000).then(() => {
      cy.contains("td", product).should("not.exist");
    });
  });
});

Then("Purchase should complete", () => {
  wait("@deleteCartCall").then(() => {
    cy.contains("h2", successfulPurchase).should("exist");
  });
}); 

