// Traemos una herramienta llamada "Given" que nos ayuda a escribir pruebas
// Given = "Dado que..." (es como decir "empezando desde...")
import { Given } from "@badeball/cypress-cucumber-preprocessor";

// Creamos un paso de prueba que dice "Dado que visito la página principal"
// Cuando escribamos esto en nuestras pruebas, se ejecutará el código de abajo
Given("que visito la página principal", () => {
  // Le decimos al navegador que vaya a la página web de Demoblaze
  // Es como escribir la dirección en la barra del navegador y dar Enter
  cy.visit("https://www.demoblaze.com/");
});