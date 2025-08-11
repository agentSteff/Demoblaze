// Traemos herramientas para escribir nuestras pruebas
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== BOTONES Y CAMPOS DE LA PÁGINA ==========
// Aquí guardamos la ubicación de cada botón y campo que vamos a usar

// El botón de "Iniciar sesión" que está en la parte de arriba
const botonInicioSesion = '[id="login2"]';
// Un usuario que ya existe para hacer pruebas
const inicioSesionPersona = "test.admin";
// La caja donde escribes tu usuario para entrar
const entradaNombreUsarioInicioSesion = '[id="loginusername"]';
// La caja donde escribes tu contraseña para entrar
const entradaContrasenaInicioSesion = '[id="loginpassword"]';
// El texto que dice el botón de iniciar sesión
const textoBotonInicioSesion = "Log in";
// Donde aparece tu nombre cuando ya entraste
const nombreUsuarioEnPantalla = '[id="nameofuser"]';

// ========== PRUEBAS PARA INICIAR SESIÓN ==========

// Hacer click en el botón de log in
When("hago click en el boton de log in", () => {
  // Hacemos clic en el botón de "Iniciar sesión"
  cy.get(botonInicioSesion).click();
});

// Ingresar el nombre de usuario registrado
When("ingreso el nombre de usuario registrado", () => {
  // Le decimos a Cypress que escuche cuando enviemos los datos de login
  cy.intercept("POST", "https://api.demoblaze.com/login").as("llamadaAutenticacion");
  // Escribimos el nombre de usuario en su caja
  cy.get(entradaNombreUsarioInicioSesion).type(inicioSesionPersona, { force: true });
});

// Ingresar la contraseña correspondiente
When("ingreso la contraseña correspondiente", () => {
  // Usamos un comando especial que ya teníamos para llenar la contraseña
  cy.uiLoginContraseña(inicioSesionPersona, entradaContrasenaInicioSesion);
});

// Hacer clic en el botón log in del modal
When("hago clic en el boton de log in del modal", () => {
  // Hacemos clic en "Log in" para entrar
  cy.get("button").contains(textoBotonInicioSesion).click();
  // Esperamos a que termine de procesar el login
  cy.wait("@llamadaAutenticacion");
  // Verificamos que la ventana de login se cierre
  cy.get('#logInModal').should('not.be.visible');
});

// Observar que aparece el mensaje Welcome
Then("observo que aparece el mensaje Welcome con el usuario", () => {
  // Verificamos que aparezca nuestro nombre con "Welcome" en la página
  cy.get(nombreUsuarioEnPantalla).should("have.text", `Welcome ${inicioSesionPersona}`);
});