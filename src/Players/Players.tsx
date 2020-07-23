import React, { FC, FormEvent, useState } from "react";
import { Roster } from "../types";

import "./Players.css";

type PlayerAction = (name: string) => void;

interface PlayersProps {
  players: Roster;
  onAddPlayer: PlayerAction;
  onRemovePlayer: PlayerAction;
}

interface PlayerProps {
  name: string;
  onRemovePlayer: PlayerAction;
}

const PlayerRow: FC<PlayerProps> = (props) => {
  const { name, onRemovePlayer } = props;
  return (
    <div className="players-player-row">
      <span>{name}</span>
      <button onClick={() => onRemovePlayer(name)}>delete</button>
    </div>
  );
};

export const Players: FC<PlayersProps> = (props) => {
  const { players, onAddPlayer, onRemovePlayer } = props;
  const [newName, setNewName] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newName) {
      return;
    }

    onAddPlayer(newName);
    setNewName("");
  };
  return (
    <div className="players">
      <form onSubmit={handleSubmit} data-testid="playersAddPlayer">
        <input
          className="players-add-input"
          value={newName}
          placeholder="Enter a name..."
          onChange={(e) => setNewName(e.target.value)}
        />
      </form>
      <div className="players-roster">
        {players.map((p) => (
          <PlayerRow key={p.name} onRemovePlayer={onRemovePlayer} {...p} />
        ))}
      </div>
    </div>
  );
};
