import React from "react";
import { Link } from "react-router-dom";

export default function Start() {
  return (
    <main className="start">
      <h2>Welcome to Covid-Town</h2>
      <Link to="/game">Start Game</Link>
    </main>
  );
}
