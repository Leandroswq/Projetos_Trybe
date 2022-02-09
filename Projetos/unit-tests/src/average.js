const numbers = require('./numbers');

const average = (arrayNumbers) => {
  let sum = 0;
  let index = 0;
  let result = null;
  if (arrayNumbers.length === 0 || numbers(arrayNumbers) === false) {
    return undefined;
  }
  for (index; index < arrayNumbers.length; index += 1) {
    sum += arrayNumbers[index];
  }
  result = Math.round(sum / (index));
  return result;
};
module.exports = average;
