import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { generateRandomString } from "../../../support/utils";

const botonSignUpNavBar = '[id="signin2"]';
const entradaUserName = '[id="sign-username"]';
const entradaContrasena = '[id="sign-password"]';
const textoBotonSignUp = 'Sign up';

const botonInicioSesion = '[id="login2"]';
const botonCerrarSesion = '[id="logout2"]';
const inicioSesionPersona = "test.admin";
const entradaNombreUsarioInicioSesion = '[id="loginusername"]';
const entradaContrasenaInicioSesion = '[id="loginpassword"]';
const textoBotonInicioSesion = "Log in";
const nombreUsuarioEnPantalla = '[id="nameofuser"]';

const nombreUsuario = generateRandomString();
const contrasena = generateRandomString();

When("voy a la pagina de registro", () => {
  cy.get(botonSignUpNavBar).click();
});

When("agrego lo detalles del registro", () => {
  cy.intercept("POST", "https://api.demoblaze.com/signup").as("signupCall");
  cy.get(entradaUserName).type(nombreUsuario, { force: true });
  cy.get(entradaContrasena).type(contrasena, { force: true });
  cy.get('button').contains(textoBotonSignUp).click();
});

Then("muestra mensaje de confirmacion", () => {
  cy.wait("@signupCall").then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Sign up successful.");
    });
  });
});

When("inicio sesion con credenciales validas", () => {
  cy.intercept("POST", "https://api.demoblaze.com/login").as("loginCall");
  cy.get(botonInicioSesion).click();
  cy.uiLogin(inicioSesionPersona, entradaNombreUsarioInicioSesion, entradaContrasenaInicioSesion);
  cy.get("button").contains(textoBotonInicioSesion).click();

  // Wait for login to complete and modal to close
  cy.wait("@loginCall");
  cy.get('#logInModal').should('not.be.visible');
});

Then("deberia ver mi usuario en la pagina", () => {
  cy.get(nombreUsuarioEnPantalla).should("have.text", `Welcome ${inicioSesionPersona}`);
});

When("hago click en cerrar sesion", () => {
  cy.get(botonCerrarSesion).click();
});

Then("espero que me salga mensaje de confirmacion", () => {
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Logged out successfully.");
  });
});

Then("espero que se pueda iniciar sesion de nuevo", () => {
  cy.get(botonInicioSesion).should("be.visible");
  cy.get(nombreUsuarioEnPantalla).should("not.contain.text", `Welcome ${inicioSesionPersona}`);
});