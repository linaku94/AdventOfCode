import * as fs from "fs";


class SolutionDayTwelve {
    lines: string[]
    patterns: number[][]

    constructor(filename: string) {
        this.lines = []
        this.patterns = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(value => {
            this.lines.push(value.split(" ")[0])
            this.patterns.push(value.split(" ").at(-1).split(",").map(value => +value))
        })
    }

    getAllPermutations(line: string) {
        let stringArray = line.split("")
        let resultArray = ['']
        stringArray.forEach((sign) => {
            let tempArray = []
            if (sign == "?") {
                resultArray.forEach(value => {
                    tempArray.push(value + '.');
                    tempArray.push(value + '#')
                })
            } else {
                resultArray.forEach(value => {
                    tempArray.push(value + sign)
                })
            }
            resultArray = tempArray
        })
        return resultArray
    }

    createRegExp(instruction: number[]) {
        let pattern = '^[\\.]*'
        instruction.forEach((value, index) => {
            pattern += `[#]\{${value.toString()}\}`
            pattern += index != instruction.length - 1 ? '[\\.]+' : '[\\.]*$'
        })
        return new RegExp(pattern)
    }

    unfold(instruction:string, joinString: string) {
        let instructions = []
        for (let i=0; i<5; i++) {
            instructions.push(instruction)
        }
        return instructions.join(joinString)
    }

    scaleArray(numberArray: number[]) {
        let numbers = []
        for (let i=0;i<5;i++) {
            numbers.push(numberArray)
        }
        return numbers
    }

    partOne() {
        let result = 0
        this.lines.forEach((instruction, index) => {
            let permutations = this.getAllPermutations(instruction)
            let pattern = this.createRegExp(this.patterns.at(index))
            permutations.forEach(perm => {
                result += pattern.test(perm) ? 1 : 0
            })
        })
        console.log(`Solution Part One: ${result}`)
    }

    partTwo() {
        let result = 0
        this.lines.forEach((instruction, index) => {
            let permutations = this.getAllPermutations(this.unfold(instruction, "?"))
            let pattern = this.createRegExp(this.scaleArray(this.patterns.at(index)))
            permutations.forEach(perm => {
                result += pattern.test(perm) ? 1 : 0
            })
        })
        console.log(`Solution Part Two: ${result}`)
    }

}

const solutionDayTwelve = new SolutionDayTwelve("test.txt")
solutionDayTwelve.partOne()
solutionDayTwelve.partTwo()
