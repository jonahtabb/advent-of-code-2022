
import * as fs from 'fs';
import * as readline from 'readline'

async function main(){
    const allSacks: string[][] = await getAllSacks();

    let priorityTotal = 0;
    allSacks.forEach((sack) => {
        const sharedLetter = getSharedLetter(sack[0], sack[1])
        priorityTotal += getPriority(sharedLetter);
    })

    console.log(priorityTotal);
}

function getSharedLetter(string1: string, string2: string){
    for (let i = 0; i < string1.length; i++){
        if (string2.includes(string1[i])){
            return string1[i];
        }
    }

    throw new Error("no shared letter found;")
}

function getPriority(letter: string): number{
    let charCode = letter.charCodeAt(0)
    if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)){
        return charCode - 96;
    }
    
    return charCode - 38;
}

async function getAllSacks(): Promise<string[][]> {
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day3.txt`),
        crlfDelay: Infinity
    });
    
    let allSacks = [];
    for await (const line of readLine){
        const sack = [];
        const halfPoint = (line.length) / 2;

        sack.push(line.slice(0, halfPoint));
        sack.push(line.slice(halfPoint, line.length))

        if (sack[0].length !== sack[1].length){
            throw new Error("Sacks not equal")
        }
        allSacks.push(sack);
    }
    return allSacks;
}

main();

