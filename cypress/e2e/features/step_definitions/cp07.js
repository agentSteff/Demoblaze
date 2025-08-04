import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const cartButtonDashboard = '[id="cartur"]';
const product = "Samsung galaxy s6";
const productPrice = "360";
const cartCallToAction = "Add to cart";
const purchaseCallToAction = "Place Order";

const productoClase = ".card-block";
const nameInput = '[id="name"]';
const countryInput = '[id="country"]';
const cityInput = '[id="city"]';
const ccInput = '[id="card"]';
const monthInput = '[id="month"]';
const yearInput = '[id="year"]';
const purchaseButtonText = "Purchase";
const successfulPurchase = "Thank you for your purchase!";

Then("confirmo que todos los productos visibles tienen nombre y precio", () => {
  cy.get('.card-block').each(($card) => {
    // Validar que tenga h4.cart-title > a con texto no vacío
    cy.wrap($card)
      .find('h4.cart-title a')
      .should('exist')                      // el <a> debe existir
      .invoke('text')                       // obtener el texto del <a>
      .should('not.be.empty');              // el texto no debe estar vacío

    // Validar que tenga h5 con precio tipo "$360"
    cy.wrap($card)
      .find('h5')
      .should('exist')                      // el <h5> debe existir
      .invoke('text')                       // obtener el texto del h5
      .should((priceText) => {
        expect(priceText.trim()).to.match(/^\$\d+/); // Debe empezar con "$" seguido de al menos un dígito
      });
  });

});

//----------------------------------------------------------------------------

When("procedo a realizar la compra", () => {
  // Select the product, then add it to the cart
  cy.intercept("POST", "https://api.demoblaze.com/deletecart").as(
    "deleteCartCall"
  );
  cy.contains(purchaseCallToAction).click();
  cy.uiOrdenar(buyer, nameInput, countryInput, cityInput, ccInput, monthInput, yearInput);
  cy.contains("button", purchaseButtonText).click();
});

Then("verifico un mensaje de confirmacion", () => {
  cy.wait("@deleteCartCall").then(() => {
  cy.contains("h2", successfulPurchase).should("exist");
  });
});