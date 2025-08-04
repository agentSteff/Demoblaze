Feature: Operaciones productos del carrito

  Scenario: Visualizacion de precios en pagina principal 
    Given que visito la página principal
    When inicio sesion con credenciales validas
    Then confirmo que todos los productos visibles tienen nombre y precio

