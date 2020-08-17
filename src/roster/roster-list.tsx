import React, { FC, FormEvent, useState } from "react";
import { Roster } from "../types";

import "./roster-list.css";

type RosterListAction = (name: string) => void;

interface RosterListProps {
  players: Roster;
  onAddPlayer: RosterListAction;
  onRemovePlayer: RosterListAction;
}

interface PlayerRowProps {
  name: string;
  onRemovePlayer: RosterListAction;
}

const PlayerRow: FC<PlayerRowProps> = (props) => {
  const { name, onRemovePlayer } = props;
  return (
    <div className="players-player-row">
      <span>{name}</span>
      <button onClick={() => onRemovePlayer(name)}>delete</button>
    </div>
  );
};

export const RosterList: FC<RosterListProps> = (props) => {
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
    <div className="roster-list">
      <form onSubmit={handleSubmit} data-testid="playersAddPlayer">
        <input
          className="roster-list-add-input"
          value={newName}
          placeholder="Enter a name..."
          onChange={(e) => setNewName(e.target.value)}
        />
      </form>
      <div className="roster-list-players">
        {players.map((p) => (
          <PlayerRow key={p.name} onRemovePlayer={onRemovePlayer} {...p} />
        ))}
      </div>
    </div>
  );
};
