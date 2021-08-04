import { Piece } from "../Piece";
import PTYPE from "../PTYPE";
import rule from "./rule";

import kingRule from "./kingRule";
import queenRule from "./queenRule";
import bishopRule from "./bishopRule";
import knightRule from "./knightRule";
import rookRule from "./rookRule";
import pawnRule from "./pawnRule";

const ruleBook: { [id: string]: Array<rule> } = {
  [PTYPE.King]: [kingRule],
  [PTYPE.Queen]: [queenRule],
  [PTYPE.Bishop]: [bishopRule],
  [PTYPE.Knight]: [knightRule],
  [PTYPE.Rook]: [rookRule],
  [PTYPE.Pawn]: [pawnRule],
  [PTYPE.EMPTY]: [],
};

export default ruleBook;
