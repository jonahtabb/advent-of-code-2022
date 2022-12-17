
import * as fs from 'fs';
import * as readline from 'readline'

async function main(){
    readFile();
}

async function readFile(): Promise<void> {
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day4.txt`),
        crlfDelay: Infinity
    });
    
    for await (const line of readLine){
        console.log(line);
    }
}

main();

