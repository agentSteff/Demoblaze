Feature: Autenticación del usuario

  Scenario: Registro exitoso
    Given que visito la página principal
    When voy a la pagina de registro
    And agrego lo detalles del registro
    Then muestra mensaje de confirmacion

  Scenario: Inicia sesion y cierra sesion exitosamente
    Given que visito la página principal
    When inicio sesion con credenciales validas
    Then deberia ver mi usuario en la pagina
    When hago click en cerrar sesion
    Then espero que se pueda iniciar sesion de nuevo