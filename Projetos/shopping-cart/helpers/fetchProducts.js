const fetchProducts = async (item) => {
  // seu código aqui
  if (item === undefined) {
    throw new Error('You must provide an url');
  }
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q='.concat(item);
  const products = await fetch(url);
  const data = await products.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
