const orderFunction = (food, array) => {
  array.push(food);
};

const createMenu = (object) => {
  const menu = {
    fetchMenu: () => object,
    consumption: [],
  };
  menu.order = (food) => {
    orderFunction(food, menu.consumption);
  };
  menu.pay = () => {
    let sum = 0;
    menu.consumption.forEach((element) => {
      if (menu.fetchMenu().food[element] !== undefined) {
        sum += menu.fetchMenu().food[element];
      } else {
        sum += menu.fetchMenu().drink[element];
      }
    });
    return sum * 1.1;
  };
  return menu;
};

module.exports = createMenu;
