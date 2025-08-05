// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== DATOS Y UBICACIONES QUE VAMOS A USAR ==========

// El producto que vamos a eliminar del carrito
const product = "Samsung galaxy s6";
// El texto del botón para borrar productos
const deleteText = "Delete";
// La tabla donde aparecen los productos del carrito
const cartTable = '[id="tbodyid"]';
// Donde aparece el precio total del carrito
const textoTotal = '[id="totalp"]';

// ========== PRUEBAS PARA ELIMINAR PRODUCTOS DEL CARRITO ==========

// Paso 1: Quitar un producto del carrito
When("elimino un producto del carrito", () => {
  // Le decimos a Cypress que escuche cuando borremos algo del carrito
  cy.intercept("POST", "https://api.demoblaze.com/deleteitem").as(
    "llamadaEliminarItem"
  );

  // Buscamos en la tabla del carrito la fila que tiene nuestro producto
  cy.get(cartTable)
    .contains("tr", product) // Encuentra la fila que contiene el producto
    .within(() => {
      // Dentro de esa fila, buscamos el botón "Delete" y le hacemos clic
      cy.get("a").contains(deleteText).click();
    });
});

// Paso 2: Verificar que el producto se eliminó correctamente
Then("el carrito deberia estar vacio y el total cero", () => {
  // Esperamos a que termine de procesar la eliminación
  cy.wait("@llamadaEliminarItem").then(() => {
    // Esperamos un poco más para que la página se actualice
    cy.wait(1000).then(() => {
      // Verificamos que el producto ya no aparezca en la tabla
      cy.contains("td", product).should("not.exist");
      // Verificamos que el total esté vacío (sin precio)
      cy.get(textoTotal).should("have.text", "");
    });
  });
});