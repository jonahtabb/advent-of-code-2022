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

    const sortedDescending = caloriesPerElves.sort((a, b) => a > b ? -1 : 1);
    let top3total = 0;
    for(let i = 0; i < 3; i++){
        top3total += sortedDescending[i] 
    }
    console.log(sortedDescending)
    console.log(top3total)
}

readByLine();