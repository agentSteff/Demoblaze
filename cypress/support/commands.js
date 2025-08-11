// ***********************************************
// COMANDOS PERSONALIZADOS DE CYPRESS PARA DEMOBLAZE
// 
// Este archivo contiene comandos reutilizables específicos para las pruebas
// de la aplicación DemoBlaze. Estos comandos simplifican operaciones comunes
// como inicios de sesión y llenado de formularios de compra.
//
// Para más información sobre comandos personalizados:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// Tipos de comandos disponibles:
// -- Comando padre: Cypress.Commands.add('login', (email, password) => { ... })
// -- Comando hijo: Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// -- Comando dual: Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// -- Sobrescribir comando: Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Archivo JSON que contiene los datos de usuarios de prueba
const userFixture = "users.json";

// ========== COMANDOS PERSONALIZADOS PARA AUTENTICACIÓN ==========

/**
 * Comando para escribir el nombre de usuario en el campo correspondiente
 * @param {string} persona - Nombre del usuario en el archivo users.json
 * @param {string} userField - Selector CSS del campo de nombre de usuario
 */
Cypress.Commands.add("uiLoginPersona", (persona, userField) => {
  // Cargamos el archivo JSON que contiene los datos de todos los usuarios de prueba
  cy.fixture(userFixture).then((user) => {
    // Extraemos y escribimos el nombre de usuario específico en el campo indicado
    cy.get(userField).type(user[persona]["username"], { force: true });
  });
});

/**
 * Comando para escribir la contraseña en el campo correspondiente
 * @param {string} persona - Nombre del usuario en el archivo users.json
 * @param {string} passwordField - Selector CSS del campo de contraseña
 */
Cypress.Commands.add("uiLoginContraseña", (persona, passwordField) => {
  // Cargamos el archivo JSON que contiene los datos de todos los usuarios de prueba
  cy.fixture(userFixture).then((user) => {
    // Extraemos y escribimos la contraseña específica en el campo indicado
    cy.get(passwordField).type(user[persona]["password"], { force: true });
  });
});

// ========== COMANDO PERSONALIZADO PARA FORMULARIO DE COMPRA ==========

/**
 * Comando para completar automáticamente el formulario de finalización de compra
 * @param {string} comprador - Nombre del comprador en el archivo users.json
 * @param {string} entradaNombre - Selector CSS del campo de nombre completo
 * @param {string} entradaPais - Selector CSS del campo de país
 * @param {string} entradaCiudad - Selector CSS del campo de ciudad
 * @param {string} entradaCC - Selector CSS del campo de número de tarjeta de crédito
 * @param {string} entradaMes - Selector CSS del campo de mes de vencimiento
 * @param {string} entradaAno - Selector CSS del campo de año de vencimiento
 */
Cypress.Commands.add("uiOrdenar", (comprador, entradaNombre, entradaPais, entradaCiudad, entradaCC, entradaMes, entradaAno) => {
  // Cargamos el archivo JSON que contiene los datos de compradores de prueba
  cy.fixture(userFixture).then((user) => {
    // Completamos cada campo del formulario con los datos específicos del comprador
    cy.get(entradaNombre).type(user[comprador]["username"], { force: true });    // Nombre completo del comprador
    cy.get(entradaPais).type(user[comprador]["country"], { force: true });       // País de residencia
    cy.get(entradaCiudad).type(user[comprador]["city"], { force: true });        // Ciudad de residencia
    cy.get(entradaCC).type(user[comprador]["cc"], { force: true });              // Número de tarjeta de crédito
    cy.get(entradaMes).type(user[comprador]["cc_month"], { force: true });       // Mes de vencimiento (MM)
    cy.get(entradaAno).type(user[comprador]["cc_year"], { force: true });        // Año de vencimiento (YYYY)
  });
});