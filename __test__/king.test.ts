import Chess from "../src/services/Chess";
import Piece, { EMPTY_PIECE } from "../src/services/types/Piece";
import PTYPE from "../src/services/types/PTYPE";
import SIDE from "../src/services/types/SIDE";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  k......K
  ........
  ........
  ........
  ........
  ........
  ........
  ........
  `,
  log: "",
};

var chess: Chess;
var legacyMap: Array<Piece>;

beforeAll(() => {
  chess = new Chess(JSON.stringify(input));
  legacyMap = chess.saveMap();
});
beforeEach(() => chess.loadMapFromMap(legacyMap));

describe("King for each cases", () => {
  test("King moving at the corner", () => {
    expect(chess.availableZone(0)).toEqual([1, 8, 9]);
    expect(chess.availableZone(7)).toEqual([6, 14, 15]);
  });
});

/*
0  1  2  3  4  5  6  7
8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 34 35 36 37 38 39
40 41 42 43 44 45 46 47
48 49 50 51 52 53 54 55
56 57 58 59 60 61 62 63
*/
