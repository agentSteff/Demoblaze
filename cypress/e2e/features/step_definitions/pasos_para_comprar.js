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

When("agrego un producto al carrito", () => {
  // Select the product, then add it to the cart
  cy.get("a").contains(product).click();
  cy.get("a").contains(cartCallToAction).click();
});

Then("veo el producto en el carrito", () => {
  // Go to cart and check product is displayed correctly
  cy.get(cartButtonDashboard).click();
  cy.get("td").contains(product);
  cy.get("td").contains(productPrice);
});
//----------------------------------------------------------------------------

When("procedo a realizar la compra", () => {
  // Select the product, then add it to the cart
  cy.intercept("POST", "https://api.demoblaze.com/deletecart").as(
    "deleteCartCall"
  );
  cy.contains(purchaseCallToAction).click();
  cy.get(nameInput).type(buyer, { force: true });
  cy.get(ccInput).type("12345678", { force: true });
  cy.contains("button", purchaseButtonText).click();
});

Then("verifico un mensaje de confirmacion", () => {
  cy.wait("@deleteCartCall").then(() => {
  cy.contains("h2", successfulPurchase).should("exist");
  });
});