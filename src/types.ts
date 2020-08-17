/**
 * A player in the game.
 * This is the main data type we will score against.
 */
export interface Player {
  name: string;
  scores: number[];
}

/**
 * A list of Player instances for a given game.
 */
export type Roster = Player[];

/**
 * The possible pages of this app.
 * The app will always render 1 of these options.
 */
export enum AppPages {
  Roster = "app-pages-roster",
  ScoreKeeper = "app-pages-score-keeper",
}
