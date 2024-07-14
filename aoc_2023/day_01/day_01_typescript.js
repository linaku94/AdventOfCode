"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionDayOne = exports.findAllMatches = void 0;
var fs = require("fs");
function findAllMatches(pattern, line) {
    var match = pattern.exec(line);
    var matches = [];
    while (match) {
        matches.push(match[0]);
        match = pattern.exec(line);
    }
    return matches;
}
exports.findAllMatches = findAllMatches;
var SolutionDayOne = /** @class */ (function () {
    function SolutionDayOne() {
    }
    SolutionDayOne.prototype.readInput = function () {
        return fs.readFileSync("input.txt", "utf-8").split(/\n/);
    };
    SolutionDayOne.prototype.getCalibrationValue = function (numbers) {
        return this.stringToNumber(numbers.at(0)) * 10 + this.stringToNumber(numbers.at(-1));
    };
    SolutionDayOne.prototype.stringToNumber = function (stringNumber) {
        var numberLiterals = new Map([
            ["one", 1], ["two", 2], ["three", 3], ["four", 4], ["five", 5], ["six", 6], ["seven", 7], ["eight", 8], ["nine", 9], ["zero", 0]
        ]);
        return numberLiterals.has(stringNumber) ? (numberLiterals.get(stringNumber)) : (+stringNumber);
    };
    SolutionDayOne.prototype.computeSolution = function (pattern) {
        var _this = this;
        var numbersInLines = this.readInput().map(function (value, index) { return findAllMatches(pattern, value); });
        var calibrationValues = numbersInLines.map(function (value, index) { return _this.getCalibrationValue(value); });
        return calibrationValues.reduce(function (sum, p) { return sum + p; });
    };
    SolutionDayOne.prototype.partOne = function () {
        var patternPartOne = new RegExp(/\d/, "g");
        return this.computeSolution(patternPartOne);
    };
    SolutionDayOne.prototype.partTwo = function () {
        var patternPartTwo = new RegExp(/(?=(one|two|three|four|five|six|seven|eight|nine|zero|\d))/, "g");
        return this.computeSolution(patternPartTwo);
    };
    return SolutionDayOne;
}());
exports.SolutionDayOne = SolutionDayOne;
var solutionDayOne = new SolutionDayOne();
console.log(solutionDayOne.partOne());
console.log(solutionDayOne.partTwo());
