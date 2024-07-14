import * as fs from "fs"

interface OpCode {
    operationValue: number
    numbers: number[]
    updateIndex: number
}

export class SolutionDayTwo {
    numbers: number[]
    currentIndex: number
    terminated: boolean

    constructor() {
        this.reset()
    }

    reset() {
        this.numbers = this.readInput()
        this.currentIndex = 0
        this.terminated = false
    }

    readInput() {
        return fs.readFileSync("input.txt", "utf-8").split(/,/).map(Number);
    }

    replacements(noun: number, verb: number) {
        this.numbers[1] = noun
        this.numbers[2] = verb
    }

    updateNumbers(updateValue: number, updateIndex) {
        this.numbers[updateIndex] = updateValue
    }

    updateIndex(updateValue: number) {
        this.currentIndex += updateValue
    }

    readOpCode(): OpCode {
        let positions = this.numbers.slice(this.currentIndex + 1, this.currentIndex + 3)
        let numbers = positions.map(position => this.numbers[position])
        return {
            operationValue: this.numbers[this.currentIndex],
            updateIndex: this.numbers[this.currentIndex + 3],
            numbers: numbers
        }
    }

    executeOpCode(opCode) {
        switch (opCode.operationValue) {
            case 1: {
                this.updateNumbers(opCode.numbers.reduce((previous, current) => previous + current), opCode.updateIndex)
                break;
            }
            case 2: {
                this.updateNumbers(opCode.numbers.reduce((previous, current) => previous * current), opCode.updateIndex)
                break;
            }
            case 99: {
                this.terminated = true
                break;
            }
            default: {
                console.log("reached non valid opCode")
                this.terminated = true
                break;
            }
        }
    }

    part1() {
        this.replacements(12, 2)
        while (!this.terminated) {
            let opCode = this.readOpCode()
            this.executeOpCode(opCode)
            this.updateIndex(4)
        }
        console.log("Solution part 1: " + this.numbers[0])
    }

    part2() {
        const targetValue: number = 19690720;
        for (let noun = 0; noun <= 99; noun++) {
            for (let verb = 0; verb <= 99; verb++) {
                this.reset()
                this.replacements(noun, verb)
                while (!this.terminated) {
                    let opCode = this.readOpCode()
                    this.executeOpCode(opCode)
                    this.updateIndex(4)
                }
                if (this.numbers[0] == targetValue) {
                    console.log(`Solution part 2: noun=${noun} and verb=${verb} => ${100 * noun + verb}`)
                }
            }
        }
    }
}