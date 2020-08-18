import React, { FC, useState } from "react";

import { useRoster } from "../roster/use-roster";

export const ScoreKeeperPage: FC = () => {
  const { roster, playTurn } = useRoster();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

  const player = roster[currentPlayerIndex];

  const handlePlayerClick = () => {
    playTurn(currentPlayerIndex, Math.round(Math.random() * 100));
    const nextIndex =
      currentPlayerIndex >= roster.length - 1 ? 0 : currentPlayerIndex + 1;
    setCurrentPlayerIndex(nextIndex);
  };

  return (
    <section>
      <div>
        {player.name} <button onClick={handlePlayerClick}>next</button>
      </div>
      <div>
        {player.scores.map((x) => (
          <div>{x}</div>
        ))}
      </div>
    </section>
  );
};
