// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== DATOS Y UBICACIONES QUE VAMOS A USAR ==========

// El producto específico que vamos a revisar
const producto = "Samsung galaxy s6";
// La caja que contiene cada producto en la página principal
const bloqueDeItem = '.card-block';
// Donde está el título de cada producto
const tituloProducto = 'h4.card-title';
// Donde está el nombre del producto cuando entramos a verlo
const nombreProducto = 'h2.name';

// ========== PRUEBAS PARA VERIFICAR QUE TODOS LOS PRODUCTOS TENGAN DATOS ==========

// Paso: Verificar que todos los productos en la página principal tienen nombre y precio
Then("confirmo que todos los productos visibles tienen nombre y precio", () => {
  // Revisamos cada tarjeta de producto que aparece en la página
  cy.get(bloqueDeItem).each(($card) => {
    
    // Verificamos que cada producto tenga un nombre
    cy.wrap($card)
      .find(tituloProducto)               // Buscamos el título del producto
      .should('exist')                    // Verificamos que exista
      .find('a')                          // Buscamos el enlace dentro del título
      .should('exist')                    // Verificamos que el enlace exista
      .invoke('text')                     // Obtenemos el texto del enlace
      .should('not.be.empty');            // Verificamos que no esté vacío

    // Verificamos que cada producto tenga un precio
    cy.wrap($card)
      .find('h5')                         // Buscamos donde está el precio
      .should('exist')                    // Verificamos que exista
      .invoke('text')                     // Obtenemos el texto del precio
      .should((priceText) => {
        // Verificamos que el precio tenga el formato correcto ($ seguido de números)
        expect(priceText.trim()).to.match(/^\$\d+/); // Debe empezar con "$" y tener números
      });
  });
});

// ========== PRUEBAS PARA UN PRODUCTO ESPECÍFICO ==========

// Paso: Hacer clic en un producto para ver sus detalles
When("hago click en un producto", () => {
  // Buscamos el producto específico y le hacemos clic
  cy.get("a").contains(producto).click();
});

// Paso: Verificar que el producto individual tiene nombre y precio
Then("confirmo que el producto producto tiene nombre y precio", () => {
  
  // Verificamos que el producto tenga un nombre visible
  cy.get(nombreProducto)
    .should('exist')                      // Verificamos que el nombre exista
    .invoke('text')                       // Obtenemos el texto del nombre
    .should('not.be.empty');              // Verificamos que no esté vacío

  // Verificamos que el producto tenga un precio visible
  cy.get('h3.price-container')
    .should('exist')                      // Verificamos que el precio exista
    .invoke('text')                       // Obtenemos el texto del precio
    .should((priceText) => {
      // Verificamos que el precio tenga el formato correcto
      expect(priceText.trim()).to.match(/^\$\d+/); // Debe empezar con "$" y tener números
    });
});