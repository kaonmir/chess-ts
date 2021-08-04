"use strict";
var _a;
exports.__esModule = true;
var PTYPE_1 = require("../PTYPE");
var kingRule_1 = require("./kingRule");
var queenRule_1 = require("./queenRule");
var bishopRule_1 = require("./bishopRule");
var knightRule_1 = require("./knightRule");
var rookRule_1 = require("./rookRule");
var pawnRule_1 = require("./pawnRule");
var ruleBook = (_a = {},
    _a[PTYPE_1["default"].King] = [kingRule_1["default"]],
    _a[PTYPE_1["default"].Queen] = [queenRule_1["default"]],
    _a[PTYPE_1["default"].Bishop] = [bishopRule_1["default"]],
    _a[PTYPE_1["default"].Knight] = [knightRule_1["default"]],
    _a[PTYPE_1["default"].Rook] = [rookRule_1["default"]],
    _a[PTYPE_1["default"].Pawn] = [pawnRule_1["default"]],
    _a[PTYPE_1["default"].EMPTY] = [],
    _a);
exports["default"] = ruleBook;
