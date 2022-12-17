import * as fs from 'fs';
import * as readline from 'readline'

async function readByLine() {
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day1.txt`),
        crlfDelay: Infinity
    });
    
    let caloriesPerElves = [];
    let currentElf = 0;

    for await (const line of readLine){
        if (line === ""){
            caloriesPerElves.push(currentElf);
            currentElf = 0;
            continue;
        }
        
        currentElf += Number.parseInt(line);
    }
    console.log(Math.max.apply(Math, caloriesPerElves));
}

readByLine();