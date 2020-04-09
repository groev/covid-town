import React from "react";
import "./App.scss";
import { Start, Game } from "./components";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact render={() => <Start />} />
      <Route path="/game" exact render={() => <Game />} />
    </div>
  );
}

export default App;
