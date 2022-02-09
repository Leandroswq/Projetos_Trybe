const data = require('../data/zoo_data');

function countEntrants(entrants) {
  // seu código aqui
  return {
    child: entrants.filter((person) => person.age < 18).length,
    adult: entrants.filter((person) => person.age >= 18 && person.age < 50).length,
    senior: entrants.filter((person) => person.age >= 50).length,
  };
}

function calculateEntry(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;
  if (Object.values(entrants).length === 0) return 0;
  const people = countEntrants(entrants);
  console.log(people);
  let result = 0.0;
  Object.keys(people).forEach((item) => {
    result += people[item] * data.prices[item];
  });
  return result;
}

module.exports = { calculateEntry, countEntrants };
