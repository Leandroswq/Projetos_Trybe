const calculator = (number1, number2) => {
  let result = {
    sum: Math.trunc(number1 + number2),
    mult: Math.trunc(number1 * number2),
    div: Math.trunc(number1 / number2),
    sub: Math.trunc(number1 - number2),
  };
  return result;
};

const arrayGenerator = (type, object) => {
  if (type === 'keys') {
    return Object.keys(object);
  }
  if (type === 'values') {
    return Object.values(object);
  }
  if (type === 'entries') {
    return Object.entries(object);
  }
};

module.exports = { calculator, arrayGenerator };
