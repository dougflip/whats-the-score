/**
 * A player in the game.
 * This is the main data type we will score against.
 */
export interface Player {
  name: string;
}

/**
 * A list of Player instances for a given game.
 */
export type Roster = Player[];
