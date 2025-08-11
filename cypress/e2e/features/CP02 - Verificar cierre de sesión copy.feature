Feature: Registro y autenticacion
    
  Scenario: Verificar cierre de sesion del usuario
    Given que ingreso a la pagina de demoblaze
    When hago click en el boton de log in
    And ingreso un nombre de usuario valido previamente registrado
    And ingreso la contraseña correspondiente
    And hago clic en el boton de log in del modal
    And confirmo que aparezca el texto Welcome con el nombre de usuario
    And hago click en el boton de log out
    Then verifico que el texto Welcome desaparece
    And confirmo que vuelve a estar visible el boton log in