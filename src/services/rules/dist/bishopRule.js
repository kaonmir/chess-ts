"use strict";
exports.__esModule = true;
var Piece_1 = require("../Piece");
var string_1 = require("../string");
var bishopRule = {
    availableZone: function (map, cur) {
        var answer = [];
        [
            [-9, 7],
            [-7, 0],
            [7, 7],
            [9, 0],
        ].forEach(function (_a) {
            var step = _a[0], bound = _a[1];
            for (var k = cur + step;; k += step) {
                // out of bound
                if (k < 0 || 63 < k || k % 8 === bound)
                    break;
                // Alias
                else if (map[k].side === map[cur].side)
                    break;
                // empty
                else if (Piece_1.isPieceSame(map[k], Piece_1.EMPTY_PIECE))
                    answer.push(k);
                // enemy
                else {
                    answer.push(k);
                    break;
                }
            }
        });
        return answer;
    },
    move: function (map, cur, dst) {
        if (bishopRule.availableZone(map, cur).includes(dst)) {
            map[dst] = map[cur];
            map[cur] = Piece_1.EMPTY_PIECE;
        }
        else
            throw Error(string_1["default"].MOVE);
        return map;
    }
};
exports["default"] = bishopRule;
/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33
 */
