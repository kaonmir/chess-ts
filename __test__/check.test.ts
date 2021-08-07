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
  .Q......
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

test("King's movement must be restricted if checked", () => {
  chess.move(17, 18);
  expect(chess.availableZone(0)).toEqual([1, 8]);
});

/*
rnbqkbnr
pppppppp
*/
