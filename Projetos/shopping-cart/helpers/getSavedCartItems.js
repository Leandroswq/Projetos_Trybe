const getSavedCartItems = () => {
  // seu código aqui
  const itemsId = localStorage.getItem('cartItems');
  if (itemsId === '') { return ''; }
   return itemsId;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
