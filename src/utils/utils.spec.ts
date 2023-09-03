import {
  MAZE,
  MAZE2,
  parseMaze,
  isArrowKey,
  getNextPosition,
  isValidPosition,
  getWayToEnd,
  getCoordinatesWeightBoard,
} from "./index";
import { Coordinate } from "../types";

describe("Maze Utils", () => {
  describe("parseMaze", () => {
    it("should parse a maze string into a Maze object", () => {
      const maze = parseMaze(MAZE);
      expect(maze).toEqual(
        expect.objectContaining({
          board: expect.any(Array),
          start: expect.any(Object),
          end: expect.any(Object),
        })
      );
    });

    it("should correctly parse the start and end coordinates", () => {
      const maze = parseMaze(MAZE);
      expect(maze.start).toEqual({ x: 1, y: 0 });
      expect(maze.end).toEqual({ x: 11, y: 10 });
    });
  });

  describe("isArrowKey", () => {
    it("should return true for valid arrow keys", () => {
      expect(isArrowKey("ArrowUp")).toBe(true);
      expect(isArrowKey("ArrowDown")).toBe(true);
      expect(isArrowKey("ArrowLeft")).toBe(true);
      expect(isArrowKey("ArrowRight")).toBe(true);
    });

    it("should return false for other keys", () => {
      expect(isArrowKey("Enter")).toBe(false);
      expect(isArrowKey("Space")).toBe(false);
      expect(isArrowKey("a")).toBe(false);
    });
  });

  describe("getNextPosition", () => {
    it("should return the correct next position for ArrowUp", () => {
      const position: Coordinate = { x: 2, y: 3 };
      expect(getNextPosition("ArrowUp", position)).toEqual({ x: 2, y: 2 });
    });

    it("should return the correct next position for ArrowDown", () => {
      const position: Coordinate = { x: 2, y: 3 };
      expect(getNextPosition("ArrowDown", position)).toEqual({ x: 2, y: 4 });
    });

    it("should return the correct next position for ArrowLeft", () => {
      const position: Coordinate = { x: 2, y: 3 };
      expect(getNextPosition("ArrowLeft", position)).toEqual({ x: 1, y: 3 });
    });

    it("should return the correct next position for ArrowRight", () => {
      const position: Coordinate = { x: 2, y: 3 };
      expect(getNextPosition("ArrowRight", position)).toEqual({ x: 3, y: 3 });
    });

    it("should return the same position for an invalid key", () => {
      const position: Coordinate = { x: 2, y: 3 };
      expect(getNextPosition("Enter", position)).toEqual(position);
    });
  });

  describe("isValidPosition", () => {
    const board = parseMaze(MAZE).board;

    it("should return true for a valid position", () => {
      expect(isValidPosition(board, { x: 1, y: 0 })).toBe(true);
    });

    it("should return false for an invalid position", () => {
      expect(isValidPosition(board, { x: -1, y: 0 })).toBe(false);
      expect(isValidPosition(board, { x: 1, y: -1 })).toBe(false);
      expect(isValidPosition(board, { x: 20, y: 0 })).toBe(false);
      expect(isValidPosition(board, { x: 1, y: 20 })).toBe(false);
      expect(isValidPosition(board, { x: 5, y: 5 })).toBe(false);
    });
  });

  describe("getWayToEnd", () => {
    const board = parseMaze(MAZE).board;
    const start = parseMaze(MAZE).start;
    const end = parseMaze(MAZE).end;

    it("should return an array of coordinates for a valid path", () => {
      const path = getWayToEnd(board, start, end);
      expect(path).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number),
          }),
        ])
      );
    });

    it("should return null for an invalid path", () => {
      const invalidEnd = { x: 10, y: 2 };
      const path = getWayToEnd(board, start, invalidEnd);
      expect(path).toBe(null);
    });
  });

  describe("getCoordinatesWeightBoard", () => {
    const board = parseMaze(MAZE2).board;
    const end = parseMaze(MAZE2).end;

    it("should return an array of coordinates for a valid path", () => {
      const path = getCoordinatesWeightBoard(board, end);
      expect(path).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            x: expect.any(Number),
            y: expect.any(Number),
          }),
        ])
      );
    });
  });
});
