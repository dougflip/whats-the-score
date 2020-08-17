import { atom, useRecoilState } from "recoil";

import { Roster } from "../types";

const rosterState = atom<Roster>({ key: "roster-state", default: [] });

export interface UseRosterResult {
  roster: Roster;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  addPlayerScore: (index: number, score: number) => void;
}

function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function useRoster(): UseRosterResult {
  const [roster, setRoster] = useRecoilState(rosterState);
  const addPlayer = (name: string) => {
    setRoster([...roster, { name, scores: [] }]);
  };
  const removePlayer = (nameToRemove: string) => {
    setRoster(roster.filter(({ name }) => name !== nameToRemove));
  };
  const addPlayerScore = (index: number, score: number) => {
    const player = roster[index];
    setRoster(
      replaceItemAtIndex(roster, index, {
        ...player,
        scores: [...player.scores, score],
      })
    );
  };

  return { roster, addPlayer, removePlayer, addPlayerScore };
}
