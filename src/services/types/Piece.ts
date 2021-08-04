import PTYPE from "./PTYPE";
import SIDE from "./SIDE";

export type Piece = { piece: PTYPE; side: SIDE };
export const EMPTY_PIECE = { piece: PTYPE.EMPTY, side: SIDE.EMPTY };
export const isPieceSame = (A: Piece, B: Piece) =>
  A.piece === B.piece && A.side === B.side;
