const createStudent = (name) => {
  const result = {
    name,
    feedback: () => 'Eita pessoa boa!',
  };
  return result;
};

module.exports = createStudent;
