"use strict";
exports.__esModule = true;
var Piece_1 = require("../Piece");
var SIDE_1 = require("../SIDE");
var string_1 = require("../string");
var pawnRule = {
    availableZone: function (map, cur) {
        var _a;
        var answer;
        var steps = (_a = {},
            _a[SIDE_1["default"].BLACK] = [8, 7, 9],
            _a[SIDE_1["default"].WHITE] = [-8, -9, -7],
            _a);
        return steps[map[cur].side]
            .map(function (step) { return step + cur; })
            .filter(function (dst, idx) {
            if (idx === 0)
                return map[dst].side === SIDE_1["default"].EMPTY;
            if (idx === 1 && dst % 8 === 7)
                return false;
            if (idx === 2 && dst % 8 === 0)
                return false;
            return map[dst].side !== SIDE_1["default"].EMPTY && map[dst].side !== map[cur].side;
        });
    },
    move: function (map, cur, dst) {
        if (pawnRule.availableZone(map, cur).includes(dst)) {
            map[dst] = map[cur];
            map[cur] = Piece_1.EMPTY_PIECE;
        }
        else
            throw Error(string_1["default"].MOVE);
        return map;
    }
};
exports["default"] = pawnRule;
/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33
 */
