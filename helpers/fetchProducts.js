const fetchProducts = async (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  
  try {
    const response = await fetch(url);
    const json = response.json();
    return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
