// Traemos herramientas para escribir nuestras pruebas
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
// Traemos una función que crea palabras al azar
import { generateRandomString } from "../../../support/utils";

// ========== BOTONES Y CAMPOS DE LA PÁGINA ==========
// Aquí guardamos la ubicación de cada botón y campo que vamos a usar

// El botón de "Registrarse" que está en la parte de arriba de la página
const botonRegistroNavBar = '[id="signin2"]';
// La caja donde escribes tu nombre de usuario al registrarte
const entradaUserName = '[id="sign-username"]';
// La caja donde escribes tu contraseña al registrarte
const entradaContrasena = '[id="sign-password"]';
// El texto que dice el botón de registrarse
const textoBotonSignUp = 'Sign up';

// ========== DATOS INVENTADOS PARA CADA PRUEBA ==========
// Creamos un nombre de usuario diferente cada vez que corremos la prueba
const nombreUsuario = generateRandomString();
// Creamos una contraseña diferente cada vez que corremos la prueba
const contrasena = generateRandomString();

// ========== PRUEBAS PARA REGISTRAR UN USUARIO NUEVO ==========

// Ir a la ventana de registro
When("hago click en el boton de sign up", () => {
  // Hacemos clic en el botón de "Registrarse"
  cy.get(botonRegistroNavBar).click();
});

// Ingresar nombre de usuario único
When("ingreso un nombre de usuario que no este registrado", () => {
  // Le decimos a Cypress que escuche cuando la página envíe los datos del registro
  cy.intercept("POST", "https://api.demoblaze.com/signup").as("llamadaRegistro");
  // Escribimos el nombre de usuario en su caja
  cy.get(entradaUserName).type(nombreUsuario, { force: true });
});

// Ingresar contraseña válida
When("ingreso una contraseña valida", () => {
  cy.get(entradaContrasena).type(contrasena, { force: true });
});

// Enviar formulario de registro
When("hago clic en el boton de sign up del modal", () => {
  // Hacemos clic en el botón "Sign up" para enviar la información
  cy.get('button').contains(textoBotonSignUp).click();
});

// Verificar que el registro funcionó
Then("se observa mensaje de confirmacion", () => {
  // Esperamos a que la página termine de procesar el registro
  cy.wait("@llamadaRegistro").then((x) => {
    // Verificamos que la respuesta sea exitosa (código 200 = todo bien)
    expect(x.response.statusCode).to.eq(200);
    // Capturamos el mensaje que aparece en pantalla
    cy.on("window:alert", (text) => {
      // Verificamos que diga "Sign up successful"
      expect(text).to.contains("Sign up successful.");
    });
  });
});
