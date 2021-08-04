import Chess from "../src/services/Chess";
import { EMPTY_PIECE, Piece } from "../src/services/Piece";
import PTYPE from "../src/services/PTYPE";
import SIDE from "../src/services/SIDE";

test("sadf", () => {
  expect(0).toBe(0);
});

const input = {
  map: `
  rnbqkbnr
  pppppppp
  ........
  ........
  ........
  ........
  PPPPPPPP
  RNBKQBNR
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

describe("available zone for all pieces", () => {
  describe("Pawn for each case", () => {
    test("pawn move at the coner", () => {
      chess.spawnPiece({ piece: PTYPE.Pawn, side: SIDE.BLACK }, 0);
      /*  pnbqkbnr
          pppppppp */

      expect(chess.availableZone(0)).toEqual([]);
      chess.killPiece(8);
      /*  pnbqkbnr
          .ppppppp */

      expect(chess.availableZone(0)).toEqual([8]);
    });

    test("pawn good to go forward", () => {
      /*  pnbqkbnr
          .ppppppp */
      expect(chess.availableZone(9)).toEqual([17]);
      expect(chess.availableZone(10)).toEqual([18]);
      expect(chess.availableZone(11)).toEqual([19]);
      expect(chess.availableZone(12)).toEqual([20]);
    });

    test("pawn attack a opponent", () => {
      chess.spawnPiece({ piece: PTYPE.Bishop, side: SIDE.WHITE }, 18);
      /*  pnbqkbnr
          .ppppppp 
          ..B..... */
      expect(chess.availableZone(9)).toEqual([17, 18]);
      expect(chess.availableZone(10)).toEqual([]);
      expect(chess.availableZone(11)).toEqual([18, 19]);
      expect(chess.availableZone(12)).toEqual([20]);
    });
  });
});
