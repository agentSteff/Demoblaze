import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

const product = "Samsung galaxy s6";
const deleteText = "Delete";
const cartTable = '[id="tbodyid"]';
const textoTotal = '[id="totalp"]';

When("elimino un producto del carrito", () => {
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

Then("el carrito deberia estar vacio y el total cero", () => {
  cy.wait("@deleteItemCall").then(() => {
    cy.wait(1000).then(() => {
      cy.contains("td", product).should("not.exist");
      cy.get(textoTotal).should("have.text", "");
    });
  });
});