import React, { FC } from "react";

import { useRoster } from "../roster/use-roster";

export const ScoreKeeperPage: FC = () => {
  const { currentPlayer, playCurrentTurn } = useRoster();

  const handlePlayerClick = () => {
    playCurrentTurn(Math.round(Math.random() * 100));
  };

  return (
    <section>
      <div>
        {currentPlayer.name} <button onClick={handlePlayerClick}>next</button>
      </div>
      <div>
        {currentPlayer.scores.map((x) => (
          <div>{x}</div>
        ))}
      </div>
    </section>
  );
};
