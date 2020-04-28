import React, { FC, FormEvent, useState } from "react";

import { Player } from "./types";

interface PlayersProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
}

const PlayerRow: FC<Player> = (props) => {
  const { name } = props;
  return <div>{name}</div>;
};

export const Players: FC<PlayersProps> = (props) => {
  const { players, onAddPlayer } = props;
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
      <form onSubmit={handleSubmit}>
        <input
          value={newName}
          placeholder="Enter a name..."
          onChange={(e) => setNewName(e.target.value)}
        />
      </form>
      {players.map((p) => (
        <PlayerRow key={p.name} {...p} />
      ))}
    </div>
  );
};
