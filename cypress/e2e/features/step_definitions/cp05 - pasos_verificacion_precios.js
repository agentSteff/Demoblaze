// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== DATOS Y UBICACIONES QUE VAMOS A USAR ==========

// La tarjeta principal que contiene cada producto completo (div con clases card y h-100)
const bloqueDeItem = '.card.h-100';
// Donde está el título de cada producto (dentro del bloque de contenido)
const tituloProducto = 'h4.card-title';
// Donde está la imagen de cada producto (imagen dentro del enlace superior)
const imagenProducto = 'a .card-img-top';
// Donde está el precio de cada producto (etiqueta h5 con el precio)
const precioProducto = 'h5';
// Contenedor principal donde se muestran todos los productos
const contenedorProductos = '#tbodyid';

// ========== PRUEBAS PARA VERIFICAR VISUALIZACIÓN DE PRODUCTOS ==========

// Paso 1: Esperar a que la página principal cargue completamente
When("espero a que la pagina principal cargue completamente", () => {
  // Esperamos a que el contenedor principal de productos sea visible
  cy.get(contenedorProductos).should('be.visible');
  // Esperamos a que al menos una tarjeta de producto sea visible
  cy.get(bloqueDeItem).should('have.length.at.least', 1);
  // Esperamos un poco más para asegurar que todos los elementos carguen completamente
  cy.wait(2000);
});

// Paso 2: Verificar que se muestran al menos 9 productos en la sección principal
When("verifico que se muestran al menos 9 productos en la seccion principal", () => {
  // Verificamos que hay al menos 9 tarjetas de producto visibles en la página
  cy.get(bloqueDeItem).should('have.length.at.least', 9);
});

// Paso 3: Confirmar que cada producto visible tiene nombre claramente legible
Then("confirmo que cada producto visible tiene nombre claramente legible", () => {
  // Revisamos cada tarjeta de producto que aparece en la página principal
  cy.get(bloqueDeItem).each(($card) => {
    // Verificamos que cada tarjeta de producto tenga un título legible
    cy.wrap($card)
      .find(tituloProducto)               // Buscamos el elemento h4 que contiene el título
      .should('exist')                    // Verificamos que el elemento exista
      .should('be.visible')               // Verificamos que sea visible al usuario
      .find('a')                          // Buscamos el enlace dentro del título
      .should('exist')                    // Verificamos que el enlace exista
      .invoke('text')                     // Obtenemos el texto del enlace (nombre del producto)
      .should('not.be.empty')             // Verificamos que el texto no esté vacío
      .should('have.length.greaterThan', 2); // Verificamos que tenga al menos 3 caracteres
  });
});

// Paso 4: Confirmar que cada producto visible tiene imagen correspondiente
Then("confirmo que cada producto visible tiene imagen correspondiente", () => {
  // Revisamos cada tarjeta de producto para verificar que tiene imagen válida
  cy.get(bloqueDeItem).each(($card) => {
    // Verificamos que cada tarjeta tenga una imagen dentro del enlace superior
    cy.wrap($card)
      .find(imagenProducto)               // Buscamos la imagen dentro del enlace (<a> .card-img-top)
      .should('exist')                    // Verificamos que la imagen exista en el DOM
      .should('be.visible')               // Verificamos que la imagen sea visible al usuario
      .should('have.attr', 'src')         // Verificamos que tenga el atributo src (URL de la imagen)
      .should('not.be.empty');            // Verificamos que el src no esté vacío
    
    // Verificamos que la imagen tenga texto alternativo para accesibilidad
    cy.wrap($card)
      .find(imagenProducto)
      .should('have.attr', 'alt');        // Verificamos que tenga atributo alt
  });
});

// Paso 5: Confirmar que cada producto visible tiene precio con símbolo de dólar
Then("confirmo que cada producto visible tiene precio con simbolo de dolar", () => {
  // Revisamos cada tarjeta de producto para verificar que tiene precio válido
  cy.get(bloqueDeItem).each(($card) => {
    // Verificamos que cada tarjeta tenga un precio con formato correcto
    cy.wrap($card)
      .find(precioProducto)               // Buscamos el elemento h5 que contiene el precio
      .should('exist')                    // Verificamos que el elemento exista
      .should('be.visible')               // Verificamos que sea visible al usuario
      .invoke('text')                     // Obtenemos el texto del precio
      .should((priceText) => {
        // Verificamos que el precio tenga el formato correcto: $ seguido de números decimales
        expect(priceText.trim()).to.match(/^\$\d+(\.\d{1,2})?$/); // Formato: $123 o $123.45
        // Verificamos que el texto del precio no esté vacío
        expect(priceText.trim()).to.not.be.empty;
      });
  });
});