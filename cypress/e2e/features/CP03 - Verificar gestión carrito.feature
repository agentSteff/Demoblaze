Feature: Operaciones productos del carrito
    
  Scenario: Agrego y elimino productos del carrito 
    Given que visito la página principal
    When inicio sesion con credenciales validas
    When agrego un producto al carrito
    Then veo el producto en el carrito
    When elimino un producto del carrito
    Then el carrito deberia estar vacio y el total cero