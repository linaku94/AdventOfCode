"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Path = /** @class */ (function () {
    // visitedNodes: number[][]
    function Path(x, y, xDirCount, yDirCount, score, visitedNodes) {
        this.x = x;
        this.y = y;
        this.credit = 0;
        this.YdirectionCount = yDirCount ? yDirCount : 0;
        this.XdirectionCount = xDirCount ? xDirCount : 0;
        this.score = score ? score : 0;
        // this.visitedNodes=visitedNodes?visitedNodes:[[0,0]]
    }
    Path.prototype.move = function (newX, newY) {
        // this.visitedNodes.push([this.x, this.y])
        if (newX !== this.x) {
            this.XdirectionCount += newX - this.x > 0 ? 1 : -1;
            this.YdirectionCount = 0;
            this.x = newX;
        }
        if (newY !== this.y) {
            this.YdirectionCount += newY - this.y > 0 ? 1 : -1;
            this.XdirectionCount = 0;
            this.y = newY;
        }
    };
    Path.prototype.clone = function () {
        return new Path(+this.x.toString(), +this.y.toString(), +this.XdirectionCount.toString(), +this.YdirectionCount.toString(), +this.score.toString());
    };
    return Path;
}());
var Grid = /** @class */ (function () {
    function Grid() {
        this.grid = [];
    }
    Grid.prototype.computeDims = function () {
        this.xDim = this.grid.at(0).length;
        this.yDim = this.grid.length;
    };
    Grid.prototype.get = function (x, y) {
        return this.grid.at(y).at(x);
    };
    return Grid;
}());
var SolutionDaySevenTeen = /** @class */ (function () {
    function SolutionDaySevenTeen(filename) {
        this.grid = new Grid;
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
        ]);
        this.readInput(filename);
    }
    SolutionDaySevenTeen.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (line, index) {
            _this.grid.grid.push([]);
            _this.visited.forEach(function (grid) { grid.grid.push([]); });
            line.split("").forEach(function (char) {
                _this.grid.grid.at(index).push(+char);
                _this.visited.forEach(function (grid) { grid.grid.at(index).push(false); });
            });
        });
        this.visited.forEach(function (grid) { grid.grid.at(0)[0] = true; });
        this.grid.computeDims();
    };
    SolutionDaySevenTeen.prototype.getPossibleNeighbours = function (path) {
        var pathDir = [path.XdirectionCount, path.YdirectionCount].join("");
        var neighbours = [];
        if (path.x - 1 >= 0 && path.XdirectionCount > -3 && !this.visited.get(pathDir).get(path.x - 1, path.y)) {
            neighbours.push({ x: path.x - 1, y: path.y });
        }
        if (path.x + 1 < this.grid.xDim && path.XdirectionCount < 3 && !this.visited.get(pathDir).get(path.x + 1, path.y)) {
            neighbours.push({ x: path.x + 1, y: path.y });
        }
        if (path.y - 1 >= 0 && path.YdirectionCount > -3 && !this.visited.get(pathDir).get(path.x, path.y - 1)) {
            neighbours.push({ x: path.x, y: path.y - 1 });
        }
        if (path.y + 1 < this.grid.yDim && path.YdirectionCount < 3 && !this.visited.get(pathDir).get(path.x, path.y + 1)) {
            neighbours.push({ x: path.x, y: path.y + 1 });
        }
        // if (path.x-1>=0&&path.XdirectionCount>-3&&path.visitedNodes.at(-1).at(0)!=path.x-1) {neighbours.push({x: path.x-1, y: path.y})}
        // if (path.x+1<this.grid.xDim&&path.XdirectionCount<3&&path.visitedNodes.at(-1).at(0)!=path.x+1) {neighbours.push({x:path.x+1, y:path.y})}
        // if (path.y-1>=0&&path.YdirectionCount>-3&&path.visitedNodes.at(-1).at(1)!=path.y-1) {neighbours.push({x:path.x, y:path.y-1})}
        // if (path.y+1<this.grid.yDim&&path.YdirectionCount<3&&path.visitedNodes.at(-1).at(1)!=path.y+1) {neighbours.push({x:path.x, y:path.y+1})}
        return neighbours;
    };
    SolutionDaySevenTeen.prototype.findBestPath = function () {
        var _this = this;
        var paths = [new Path(0, 0)];
        var totScore = 0;
        // while(!this.visited.get(this.visited.xDim-1, this.visited.yDim-1)){
        while (!paths.map(function (path) { return path.x === _this.grid.xDim - 1 && path.y === _this.grid.yDim - 1; }).includes(true)) {
            // for (let i=0; i<100;i++){
            var newPaths = [];
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var path_1 = paths_1[_i];
                path_1.credit++;
                var neighbours = this.getPossibleNeighbours(path_1);
                for (var _a = 0, neighbours_1 = neighbours; _a < neighbours_1.length; _a++) {
                    var neighbour = neighbours_1[_a];
                    if (this.grid.get(neighbour.x, neighbour.y) === path_1.credit) {
                        var pathDir = [path_1.XdirectionCount, path_1.YdirectionCount].join("");
                        var newPath = path_1.clone();
                        newPath.move(neighbour.x, neighbour.y);
                        newPath.score += this.grid.get(newPath.x, newPath.y);
                        newPaths.push(newPath);
                        this.visited.get(pathDir).grid.at(neighbour.y)[neighbour.x] = true;
                    }
                }
                if (this.getPossibleNeighbours(path_1).length > 0) {
                    newPaths.push(path_1);
                }
            }
            paths = newPaths;
            console.log(newPaths.length);
            // console.log(paths[0].visitedNodes.map(node=> this.grid.get(node[0], node[1])).reduce((p,c) => p+c))
            totScore++;
        }
        // console.log(paths.map(path=>path.x===this.grid.xDim-1&&path.y===this.grid.yDim-1?path.score:-1))
        console.log(totScore);
    };
    SolutionDaySevenTeen.prototype.partOne = function () {
        this.findBestPath();
        console.log("Solution Part One: ");
    };
    SolutionDaySevenTeen.prototype.partTwo = function () {
        console.log("Solution Part Two: ");
    };
    return SolutionDaySevenTeen;
}());
var solutionDaySevenTeen = new SolutionDaySevenTeen("input2.txt");
solutionDaySevenTeen.partOne();
solutionDaySevenTeen.partTwo();
