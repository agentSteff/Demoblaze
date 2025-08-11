// Traemos herramientas para escribir nuestras pruebas
// When = "Cuando hago algo"
// Then = "Entonces espero que pase algo"
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// ========== DATOS Y UBICACIONES QUE VAMOS A USAR ==========

// Botones de navegación
const cartButtonDashboard = '[id="cartur"]';
const nombreUsuarioEnPantalla = '[id="nameofuser"]';

// Datos de login
const inicioSesionPersona = "test.admin";
const entradaNombreUsarioInicioSesion = '[id="loginusername"]';
const entradaContrasenaInicioSesion = '[id="loginpassword"]';
const textoBotonInicioSesion = "Log in";

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

// ========== PRUEBAS PARA PROCESO COMPLETO DE COMPRA ==========

// Ingresar nombre de usuario y contraseña en la ventana modal
When("ingreso el nombre de usuario y contraseña en la ventana modal", () => {
  // Le decimos a Cypress que escuche cuando enviemos los datos de login
  cy.intercept("POST", "https://api.demoblaze.com/login").as("llamadaAutenticacion");
  // Usamos un comando especial que ya teníamos para llenar los datos
  cy.uiLoginPersona(inicioSesionPersona, entradaNombreUsarioInicioSesion);
  cy.uiLoginContraseña(inicioSesionPersona, entradaContrasenaInicioSesion);
});

// Hacer clic en log in
When("hago clic en log in", () => {
  // Hacemos clic en "Log in" para entrar
  cy.get("button").contains(textoBotonInicioSesion).click();
  // Esperamos a que termine de procesar el login
  cy.wait("@llamadaAutenticacion");
  // Verificamos que la ventana de login se cierre
  cy.get('#logInModal').should('not.be.visible');
});

// Confirmar que se muestra el texto Welcome con el nombre de usuario
When("confirmo que se muestra el texto Welcome con el nombre de usuario", () => {
  // Verificamos que aparezca nuestro nombre con "Welcome" en la página
  cy.get(nombreUsuarioEnPantalla).should("have.text", `Welcome ${inicioSesionPersona}`);
});

// Seleccionar un producto y hacer clic sobre su nombre para abrir detalle
When("selecciono un producto y hago clic sobre su nombre para abrir detalle", () => {
  // Buscamos el producto y le hacemos clic para abrir su detalle
  cy.get("a").contains(product).click();
  // Verificamos que estamos en la página de detalle del producto
  cy.get('.name').should('contain.text', product);
});

// Confirmar que aparece alerta indicando que el producto fue agregado
When("confirmo que aparece alerta indicando que el producto fue agregado", () => {
  // Esperamos a que termine de procesar la adición al carrito
  cy.wait("@llamadaAgregarCarrito").then((x) => {
    // Verificamos que la respuesta sea exitosa
    expect(x.response.statusCode).to.eq(200);
    // Capturamos el mensaje que aparece en pantalla
    cy.on("window:alert", (text) => {
      // Verificamos que diga "Product added"
      expect(text).to.contains("Product added");
    });
  });
});

// Hacer clic en el botón Cart para acceder al carrito
When("hago clic en el boton Cart para acceder al carrito", () => {
  // Vamos al carrito haciendo clic en el botón del carrito
  cy.get(cartButtonDashboard).click();
  // Verificamos que estamos en la página del carrito
  cy.url().should('include', 'cart.html');
  // Verificamos que aparezca el nombre del producto
  cy.get("td").contains(product);
  // Verificamos que aparezca el precio del producto
  cy.get("td").contains(productPrice);
});

// Hacer clic en el botón Place Order
When("hago clic en el boton Place Order", () => {
  // Hacemos clic en "Place Order" para empezar la compra
  cy.contains(purchaseCallToAction).click();
  // Verificamos que aparezca el modal de orden
  cy.get('#orderModal').should('be.visible');
});

// Completar todos los campos obligatorios del formulario
When("completo todos los campos obligatorios del formulario", () => {
  // Usamos un comando especial para llenar todos los datos del comprador
  cy.uiOrdenar(buyer, nameInput, countryInput, cityInput, ccInput, monthInput, yearInput);
});

// Hacer clic en el botón Purchase
When("hago clic en el boton Purchase", () => {
  // Le decimos a Cypress que escuche cuando se vacíe el carrito
  cy.intercept("POST", "https://api.demoblaze.com/deletecart").as("llamadaEliminarCarrrito");
  // Hacemos clic en "Purchase" para finalizar la compra
  cy.contains("button", purchaseButtonText).click();
});

// Verificar que se muestre mensaje de confirmación Thank you for your purchase
Then("verifico que se muestre mensaje de confirmacion Thank you for your purchase", () => {
  // Esperamos a que termine de procesar la compra
  cy.wait("@llamadaEliminarCarrrito").then(() => {
    // Verificamos que aparezca el mensaje de "¡Gracias por tu compra!"
    cy.contains("h2", successfulPurchase).should("exist");
  });
});

// Verificar que se muestre el detalle de la transacción
Then("verifico que se muestre el detalle de la transaccion", () => {
  // Verificamos que aparezca el modal con los detalles de la compra
  cy.get('.sweet-alert').should('be.visible');
  // Verificamos que contenga información del comprador
  cy.get('.sweet-alert').should('contain.text', buyer);
  // Verificamos que contenga el total de la compra
  cy.get('.sweet-alert').should('contain.text', productPrice);
});