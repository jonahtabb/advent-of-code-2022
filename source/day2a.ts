
import * as fs from 'fs';
import * as readline from 'readline'


async function main(){
    const allFights: string[][] = await getAllFights();

    let totalScore = 0;
    
    allFights.forEach(fight => {
        totalScore += getFightScore(fight[0], fight[1]);
    })
    console.log(totalScore);
}

async function getAllFights(): Promise<string[][]> {
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day2.txt`),
        crlfDelay: Infinity
    });
    
    let allFights = [];
    for await (const line of readLine){
        const currentFight = line.split(" ");
        allFights.push(currentFight);
    }
    return allFights;
}


function getFightScore(playerA: string, playerB: string): number{
    const shapeA = getForPlayerA(playerA);
    const shapeB = getForPlayerB(playerB);

    if (shapeB === PlayTypes.rock){
        let score = ShapeScores.rock;

        if (shapeA === PlayTypes.rock)
            return score + FightScores.draw;

        if (shapeA === PlayTypes.paper)
            return score + FightScores.lose;
        
        return score + FightScores.win;
    }
    
    if (shapeB === PlayTypes.paper){
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

function getForPlayerA (inputA: string){
    if (inputA === "A"){
        return PlayTypes.rock;
    }
    if (inputA === "B"){
        return PlayTypes.paper;
    }
    return PlayTypes.scissors
}

function getForPlayerB (inputB: string){
    if (inputB === "X"){
        return PlayTypes.rock;
    }
    if (inputB === "Y"){
        return PlayTypes.paper;
    }
    return PlayTypes.scissors;
}


main();

class PlayTypes {
    static rock: string = "rock";
    static paper: string = "paper";
    static scissors: string = "scissors";
}

class FightScores {
    static lose: number = 0;
    static draw: number = 3;
    static win: number = 6;
}

class ShapeScores {
    static rock: number = 1;
    static paper: number = 2;
    static scissors: number = 3;
}
