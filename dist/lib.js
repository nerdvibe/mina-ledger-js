"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinaLedgerJS = void 0;
var types_1 = require("./types");
var buffer_1 = require("buffer/");
var CLA_LEDGER = 0xb0;
var INS_LEDGER = {
    GET_NAME_VERSION: 0x01,
};
var CLA_APP = 0xe0;
var INS_APP = {
    GET_VERSION: 0x01,
    GET_ADDR: 0x02,
    SIGN: 0x03,
};
var SW_OK = 0x9000;
var SW_CANCEL = 0x6986;
/**
 * Mina App API
 */
var MinaLedgerJS = /** @class */ (function () {
    function MinaLedgerJS(transport, scrambleKey) {
        if (scrambleKey === void 0) { scrambleKey = "carbonara"; }
        if (transport === null || typeof transport === "undefined") {
            throw new Error("Transport cannot be empty");
        }
        transport.setScrambleKey(scrambleKey);
        this.transport = transport;
    }
    MinaLedgerJS.prototype.pad = function (n, width, paddingValue) {
        if (width === void 0) { width = 3; }
        if (paddingValue === void 0) { paddingValue = 0; }
        return (String(paddingValue).repeat(width) + String(n)).slice(String(n).length);
    };
    MinaLedgerJS.prototype.asciiToHex = function (str) {
        return buffer_1.Buffer.from(str, "ascii").toString("hex");
    };
    MinaLedgerJS.prototype.convertMemo = function (memo) {
        var length = 32;
        var charToAdd = length - memo.length;
        var stringToReturn = memo;
        while (charToAdd > 0) {
            stringToReturn += "\x00";
            charToAdd--;
        }
        return buffer_1.Buffer.from(stringToReturn, "utf8").toString("hex");
    };
    MinaLedgerJS.prototype.createTXApdu = function (_a) {
        var txType = _a.txType, senderAccount = _a.senderAccount, senderAddress = _a.senderAddress, receiverAddress = _a.receiverAddress, amount = _a.amount, fee = _a.fee, nonce = _a.nonce, _b = _a.validUntil, validUntil = _b === void 0 ? 4294967295 : _b, _c = _a.memo, memo = _c === void 0 ? "" : _c, networkId = _a.networkId;
        var senderBip44AccountHex = this.pad(senderAccount, 8);
        var senderAddressHex = this.asciiToHex(senderAddress);
        var receiverHex = this.asciiToHex(receiverAddress);
        var amountHex = this.pad(amount.toString(16), 16);
        var feeHex = this.pad(fee.toString(16), 16);
        var nonceHex = this.pad(Number(nonce).toString(16).toUpperCase(), 8);
        var validUntilHex = this.pad(validUntil.toString(16), 8);
        var memoHex = this.convertMemo(memo);
        var tagHex = this.pad(txType.toString(16), 2);
        var networkIdHex = this.pad(networkId, 2);
        // Uncomment for debug
        // console.log("senderBip44AccountHex", senderBip44AccountHex);
        // console.log("senderAddressHex", senderAddressHex);
        // console.log("receiverHex", receiverHex);
        // console.log("amountHex", amountHex);
        // console.log("feeHex", feeHex);
        // console.log("nonceHex", nonceHex);
        // console.log("validUntilHex", validUntilHex);
        // console.log("memoHex", memoHex);
        // console.log("tagHex", tagHex);
        // console.log("networkIdHex", networkIdHex);
        var apduMessage = senderBip44AccountHex +
            senderAddressHex +
            receiverHex +
            amountHex +
            feeHex +
            nonceHex +
            validUntilHex +
            memoHex +
            tagHex +
            networkIdHex;
        // Uncomment for debug
        // console.log(apduMessage);
        // console.log('length: ', apduMessage.length);
        return apduMessage;
    };
    /**
     * Get Mina address for a given account number.
     *
     * @param account int of the account number
     * @param display optionally enable or not the display
     * @return an object with a publicKey
     * @example
     * const result = await Mina.getAddress(1);
     * const { publicKey, returnCode } = result;
     */
    MinaLedgerJS.prototype.getAddress = function (account) {
        var _a;
        if (account === void 0) { account = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var accountHex, accountBuffer, p1, p2, statusList, response, publicKey, returnCode, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!Number.isInteger(account)) {
                            return [2 /*return*/, {
                                    publicKey: null,
                                    returnCode: "-5",
                                    message: "Account number must be Int",
                                    statusText: "ACCOUNT_NOT_INT",
                                }];
                        }
                        accountHex = this.pad(account.toString(16), 8, 0);
                        accountBuffer = buffer_1.Buffer.from(accountHex, "hex");
                        p1 = 0x00;
                        p2 = 0x00;
                        statusList = [SW_OK, SW_CANCEL];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transport.send(CLA_APP, INS_APP.GET_ADDR, p1, p2, accountBuffer, statusList)];
                    case 2:
                        response = _b.sent();
                        publicKey = response.slice(0, response.length - 3).toString();
                        returnCode = response
                            .slice(response.length - 2, response.length)
                            .toString("hex");
                        if (returnCode !== SW_OK.toString(16)) {
                            throw {
                                returnCode: returnCode,
                                message: "unknown error",
                                statusText: "UNKNOWN_ERROR",
                            };
                        }
                        return [2 /*return*/, {
                                publicKey: publicKey,
                                returnCode: returnCode,
                            }];
                    case 3:
                        e_1 = _b.sent();
                        return [2 /*return*/, {
                                publicKey: null,
                                returnCode: ((_a = e_1.returnCode) === null || _a === void 0 ? void 0 : _a.toString()) || '5000',
                                message: e_1.message,
                                statusText: e_1.statusText,
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // /**
    //  * Sign a Mina transaction with a given transaction
    //  *
    //  * @param Transaction arguments, see SignTransactionArgs type
    //  * @return an object with signature and returnCode
    //  */
    MinaLedgerJS.prototype.signTransaction = function (_a) {
        var txType = _a.txType, senderAccount = _a.senderAccount, senderAddress = _a.senderAddress, receiverAddress = _a.receiverAddress, amount = _a.amount, fee = _a.fee, nonce = _a.nonce, _b = _a.validUntil, validUntil = _b === void 0 ? 4294967295 : _b, _c = _a.memo, memo = _c === void 0 ? "" : _c, networkId = _a.networkId;
        return __awaiter(this, void 0, void 0, function () {
            var apdu, apduBuffer, p1, p2, statusList, response, signature, returnCode, e_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (isNaN(txType) ||
                            isNaN(senderAccount) ||
                            !senderAddress ||
                            !receiverAddress ||
                            (!amount && txType === types_1.TxType.PAYMENT) ||
                            !fee ||
                            !Number.isInteger(amount) ||
                            !Number.isInteger(fee) ||
                            isNaN(nonce) ||
                            isNaN(networkId)) {
                            return [2 /*return*/, {
                                    signature: null,
                                    returnCode: "-1",
                                    message: "Missing or wrong arguments",
                                    statusText: "MISSING_ARGUMENTS",
                                }];
                        }
                        if (memo.length > 32) {
                            return [2 /*return*/, {
                                    signature: null,
                                    returnCode: "-3",
                                    message: "Memo field too long",
                                    statusText: "MEMO_TOO_BIG",
                                }];
                        }
                        if (fee < 1000000) {
                            return [2 /*return*/, {
                                    signature: null,
                                    returnCode: "-4",
                                    message: "Fee too small",
                                    statusText: "FEE_TOO_SMALL",
                                }];
                        }
                        apdu = this.createTXApdu({
                            txType: txType,
                            senderAccount: senderAccount,
                            senderAddress: senderAddress,
                            receiverAddress: receiverAddress,
                            amount: amount,
                            fee: fee,
                            nonce: nonce,
                            validUntil: validUntil,
                            memo: memo,
                            networkId: networkId,
                        });
                        apduBuffer = buffer_1.Buffer.from(apdu, "hex");
                        p1 = 0x00;
                        p2 = 0x00;
                        statusList = [SW_OK, SW_CANCEL];
                        if (apduBuffer.length > 256) {
                            return [2 /*return*/, {
                                    signature: null,
                                    returnCode: "-2",
                                    message: "data length > 256 bytes",
                                    statusText: "DATA_TOO_BIG",
                                }];
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transport.send(CLA_APP, INS_APP.SIGN, p1, p2, apduBuffer, statusList)];
                    case 2:
                        response = _d.sent();
                        signature = response.slice(0, response.length - 2).toString("hex");
                        returnCode = response
                            .slice(response.length - 2, response.length)
                            .toString("hex");
                        return [2 /*return*/, {
                                signature: signature,
                                returnCode: returnCode,
                            }];
                    case 3:
                        e_2 = _d.sent();
                        return [2 /*return*/, {
                                signature: null,
                                returnCode: e_2.statusCode.toString(),
                                message: e_2.message,
                                statusText: e_2.statusText,
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get the version of the Mina app installed on the hardware device
     * the version is returned from the installed app.
     *
     * @return an object with a version
     */
    MinaLedgerJS.prototype.getAppVersion = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var p1, p2, response, versionRaw, version, returnCode, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        p1 = 0x00;
                        p2 = 0x00;
                        return [4 /*yield*/, this.transport.send(CLA_APP, INS_APP.GET_VERSION, p1, p2)];
                    case 1:
                        response = _b.sent();
                        versionRaw = response.slice(0, response.length - 2).toString("hex");
                        version = "" + versionRaw[1] + "." + versionRaw[2] + "." + versionRaw[3];
                        returnCode = response
                            .slice(response.length - 2, response.length)
                            .toString("hex");
                        return [2 /*return*/, {
                                version: version,
                                returnCode: returnCode,
                            }];
                    case 2:
                        e_3 = _b.sent();
                        return [2 /*return*/, {
                                version: null,
                                returnCode: ((_a = e_3.statusCode) === null || _a === void 0 ? void 0 : _a.toString()) || '5000',
                                message: e_3.message,
                                statusText: e_3.statusText,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get the name and version of the Mina app installed on the hardware device
     * it can be used to ping the app and know the name of the running app.
     * The name and version is returned from the Ledger firmware.
     *
     * @return an object with an app name and version
     */
    MinaLedgerJS.prototype.getAppName = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var p1, p2, response, returnCode, separatorPosition, name_1, version, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        p1 = 0x00;
                        p2 = 0x00;
                        return [4 /*yield*/, this.transport.send(CLA_LEDGER, INS_LEDGER.GET_NAME_VERSION, p1, p2)];
                    case 1:
                        response = _b.sent();
                        returnCode = response.slice(response.length - 2, response.length).toString("hex");
                        separatorPosition = response.indexOf(0x05);
                        name_1 = response.slice(2, separatorPosition).toString('ascii');
                        version = response.slice(separatorPosition + 1, response.length - 4).toString('utf-8');
                        return [2 /*return*/, {
                                name: name_1,
                                version: version,
                                returnCode: returnCode,
                            }];
                    case 2:
                        e_4 = _b.sent();
                        return [2 /*return*/, {
                                version: null,
                                returnCode: ((_a = e_4.statusCode) === null || _a === void 0 ? void 0 : _a.toString()) || "5000",
                                message: e_4.message,
                                statusText: e_4.statusText,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MinaLedgerJS;
}());
exports.MinaLedgerJS = MinaLedgerJS;
