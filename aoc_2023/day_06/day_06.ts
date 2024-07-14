import * as fs from "fs";


function solve_polynomial(p: number, q: number) {
    let c = Math.sqrt(Math.pow(p/2, 2) - q)
    return [-p/2 +c, -p/2-c]
}

class SolutionDaySix {

    readInput() {
        let lines = fs.readFileSync("input.txt", "utf-8").split(/:/);


    }
}