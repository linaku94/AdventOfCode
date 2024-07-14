import * as fs from "fs"
export class SolutionDayOne {
    modules: number[]

    constructor() {
        this.modules = this.readInput()
    }

    readInput() {
        return fs.readFileSync("input.txt", "utf-8").split(/\n/).map(Number);
    }

    requiredFuelPerModule(module) {
        return Math.floor(module / 3) - 2
    }

    requiredRecursiveFuelPerModule(module) {
        let recursiveFuelRequirement = 0
        while (this.requiredFuelPerModule(module) > 0) {
            module = this.requiredFuelPerModule(module)
            recursiveFuelRequirement += module
        }
        return recursiveFuelRequirement
    }

    sumOfFuelRequirements(recursive: boolean) {
        let FuelRequirement = 0
        for (let module of this.modules) {
            recursive ?
                (FuelRequirement += this.requiredRecursiveFuelPerModule(module))
                :
                (FuelRequirement += this.requiredFuelPerModule(module))
        }
        return FuelRequirement
    }

    part1() {
        console.log("Solution part 1: " + this.sumOfFuelRequirements(false))
    }

    part2() {
        console.log("Solution part 2: " + this.sumOfFuelRequirements(true))
    }
}