Feature: Registro y autenticacion

  Scenario: Verificar inicio de sesion del usuario
    Given que ingreso a la pagina de demoblaze
    When hago click en el boton de log in
    And ingreso el nombre de usuario registrado
    And ingreso la contraseña correspondiente
    And hago clic en el boton de log in del modal
    Then observo que aparece el mensaje Welcome con el usuario