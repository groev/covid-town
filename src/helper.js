// Select Random Array Value
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// Select Random Number

function randomNumber(number) {
  const random = Math.ceil(Math.random() * number);
  return random;
}

function createPeople() {
  const people = [];
  for (let i = 1; i <= 60; i++) {
    const person = {
      sick: false,
      tested: false,
      gender: ["male", "female"].sample(),
      age: [1, 2, 3].sample(),
      preConditions: [1, 2, 3].sample(),
      cough: [1, 0, 0, 0, 0].sample(),
      sickDays: 0,
      dead: false,
      hospitalized: 0,
      immune: false,
      x: randomNumber(10),
      y: randomNumber(10),
    };
    if (
      !people.find((find) => {
        return find.x === person.x && find.y === person.y;
      })
    ) {
      if (i === 1) {
        person.sick = true;
        person.sickDays = 1;
      }
      people.push(person);
    } else {
      i--;
    }
  }
  return people;
}

function createFields() {
  const fields = [];
  for (let i = 1; i <= 10; i++) {
    for (let c = 1; c <= 10; c++) {
      const field = { x: c, y: i, type: "base" };
      fields.push(field);
    }
  }
  for (let i = 1; i <= 5; i++) {
    const field = { x: i, y: 11, type: "hospital" };
    fields.push(field);
  }
  return fields;
}

export { createPeople, createFields };
