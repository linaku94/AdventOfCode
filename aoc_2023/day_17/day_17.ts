import * as fs from "fs";

interface Point {
    x: number
    y: number
}

class Path {
    x: number
    y: number
    credit: number
    XdirectionCount: number
    YdirectionCount: number
    score:number
    // visitedNodes: number[][]

    constructor(x: number, y:number, xDirCount?: number, yDirCount?:number, score?:number, visitedNodes?:number[][]) {
        this.x = x
        this.y = y
        this.credit=0
        this.YdirectionCount=yDirCount?yDirCount:0
        this.XdirectionCount=xDirCount?xDirCount:0
        this.score=score?score:0
        // this.visitedNodes=visitedNodes?visitedNodes:[[0,0]]
    }

    move(newX: number, newY:number) {
        // this.visitedNodes.push([this.x, this.y])
        if (newX!==this.x) {this.XdirectionCount+=newX-this.x>0?1:-1; this.YdirectionCount=0; this.x = newX}
        if (newY!==this.y) {this.YdirectionCount+=newY-this.y>0?1:-1; this.XdirectionCount=0; this.y = newY}
    }

    clone() {
        return new Path(+this.x.toString(), +this.y.toString(), +this.XdirectionCount.toString(),
            +this.YdirectionCount.toString(), +this.score.toString(),
            // JSON.parse(JSON.stringify(this.visitedNodes))
        )
    }
}

class Grid {
    grid: any[][]
    xDim: number
    yDim: number

    constructor() {
        this.grid = []
    }


    computeDims() {
        this.xDim = this.grid.at(0).length
        this.yDim = this.grid.length
    }

    get(x: number, y: number) {
        return this.grid.at(y).at(x)
    }
}

class SolutionDaySevenTeen {
    grid: Grid
    visited: Map<string,Grid>

    constructor(filename: string) {
        this.grid = new Grid
        this.visited = new Map([
            ["00", new Grid()],
            ["01", new Grid()],
            ["02", new Grid()],
            ["03", new Grid()],
            ["0-1", new Grid()],
            ["0-2", new Grid()],
            ["0-3", new Grid()],
            ["10", new Grid()],
            ["20", new Grid()],
            ["30", new Grid()],
            ["-10", new Grid()],
            ["-20", new Grid()],
            ["-30", new Grid()],
        ])
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0,-1).forEach((line, index) => {
            this.grid.grid.push([])
            this.visited.forEach(grid => {grid.grid.push([])})
            line.split("").forEach(char => {
                this.grid.grid.at(index).push(+char)
                this.visited.forEach(grid => {grid.grid.at(index).push(false)})
            })
        })
        this.visited.forEach(grid => {grid.grid.at(0)[0] = true})
        this.grid.computeDims()
    }


    getPossibleNeighbours(path: Path) {
        let pathDir = [path.XdirectionCount,path.YdirectionCount].join("")
        let neighbours: Point[] = []
        if (path.x-1>=0&&path.XdirectionCount>-3&&!this.visited.get(pathDir).get(path.x-1, path.y)) {neighbours.push({x: path.x-1, y: path.y})}
        if (path.x+1<this.grid.xDim&&path.XdirectionCount<3&&!this.visited.get(pathDir).get(path.x+1, path.y)) {neighbours.push({x:path.x+1, y:path.y})}
        if (path.y-1>=0&&path.YdirectionCount>-3&&!this.visited.get(pathDir).get(path.x, path.y-1)) {neighbours.push({x:path.x, y:path.y-1})}
        if (path.y+1<this.grid.yDim&&path.YdirectionCount<3&&!this.visited.get(pathDir).get(path.x,path.y+1)) {neighbours.push({x:path.x, y:path.y+1})}
        // if (path.x-1>=0&&path.XdirectionCount>-3&&path.visitedNodes.at(-1).at(0)!=path.x-1) {neighbours.push({x: path.x-1, y: path.y})}
        // if (path.x+1<this.grid.xDim&&path.XdirectionCount<3&&path.visitedNodes.at(-1).at(0)!=path.x+1) {neighbours.push({x:path.x+1, y:path.y})}
        // if (path.y-1>=0&&path.YdirectionCount>-3&&path.visitedNodes.at(-1).at(1)!=path.y-1) {neighbours.push({x:path.x, y:path.y-1})}
        // if (path.y+1<this.grid.yDim&&path.YdirectionCount<3&&path.visitedNodes.at(-1).at(1)!=path.y+1) {neighbours.push({x:path.x, y:path.y+1})}
        return neighbours
    }

    findBestPath() {
        let paths = [new Path(0,0)]
        let totScore = 0
        // while(!this.visited.get(this.visited.xDim-1, this.visited.yDim-1)){
        while(!paths.map(path => path.x===this.grid.xDim-1&&path.y===this.grid.yDim-1).includes(true)){
        // for (let i=0; i<100;i++){
            let newPaths = []
            for (let path of paths) {
                path.credit++
                let neighbours = this.getPossibleNeighbours(path)
                for (let neighbour of neighbours) {
                    if (this.grid.get(neighbour.x, neighbour.y)===path.credit) {
                        let pathDir = [path.XdirectionCount,path.YdirectionCount].join("")
                        let newPath = path.clone()
                        newPath.move(neighbour.x, neighbour.y)
                        newPath.score+= this.grid.get(newPath.x, newPath.y)
                        newPaths.push(newPath)
                        this.visited.get(pathDir).grid.at(neighbour.y)[neighbour.x] = true
                    }
                }
                if (this.getPossibleNeighbours(path).length>0) {newPaths.push(path)}
            }
            paths = newPaths
            totScore++
        }
    console.log(totScore)
    }


    partOne() {
        this.findBestPath()
        console.log(`Solution Part One: `)
    }

    partTwo() {
        console.log(`Solution Part Two: `)
    }

}

const solutionDaySevenTeen = new SolutionDaySevenTeen("input2.txt")
solutionDaySevenTeen.partOne()
solutionDaySevenTeen.partTwo()
