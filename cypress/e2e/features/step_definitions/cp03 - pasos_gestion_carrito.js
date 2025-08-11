// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== DATOS Y UBICACIONES QUE VAMOS A USAR ==========

// Producto específico que utilizaremos en todas las pruebas del carrito
const product = "Samsung galaxy s6";
// Texto del enlace para eliminar productos del carrito
const deleteText = "Delete";
// Tabla principal donde se muestran los productos agregados al carrito
const cartTable = '[id="tbodyid"]';
// Elemento que muestra el precio total acumulado del carrito
const textoTotal = '[id="totalp"]';
// Botón "Cart" en la barra de navegación para acceder al carrito
const botonCart = '[id="cartur"]';
// Botón verde "Add to cart" en la página de detalle del producto
const botonAddToCart = '.btn-success';

// ========== PRUEBAS PARA GESTIÓN DEL CARRITO ==========

// Paso 1: Localizar un producto disponible en la página principal
When("localizo un producto disponible en la pagina principal", () => {
  // Esperamos a que los títulos de productos sean visibles (página completamente cargada)
  cy.get('.card-title').should('be.visible');
  // Verificamos que nuestro producto específico esté disponible en la página principal
  cy.contains('.card-title', product).should('be.visible');
});

// Paso 2: Hacer clic sobre el nombre del producto para abrir su detalle
When("hago clic sobre el nombre del producto para abrir su detalle", () => {
  // Buscamos el enlace que contiene el nombre del producto y le hacemos clic
  cy.get("a").contains(product).click();
  // Verificamos que navegamos correctamente a la página de detalle del producto
  cy.get('.name').should('contain.text', product);
});

// Paso 3: Hacer clic en el botón Add to cart
When("hago clic en el boton Add to cart", () => {
  // Configuramos intercepción para monitorear la llamada API de agregar al carrito
  cy.intercept("POST", "https://api.demoblaze.com/addtocart").as("llamadaAgregarCarrito");
  // Hacemos clic en el botón verde "Add to cart" de la página de detalle
  cy.get(botonAddToCart).contains('Add to cart').click();
});

// Paso 4: Observar que aparece mensaje emergente confirmando que el producto fue agregado
When("observo que aparece mensaje emergente confirmando que el producto fue agregado", () => {
  // Esperamos a que la llamada API de agregar al carrito se complete exitosamente
  cy.wait("@llamadaAgregarCarrito").then((x) => {
    // Verificamos que la respuesta del servidor sea exitosa (código 200)
    expect(x.response.statusCode).to.eq(200);
    // Configuramos captura del mensaje de alerta que aparece en pantalla
    cy.on("window:alert", (text) => {
      // Verificamos que el mensaje contenga "Product added" confirmando la acción
      expect(text).to.contains("Product added");
    });
  });
});

// Paso 5: Hacer clic en el botón Cart para ir al carrito
When("hago clic en el boton Cart para ir al carrito", () => {
  // Hacemos clic en el botón "Cart" ubicado en la barra de navegación
  cy.get(botonCart).click();
  // Verificamos que navegamos correctamente a la página del carrito de compras
  cy.url().should('include', 'cart.html');
});

// Paso 6: Confirmar que el producto agregado aparece en la tabla del carrito
When("confirmo que el producto agregado aparece en la tabla del carrito", () => {
  // Verificamos que el nombre del producto aparezca como una celda en la tabla del carrito
  cy.get(cartTable).contains('td', product).should('be.visible');
  // Verificamos que el producto tenga un precio válido asociado en su fila
  cy.get(cartTable).contains('tr', product).within(() => {
    cy.get('td').eq(2).should('not.be.empty'); // Tercera columna contiene el precio
  });
});

// Paso 7: Hacer clic en el enlace Delete del producto
When("hago clic en el enlace Delete del producto", () => {
  // Configuramos intercepción para monitorear la llamada API de eliminar producto
  cy.intercept("POST", "https://api.demoblaze.com/deleteitem").as("llamadaEliminarItem");
  // Localizamos la fila de la tabla que contiene nuestro producto específico
  cy.get(cartTable)
    .contains("tr", product) // Encuentra la fila que contiene el nombre del producto
    .within(() => {
      // Dentro de esa fila, buscamos y hacemos clic en el enlace "Delete"
      cy.get("a").contains(deleteText).click();
    });
});

// Paso 8: Verificar que el producto desaparece de la lista
Then("verifico que el producto desaparece de la lista", () => {
  // Esperamos a que la llamada API de eliminación se complete exitosamente
  cy.wait("@llamadaEliminarItem").then(() => {
    // Esperamos un tiempo adicional para que la interfaz se actualice
    cy.wait(1000).then(() => {
      // Verificamos que el producto ya no aparezca en ninguna celda de la tabla
      cy.contains("td", product).should("not.exist");
    });
  });
});

// Paso 9: Verificar que el Total se actualiza correctamente
Then("verifico que el Total se actualiza correctamente", () => {
  // Verificamos que el total esté vacío o en cero (carrito sin productos)
  cy.get(textoTotal).should("have.text", "");
});