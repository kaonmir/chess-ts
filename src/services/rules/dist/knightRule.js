"use strict";
exports.__esModule = true;
var Piece_1 = require("../Piece");
var string_1 = require("../string");
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
var knightRule = {
    availableZone: function (map, cur) {
        var p = { x: Math.floor(cur / 8), y: cur % 8 };
        // l: 6, 15, -10, -17
        var movable = [
            [-1, -2],
            [1, -2],
            [-2, -1],
            [2, -1],
            [-2, 1],
            [2, 1],
            [-1, 2],
            [1, 2],
        ];
        return movable
            .map(function (_a) {
            var x = _a[0], y = _a[1];
            return [x + p.x, y + p.y];
        })
            .filter(function (_a) {
            var x = _a[0], y = _a[1];
            return 0 <= x && x <= 7 && 0 <= y && y <= 7;
        })
            .map(function (_a) {
            var x = _a[0], y = _a[1];
            return x * 8 + y;
        })
            .filter(function (dst) { return map[dst].side !== map[cur].side; });
    },
    move: function (map, cur, dst) {
        if (knightRule.availableZone(map, cur).includes(dst)) {
            map[dst] = map[cur];
            map[cur] = Piece_1.EMPTY_PIECE;
        }
        else
            throw Error(string_1["default"].MOVE);
        return map;
    }
};
exports["default"] = knightRule;
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
