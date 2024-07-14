import * as fs from "fs";

class SolutionDayFifteen {
    instructions: string[]
    boxes: Map<number, Map<string, number>>

    constructor(filename: string) {
        this.boxes = new Map(Array.from(Array(256).keys()).map((value, index) => [value, new Map]))
        this.instructions = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/,/);
        lines.forEach(value => {
            this.instructions.push(value)
        })
    }

    computeHash(word: string) {
        let res = 0
        for (let letter of word) {
            res += letter.charCodeAt(0)
            res *= 17
            res %= 256
        }
        return res
    }

    performInstruction(instruction: string) {
        let instructionList = instruction.split(new RegExp(/([=\-])/))
        let focalLength = +instructionList[2]
        let boxLabel = instructionList[0]
        let boxNumber = this.computeHash(instructionList[0])
        if (instruction.includes("=")) {
            this.boxes.get(boxNumber).set(boxLabel, focalLength)
        }
        if (instruction.includes("-")) {
            if (this.boxes.get(boxNumber).has(boxLabel)) {
                this.boxes.get(boxNumber).delete(boxLabel)
            }
        }
    }

    computeFocusingPower() {
        let results =0
        this.boxes.forEach((boxContent, boxNumber) => {
            let i = 1
            boxContent.forEach((focalLength, lense) => {
                results +=focalLength*i*(boxNumber+1);
                i++
            })
        })
        return results
    }

    partOne() {
        console.log(`Solution Part One: ${this.instructions.map(value => this.computeHash(value)).reduce((c, p) => c + p)}`)
    }

    partTwo() {
        this.instructions.forEach(instruction => {
            this.performInstruction(instruction)
        })
        console.log(this.boxes)
        console.log(`Solution Part Two: ${this.computeFocusingPower()}`)
    }

}

const solutionDayFifteen = new SolutionDayFifteen("input.txt")
solutionDayFifteen.partOne()
solutionDayFifteen.partTwo()
