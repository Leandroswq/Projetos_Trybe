const createMenu = require('../src/restaurant');

describe('10 - Implemente os casos de teste e a função `createMenu`', () => {
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    let objectTest = { food: { coxinha: 3.9, sopa: 9.9 }, drink: { agua: 3.9, cerveja: 6.9 } };
    let menu = createMenu(objectTest);
    let fetchMenu = menu.fetchMenu();

    expect(typeof menu).toBe('object');
    expect(typeof menu.fetchMenu).toBe('function');

    expect(typeof fetchMenu).toBe('object');
    expect(Object.keys(fetchMenu)).toEqual(['food', 'drink']);

    expect(fetchMenu).toEqual(objectTest);

    menu.order('coxinha')
    expect(menu.consumption).toEqual(['coxinha']);

    menu.order('agua');
    menu.order('sopa');
    menu.order('sashimi');
    let consumption = menu.consumption;

    expect(consumption).toEqual(expect.arrayContaining(['coxinha']));

    expect(consumption).toEqual(expect.arrayContaining(['agua']));

    expect(consumption).toEqual(expect.arrayContaining(['sopa']));

    expect(consumption).toEqual(expect.arrayContaining(['sashimi']));

    expect(consumption).toEqual(["coxinha", "agua", "sopa", "sashimi"]);

    menu = createMenu(objectTest);
    fetchMenu = menu.fetchMenu();
    consumption = menu.consumption;

    menu.order('coxinha')
    menu.order('agua')
    menu.order('coxinha')

    expect(consumption).toEqual(['coxinha', 'agua', 'coxinha'])

    expect(menu.pay()).toBeCloseTo(12.87)
  });
});
