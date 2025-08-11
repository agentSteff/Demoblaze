Feature: Operaciones productos del carrito
    
  Scenario: Verificar gestion del carrito de compras
    Given que ingreso a la pagina de demoblaze
    When localizo un producto disponible en la pagina principal
    And hago clic sobre el nombre del producto para abrir su detalle
    And hago clic en el boton Add to cart
    And observo que aparece mensaje emergente confirmando que el producto fue agregado
    And hago clic en el boton Cart para ir al carrito
    And confirmo que el producto agregado aparece en la tabla del carrito
    And hago clic en el enlace Delete del producto
    Then verifico que el producto desaparece de la lista
    And verifico que el Total se actualiza correctamente