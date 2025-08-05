// ***********************************************
// Este archivo nos permite crear comandos personalizados de Cypress
// y también cambiar comandos que ya existen.
//
// Para ver más ejemplos de comandos personalizados:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- Esto es un comando padre --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- Esto es un comando hijo --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- Esto es un comando dual --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- Esto sobrescribe un comando que ya existe --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const userFixture = "users.json";

// ========== COMANDO PERSONALIZADO PARA INICIAR SESIÓN ==========
// Creamos un comando que se llama "uiLogin" para hacer login de forma fácil
// Parámetros:
// - persona: el nombre del usuario en el archivo JSON
// - userField: la caja donde se escribe el nombre de usuario
// - passwordField: la caja donde se escribe la contraseña
Cypress.Commands.add("uiLogin", (persona, userField, passwordField) => {
  // Cargamos el archivo JSON que tiene los datos de los usuarios
  cy.fixture(userFixture).then((user) => {
    // Escribimos el nombre de usuario de la persona en la caja correspondiente
    cy.get(userField).type(user[persona]["username"], { force: true });
    // Escribimos la contraseña de la persona en la caja correspondiente
    cy.get(passwordField).type(user[persona]["password"], { force: true });
  });
});

// ========== COMANDO PERSONALIZADO PARA LLENAR FORMULARIO DE COMPRA ==========
// Creamos un comando que se llama "uiOrdenar" para llenar formularios de compra
// Parámetros:
// - comprador: el nombre del comprador en el archivo JSON
// - entradaNombre: caja donde va el nombre
// - entradaPais: caja donde va el país
// - entradaCiudad: caja donde va la ciudad
// - entradaCC: caja donde va el número de tarjeta de crédito
// - entradaMes: caja donde va el mes de vencimiento
// - entradaAno: caja donde va el año de vencimiento
Cypress.Commands.add("uiOrdenar", (comprador, entradaNombre, entradaPais, entradaCiudad, entradaCC, entradaMes, entradaAno) => {
  // Cargamos el archivo JSON que tiene los datos de los compradores
  cy.fixture(userFixture).then((user) => {
    // Llenamos cada campo del formulario con los datos del comprador
    cy.get(entradaNombre).type(user[comprador]["username"], { force: true });    // Nombre
    cy.get(entradaPais).type(user[comprador]["country"], { force: true });       // País
    cy.get(entradaCiudad).type(user[comprador]["city"], { force: true });        // Ciudad
    cy.get(entradaCC).type(user[comprador]["cc"], { force: true });              // Tarjeta de crédito
    cy.get(entradaMes).type(user[comprador]["cc_month"], { force: true });       // Mes de vencimiento
    cy.get(entradaAno).type(user[comprador]["cc_year"], { force: true });        // Año de vencimiento
  });
});