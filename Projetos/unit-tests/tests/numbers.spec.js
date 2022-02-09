const numbers = require('../src/numbers');
describe('2 - Implemente os casos de teste para a função `numbers`', () => {
  it('Verifica se a função `numbers`retorna `true` quando o array contém apenas numeros e falso caso contrário', () => {

    expect(numbers([1, 2, 3, 4, 5])).toBeTruthy();

    expect(numbers([1, 2, '3', 4, 5])).not.toBeTruthy();

    expect(numbers([1, 'a', 3])).not.toBeTruthy();

    expect(numbers([' '])).not.toBeTruthy();
  });
});
