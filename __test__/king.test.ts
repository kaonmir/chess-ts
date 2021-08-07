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
rnbqkbnr
pppppppp
*/
