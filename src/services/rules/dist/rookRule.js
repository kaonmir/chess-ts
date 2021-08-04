"use strict";
exports.__esModule = true;
var Piece_1 = require("../Piece");
var string_1 = require("../string");
var rookRule = {
    availableZone: function (map, cur) {
        var answer = [];
        [-1, 1, -8, 8].forEach(function (step) {
            for (var k = cur + step;; k += step) {
                // out of bound
                if (k < 0 || 63 < k)
                    break;
                if (step === -1 && k % 8 === 7)
                    break;
                if (step === 1 && k % 8 === 0)
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
        if (rookRule.availableZone(map, cur).includes(dst)) {
            map[dst] = map[cur];
            map[cur] = Piece_1.EMPTY_PIECE;
        }
        else
            throw Error(string_1["default"].MOVE);
        return map;
    }
};
exports["default"] = rookRule;
