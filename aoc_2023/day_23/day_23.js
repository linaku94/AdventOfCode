"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var allowedTilesPartOne = new Map([
    ["top", [".", "^"]],
    ["left", [".", "<"]],
    ["right", [".", ">"]],
    ["bottom", [".", "v"]],
]);
var allowedTilesPartTwo = new Map([
    ["top", [".", "^", "v", ">", "<"]],
    ["left", [".", "^", "v", ">", "<"]],
    ["right", [".", "^", "v", ">", "<"]],
    ["bottom", [".", "^", "v", ">", "<"]],
]);
var SolutionDayTwentyThree = /** @class */ (function () {
    function SolutionDayTwentyThree(filename) {
        this.hikingMap = [];
        this.readInput(filename);
    }
    SolutionDayTwentyThree.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (line, lineIndex) {
            _this.hikingMap.push([]);
            line.split("").forEach(function (tile, tileIndex) {
                _this.hikingMap[lineIndex].push(tile);
            });
        });
    };
    SolutionDayTwentyThree.prototype.getPossibleNextSteps = function (path, allowedPartsMap) {
        var y = path.currentIndex.at(0);
        var x = path.currentIndex.at(1);
        var possibleNextIndices = [];
        if (y - 1 >= 0 && allowedPartsMap.get("top").includes(this.hikingMap.at(y - 1).at(x))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y - 1, x]))) {
                possibleNextIndices.push([y - 1, x]);
            }
        }
        if (y + 1 < this.hikingMap.length && allowedPartsMap.get("bottom").includes(this.hikingMap.at(y + 1).at(x))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y + 1, x]))) {
                possibleNextIndices.push([y + 1, x]);
            }
        }
        if (x - 1 >= 0 && allowedPartsMap.get("left").includes(this.hikingMap.at(y).at(x - 1))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y, x - 1]))) {
                possibleNextIndices.push([y, x - 1]);
            }
        }
        if (x + 1 < this.hikingMap.at(0).length && allowedPartsMap.get("right").includes(this.hikingMap.at(y).at(x + 1))) {
            if (!JSON.stringify(path.path).includes(JSON.stringify([y, x + 1]))) {
                possibleNextIndices.push([y, x + 1]);
            }
        }
        return possibleNextIndices;
    };
    SolutionDayTwentyThree.prototype.doStep = function (path, nextStep) {
        // path.path.push(path.currentIndex)
        path.pathLength += 1;
        path.currentIndex = nextStep;
    };
    SolutionDayTwentyThree.prototype.findPaths = function (allowedParts) {
        var _this = this;
        var startingIndex = [0, 1];
        var targetIndex = [this.hikingMap.length - 1, this.hikingMap.at(0).length - 2];
        var paths = [{ currentIndex: startingIndex, path: [], pathLength: 0 }];
        var finalPathLength = 0;
        var _loop_1 = function () {
            var newPaths = [];
            paths.forEach(function (path) {
                if (path.currentIndex.toString() != targetIndex.toString()) {
                    var nextSteps = _this.getPossibleNextSteps(path, allowedParts);
                    while (nextSteps.length == 1 && JSON.stringify(path.currentIndex) != JSON.stringify(targetIndex)) {
                        _this.doStep(path, nextSteps.at(0));
                        nextSteps = _this.getPossibleNextSteps(path, allowedParts);
                    }
                    if (nextSteps.length > 1) {
                        path.path.push(path.currentIndex);
                        _this.doStep(path, nextSteps.at(0));
                        nextSteps.slice(1).forEach(function (step) {
                            var newPath = { currentIndex: step, path: JSON.parse(JSON.stringify(path.path)), pathLength: JSON.parse(JSON.stringify(path.pathLength)) };
                            newPaths.push(newPath);
                        });
                        newPaths.push(path);
                    }
                    if (path.currentIndex.toString() === targetIndex.toString()) {
                        finalPathLength = finalPathLength > path.pathLength ? finalPathLength : path.pathLength;
                    }
                }
            });
            paths = newPaths;
            console.log(paths.length);
        };
        while (paths.length > 0) {
            _loop_1();
        }
        return finalPathLength;
    };
    SolutionDayTwentyThree.prototype.partOne = function () {
        var finalPathLength = this.findPaths(allowedTilesPartOne);
        console.log("Solution Part One: ".concat(finalPathLength));
    };
    SolutionDayTwentyThree.prototype.partTwo = function () {
        var finalPathLength = this.findPaths(allowedTilesPartTwo);
        console.log("Solution Part Two: ".concat(finalPathLength));
    };
    return SolutionDayTwentyThree;
}());
var solutionDayTwentyThree = new SolutionDayTwentyThree("input.txt");
solutionDayTwentyThree.partOne();
solutionDayTwentyThree.partTwo();
