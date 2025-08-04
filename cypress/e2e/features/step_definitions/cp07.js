import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const cartButtonDashboard = '[id="cartur"]';
const product = "Samsung galaxy s6";
const productPrice = "360";
const cartCallToAction = "Add to cart";
const purchaseCallToAction = "Place Order";

const productoClase = ".card-block";
const buyer = "test.admin";
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
    // Validar que tenga h4 con clase card-title que contenga un enlace <a> con texto no vacío
    cy.wrap($card)
      .find('h4.card-title')
      .should('exist')
      .find('a')
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

When("hago click en un producto", () => {
  // Select the product, then add it to the cart
  cy.get("a").contains(product).click();
});

Then("confirmo que el producto producto tiene nombre y precio", () => {
  // Validar que existe h2 con clase "name" y tiene texto no vacío
  cy.get('h2.name')
    .should('exist')
    .invoke('text')
    .should('not.be.empty');

  // Validar que existe h3 con clase "price-container" y tiene formato de precio válido
  cy.get('h3.price-container')
    .should('exist')
    .invoke('text')
    .should((priceText) => {
      expect(priceText.trim()).to.match(/^\$\d+/); // Debe empezar con "$" seguido de al menos un dígito
    });
});