// ========== CONFIGURACIÓN PRINCIPAL DE CYPRESS ==========
// Este archivo le dice a Cypress cómo debe funcionar y qué herramientas usar

// ========== IMPORTACIONES NECESARIAS ==========
// Traemos las herramientas que necesitamos para que todo funcione
import { defineConfig } from "cypress";                                        // La función principal para configurar Cypress
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";            // Herramienta que procesa nuestros archivos JavaScript
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";  // Plugin para usar Cucumber (BDD)
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";   // Plugin que conecta Cucumber con esbuild

// ========== CONFIGURACIÓN PRINCIPAL ==========
// Exportamos la configuración que usará Cypress
export default defineConfig({
  // Configuración para pruebas end-to-end (e2e)
  e2e: {
    // Le decimos a Cypress que busque archivos .feature (archivos de Cucumber)
    // en la carpeta cypress/e2e y todas sus subcarpetas
    specPattern: "cypress/e2e/**/*.feature",
    
    // Función que se ejecuta cuando Cypress se inicia
    // Aquí configuramos los plugins y herramientas adicionales
    async setupNodeEvents(on, config) {
      // Agregamos el plugin de Cucumber para poder usar archivos .feature
      await addCucumberPreprocessorPlugin(on, config);
      
      // Configuramos el procesador de archivos para que entienda nuestro código JavaScript/TypeScript
      // y lo convierta en algo que el navegador pueda ejecutar
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],  // Usamos esbuild para procesar los archivos rápidamente
      }));
      
      // Devolvemos la configuración para que Cypress la use
      return config;
    },
  },
});
