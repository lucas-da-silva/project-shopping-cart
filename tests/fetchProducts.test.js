require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('should be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('with "computador" argument test if fetch was called', async() => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('with "computador" argument test if fetch uses the endpoint', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('with "computador" argument return a data structure equal to the "computerSearch" object', async () => {
    const products = await fetchProducts('computador');
    expect(products).toEqual(computadorSearch);
  });

  it('with no argument, returns an error with the message: "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
