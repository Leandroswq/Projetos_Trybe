const data = require('../data/zoo_data');

function countAnimals(animal) {
  // seu código aqui
  const { species } = data;
  if (animal === undefined) {
    const result = {};
    species.forEach((ind) => {
      result[ind.name] = ind.residents.length;
    });
    return result;
  }
  const animals = species.find((specie) => specie.name === animal.specie).residents;
  if (Object.keys(animal).length === 1) {
    return animals.length;
  }
  return animals.filter((ind) => ind.sex === animal.sex).length;
}

module.exports = countAnimals;
