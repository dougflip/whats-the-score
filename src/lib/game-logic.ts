/**
 * Pure functions that manage the roster and game play.
 */
import { Roster, Player } from "../types";

function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
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

/**
 * Adds a player to the provided roster.
 */
export function addPlayer(name: string, roster: Roster): Roster {
  return [...roster, { name, scores: [] }];
}

/**
 * Removes a player from the provided roster.
 */
export function removePlayer(nameToRemove: string, roster: Roster): Roster {
  return roster.filter(({ name }) => name !== nameToRemove);
}

/**
 * Records a score to the player at the provided index.
 * Returns both the new roster (with score applied) and
 * the index of the next player.
 */
export function playTurn(
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
