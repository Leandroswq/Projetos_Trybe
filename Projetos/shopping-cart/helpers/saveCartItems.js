const saveCartItems = async (element) => {
  // seu código aqui
  const objctItems = element.children;
  const arrayItem = Array.prototype.slice.call(objctItems);
  const items = [];
  arrayItem.forEach((item) => {
    const sku = item.querySelector('span.item__sku');
    items.push(sku.innerText);
  });
  const save = JSON.stringify(items);
  localStorage.setItem('cartItems', save);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
