import { atom, useRecoilState } from "recoil";

import { Roster } from "./types";

const rosterState = atom<Roster>({ key: "roster-state", default: [] });

export interface UseRosterResult {
  roster: Roster;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
}

export function useRoster(): UseRosterResult {
  const [roster, setRoster] = useRecoilState(rosterState);
  const addPlayer = (name: string) => {
    setRoster([...roster, { name }]);
  };
  const removePlayer = (nameToRemove: string) => {
    setRoster(roster.filter(({ name }) => name !== nameToRemove));
  };

  return { roster, addPlayer, removePlayer };
}
