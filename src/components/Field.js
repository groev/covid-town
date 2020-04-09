import React from "react";

export default function Field(field) {
  return (
    <div className={"field " + field.type} x={field.x} y={field.y}>
      {field.children}
    </div>
  );
}
