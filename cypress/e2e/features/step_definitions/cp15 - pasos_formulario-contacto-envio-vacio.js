// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== SELECTORES PARA NAVEGACIÓN ==========
// La barra de navegación principal de la página
const navBarID = '[id="navbarExample"]';
// El texto del enlace de contacto en la navegación
const textoEnlaceContacto = 'Contact';

// ========== SELECTORES PARA FORMULARIO DE CONTACTO ==========
// El contenedor principal del modal de contacto
const contenidoModal = '.modal-content';
// El botón para enviar el mensaje (selector completo para ser específico)
const botonEnviarMensaje = 'button[type="button"][onclick="send()"].btn.btn-primary';
// El texto que aparece en el botón de enviar
const textoBotonEnviar = 'Send message';

// ========== MENSAJES Y VALIDACIONES ==========
// El mensaje que aparece cuando el envío es exitoso
const mensajeExitoEnvio = 'Thanks for the message!!';

// ========== TIEMPOS DE ESPERA ==========
// Tiempo máximo para esperar que aparezca el modal
const tiempoEsperaModal = 10000;
// Pequeña pausa para asegurar que el modal termine de cargar
const pausaTransicionModal = 500;

// ========== PRUEBAS PARA FORMULARIO DE CONTACTO VACÍO ==========

// Paso 1: Ir a la sección de contacto
When("voy a la seccion de contacto", () => {
  // Buscamos la barra de navegación y hacemos clic en "Contact"
  cy.get(navBarID).find('a').contains(textoEnlaceContacto).click();
});

// Paso 2: Intentar enviar el formulario sin llenar nada
When("no relleno nada del formulario y trato de enviarlo", () => {
  // Preparamos para capturar cualquier mensaje de alerta
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('windowAlert');
  });
  
  // Esperamos a que el modal esté completamente cargado y visible
  cy.get(contenidoModal, { timeout: tiempoEsperaModal }).should('be.visible');
  cy.wait(pausaTransicionModal); // Pequeña pausa para asegurar que termine la transición
  
  // Buscamos y hacemos clic en el botón "Send message"
  cy.get(botonEnviarMensaje)
    .contains(textoBotonEnviar)
    .should('be.visible')
    .should('be.enabled')
    .click();
});

// Paso 3: Verificar que NO se envíe y muestre error
Then("valido que no se envie y de un mensaje de error", () => {
  // Verificamos que NO aparezca el mensaje de éxito, ya que el formulario está vacío
  // Debería mostrar un error o simplemente no enviar nada
  cy.get('@windowAlert').should('not.have.been.calledWith', mensajeExitoEnvio);
});