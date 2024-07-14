import * as fs from "fs";

class BeamHead {
    position: number[]
    orientation: "n"|"o"|"s"|"w"
    terminated: boolean

    constructor(position, orientation) {
        this.orientation = orientation
        this.position = position
        this.terminated = false
    }

    propagate(newTile: string){

    }

}

class SolutionDaysixTeen {
    beamHeads: BeamHead[]
    grid: string[][]
    activatedGrid: boolean[][]

    constructor(filename: string) {
        this.beamHeads = [new BeamHead([0,0],"o")]
        this.grid = []
        this.activatedGrid = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
            lines.slice(0,-1).forEach((line, index) => {
                this.grid.push([])
                this.activatedGrid.push([])
                line.split("").forEach(char =>{
                    this.grid.at(index).push(char)
                    this.activatedGrid.at(index).push(false)
                })
            })
        console.log(this.grid)
    }

    step(beamHead: BeamHead){
        let x = beamHead.position.at(1)
        let y = beamHead.position.at(0)
        switch (beamHead.orientation) {
            case "o": {
                if (x+1>this.grid.at(0).length) {beamHead.terminated=true; break;}
                let nextTile = this.grid.at(y).at(x+1)
                break;
            }
            case "s":{
                if (y+1>this.grid.length) {beamHead.terminated=true; break;}
                let nextTile = this.grid.at(y+1).at(x)
                break;
            }
            case "w":{
                if (x-1<0) {beamHead.terminated=true; break;}
                let nextTile = this.grid.at(y).at(x-1)
                break;
            }
            case "n":{
                if (y-1<0) {beamHead.terminated=true; break;}
                let nextTile = this.grid.at(y-1).at(x)
                break;
            }
        }
    }

    partOne() {
        console.log(`Solution Part One: `)
    }

    partTwo() {
        console.log(`Solution Part Two: `)
    }

}

const solutionDaysixTeen = new SolutionDaysixTeen("test.txt")
solutionDaysixTeen.partOne()
solutionDaysixTeen.partTwo()
