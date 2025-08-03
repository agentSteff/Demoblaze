Feature: Operaciones productos del carrito

  Scenario: Agregar productos al carrito 
    Given que visito la página principal
    When inicio sesion con credenciales validas
    When agrego un producto al carrito
    Then veo el producto en el carrito

  Scenario: Confirmacion de compra
    Given que visito la página principal
    When inicio sesion con credenciales validas
    When agrego un producto al carrito
    Then veo el producto en el carrito
    When procedo a realizar la compra
    Then verifico un mensaje de confirmacion