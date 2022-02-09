const data = require('../data/zoo_data');

function creatEmployeesCoverage() {
  const people = data.employees.map(((employee) => ({
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: data.species.reduce((acc, curr) => {
      if (employee.responsibleFor.find((value) => value === curr.id)) {
        acc.push(curr.name);
      }
      return acc;
    }, []),
    locations: data.species.reduce((acc, curr) => {
      if (employee.responsibleFor.find((value) => value === curr.id)) {
        acc.push(curr.location);
      }
      return acc;
    }, []),
  })));
  return people;
}

function filterCoverage(coverage, people) {
  const id = people.find((person) => person.id === coverage.id);
  let fullName = data.employees.find((person) => person.firstName === coverage.name
    || person.lastName === coverage.name);
  if (id) return id;
  if (fullName) {
    fullName = `${fullName.firstName} ${fullName.lastName}`;
    return people.find((person) => person.fullName === fullName);
  }
  if (id === undefined) throw new Error('Informações inválidas');
}

function getEmployeesCoverage(coverage) {
  // seu código aqui
  if (coverage === undefined) return creatEmployeesCoverage();
  if (typeof coverage === 'object') {
    const filteredCoverage = filterCoverage(coverage, creatEmployeesCoverage());
    return filteredCoverage;
  }
}

console.log(getEmployeesCoverage({ name: 'Sharonda' }));

module.exports = getEmployeesCoverage;
