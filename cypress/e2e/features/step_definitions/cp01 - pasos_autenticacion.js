// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
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

// El botón de "Iniciar sesión" que está en la parte de arriba
const botonInicioSesion = '[id="login2"]';
// El botón de "Cerrar sesión" 
const botonCerrarSesion = '[id="logout2"]';
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

// ========== DATOS INVENTADOS PARA CADA PRUEBA ==========
// Creamos un nombre de usuario diferente cada vez que corremos la prueba
const nombreUsuario = generateRandomString();
// Creamos una contraseña diferente cada vez que corremos la prueba
const contrasena = generateRandomString();

// ========== PRUEBAS PARA REGISTRAR UN USUARIO NUEVO ==========

// Paso 1: Ir a la ventana de registro
When("voy a la pagina de registro", () => {
  // Hacemos clic en el botón de "Registrarse"
  cy.get(botonRegistroNavBar).click();
});

// Paso 2: Llenar el formulario de registro
When("agrego lo detalles del registro", () => {
  // Le decimos a Cypress que escuche cuando la página envíe los datos del registro
  cy.intercept("POST", "https://api.demoblaze.com/signup").as("llamadaRegistro");
  // Escribimos el nombre de usuario en su caja
  cy.get(entradaUserName).type(nombreUsuario, { force: true });
  // Escribimos la contraseña en su caja
  cy.get(entradaContrasena).type(contrasena, { force: true });
  // Hacemos clic en el botón "Sign up" para enviar la información
  cy.get('button').contains(textoBotonSignUp).click();
});

// Paso 3: Verificar que el registro funcionó
Then("muestra mensaje de confirmacion", () => {
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

// ------------------------------------------------------------------------

// ========== PRUEBAS PARA ENTRAR CON UN USUARIO EXISTENTE ==========

// Paso 1: Entrar con un usuario que ya existe
When("inicio sesion con credenciales validas", () => {
  // Le decimos a Cypress que escuche cuando enviemos los datos de login
  cy.intercept("POST", "https://api.demoblaze.com/login").as("llamadaAutenticacion");
  // Hacemos clic en el botón de "Iniciar sesión"
  cy.get(botonInicioSesion).click();
  // Usamos un comando especial que ya teníamos para llenar los datos
  cy.uiLogin(inicioSesionPersona, entradaNombreUsarioInicioSesion, entradaContrasenaInicioSesion);
  // Hacemos clic en "Log in" para entrar
  cy.get("button").contains(textoBotonInicioSesion).click();

  // Esperamos a que termine de procesar el login
  cy.wait("@llamadaAutenticacion");
  // Verificamos que la ventana de login se cierre
  cy.get('#logInModal').should('not.be.visible');
});

// Paso 2: Verificar que ya estamos dentro
Then("deberia ver mi usuario en la pagina", () => {
  // Verificamos que aparezca nuestro nombre con "Welcome" en la página
  cy.get(nombreUsuarioEnPantalla).should("have.text", `Welcome ${inicioSesionPersona}`);
});

// ========== PRUEBAS PARA SALIR DE LA CUENTA ==========

// Paso 1: Cerrar la sesión
When("hago click en cerrar sesion", () => {
  // Hacemos clic en el botón de "Cerrar sesión"
  cy.get(botonCerrarSesion).click();
});

// Paso 2: Verificar que ya salimos
Then("espero que se pueda iniciar sesion de nuevo", () => {
  // Verificamos que el botón de "Iniciar sesión" aparezca otra vez
  cy.get(botonInicioSesion).should("be.visible");
  // Verificamos que ya no aparezca nuestro nombre en la página
  cy.get(nombreUsuarioEnPantalla).should("not.contain.text", `Welcome ${inicioSesionPersona}`);
});
