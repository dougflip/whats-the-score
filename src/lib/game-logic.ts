/**
 * Pure functions that manage the roster and game play.
 */
import { Roster, Player } from "../types";

interface GameState {
  roster: Roster,
  currentPlayer: number,
}

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

function isWithinBounds<T>(index: number, array: T[]): boolean {
  return !(index < 0 || index >= array.length);
}

/**
 * Reorders a player in the roster.
 * Can be used as a function to handle the result of a drag and drop.
 * https://codesandbox.io/s/k260nyxq9v?file=/index.js:423-568
 *
 * If either index is out of bounds of the provided roster
 * then we return the roster unchanged.
 */
export function reorderPlayer(
  currentIndex: number,
  destinationIndex: number,
  roster: Roster
): Roster {
  if (
    !isWithinBounds(currentIndex, roster) ||
    !isWithinBounds(destinationIndex, roster)
  ) {
    return roster;
  }
  const result = Array.from(roster);
  const [removed] = result.splice(currentIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
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
): GameState {
  const player = roster[playerIndex];
  const newRoster = replaceItemAtIndex(
    roster,
    playerIndex,
    scorePlayer(player, score)
  );
  return {
    roster: newRoster,
    currentPlayer: getNextIndex(playerIndex, roster),
  };
}
