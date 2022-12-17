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
    const allSackGroups = await getAllSackGroups();
    let priorityTotal = 0;
    for (let group of allSackGroups) {
        const sharedLetter = getSharedLetter(group);
        priorityTotal += getPriority(sharedLetter);
    }
    console.log(priorityTotal);
}
function getSharedLetter(sackGroup) {
    let sackA = sackGroup[0];
    let sackB = sackGroup[1];
    let sackC = sackGroup[2];
    let ABMatches = [];
    for (let letter of sackA) {
        if (sackB.includes(letter)) {
            ABMatches.push(letter);
        }
    }
    for (let letter of ABMatches) {
        if (sackC.includes(letter)) {
            return letter;
        }
    }
    throw new Error("No match found");
}
function getPriority(letter) {
    let charCode = letter.charCodeAt(0);
    if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
        return charCode - 96;
    }
    return charCode - 38;
}
async function getAllSackGroups() {
    var _a, e_1, _b, _c;
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day3.txt`),
        crlfDelay: Infinity
    });
    let allSackGroups = [];
    let groupMemberIndex = 0;
    let sackGroup = [];
    try {
        for (var _d = true, readLine_1 = __asyncValues(readLine), readLine_1_1; readLine_1_1 = await readLine_1.next(), _a = readLine_1_1.done, !_a;) {
            _c = readLine_1_1.value;
            _d = false;
            try {
                const line = _c;
                if (groupMemberIndex === 0) {
                    sackGroup = [];
                }
                if (groupMemberIndex === 2) {
                    allSackGroups.push(sackGroup);
                    groupMemberIndex = 0;
                }
                else {
                    groupMemberIndex++;
                }
                sackGroup.push(line);
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
    return allSackGroups;
}
main();
