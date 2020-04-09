import React, { useState, useEffect } from "react";
import { getPersonClass, createPeople, createFields } from "../helper";

export default function Game() {
  const [people, setPeople] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setFields(createFields());
    setPeople(createPeople());
  }, []);
  useEffect(() => {}, [people]);
  function infectPeople() {
    console.log(people);
    const sickpeople = people.filter(person => {
      return person.sick;
    });
    sickpeople.forEach(sickperson => {
      for (let i = -1; i <= 1; i++) {
        for (let c = -1; c <= 1; c++) {
          if (i == 0 && c == 0) {
          } else {
            const coordinates = { x: sickperson.x + i, y: sickperson.y + c };
            const target = people.findIndex(person => {
              return person.x === coordinates.x && person.y === coordinates.y;
            });
            if (target > -1) {
              setPeople(people => {
                people[target].sick = true;
                return [...people];
              });
            }
          }
        }
      }
    });
  }
  function getSicker() {
    console.log(people);
    const sickpeople = people.filter(person => {
      return person.sick;
    });
    sickpeople.forEach(sickperson => {
      const personIndex = people.indexOf(sickperson);
      console.log(personIndex);
      const newDays = sickperson.sickDays + 1;
      setPeople(people => {
        people[personIndex].sickDays = newDays;
        return [...people];
      });
    });
  }
  function nextRound(e) {
    e.preventDefault();
    getSicker();
    infectPeople();
  }
  return (
    <main id="Game">
      <button onClick={e => nextRound(e)}>Nächste Runde</button>
      <div className="fieldmap">
        {fields.map((field, idx) => {
          const person = people.find(person => {
            return person.x === field.x && person.y === field.y;
          });
          let opacity = 1;
          return (
            <div key={idx} className="field" x={field.x} y={field.y}>
              {person ? (
                <div
                  style={
                    person.sick
                      ? { opacity: 1 - person.sickDays / 10 }
                      : { opacity: opacity }
                  }
                  x={person.x}
                  y={person.y}
                  className={getPersonClass(person)}
                ></div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
