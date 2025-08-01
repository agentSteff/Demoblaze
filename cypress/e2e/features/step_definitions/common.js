import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

const loginDashboardButton = '[id="login2"]';
const loginPersona = "test.admin";
const loginUsernameInput = '[id="loginusername"]';
const loginPasswordInput = '[id="loginpassword"]';
const loginButtonText = "Log in";

Given("I visit the home page", () => {
  cy.visit("https://www.demoblaze.com/");
});

When("I log in using valid credentials", () => {
  cy.intercept("POST", "https://api.demoblaze.com/login").as("loginCall");
  cy.get(loginDashboardButton).click();
  cy.uiLogin(loginPersona, loginUsernameInput, loginPasswordInput);
  cy.get("button").contains(loginButtonText).click();
});