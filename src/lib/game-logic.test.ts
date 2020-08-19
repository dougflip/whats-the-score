import { Roster } from "../types";
import { reorderPlayer } from "./game-logic";

const getSampleRoster = () => [
  { name: "Doug", scores: [] },
  { name: "Dave", scores: [] },
  { name: "Aaron", scores: [] },
];

const getNames = (roster: Roster): string[] => roster.map((x) => x.name);

describe("game-logic", () => {
  describe("reorderPlayer", () => {
    it("moves the last player to the first of the list", () => {
      const result = reorderPlayer(2, 0, getSampleRoster());
      expect(getNames(result)).toMatchInlineSnapshot(`
        Array [
          "Aaron",
          "Doug",
          "Dave",
        ]
      `);
    });

    it("moves the first player to the end of the list", () => {
      const result = reorderPlayer(0, 2, getSampleRoster());
      expect(getNames(result)).toMatchInlineSnapshot(`
        Array [
          "Dave",
          "Aaron",
          "Doug",
        ]
      `);
    });

    it("moves the second player to the start of the list", () => {
      const result = reorderPlayer(1, 0, getSampleRoster());
      expect(getNames(result)).toMatchInlineSnapshot(`
        Array [
          "Dave",
          "Doug",
          "Aaron",
        ]
      `);
    });

    it("moves no players if the current index is out of bounds", () => {
      const result = reorderPlayer(10, 0, getSampleRoster());
      expect(getNames(result)).toMatchInlineSnapshot(`
        Array [
          "Doug",
          "Dave",
          "Aaron",
        ]
      `);
    });

    it("moves no players if the current index is out of bounds", () => {
      const result = reorderPlayer(0, 10, getSampleRoster());
      expect(getNames(result)).toMatchInlineSnapshot(`
        Array [
          "Doug",
          "Dave",
          "Aaron",
        ]
      `);
    });
  });
});
