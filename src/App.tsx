import React, { useState } from "react";

import { Player } from "./Players/types";
import { Players } from "./Players/Players";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState<Player[]>([]);
  const handleAddPlayer = (name: string) => {
    setUsers([...users, { name }]);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Players players={users} onAddPlayer={handleAddPlayer} />
      </header>
    </div>
  );
}

export default App;
