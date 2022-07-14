require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('should be a function', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('with the item argument "MLB1615760527", fetch was called', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('with the item argument "MLB1615760527", fetch uses the endpoint', async () => {
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('with the item argument "MLB1615760527" is a data structure equal to "item"', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  
  it('with no argument returns an error with the message: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
