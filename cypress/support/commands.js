// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const userFixture = "users.json";

Cypress.Commands.add("uiLogin", (persona, userField, passwordField) => {
  cy.fixture(userFixture).then((user) => {
    cy.get(userField).type(user[persona]["username"], { force: true });
    cy.get(passwordField).type(user[persona]["password"], { force: true });
  });
});

Cypress.Commands.add("apiLogin", (persona) => {
  cy.fixture(userFixture).then((user) => {
    // get authorization such as a Bearer token from the backend
    // set in the browser window and navigate directly to page under test
    cy.log("not implemented");
  });
});