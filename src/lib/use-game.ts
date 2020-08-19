import { useRecoilState, useRecoilValue } from "recoil";

import { Player, Roster } from "../types";
import { addPlayer, removePlayer, playTurn, reorderPlayer } from "./game-logic";
import {
  rosterState,
  currentPlayerIndexState,
  currentPlayerState,
} from "./game-state";

export interface UseRosterResult {
  roster: Roster;
  currentPlayer: Player;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  reorderPlayer: (currentIndex: number, destinationIndex: number) => void;
  playCurrentTurn: (score: number) => void;
}

/**
 * Hook that makes updating and playing the current game easy for components.
 * This will track the roster and current player for you as well as
 * provide a function to easily play (record a score) the current turn.
 */
export function useGame(): UseRosterResult {
  const [roster, setRoster] = useRecoilState(rosterState);
  const [currentPlayerIndex, setCurrentPlayer] = useRecoilState(
    currentPlayerIndexState
  );
  const currentPlayer = useRecoilValue(currentPlayerState);

  return {
    roster,
    currentPlayer,
    addPlayer(name: string) {
      setRoster(addPlayer(name, roster));
    },
    removePlayer(name: string) {
      setRoster(removePlayer(name, roster));
    },
    reorderPlayer(currentIndex: number, destinationIndex: number) {
      setRoster(reorderPlayer(currentIndex, destinationIndex, roster));
    },
    playCurrentTurn(score: number) {
      const [nextRoster, nextPlayerIndex] = playTurn(
        score,
        currentPlayerIndex,
        roster
      );
      setRoster(nextRoster);
      setCurrentPlayer(nextPlayerIndex);
    },
  };
}
