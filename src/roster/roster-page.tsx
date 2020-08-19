import React, { FC } from "react";

import { useGame } from "../lib/use-game";
import { RosterList } from "./roster-list";

export interface RosterPageProps {
  onSubmitRoster: () => void;
}

export const RosterPage: FC<RosterPageProps> = ({ onSubmitRoster }) => {
  const { roster, addPlayer, removePlayer, reorderPlayer } = useGame();
  return (
    <>
      <h1>Who's playing?</h1>
      <RosterList
        players={roster}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        onReorderPlayer={reorderPlayer}
      />
      <button onClick={onSubmitRoster}>Let's play!</button>
    </>
  );
};
