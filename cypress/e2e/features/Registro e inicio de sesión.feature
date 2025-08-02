Feature: Autenticación del usuario

  Scenario: Registro exitoso
    Given que visito la página principal
    When voy a la pagina de registro
    And agrego lo detalles del registro
    Then muestra mensaje de confirmacion

    
    