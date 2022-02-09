const data = require('../data/zoo_data');

const { species } = data;
const regions = ['NE', 'NW', 'SE', 'SW'];

function filterMapBySex(options, unfilteredMap) {
  const map = unfilteredMap;
  regions.forEach((region) => {
    map[region] = map[region].map((specie) => {
      const mapAux = {
        [specie.name]: specie.residents.filter((sex) => {
          const filtered = ((options.sex !== undefined) ? options.sex === sex.sex : true);
          return filtered;
        }),
      };
      return mapAux;
    });
  });
  return map;
}

function includeNames(mapUnincludedNames) {
  const map = mapUnincludedNames;
  regions.forEach((region) => {
    map[region].forEach((item, index) => {
      const specie = Object.keys(item)[0];
      map[region][index][specie] = item[specie].map((value) => value.name);
    });
  });
  return map;
}

function sortMap(mapUnsorted) {
  const map = mapUnsorted;
  regions.forEach((region) => {
    map[region].forEach((item, index) => {
      const specie = Object.keys(item)[0];
      map[region][index][specie] = item[specie].sort();
    });
  });
  return map;
}
function getAnimalMap(options) {
  // seu código aqui
  let map = {};
  regions.forEach((item) => {
    map[item] = species.filter((value) => value.location === item);
  });

  if (options === undefined || options.includeNames === undefined) {
    Object.keys(map).forEach((item) => {
      map[item] = map[item].map((animalName) => animalName.name);
    });
  } else {
    map = filterMapBySex(options, map);
    map = includeNames(map);
    if (options.sorted === true) map = sortMap(map);
  }

  return map;
}

module.exports = getAnimalMap;
