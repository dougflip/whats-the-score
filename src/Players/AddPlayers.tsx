import React, { FC } from "react";

import { useRoster } from "../use-roster";
import { Players } from "./Players";

export const AddPlayers: FC = () => {
  const { roster, addPlayer, removePlayer } = useRoster();
  return (
    <>
      <h1>Who's playing?</h1>
      <Players
        players={roster}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
      />
    </>
  );
};
