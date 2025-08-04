Feature: Operaciones productos del carrito

  Scenario: Visualizacion de precios en pagina principal 
    Given que visito la página principal
    When inicio sesion con credenciales validas
    Then confirmo que todos los productos visibles tienen nombre y precio

  Scenario: Visualizacion de precio en pagina del producto 
    Given que visito la página principal
    When inicio sesion con credenciales validas
    When hago click en un producto
    Then confirmo que el producto producto tiene nombre y precio