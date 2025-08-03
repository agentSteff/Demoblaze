Feature: Operaciones productos del carrito

  Scenario: Agregar productos al carrito 
    Given que visito la página principal
    When  inicio sesion con credenciales validas
    When agrego un producto al carrito
    Then veo el producto en el carrito
    
  Scenario: Eliminar productos del carrito 
    Given que visito la página principal
    When inicio sesion con credenciales validas
    When agrego un producto al carrito
    Then veo el producto en el carrito
    When elimino un producto del carrito
    Then el carrito deberia estar vacio

  Scenario: Successful purchase
      Given que visito la página principal
      When inicio sesion con credenciales validas
      When agrego un producto al carrito
      Then veo el producto en el carrito
      When procedo a realizar al compra 
      Then verifico un mensaje de confirmacion