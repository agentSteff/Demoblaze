// Traemos herramientas para escribir nuestras pruebas
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== BOTONES Y CAMPOS DE LA PÁGINA ==========
// Aquí guardamos la ubicación de cada botón y campo que vamos a usar

// El botón de "Iniciar sesión" que está en la parte de arriba
const botonInicioSesion = '[id="login2"]';
// El botón de "Cerrar sesión" 
const botonCerrarSesion = '[id="logout2"]';
// Un usuario que ya existe para hacer pruebas
const inicioSesionPersona = "test.admin";
// La caja donde escribes tu usuario para entrar
const entradaNombreUsarioInicioSesion = '[id="loginusername"]';
// Donde aparece tu nombre cuando ya entraste
const nombreUsuarioEnPantalla = '[id="nameofuser"]';

// ========== PRUEBAS PARA CERRAR SESIÓN ==========

// Ingresar nombre de usuario válido previamente registrado
When("ingreso un nombre de usuario valido previamente registrado", () => {
  // Le decimos a Cypress que escuche cuando enviemos los datos de login
  cy.intercept("POST", "https://api.demoblaze.com/login").as("llamadaAutenticacion");
  // Escribimos el nombre de usuario en su caja
  cy.get(entradaNombreUsarioInicioSesion).type(inicioSesionPersona, { force: true });
});

// Confirmar que el usuario está logueado
When("confirmo que aparezca el texto Welcome con el nombre de usuario", () => {
  // Verificamos que aparezca nuestro nombre con "Welcome" en la página
  cy.get(nombreUsuarioEnPantalla).should("have.text", `Welcome ${inicioSesionPersona}`);
});

// Cerrar la sesión
When("hago click en el boton de log out", () => {
  // Hacemos clic en el botón de "Cerrar sesión"
  cy.get(botonCerrarSesion).click();
});

// Verificar que el texto Welcome desaparece
Then("verifico que el texto Welcome desaparece", () => {
  // Verificamos que ya no aparezca nuestro nombre en la página
  cy.get(nombreUsuarioEnPantalla).should("not.contain.text", `Welcome ${inicioSesionPersona}`);
});

// Verificar que el botón log in vuelve a estar visible
Then("confirmo que vuelve a estar visible el boton log in", () => {
  // Verificamos que el botón de "Iniciar sesión" aparezca otra vez
  cy.get(botonInicioSesion).should("be.visible");
});
