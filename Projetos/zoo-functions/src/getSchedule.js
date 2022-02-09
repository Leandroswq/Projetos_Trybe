const data = require('../data/zoo_data');

function creatBasicSchedule() {
  const schedule = { ...data.hours };
  const daysName = Object.keys(data.hours);
  daysName.forEach((day) => {
    schedule[day] = {
      officeHour: `Open from ${schedule[day].open}am until ${schedule[day].close}pm`,
      exhibition: data.species.filter((specie) => specie.availability.some((value) => {
        const bool = value === day;
        return bool;
      })).map((specie) => specie.name),
    };
  });
  schedule.Monday = { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
  return schedule;
}

function getSchedule(scheduleTarget) {
  // seu código aqui
  const schedule = creatBasicSchedule();
  if (Object.keys(schedule).some((day) => day === scheduleTarget)) {
    return { [scheduleTarget]: schedule[scheduleTarget] };
  }
  if (data.species.some((animal) => animal.name === scheduleTarget)) {
    return data.species.find((animal) => animal.name === scheduleTarget).availability;
  }
  return schedule;
}

module.exports = getSchedule;
