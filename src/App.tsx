import React from "react";

import { useRoster } from "./use-roster";
import { Players } from "./Players/Players";

import "./App.css";

function App() {
  const { roster, addPlayer, removePlayer } = useRoster();
  return (
    <div className="app">
      <h1>Input your player roster</h1>
      <Players
        players={roster}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
      />
    </div>
  );
}

export default App;
