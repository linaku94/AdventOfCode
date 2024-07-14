"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionDayThree = void 0;
var fs = require("fs");
function findAllMatchIndices(pattern, line) {
    pattern.lastIndex = 0;
    var match = pattern.exec(line);
    var matchIndices = [];
    while (match) {
        matchIndices.push(match.index);
        match = pattern.exec(line);
    }
    return matchIndices;
}
var SolutionDayThree = /** @class */ (function () {
    function SolutionDayThree(inputFilename) {
        this.numberArray = this.readInputAndPad(inputFilename);
    }
    SolutionDayThree.prototype.readInputAndPad = function (filename) {
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/).map(function (value) { return value.padEnd(value.length + 1, ".").padStart(value.length + 2, "."); });
        lines.push(new Array(lines[0].length + 1).join("."));
        lines.unshift(new Array(lines[0].length + 1).join("."));
        return lines;
    };
    SolutionDayThree.prototype.findValidNumbers = function (controlPattern) {
        var _this = this;
        var numberRegExp = new RegExp(/\d+/, "g");
        var validNumbers = [];
        var signIndicesToNeighouringNumbers = new Map;
        this.numberArray.slice(1, -1).forEach(function (line, index) {
            index += 1;
            var match = numberRegExp.exec(line);
            while (match) {
                var matchIndices = [];
                var _loop_1 = function (idx) {
                    matchIndices = matchIndices.concat(findAllMatchIndices(controlPattern, _this.numberArray[idx].slice(match.index - 1, match.index + match[0].length + 1)).map(function (value) { return [idx, value + match.index - 1]; }));
                };
                for (var _i = 0, _a = [index - 1, index, index + 1]; _i < _a.length; _i++) {
                    var idx = _a[_i];
                    _loop_1(idx);
                }
                if (matchIndices.length > 0) {
                    validNumbers.push(+match[0]);
                    signIndicesToNeighouringNumbers.has(matchIndices[0].toString()) ? signIndicesToNeighouringNumbers.get(matchIndices[0].toString()).push(+match[0]) : signIndicesToNeighouringNumbers.set(matchIndices[0].toString(), [+match[0]]);
                }
                match = numberRegExp.exec(line);
            }
        });
        return { validNumbers: validNumbers, signIndicesToNeighbouringNumbers: signIndicesToNeighouringNumbers };
    };
    SolutionDayThree.prototype.findGearRatios = function () {
        var validNumbersAndGearIndices = this.findValidNumbers(new RegExp(/\*/, "g"));
        var result = 0;
        validNumbersAndGearIndices.signIndicesToNeighbouringNumbers.forEach(function (neighbourNumbers, indices) {
            if (neighbourNumbers.length == 2) {
                result += neighbourNumbers[0] * neighbourNumbers[1];
            }
        });
        return result;
    };
    SolutionDayThree.prototype.partOne = function () {
        console.log("part one: ".concat(this.findValidNumbers(new RegExp(/[^.d]/, "g")).validNumbers.reduce(function (sum, current) { return sum + current; }, 0)));
    };
    SolutionDayThree.prototype.partTwo = function () {
        console.log("part two ".concat(this.findGearRatios()));
    };
    return SolutionDayThree;
}());
exports.SolutionDayThree = SolutionDayThree;
var solutionDayThree = new SolutionDayThree("input.txt");
solutionDayThree.partOne();
solutionDayThree.partTwo();
