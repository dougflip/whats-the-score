import React, { FC } from "react";

import { useGame } from "../lib/use-game";
import { PlayerCard } from "./player-card";

export const ScoreKeeperPage: FC = () => {
  const { currentPlayer, playCurrentTurn } = useGame();

  const handleSubmitScore = (score: number) => {
    playCurrentTurn(score);
  };

  return (
    <section>
      <PlayerCard player={currentPlayer} onSubmitScore={handleSubmitScore} />
    </section>
  );
};
