/**
 * Contains the "state" of the game itself.
 * These are all of the bits that interface with recoil.
 */
import { atom, selector } from "recoil";

import { Player, Roster } from "../types";

/**
 * Tracks the ordered list of players in the current game.
 */
export const rosterState = atom<Roster>({ key: "rosterState", default: [] });

/**
 * Tracks the index of the current player.
 * It is used to look up the current player in the Roster.
 */
export const currentPlayerIndexState = atom<number>({
  key: "currentPlayerIndexState",
  default: 0,
});

/**
 * Looks up the actual Player in the roster based on the current player index.
 */
export const currentPlayerState = selector<Player>({
  key: "currentPlayerState",
  get({ get }) {
    const roster = get(rosterState);
    const currentIndex = get(currentPlayerIndexState);
    return roster[currentIndex];
  },
});
