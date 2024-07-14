import * as fs from "fs";

interface Path {
    currentIndex: number[]
    path: number[][]
    pathLength: number
}

const allowedTilesPartOne = new Map<string, string[]>([
    ["top", [".", "^"]],
    ["left", [".", "<"]],
    ["right", [".", ">"]],
    ["bottom", [".", "v"]],
])


const allowedTilesPartTwo = new Map<string, string[]>([
    ["top", [".", "^", "v", ">", "<"]],
    ["left", [".", "^", "v", ">", "<"]],
    ["right", [".", "^", "v", ">", "<"]],
    ["bottom", [".", "^", "v", ">", "<"]],
])

class SolutionDayTwentyThree {
    hikingMap: string[][]

    constructor(filename: string) {
        this.hikingMap = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach((line, lineIndex) => {
            this.hikingMap.push([])
            line.split("").forEach((tile, tileIndex) => {
                this.hikingMap[lineIndex].push(tile)
            })
        })
    }

    getPossibleNextSteps(path: Path, allowedPartsMap: Map<string, string[]>) {
        let y = path.currentIndex.at(0)
        let x = path.currentIndex.at(1)
        let possibleNextIndices: number[][] = []
        if (y - 1 >= 0 && allowedPartsMap.get("top").includes(this.hikingMap.at(y - 1).at(x))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y - 1, x]))) {
                possibleNextIndices.push([y - 1, x])
            }
        }
        if (y + 1 < this.hikingMap.length && allowedPartsMap.get("bottom").includes(this.hikingMap.at(y + 1).at(x))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y + 1, x]))) {
                possibleNextIndices.push([y + 1, x])
            }
        }
        if (x - 1 >= 0 && allowedPartsMap.get("left").includes(this.hikingMap.at(y).at(x - 1))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y, x - 1]))) {
                possibleNextIndices.push([y, x - 1])
            }
        }
        if (x + 1 < this.hikingMap.at(0).length && allowedPartsMap.get("right").includes(this.hikingMap.at(y).at(x + 1))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y, x + 1]))) {
                possibleNextIndices.push([y, x + 1])
            }
        }
        return possibleNextIndices
    }

    doStep(path: Path, nextStep: number[]) {
        // path.path.push(path.currentIndex)
        path.pathLength+=1
        path.currentIndex = nextStep
    }

    findPaths(allowedParts: Map<string, string[]>) {
        let startingIndex = [0, 1]
        let targetIndex = [this.hikingMap.length - 1, this.hikingMap.at(0).length - 2]
        let paths = [<Path>{currentIndex: startingIndex, path: [], pathLength:0}]
        let finalPathLength = 0
        while (paths.length > 0) {
            let newPaths: Path[] = []
            paths.forEach(path => {
                if (path.currentIndex.toString() != targetIndex.toString()) {
                    let nextSteps = this.getPossibleNextSteps(path, allowedParts)
                    while (nextSteps.length == 1 && JSON.stringify(path.currentIndex) != JSON.stringify(targetIndex)) {
                        this.doStep(path, nextSteps.at(0))
                        nextSteps = this.getPossibleNextSteps(path, allowedParts)
                    }
                    if (nextSteps.length > 1) {
                        path.path.push(path.currentIndex)
                        this.doStep(path, nextSteps.at(0))
                        nextSteps.slice(1).forEach(step => {
                            let newPath = <Path>{currentIndex: step, path: JSON.parse(JSON.stringify(path.path)), pathLength:JSON.parse(JSON.stringify(path.pathLength))}
                            newPaths.push(newPath)
                        })
                        newPaths.push(path)
                    }
                    if (path.currentIndex.toString() === targetIndex.toString()) {
                        finalPathLength = finalPathLength>path.pathLength?finalPathLength:path.pathLength
                    }
                }
            })
            paths = newPaths
        }
        return finalPathLength
    }

    partOne() {
        let finalPathLength = this.findPaths(allowedTilesPartOne)
        console.log(`Solution Part One: ${finalPathLength}`)
    }

    partTwo() {
        let finalPathLength = this.findPaths(allowedTilesPartTwo)
        console.log(`Solution Part Two: ${finalPathLength}`)
    }

}

const solutionDayTwentyThree = new SolutionDayTwentyThree("input.txt")
solutionDayTwentyThree.partOne()
solutionDayTwentyThree.partTwo()
