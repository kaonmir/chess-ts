"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Piece_1 = require("../Piece");
var string_1 = require("../string");
var bishopRule_1 = require("./bishopRule");
var rookRule_1 = require("./rookRule");
var queenRule = {
    availableZone: function (map, cur) { return __spreadArrays(bishopRule_1["default"].availableZone(map, cur), rookRule_1["default"].availableZone(map, cur)); },
    move: function (map, cur, dst) {
        if (queenRule.availableZone(map, cur).includes(dst)) {
            map[dst] = map[cur];
            map[cur] = Piece_1.EMPTY_PIECE;
        }
        else
            throw Error(string_1["default"].MOVE);
        return map;
    }
};
exports["default"] = queenRule;
/*
 0  1  2  3  4  5  6  7
 8  9 10 11 12 13 14 15
16 17 18 19 20 21 22 23
24 25 26 27 28 29 30 31
32 33
 */
