import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import { Roster, Player } from "../types";

const rosterState = atom<Roster>({ key: "rosterState", default: [] });
const currentPlayerIndexState = atom<number>({
  key: "currentPlayerIndexState",
  default: 0,
});
const currentPlayerState = selector<Player>({
  key: "currentPlayerState",
  get({ get }) {
    const roster = get(rosterState);
    const currentIndex = get(currentPlayerIndexState);
    return roster[currentIndex];
  },
});

export interface UseRosterResult {
  roster: Roster;
  currentPlayer: Player;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  playCurrentTurn: (score: number) => void;
}

function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function addPlayer(name: string, roster: Roster): Roster {
  return [...roster, { name, scores: [] }];
}

function removePlayer(nameToRemove: string, roster: Roster): Roster {
  return roster.filter(({ name }) => name !== nameToRemove);
}

function scorePlayer(player: Player, score: number): Player {
  return {
    ...player,
    scores: [...player.scores, score],
  };
}

function getNextIndex(playerIndex: number, roster: Roster): number {
  return playerIndex >= roster.length - 1 ? 0 : playerIndex + 1;
}

function playCurrentTurn(
  score: number,
  playerIndex: number,
  roster: Roster
): [Roster, number] {
  const player = roster[playerIndex];
  const newRoster = replaceItemAtIndex(
    roster,
    playerIndex,
    scorePlayer(player, score)
  );
  return [newRoster, getNextIndex(playerIndex, roster)];
}

export function useRoster(): UseRosterResult {
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
    playCurrentTurn(score: number) {
      const [nextRoster, nextPlayerIndex] = playCurrentTurn(
        score,
        currentPlayerIndex,
        roster
      );
      setRoster(nextRoster);
      setCurrentPlayer(nextPlayerIndex);
    },
  };
}
