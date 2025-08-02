import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const loginDashboardButton = '[id="login2"]';
const loginPersona = "test.admin";
const loginUsernameInput = '[id="loginusername"]';
const loginPasswordInput = '[id="loginpassword"]';
const loginButtonText = "Log in";

Given("que visito la página principal", () => {
  cy.visit("https://www.demoblaze.com/");
});

When("I log in using valid credentials", () => {
  cy.intercept("POST", "https://api.demoblaze.com/login").as("loginCall");
  cy.get(loginDashboardButton).click();
  cy.uiLogin(loginPersona, loginUsernameInput, loginPasswordInput);
  cy.get("button").contains(loginButtonText).click();
  
  // Wait for login to complete and modal to close
  cy.wait("@loginCall");
  cy.get('#logInModal').should('not.be.visible');
});