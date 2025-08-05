// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== DATOS Y UBICACIONES QUE VAMOS A USAR ==========

// El botón que nos lleva al carrito de compras
const cartButtonDashboard = '[id="cartur"]';
// El producto que vamos a comprar
const product = "Samsung galaxy s6";
// El precio del producto
const productPrice = "360";
// El texto del botón para agregar al carrito
const cartCallToAction = "Add to cart";
// El texto del botón para hacer el pedido
const purchaseCallToAction = "Place Order";

// Datos del comprador para llenar el formulario
const buyer = "test.admin";
// Cajas donde escribimos los datos del comprador
const nameInput = '[id="name"]';        // Caja del nombre
const countryInput = '[id="country"]';   // Caja del país
const cityInput = '[id="city"]';        // Caja de la ciudad
const ccInput = '[id="card"]';          // Caja del número de tarjeta
const monthInput = '[id="month"]';      // Caja del mes de vencimiento
const yearInput = '[id="year"]';        // Caja del año de vencimiento
// El texto del botón final de compra
const purchaseButtonText = "Purchase";
// El mensaje que aparece cuando la compra es exitosa
const successfulPurchase = "Thank you for your purchase!";

// ========== PRUEBAS PARA AGREGAR PRODUCTOS AL CARRITO ==========

// Paso 1: Poner un producto en el carrito
When("agrego un producto al carrito", () => {
  // Buscamos el producto y le hacemos clic
  cy.get("a").contains(product).click();
  // Hacemos clic en el botón "Add to cart" para agregarlo
  cy.get("a").contains(cartCallToAction).click();
});

// Paso 2: Verificar que el producto esté en el carrito
Then("veo el producto en el carrito", () => {
  // Vamos al carrito haciendo clic en el botón del carrito
  cy.get(cartButtonDashboard).click();
  // Verificamos que aparezca el nombre del producto
  cy.get("td").contains(product);
  // Verificamos que aparezca el precio del producto
  cy.get("td").contains(productPrice);
});

//----------------------------------------------------------------------------

// ========== PRUEBAS PARA COMPLETAR LA COMPRA ==========

// Paso 1: Hacer el proceso de compra
When("procedo a realizar la compra", () => {
  // Le decimos a Cypress que escuche cuando se vacíe el carrito
  cy.intercept("POST", "https://api.demoblaze.com/deletecart").as(
    "llamadaEliminarCarrrito"
  );
  // Hacemos clic en "Place Order" para empezar la compra
  cy.contains(purchaseCallToAction).click();
  // Usamos un comando especial para llenar todos los datos del comprador
  cy.uiOrdenar(buyer, nameInput, countryInput, cityInput, ccInput, monthInput, yearInput);
  // Hacemos clic en "Purchase" para finalizar la compra
  cy.contains("button", purchaseButtonText).click();
});

// Paso 2: Verificar que la compra fue exitosa
Then("verifico un mensaje de confirmacion", () => {
  // Esperamos a que termine de procesar la compra
  cy.wait("@llamadaEliminarCarrrito").then(() => {
    // Verificamos que aparezca el mensaje de "¡Gracias por tu compra!"
    cy.contains("h2", successfulPurchase).should("exist");
  });
});