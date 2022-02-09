const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const animalId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const specie = data.species.find((animal) => animal.id === animalId);
  const animal = specie.residents.reduce((ind, curr) => {
    const oldest = ind.age > curr.age ? ind : curr;
    return oldest;
  });

  return [animal.name, animal.sex, animal.age];
}

module.exports = getOldestFromFirstSpecies;
