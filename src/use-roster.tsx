import { useState } from "react";
import { Roster } from "./types";

export interface UseRosterResult {
  roster: Roster;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
}

export function useRoster(): UseRosterResult {
  const [roster, setRoster] = useState<Roster>([]);
  const addPlayer = (name: string) => {
    setRoster([...roster, { name }]);
  };
  const removePlayer = (nameToRemove: string) => {
    setRoster(roster.filter(({ name }) => name !== nameToRemove));
  };

  return { roster, addPlayer, removePlayer };
}
