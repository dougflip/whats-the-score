import React, { FC } from "react";

import { useRoster } from "./use-roster";
import { RosterList } from "./roster-list";

export interface RosterPageProps {
  onSubmitRoster: () => void;
}

export const RosterPage: FC<RosterPageProps> = ({ onSubmitRoster }) => {
  const { roster, addPlayer, removePlayer } = useRoster();
  return (
    <>
      <h1>Who's playing?</h1>
      <RosterList
        players={roster}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
      />
      <button onClick={onSubmitRoster}>Let's play!</button>
    </>
  );
};
