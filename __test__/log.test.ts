import Chess from "../src/services/Chess";
import { EMPTY_PIECE, Piece } from "../src/services/Piece";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  pppppppp
  ........
  ........
  ........
  ........
  ........
  ........
  PPPPPPPP
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

describe("Log working test", () => {
  test("Log test 1", () => {
    const resultMap = `
      ....pppp
      pppp....
      ........
      ........
      ........
      ........
      PPPP....
      ....PPPP
    `;
    chess.move(56, 48), chess.move(0, 8);
    chess.move(57, 49), chess.move(1, 9);
    chess.move(58, 50), chess.move(2, 10);
    chess.move(59, 51), chess.move(3, 11);

    expect(chess.saveMapToString()).toEqual(
      resultMap.replaceAll(/\r?\n|\r|\n| /g, "")
    );
  });
});

/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33 34 35 36 *37* 38 39
40 41 42 43 44 45 46 47
48 49 50 51 52 53 54 55
56 57 58 59 60 61 62 63
*/
