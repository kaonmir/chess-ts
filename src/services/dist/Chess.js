"use strict";
exports.__esModule = true;
var PTYPE_1 = require("./PTYPE");
var Piece_1 = require("./Piece");
var string_1 = require("./string");
var ruleBook_1 = require("./rules/ruleBook");
var SIDE_1 = require("./SIDE");
/**
 * {
 *  map: "n....k....",
 *  log: "1 2 30 5"
 * }
 */
var Chess = /** @class */ (function () {
    function Chess(input) {
        var _this = this;
        this.turn = SIDE_1["default"].WHITE;
        this.spawnPiece = function (piece, cur) { return (_this.map[cur] = piece); };
        this.killPiece = function (cur) { return (_this.map[cur] = Piece_1.EMPTY_PIECE); };
        this.saveMap = function () { return _this.map; };
        this.saveMapToString = function () {
            return _this.map
                .map(function (p) { return (p.side === SIDE_1["default"].WHITE ? p.piece.toUpperCase() : p.piece); })
                .join("");
        };
        this.saveLog = function () { return _this.logs; };
        this.saveLogToString = function () {
            return _this.logs.map(function (_a) {
                var cur = _a.cur, dst = _a.dst;
                return cur + " " + dst;
            }).join(" ");
        };
        this.loadMapFromString = function (initFormat) {
            return (_this.map = _this.parseMap(initFormat));
        };
        this.loadMapFromMap = function (map) { return (_this.map = map); };
        var _a = JSON.parse(input), mapString = _a.map, logString = _a.log;
        this.map = this.parseMap(mapString);
        this.logs = this.parseLog(logString);
    }
    Chess.prototype.parseMap = function (mapString) {
        var newMap = [];
        mapString
            .replaceAll(/\r?\n|\r|\n| /g, "")
            .split("")
            .forEach(function (c) {
            if (Object.values(PTYPE_1["default"]).includes(c.toLowerCase())) {
                var side = c === "."
                    ? SIDE_1["default"].EMPTY
                    : c === c.toLowerCase()
                        ? SIDE_1["default"].BLACK
                        : SIDE_1["default"].WHITE; // Lowercase == black
                newMap.push({ piece: c, side: side });
            }
            else
                throw Error(string_1["default"].INPUT_FILE + ("// \"" + c + "\""));
        });
        return newMap;
    };
    Chess.prototype.parseLog = function (logString) {
        var _this = this;
        var newLog = [];
        var logArr = logString
            .split(" ")
            .map(function (k) { return parseInt(k); })
            .filter(function (k) { return !isNaN(k); });
        if (logArr.length % 2 === 1)
            throw Error(string_1["default"].LOG_FILE);
        logArr.forEach(function (_, idx, arr) {
            if (idx % 2 === 0)
                newLog.push({ cur: arr[idx], dst: arr[idx + 1] });
        });
        try {
            newLog.forEach(function (_a) {
                var cur = _a.cur, dst = _a.dst;
                return _this.move(cur, dst);
            });
        }
        catch (_a) {
            throw Error(string_1["default"].LOG_LOAD);
        }
        return newLog;
    };
    Chess.prototype.availableZone = function (cur) {
        var _this = this;
        var answer = new Set();
        ruleBook_1["default"][this.map[cur].piece.toLowerCase()]
            .map(function (rule) { return rule.availableZone(_this.map, cur); })
            .map(function (zone) { return zone.forEach(function (k) { return answer.add(k); }); });
        return Array.from(answer).sort(function (a, b) { return a - b; });
    };
    Chess.prototype.move = function (cur, dst) {
        if (this.map[cur] === Piece_1.EMPTY_PIECE)
            throw Error(string_1["default"].MOVE_EMPTY);
        else if (this.turn !== this.map[cur].side)
            throw Error(string_1["default"].MOVE_ENEMY);
        for (var _i = 0, _a = ruleBook_1["default"][this.map[cur].piece.toLowerCase()]; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (rule.availableZone(this.map, cur).includes(dst)) {
                this.map = rule.move(this.map, cur, dst);
                this.logs.push({ cur: cur, dst: dst });
                this.turn = this.map[dst].side === SIDE_1["default"].BLACK ? SIDE_1["default"].WHITE : SIDE_1["default"].BLACK;
                return;
            }
        }
        throw new Error(string_1["default"].MOVE);
    };
    return Chess;
}());
exports["default"] = Chess;
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
