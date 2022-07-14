const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('with the "<ol><li>Item</li></ol>" argument, the localStorage.setItem method is called', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('with the "<ol><li>Item</li></ol>" argument, the localStorage.setItem method is called with two parameters, "cartitems" and the value passed to "saveCartItem"', () => {
    const arg = '<ol><li>Item</li></ol>'
    saveCartItems(arg);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', arg);
  });
});
