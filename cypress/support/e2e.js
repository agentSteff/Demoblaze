// ***********************************************************
// Este archivo se carga automáticamente antes de que corran nuestras pruebas.
//
// Es el lugar perfecto para poner configuraciones globales y
// comportamientos que modifican cómo funciona Cypress.
//
// Puedes cambiar la ubicación de este archivo o desactivar
// la carga automática de archivos de soporte con la
// opción de configuración 'supportFile'.
//
// Puedes leer más aquí:
// https://on.cypress.io/configuration
// ***********************************************************

// ========== IMPORTACIÓN DE COMANDOS PERSONALIZADOS ==========
// Traemos el archivo commands.js que tiene nuestros comandos personalizados
// (como uiLogin y uiOrdenar) usando la sintaxis moderna de JavaScript (ES2015)
import './commands'

// ========== SINTAXIS ALTERNATIVA ==========
// También puedes usar la sintaxis antigua de CommonJS si prefieres:
// require('./commands')