const saveCartItems = (tags) => {
  localStorage.setItem('cartItems', tags);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
