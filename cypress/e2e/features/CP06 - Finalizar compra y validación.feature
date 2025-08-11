Feature: Operaciones productos del carrito

  Scenario: Verificar proceso completo de compra
    Given que ingreso a la pagina de demoblaze
    When hago click en el boton de log in
    And ingreso el nombre de usuario y contraseña en la ventana modal
    And hago clic en log in
    And confirmo que se muestra el texto Welcome con el nombre de usuario
    And selecciono un producto y hago clic sobre su nombre para abrir detalle
    And hago clic en el boton Add to cart
    And confirmo que aparece alerta indicando que el producto fue agregado
    And hago clic en el boton Cart para acceder al carrito
    And hago clic en el boton Place Order
    And completo todos los campos obligatorios del formulario
    And hago clic en el boton Purchase
    Then verifico que se muestre mensaje de confirmacion Thank you for your purchase
    And verifico que se muestre el detalle de la transaccion