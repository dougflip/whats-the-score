import React, { FC } from "react";

import { useGame } from "../lib/use-game";

export const ScoreKeeperPage: FC = () => {
  const { currentPlayer, playCurrentTurn } = useGame();

  const handlePlayerClick = () => {
    playCurrentTurn(Math.round(Math.random() * 100));
  };

  return (
    <section>
      <div>
        {currentPlayer.name} <button onClick={handlePlayerClick}>next</button>
      </div>
      <div>
        {currentPlayer.scores.map((x, i) => (
          <div key={i}>{x}</div>
        ))}
      </div>
    </section>
  );
};
