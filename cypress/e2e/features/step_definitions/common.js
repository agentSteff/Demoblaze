import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("que visito la página principal", () => {
  cy.visit("https://www.demoblaze.com/");
});