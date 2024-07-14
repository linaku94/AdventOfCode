import * as fs from "fs"

interface Point {
    x: number
    y: number
    steps?: number
}

const ORIGIN: Point = {x: 0, y: 0, steps:0};

interface Instruction {
    direction: string
    length: number
}

export function manhattanDistance(point1: Point) {
    return Math.abs(point1.x - ORIGIN.x) + Math.abs(point1.y - ORIGIN.y)
}

export class SolutionDayThree {
    wireInstructionsA: Instruction[]
    wireInstructionsB: Instruction[]
    wireA: Point[]
    wireB: Point[]
    intersections: Point[]
    stepsToIntersections: number[]
    constructor() {
        this.wireA = [ORIGIN];
        this.wireB = [ORIGIN];
        [this.wireInstructionsA, this.wireInstructionsB] = this.readInput();
        this.layWire(this.wireA, this.wireInstructionsA)
        this.layWire(this.wireB, this.wireInstructionsB)
        this.findWireIntersections()
    }

    readInput() {
        function extractInstruction(instructionString: string): Instruction {
            return {
                direction: instructionString.charAt(0),
                length: +instructionString.slice(1)
            }
        }

        let wireInstructions = fs.readFileSync("input.txt", "utf-8").split(/\n/)
        let wireInstructionsB = wireInstructions[1].split(/,/).map(extractInstruction)
        let wireInstructionsA = wireInstructions[0].split(/,/).map(extractInstruction)
        return [wireInstructionsA, wireInstructionsB]
    }

    executeWireInstruction(instruction: Instruction, wire: Point[]) {
        let startPoint = wire.at(-1)
        let steps = wire.at(-1).steps
        switch (instruction.direction) {
            case "R": {
                for (let xValue = startPoint.x + 1; xValue <= instruction.length + startPoint.x; xValue++) {
                    steps++
                    wire.push({x: xValue, y: startPoint.y, steps: steps})
                }
                break;
            }
            case "L": {
                for (let xValue = startPoint.x - 1; xValue >= -instruction.length + startPoint.x; xValue--) {
                    steps++
                    wire.push({x: xValue, y: startPoint.y, steps: steps})
                }
                break;
            }
            case "U": {
                for (let yValue = startPoint.y + 1; yValue <= instruction.length + startPoint.y; yValue++) {
                    steps++
                    wire.push({x: startPoint.x, y: yValue, steps: steps})
                }
                break;
            }
            case "D": {
                for (let yValue = startPoint.y - 1; yValue >= -instruction.length + startPoint.y; yValue--) {
                    steps++
                    wire.push({x: startPoint.x, y: yValue, steps: steps})
                }
                break;
            }
            default: {
                console.log("invalid instruction")
            }
        }
    }

    layWire(wire: Point[], wireInstructions: Instruction[]) {
        for (let wireInstruction of wireInstructions) {
            this.executeWireInstruction(wireInstruction, wire)
        }
    }

    findWireIntersections()  {
        let intersections: Point[] = []
        let stepsToIntersections: number[] = []
        for (let pointA of this.wireA) {
            for (let pointB of this.wireB) {
                if (pointA.x == pointB.x && pointA.y == pointB.y) {
                    intersections.push(pointA)
                    stepsToIntersections.push(pointA.steps+pointB.steps)
                }
            }
        }
        this.intersections = intersections.slice(1)
        this.stepsToIntersections = stepsToIntersections.slice(1)
    }

    part1(): void {
        console.log("Solution Part 1: " + Math.min(...this.intersections.map(manhattanDistance)))
    }

    part2() {
        console.log("Solution Part 2: " + Math.min(...this.stepsToIntersections))
    }
}