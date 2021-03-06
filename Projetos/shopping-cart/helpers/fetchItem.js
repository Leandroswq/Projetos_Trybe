const fetchItem = async (id) => {
  // seu código aqui
  if (id === undefined) {
    throw new Error('You must provide an url');
  }
  const url = 'https://api.mercadolibre.com/items/'.concat(id);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
