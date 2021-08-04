import { Piece } from "../types/Piece";

export default interface ruleIF {
  availableZone(map: Array<Piece>, cur: number): Array<number>;
  move(map: Array<Piece>, cur: number, dst: number): Array<Piece>;
}
