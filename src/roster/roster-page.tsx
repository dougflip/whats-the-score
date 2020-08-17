import React, { FC } from "react";

import { useRoster } from "./use-roster";
import { RosterList } from "./roster-list";

export const RosterPage: FC = () => {
  const { roster, addPlayer, removePlayer } = useRoster();
  return (
    <>
      <h1>Who's playing?</h1>
      <RosterList
        players={roster}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
      />
    </>
  );
};
