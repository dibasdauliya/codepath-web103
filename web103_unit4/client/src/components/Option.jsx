import React from "react";

export default function Option({ emoji, findOptionColor, car, type }) {
  return (
    <p>
      <strong>
        {emoji} {type}:
      </strong>{" "}
      {findOptionColor(car, type)}
    </p>
  );
}
