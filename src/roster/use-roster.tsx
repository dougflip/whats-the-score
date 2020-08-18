import { atom, useRecoilState } from "recoil";

import { Roster } from "../types";

const rosterState = atom<Roster>({ key: "roster-state", default: [] });

export interface UseRosterResult {
  roster: Roster;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  playTurn: (index: number, score: number) => void;
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

function playTurn(index: number, score: number, roster: Roster): Roster {
  const player = roster[index];
  return replaceItemAtIndex(roster, index, {
    ...player,
    scores: [...player.scores, score],
  });
}

export function useRoster(): UseRosterResult {
  const [roster, setRoster] = useRecoilState(rosterState);

  return {
    roster,
    addPlayer(name: string) {
      setRoster(addPlayer(name, roster));
    },
    removePlayer(name: string) {
      setRoster(removePlayer(name, roster));
    },
    playTurn(index: number, score: number) {
      setRoster(playTurn(index, score, roster));
    },
  };
}
