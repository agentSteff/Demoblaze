Feature: Validacion de seccion de contacto

  Scenario: Visualizacion de precio en pagina del producto 
    Given que visito la página principal
    When voy a la seccion de contacto
    When no relleno nada del formulario y trato de enviarlo
    Then valido que no se envie y de un mensaje de error