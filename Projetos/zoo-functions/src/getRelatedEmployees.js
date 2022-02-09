const data = require('../data/zoo_data');

function isManager(id) {
  // seu código aqui
  const isUnd = data.employees.find((person) => person.managers.find((manager) => manager === id));
  if (isUnd !== undefined) {
    return true;
  }
  return false;
}

function getRelatedEmployees(managerId) {
  // seu código aqui
  if (isManager(managerId) === true) {
    const arr = data.employees.filter((person) => person.managers.find((manager) => {
      const bool = manager === managerId;
      return bool;
    }));
    return arr.map((person) => `${person.firstName} ${person.lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
