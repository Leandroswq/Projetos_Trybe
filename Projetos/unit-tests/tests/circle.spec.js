const circle = require('../src/circle');
describe('4 - Implemente os casos de teste para a função `circle`', () => {
  it('Verifica se ao receber um raio, a função `circle` retorna um objeto contendo os valores esperados', () => {
    expect(circle('4')).toBeUndefined();
    expect(circle('s')).toBeUndefined();
    expect(circle(true)).toBeUndefined();
    expect(circle(null)).toBeUndefined();
    expect(circle(undefined)).toBeUndefined();
    expect(typeof circle(3)).toBe('object');
    expect(Object.keys(circle(3)).length).toBe(3);
    expect(circle()).toBeUndefined();
    expect(circle(2).circumference).toBeCloseTo(12.56)
    expect(circle(3).area).toBeCloseTo(28.26)
    expect(circle(3).circumference).toBeCloseTo(18.84)
    expect(circle(3).radius).toBeCloseTo(3)

  });
});
