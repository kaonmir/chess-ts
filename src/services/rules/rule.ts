import { Piece } from "../Piece";

export default interface rule {
  availableZone(map: Array<Piece>, cur: number): Array<number>;
  move(map: Array<Piece>, cur: number, dst: number): Array<Piece>;
}
