
import * as fs from 'fs';
import * as readline from 'readline'

async function main(){
    const allSackGroups: string[][] = await getAllSackGroups();
    let priorityTotal = 0;

    for(let group of allSackGroups){
        const sharedLetter = getSharedLetter(group)
        priorityTotal += getPriority(sharedLetter);
    }

    console.log(priorityTotal);
}

function getSharedLetter(sackGroup: string[]): string{
    let sackA: string = sackGroup[0];
    let sackB: string = sackGroup[1];
    let sackC: string = sackGroup[2];
    let ABMatches: string[] = [];

    for(let letter of sackA){
        if(sackB.includes(letter)){
            ABMatches.push(letter);
        }
    }

    for(let letter of ABMatches){
        if(sackC.includes(letter)){
            return letter;
        }
    }

    throw new Error("No match found");
}

function getPriority(letter: string): number{
    let charCode = letter.charCodeAt(0)
    if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)){
        return charCode - 96;
    }
    
    return charCode - 38;
}

async function getAllSackGroups(): Promise<string[][]> {
    const readLine = readline.createInterface({
        input: fs.createReadStream(`./../inputs/day3.txt`),
        crlfDelay: Infinity
    });
    
    let allSackGroups: string[][] = [];
    let groupMemberIndex = 0;
    let sackGroup: string[] = [];
    for await (const line of readLine){
        if (groupMemberIndex === 0){
            sackGroup = [];
        }
        
        if (groupMemberIndex === 2){
            allSackGroups.push(sackGroup)
            groupMemberIndex = 0;
        } else {
            groupMemberIndex ++;
        }

        sackGroup.push(line);
    }
    return allSackGroups;
}

main();

