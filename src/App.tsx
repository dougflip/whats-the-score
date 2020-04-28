import React, { useState } from "react";

import { Roster } from "./types";
import { Players } from "./Players/Players";

import "./App.css";

function App() {
  const [roster, setRoster] = useState<Roster>([]);
  const handleAddPlayer = (name: string) => {
    setRoster([...roster, { name }]);
  };
  const handleRemovePlayer = (nameToRemove: string) => {
    setRoster(roster.filter(({ name }) => name !== nameToRemove));
  };
  return (
    <div className="app">
      <h1>Input your player roster</h1>
      <Players
        players={roster}
        onAddPlayer={handleAddPlayer}
        onRemovePlayer={handleRemovePlayer}
      />
    </div>
  );
}

export default App;
