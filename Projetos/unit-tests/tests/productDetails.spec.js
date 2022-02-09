const productDetails = require('../src/productDetails');

expect.extend({
  toBeObjectsWithinSameName(received) {
    const productId1 = received[0].details.productId
    const productId2 = received[1].details.productId
    
    if (productId1 === productId2) {
      return {
        message: () =>
          `expected productId1 (${productId1}) != productId2 (${productId2})`,
        pass: true
      }
    } else {
      return {
        message: () =>
          `expected productId1 (${productId1}) === productId2 (${productId2})`,
        pass: false
      };
    }
  }
})

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {

    expect(typeof productDetails).toBe('function');

    expect(Array.isArray(productDetails('Alcool gel', 'Máscara'))).toBeTruthy();

    expect(productDetails('Alcool gel', 'Máscara').length).toBe(2)

    expect(typeof productDetails('Alcool gel', 'Máscara')[0]).toBe('object')
    expect(typeof productDetails('Alcool gel', 'Máscara')[1]).toBe('object')

    expect(productDetails('Alcool gel', 'Máscara')).not.toBeObjectsWithinSameName();

    let pD = productDetails('Alcool gel', 'Máscara');
    let pD0 = /123$/.test(pD[0].details.productId);
    let pD1 = /123$/.test(pD[1].details.productId);
    expect(pD0 && pD1).toBeTruthy();
  });
});
