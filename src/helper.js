function getPersonClass(person) {
  let personclass = "person";
  if (person.sick && person.sickDays > 3) {
    personclass += " sick";
  }
  if (person.tested) {
    personclass += " tested";
  }
  return personclass;
}

function createPeople() {
  const people = [];
  for (let i = 1; i <= 80; i++) {
    const person = {
      sick: false,
      tested: false,
      sickDays: 0,
      x: Math.ceil(Math.random() * 10),
      y: Math.ceil(Math.random() * 10)
    };
    if (people.indexOf(person) < 0) {
      if (i === 1) {
        person.sick = true;
        person.sickDays = 1;
      }
      people.push(person);
    } else {
      i++;
    }
  }
  return people;
}

function createFields() {
  const fields = [];
  for (let i = 1; i <= 10; i++) {
    for (let c = 1; c <= 10; c++) {
      const field = { x: c, y: i };
      fields.push(field);
    }
  }
  return fields;
}

export { getPersonClass, createPeople, createFields };
