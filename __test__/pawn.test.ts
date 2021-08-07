import Chess from "../src/services/Chess";
import Piece from "../src/services/types/Piece";
import PTYPE from "../src/services/types/PTYPE";
import SIDE from "../src/services/types/SIDE";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  .......k
  pppppppp
  ......B.
  ........
  ........
  .....b..
  PPPPPPPP
  .......K
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

describe("Pawn for each case", () => {
  test("pawn move", () => {
    expect(chess.availableZone(8)).toEqual([16, 24]);
    expect(chess.availableZone(9)).toEqual([17, 25]);
    expect(chess.availableZone(48)).toEqual([32, 40]);
    expect(chess.availableZone(49)).toEqual([33, 41]);
  });
  test("pawn attack a opponent", () => {
    expect(chess.availableZone(13)).toEqual([21, 22, 29]);
    expect(chess.availableZone(14)).toEqual([]);

    expect(chess.availableZone(52)).toEqual([36, 44, 45]);
    expect(chess.availableZone(53)).toEqual([]);
    expect(chess.availableZone(54)).toEqual([45]);
  });
  test("almost there", () => {
    const map = `
      .......k
      ........
      ..P......
      ........
      ........
      ..p.....
      ........
      .......K
      `;
    chess.loadMapFromString(map);
    chess.move(18, 10);
    chess.move(42, 50);
  });

  // TODO: Promotion
});
/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21"22"23
24 25 26 27 28 29 30 31
32 33 34 35 36 37 38 39
40 41 42 43 44"45" 46 47
48 49 50 51 52 53 54 55
56 57 58 59 60 61 62 63
*/
