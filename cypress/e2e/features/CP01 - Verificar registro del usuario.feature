Feature: Registro y autenticacion

  Scenario: Verificar registro del usuario
    Given que ingreso a la pagina de demoblaze
    When hago click en el boton de sign up
    And ingreso un nombre de usuario que no este registrado
    And ingreso una contraseña valida
    And hago clic en el boton de sign up del modal
    Then se observa mensaje de confirmacion