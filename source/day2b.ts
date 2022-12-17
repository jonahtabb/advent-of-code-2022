
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


function getFightScore(playerA: string, outcome: string): number{
    const shapeA = getForPlayerA(playerA);
    const shapeB = getForPlayerB(shapeA, outcome);
    console.log(shapeA, shapeB, outcome === "X" ? 'lose' : outcome === "Y" ? 'draw' : 'win')

    if (shapeB === ShapeTypes.rock){
        let score = ShapeScores.rock;

        if (shapeA === ShapeTypes.rock)
            return score + FightScores.draw;

        if (shapeA === ShapeTypes.paper)
            return score + FightScores.lose;
        
        return score + FightScores.win;
    }
    
    if (shapeB === ShapeTypes.paper){
        let score = ShapeScores.paper;

        if (shapeA === ShapeTypes.rock)
            return score + FightScores.win;

        if (shapeA === ShapeTypes.paper)
            return score + FightScores.draw;

        return score + FightScores.lose;
    }
    
    let score = ShapeScores.scissors;

    if (shapeA === ShapeTypes.rock)
        return score + FightScores.lose;
        
    if (shapeA === ShapeTypes.paper)
        return score + FightScores.win;
    
    return score + FightScores.draw;
}

function getForPlayerA (inputA: string){
    if (inputA === "A"){
        return ShapeTypes.rock;
    }
    if (inputA === "B"){
        return ShapeTypes.paper;
    }
    return ShapeTypes.scissors
}

function getForPlayerB (shapeA: string, outcome: string){
    if (outcome === "X"){
        if (shapeA === ShapeTypes.rock){
            return ShapeTypes.scissors;
        }

        if (shapeA === ShapeTypes.paper){
            return ShapeTypes.rock;
        }
        return ShapeTypes.paper;
    }

    if (outcome === "Y"){
        return shapeA;
    }

    if (shapeA === ShapeTypes.rock){
        return ShapeTypes.paper;
    }

    if (shapeA === ShapeTypes.paper){
        return ShapeTypes.scissors;
    }

    return ShapeTypes.rock;
}


main();

class ShapeTypes {
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
