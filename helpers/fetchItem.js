const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  try {
    const response = await fetch(url);
    const products = await response.json();
    return products;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
