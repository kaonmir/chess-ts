"use strict";
exports.__esModule = true;
var Piece_1 = require("../Piece");
var string_1 = require("../string");
var kingRule = {
    availableZone: function (map, cur) {
        var steps = [-9, -8, -7, -1, 1, 7, 8, 9];
        return steps
            .map(function (step) { return step + cur; })
            .filter(function (dst) { return 0 <= dst && dst < 64; }) // out of bound
            .filter(function (dst) { return map[cur].side !== map[dst].side; }); // empty or enemy
    },
    move: function (map, cur, dst) {
        if (kingRule.availableZone(map, cur).includes(dst)) {
            map[dst] = map[cur];
            map[cur] = Piece_1.EMPTY_PIECE;
        }
        else
            throw Error(string_1["default"].MOVE);
        return map;
    }
};
exports["default"] = kingRule;
