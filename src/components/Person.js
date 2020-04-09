import React from "react";

export default function Person(props) {
  const person = props.data;
  let personclass = "person " + person.gender + " age-" + person.age;
  if (person.sick && person.sickDays > 2) {
    personclass += " sick";
    personclass += " cough cough-2";
  }
  if (person.sick && person.sickDays > 5) {
    personclass += " cough-3";
  }
  if (person.tested) {
    personclass += " tested";
  }
  if (!person.sick & person.cough) {
    personclass += " cough";
  }
  if (props.selected) {
    personclass += " selected";
  }
  if (person.dead) {
    personclass += " dead";
  }
  return (
    <div
      onClick={(e) => props.select(person)}
      x={person.x}
      y={person.y}
      className={personclass}
    >
      <div className="status"></div>
    </div>
  );
}
