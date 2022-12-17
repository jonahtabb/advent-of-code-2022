"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
async function main() {
    const allSacks = await getAllSacks();
    let priorityTotal = 0;
    allSacks.forEach((sack) => {
        const sharedLetter = getSharedLetter(sack[0], sack[1]);
        priorityTotal += getPriority(sharedLetter);
    });
    console.log(priorityTotal);
}
function getSharedLetter(string1, string2) {
    for (let i = 0; i < string1.length; i++) {
        if (string2.includes(string1[i])) {
            return string1[i];
        }
    }
    throw new Error("no shared letter found;");
}
function getPriority(letter) {
    let charCode = letter.charCodeAt(0);
    if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
        return charCode - 96;
    }
    return charCode - 38;
}
async function getAllSacks() {
    var _a, e_1, _b, _c;
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day3.txt`),
        crlfDelay: Infinity
    });
    let allSacks = [];
    try {
        for (var _d = true, readLine_1 = __asyncValues(readLine), readLine_1_1; readLine_1_1 = await readLine_1.next(), _a = readLine_1_1.done, !_a;) {
            _c = readLine_1_1.value;
            _d = false;
            try {
                const line = _c;
                const sack = [];
                const halfPoint = (line.length) / 2;
                sack.push(line.slice(0, halfPoint));
                sack.push(line.slice(halfPoint, line.length));
                if (sack[0].length !== sack[1].length) {
                    throw new Error("Sacks not equal");
                }
                allSacks.push(sack);
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = readLine_1.return)) await _b.call(readLine_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return allSacks;
}
main();
