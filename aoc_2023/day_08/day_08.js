"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function gcd(a, b) {
    if (b === 0)
        return a;
    return gcd(b, a % b);
}
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
var SolutionDayEight = /** @class */ (function () {
    function SolutionDayEight(filename) {
        this.readInput(filename);
    }
    SolutionDayEight.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        this.instructions = lines[0].split("");
        this.graph = new Map;
        this.locations = [];
        var pattern = new RegExp(/A$/);
        lines.slice(2, -1).forEach(function (line, index) {
            var location = line.split(" = ")[0];
            _this.graph.set(location, line.split("(")[1].split(")")[0].split(", "));
            if (pattern.test(location)) {
                _this.locations.push(location);
            }
        });
    };
    SolutionDayEight.prototype.performInstruction = function (location, instruction) {
        return (instruction == "L") ? this.graph.get(location)[0] : this.graph.get(location)[1];
    };
    SolutionDayEight.prototype.partOne = function (start, endpattern) {
        var counter = 0;
        while (!endpattern.test(start)) {
            start = this.performInstruction(start, this.instructions[counter % this.instructions.length]);
            counter += 1;
        }
        console.log("Solution Part One: ".concat(counter));
        return counter;
    };
    SolutionDayEight.prototype.partTwo = function () {
        var _this = this;
        console.log(this.locations);
        var counters = this.locations.map(function (value) { return _this.partOne(value, /Z$/); });
        console.log("Solution Part Two: ".concat(counters.reduce(function (a, b) { return lcm(a, b); }, 1)));
    };
    return SolutionDayEight;
}());
var solutionDayEight = new SolutionDayEight("input.txt");
solutionDayEight.partOne("AAA", /ZZZ/);
solutionDayEight.partTwo();
