import * as fs from "fs";

class linearEquation {
    x0: number
    y0: number
    vx: number
    vy: number
    m: number
    b: number

    constructor(constructionString: string) {
        let points = constructionString.split(" @ ")[0].split(", ").map(point => +point)
        let velocities = constructionString.split(" @ ")[1].split(", ").map(vel => +vel)
        this.x0 = points.at(0)
        this.y0 = points.at(1)
        this.vx = velocities.at(0)
        this.vy = velocities.at(1)
        this.m = velocities.at(1)/velocities.at(0)
        this.b = (points.at(1)*velocities.at(0)-(points.at(0)*velocities.at(1)))/velocities.at(0)
    }

    evaluate(x:number) {
        return (this.m*x) + this.b
    }

    isNotInPast(point:number[]) {
        return (this.x0-point.at(0))*Math.sign(this.vx)<0&&(this.y0-point.at(1))*Math.sign(this.vy)<0
    }
}

function intersection(euq1: linearEquation, equ2: linearEquation) {
    let x = (equ2.b-euq1.b)/(euq1.m-equ2.m)
    let y = euq1.evaluate(x)
    return [x,y]
}

class SolutionDayTwentyFour {
    linEquations: linearEquation[]


    constructor(filename: string) {
        this.linEquations = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0,-1).forEach(line => {
            this.linEquations.push(new linearEquation(line))
        })
    console.log(this.linEquations)
    }

    intersectionWithinLimit(intersectionPoint: number[], upperLimit: number, lowerLimit:number) {
        return intersectionPoint.map(p=> p>=lowerLimit).reduce((p,c) => p&&c)&&intersectionPoint.map(p=> p<=upperLimit).reduce((p,c) => p&&c)
    }

    partOne() {
        let lowerLimit = 200000000000000
        let upperLimit = 400000000000000
        let numberOfIntersections = 0
        this.linEquations.forEach((equation,index) => {
            for(let compIndex=index+1; compIndex< this.linEquations.length; compIndex++) {
                let intersectionPoint = intersection(equation, this.linEquations.at(compIndex))
                numberOfIntersections+=this.intersectionWithinLimit(intersectionPoint, upperLimit, lowerLimit)&&equation.isNotInPast(intersectionPoint)&&this.linEquations.at(compIndex).isNotInPast(intersectionPoint)?1:0
            }
        })
        console.log(`Solution Part One: ${numberOfIntersections}`)
    }

    partTwo() {
        console.log(`Solution Part Two: `)
    }

}

const solutionDayTwentyFour = new SolutionDayTwentyFour("input.txt")
solutionDayTwentyFour.partOne()
solutionDayTwentyFour.partTwo()
