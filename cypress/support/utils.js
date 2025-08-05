// ========== FUNCIONES UTILITARIAS PARA LAS PRUEBAS ==========
// Este archivo contiene funciones que nos ayudan a hacer cosas útiles
// en nuestras pruebas automáticas

// ========== GENERADOR DE CADENAS ALEATORIAS ==========
// Función que crea una cadena de texto completamente aleatoria
// Útil para crear nombres de usuario únicos en cada prueba
const generateRandomString = () => {
  // Math.random() = genera un número decimal aleatorio entre 0 y 1
  // Date.now() = obtiene la fecha y hora actual en milisegundos (número muy grande)
  // Math.floor() = quita los decimales, deja solo la parte entera
  // .toString(36) = convierte el número a texto usando base 36 (números y letras)
  //                 esto nos da una cadena corta con letras y números mezclados
  return Math.floor(Math.random() * Date.now()).toString(36);
};

// ========== EXPORTAR FUNCIONES ==========
// Hacemos que esta función esté disponible para otros archivos
// Para usarla en otros archivos: import { generateRandomString } from "../../../support/utils";
export { generateRandomString };