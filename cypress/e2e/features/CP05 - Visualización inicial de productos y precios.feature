Feature: Visualización inicial de productos y precios

  Scenario: Verificar visualizacion de productos en pagina principal
    Given que ingreso a la pagina de demoblaze
    When espero a que la pagina principal cargue completamente
    And verifico que se muestran al menos 9 productos en la seccion principal
    Then confirmo que cada producto visible tiene nombre claramente legible
    And confirmo que cada producto visible tiene imagen correspondiente
    And confirmo que cada producto visible tiene precio con simbolo de dolar