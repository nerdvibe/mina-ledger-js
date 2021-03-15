"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxType = exports.Networks = void 0;
var Networks;
(function (Networks) {
    Networks[Networks["MAINNET"] = 1] = "MAINNET";
    Networks[Networks["DEVNET"] = 0] = "DEVNET";
})(Networks = exports.Networks || (exports.Networks = {}));
var TxType;
(function (TxType) {
    TxType[TxType["PAYMENT"] = 0] = "PAYMENT";
    TxType[TxType["DELEGATION"] = 4] = "DELEGATION";
})(TxType = exports.TxType || (exports.TxType = {}));
