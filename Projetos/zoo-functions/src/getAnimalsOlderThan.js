const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const animals = data.species.find((specie) => specie.name === animal).residents;
  if (animals.find((ind) => ind.age < age) !== undefined) {
    return false;
  }
  return true;
}

module.exports = getAnimalsOlderThan;
