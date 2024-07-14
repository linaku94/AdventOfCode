import * as fs from "fs";

interface Workflow {
    rules: string[]
}

class SolutionDayNineTeen {
    parts: Map<string, number>[]
    rules: Map<string, Workflow>

    constructor(filename: string) {
        this.parts = []
        this.rules = new Map
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n\n/);

        lines.at(-1).split(/\n/).slice(0, -1).forEach(value => {
            this.parts.push(new Map([
                    ["x", +new RegExp(/x=\d*/).exec(value)[0].split("=").at(-1)],
                    ["m", +new RegExp(/m=\d*/).exec(value)[0].split("=").at(-1)],
                    ["a", +new RegExp(/a=\d*/).exec(value)[0].split("=").at(-1)],
                    ["s", +new RegExp(/s=\d*/).exec(value)[0].split("=").at(-1)],
                ])
            )
        })

        lines.at(0).split(/\n/).forEach(value => {
            this.rules.set(value.split("{")[0], {rules: value.split("{")[1].replace("}", "").split(",")})
        })

    }

    processWorkflow(part: Map<string, number>, workflowName: string) {
        let workflow = this.rules.get(workflowName)
        let result = ""
        for (let rule of workflow.rules) {
            if (rule.includes(">")) {
                if (part.get(rule.split(">")[0]) > +rule.split(">")[1].split(":")[0] ){
                    return rule.split(":")[1]
                }
            } else if (rule.includes("<")) {
                if(part.get(rule.split("<")[0]) < +rule.split("<")[1].split(":")[0]) {
                    return rule.split(":")[1]
                }
            } else {
                return rule;
            }
        }
    }

    processPart(part: Map<string, number>) {
        let result = this.processWorkflow(part, "in")
        while (!(result == "A" || result == "R")) {
            result = this.processWorkflow(part, result)
        }
        return result
    }

    partOne() {
        console.log(this.parts)
        console.log(this.rules)
        let result = 0
        this.parts.forEach(part => {
            console.log(part)
            result += this.processPart(part)=="A"?Array.from(part.values()).reduce((p, c) => p+c):0
        })
        console.log(`Solution Part One: ${result}`)
    }

    partTwo() {
        console.log(`Solution Part Two: `)
    }

}

const solutionDayNineTeen = new SolutionDayNineTeen("input.txt")
solutionDayNineTeen.partOne()
solutionDayNineTeen.partTwo()
