import React, { FC, useState, ChangeEvent } from "react";

import { Player } from "../types";

interface PlayerCardProps {
  player: Player;
  onSubmitScore: (score: number) => void;
}

export const PlayerCard: FC<PlayerCardProps> = ({ player, onSubmitScore }) => {
  const [score, setScore] = useState<string>("");

  const currentTotalScore = player.scores.reduce((a, b) => a + b, 0);

  const handleScoreInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScore(e.target.value);
  };

  const handleScoreSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const scoreAsFloat = parseFloat(score);
    if (Number.isNaN(scoreAsFloat)) {
      return;
    }

    setScore("");
    onSubmitScore(scoreAsFloat);
  };

  return (
    <div>
      {player.name}: {currentTotalScore}
      <form onSubmit={handleScoreSubmit}>
        <input
          className="player-card-score"
          type="number"
          value={score}
          onChange={handleScoreInputChange}
          placeholder="this round's score"
        />
      </form>
    </div>
  );
};
