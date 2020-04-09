import React, { useState, useEffect } from "react";
import { createPeople, createFields } from "../helper";
import { Field, Person } from "./";

export default function Game() {
  const [people, setPeople] = useState([]);
  const [fields, setFields] = useState([]);
  const [selected, setSelected] = useState(false);
  const [sickcount, setSickCount] = useState(1);
  const [round, setRound] = useState(1);
  const [moves, setMoves] = useState(3);

  useEffect(() => {
    setFields(createFields());
    setPeople(createPeople());
  }, []);
  useEffect(() => {}, [people]);
  function infectPeople() {
    const sickpeople = people.filter((person) => {
      return person.sick;
    });
    sickpeople.forEach((sickperson) => {
      for (let i = -1; i <= 1; i++) {
        for (let c = -1; c <= 1; c++) {
          if (i == 0 && c == 0) {
          } else {
            const coordinates = { x: sickperson.x + i, y: sickperson.y + c };
            const target = people.findIndex((person) => {
              return (
                person.x === coordinates.x &&
                person.y === coordinates.y &&
                !person.immune
              );
            });
            if (target > -1) {
              setPeople((people) => {
                people[target].sick = true;
                return [...people];
              });
            }
          }
        }
      }
    });
    const newlySick = people.filter((person) => {
      return person.sick & !person.dead;
    });
    setSickCount(newlySick.length);
  }
  function getSicker() {
    const sickpeople = people.filter((person) => {
      return person.sick && !person.dead;
    });

    sickpeople.forEach((sickperson) => {
      const personIndex = people.indexOf(sickperson);
      const newDays = sickperson.sickDays + 1;

      setPeople((people) => {
        if (
          !sickperson.hospitalized &&
          newDays > 10 &&
          sickperson.preConditions === 3
        ) {
          people[personIndex].dead = true;
        }
        if (newDays > 8 && sickperson.preConditions === 1) {
          people[personIndex].sick = false;
          people[personIndex].immune = true;
        }
        if (newDays > 16 && sickperson.preConditions === 2) {
          people[personIndex].sick = false;
          people[personIndex].immune = true;
        }
        if (sickperson.hospitalized > 0) {
          people[personIndex].hospitalized += 1;
          console.log(people[personIndex]);
        }

        if (sickperson.hospitalized > 10) {
          people[personIndex].sick = false;
          people[personIndex].immune = true;
        }

        if (people[personIndex].sick) {
          people[personIndex].sickDays = newDays;
        }

        return [...people];
      });
    });
  }
  function nextRound(e) {
    if (sickcount === 0) {
      const deadCount = people.filter((person) => person.dead).length;
      alert(
        "Game finished, people are dead or healthy! You let " +
          deadCount +
          " people die."
      );
    }
    e.preventDefault();
    setRound(round + 1);
    setMoves(3);
    infectPeople();
    setSelected(false);
    getSicker();
  }
  function selectPerson(person) {
    setSelected(person);
  }
  function movePerson(coordinates) {
    if (moves === 0) {
      alert("No moves left.");
      setSelected(false);

      return;
    }
    const target = people.findIndex((person) => {
      return person.x === selected.x && person.y === selected.y;
    });
    const field = fields.find(
      (field) => coordinates.x === field.x && field.y === coordinates.y
    );

    setPeople((people) => {
      if (field.type === "hospital") {
        people[target].hospitalized = 1;
      } else {
        people[target].hospitalized = 0;
      }
      people[target].x = coordinates.x;
      people[target].y = coordinates.y;
      console.log(people[target]);
      return [...people];
    });
    setSelected(false);
    setMoves(moves - 1);
  }

  function testPerson(person) {
    if (moves === 0) {
      alert("No moves left.");
      setSelected(false);
      return;
    }

    if (person.sick) {
      alert("This person is sick");
      setSelected(false);

      setMoves(moves - 1);
    } else {
      alert("This person is healthy");
      setSelected(false);

      setMoves(moves - 1);
    }
  }

  return (
    <main id="Game">
      <div className="inner">
        <button onClick={(e) => nextRound(e)}>Next round</button>
        {selected ? (
          <button className="test" onClick={() => testPerson(selected)}>
            Test person
          </button>
        ) : (
          ""
        )}
        <div>Round: {round}</div>
        <div>Sick people: {sickcount}</div>
        <div>Dead people: {people.filter((person) => person.dead).length}</div>
        <div>Moves left: {moves}</div>

        <div className="fieldmap">
          {fields.map((field, idx) => {
            const person = people.find((person) => {
              return person.x === field.x && person.y === field.y;
            });

            return (
              <Field {...field} key={idx}>
                {person ? (
                  <Person
                    select={selectPerson}
                    data={person}
                    selected={selected === person ? true : false}
                  />
                ) : (
                  ""
                )}
                {!person && selected ? (
                  <div
                    onClick={(e) => movePerson({ x: field.x, y: field.y })}
                    className="move"
                  ></div>
                ) : (
                  ""
                )}
              </Field>
            );
          })}
        </div>
      </div>
    </main>
  );
}
