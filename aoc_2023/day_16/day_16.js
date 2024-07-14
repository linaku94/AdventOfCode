"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SolutionDaysixTeen = /** @class */ (function () {
    function SolutionDaysixTeen(filename) {
        this.beamHeads = [{
                position: [0, 0],
                orientation: "o"
            }];
        this.grid = [];
        this.readInput(filename);
    }
    SolutionDaysixTeen.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (line, index) {
            _this.grid.push([]);
            line.split("").forEach(function (char) {
                _this.grid.at(index).push(char);
            });
        });
        console.log(this.grid);
    };
    SolutionDaysixTeen.prototype.partOne = function () {
        console.log("Solution Part One: ");
    };
    SolutionDaysixTeen.prototype.partTwo = function () {
        console.log("Solution Part Two: ");
    };
    return SolutionDaysixTeen;
}());
var solutionDaysixTeen = new SolutionDaysixTeen("test.txt");
solutionDaysixTeen.partOne();
solutionDaysixTeen.partTwo();
