import PTYPE from "./PTYPE";
import { EMPTY_PIECE, Piece } from "./Piece";
import ErrorMessage from "./string";
import ruleBook from "./rules/ruleBook";
import SIDE from "./SIDE";
import Log from "./Log";

/**
 * {
 *  map: "n....k....",
 *  log: "1 2 30 5"
 * }
 */

export default class Chess {
  private map: Array<Piece>;
  private logs: Array<Log>;
  private turn: SIDE = SIDE.WHITE;

  constructor(input: string) {
    const { map: mapString, log: logString }: { map: string; log: string } =
      JSON.parse(input);
    this.map = this.parseMap(mapString);
    this.logs = this.parseLog(logString);
  }

  parseMap(mapString: String): Array<Piece> {
    var newMap: Array<Piece> = [];

    mapString
      .replaceAll(/\r?\n|\r|\n| /g, "")
      .split("")
      .forEach((c) => {
        if ((<any>Object).values(PTYPE).includes(c.toLowerCase())) {
          const side =
            c === "."
              ? SIDE.EMPTY
              : c === c.toLowerCase()
              ? SIDE.BLACK
              : SIDE.WHITE; // Lowercase == black
          newMap.push({ piece: c as PTYPE, side });
        } else throw Error(ErrorMessage.INPUT_FILE + `// "${c}"`);
      });

    return newMap;
  }

  private parseLog(logString: String): Array<Log> {
    var newLog: Array<Log> = [];
    const logArr = logString
      .split(" ")
      .map((k) => parseInt(k))
      .filter((k) => !isNaN(k));

    if (logArr.length % 2 === 1) throw Error(ErrorMessage.LOG_FILE);
    logArr.forEach((_, idx, arr) => {
      if (idx % 2 === 0) newLog.push({ cur: arr[idx], dst: arr[idx + 1] });
    });

    try {
      newLog.forEach(({ cur, dst }) => this.move(cur, dst));
    } catch {
      throw Error(ErrorMessage.LOG_LOAD);
    }

    return newLog;
  }

  availableZone(cur: number): Array<number> {
    var answer = new Set<number>();
    ruleBook[this.map[cur].piece.toLowerCase()]
      .map((rule) => rule.availableZone(this.map, cur))
      .map((zone) => zone.forEach((k) => answer.add(k)));

    return Array.from(answer).sort((a, b) => a - b);
  }

  move(cur: number, dst: number) {
    if (this.map[cur] === EMPTY_PIECE) throw Error(ErrorMessage.MOVE_EMPTY);
    else if (this.turn !== this.map[cur].side)
      throw Error(ErrorMessage.MOVE_ENEMY);

    for (const rule of ruleBook[this.map[cur].piece.toLowerCase()]) {
      if (rule.availableZone(this.map, cur).includes(dst)) {
        this.map = rule.move(this.map, cur, dst);
        this.logs.push({ cur, dst });
        this.turn = this.map[dst].side === SIDE.BLACK ? SIDE.WHITE : SIDE.BLACK;
        return;
      }
    }

    throw new Error(ErrorMessage.MOVE);
  }

  spawnPiece = (piece: Piece, cur: number) => (this.map[cur] = piece);
  killPiece = (cur: number): Piece => (this.map[cur] = EMPTY_PIECE);

  saveMap = () => this.map;
  saveMapToString = (): String =>
    this.map
      .map((p) => (p.side === SIDE.WHITE ? p.piece.toUpperCase() : p.piece))
      .join("");

  saveLog = () => this.logs;
  saveLogToString = () =>
    this.logs.map(({ cur, dst }) => `${cur} ${dst}`).join(" ");

  loadMapFromString = (initFormat: string) =>
    (this.map = this.parseMap(initFormat));
  loadMapFromMap = (map: Array<Piece>) => (this.map = map);
}

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