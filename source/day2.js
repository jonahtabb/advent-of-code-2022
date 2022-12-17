"use strict";
// play at same time
// col 1 is player A
// col 2 is player B
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
// score for a sinlge round is score of shape selected + score of outcome
/// rock = 1, paper = 2, scissors = 3
/// lose = 0, draw = 0, win = 6
// player a
// A = Rock
// B = Paper
// C = Scissors
// player b
// Y = Paper
// X = Rock
// Z = Scissors
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
async function main() {
    const allFights = await getAllFights();
    let totalScore = 0;
    for (let i = 0; i < allFights.length; i++) {
        totalScore += getFightScore(allFights[i][0], allFights[i][1]);
    }
    // allFights.forEach(fight => {
    //     totalScore += getFightScore(fight[0], fight[1]);
    // })
    console.log(totalScore);
}
async function getAllFights() {
    var _a, e_1, _b, _c;
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day2.txt`),
        crlfDelay: Infinity
    });
    let allFights = [];
    try {
        for (var _d = true, readLine_1 = __asyncValues(readLine), readLine_1_1; readLine_1_1 = await readLine_1.next(), _a = readLine_1_1.done, !_a;) {
            _c = readLine_1_1.value;
            _d = false;
            try {
                const line = _c;
                const currentFight = line.split(" ");
                allFights.push(currentFight);
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
    return allFights;
}
function getFightScore(playerA, playerB) {
    const shapeA = getForPlayerA(playerA);
    const shapeB = getForPlayerB(playerB);
    if (shapeB === PlayTypes.rock) {
        let score = ShapeScores.rock;
        if (shapeA === PlayTypes.rock)
            return score + FightScores.draw;
        if (shapeA === PlayTypes.paper)
            return score + FightScores.lose;
        return score + FightScores.win;
    }
    if (shapeB === PlayTypes.paper) {
        let score = ShapeScores.paper;
        if (shapeA === PlayTypes.rock)
            return score + FightScores.win;
        if (shapeA === PlayTypes.paper)
            return score + FightScores.draw;
        return score + FightScores.lose;
    }
    let score = ShapeScores.scissors;
    if (shapeA === PlayTypes.rock)
        return score + FightScores.lose;
    if (shapeA === PlayTypes.paper)
        return score + FightScores.win;
    return score + FightScores.draw;
}
function getForPlayerA(inputA) {
    if (inputA === "A") {
        return PlayTypes.rock;
    }
    if (inputA === "B") {
        return PlayTypes.paper;
    }
    return PlayTypes.scissors;
}
function getForPlayerB(inputB) {
    if (inputB === "X") {
        return PlayTypes.rock;
    }
    if (inputB === "Y") {
        return PlayTypes.paper;
    }
    return PlayTypes.scissors;
}
main();
class PlayTypes {
}
PlayTypes.rock = "rock";
PlayTypes.paper = "paper";
PlayTypes.scissors = "scissors";
class FightScores {
}
FightScores.lose = 0;
FightScores.draw = 3;
FightScores.win = 6;
class ShapeScores {
}
ShapeScores.rock = 1;
ShapeScores.paper = 2;
ShapeScores.scissors = 3;
