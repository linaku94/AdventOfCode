"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SolutionDayTwelve = /** @class */ (function () {
    function SolutionDayTwelve(filename) {
        this.lines = [];
        this.patterns = [];
        this.readInput(filename);
    }
    SolutionDayTwelve.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (value) {
            _this.lines.push(value.split(" ")[0]);
            _this.patterns.push(value.split(" ").at(-1).split(",").map(function (value) { return +value; }));
        });
    };
    SolutionDayTwelve.prototype.getAllPermutations = function (line) {
        var stringArray = line.split("");
        var resultArray = [''];
        stringArray.forEach(function (sign) {
            var tempArray = [];
            if (sign == "?") {
                resultArray.forEach(function (value) {
                    tempArray.push(value + '.');
                    tempArray.push(value + '#');
                });
            }
            else {
                resultArray.forEach(function (value) {
                    tempArray.push(value + sign);
                });
            }
            resultArray = tempArray;
        });
        return resultArray;
    };
    SolutionDayTwelve.prototype.createRegExp = function (instruction) {
        var pattern = '^[\\.]*';
        instruction.forEach(function (value, index) {
            pattern += "[#]{".concat(value.toString(), "}");
            pattern += index != instruction.length - 1 ? '[\\.]+' : '[\\.]*$';
        });
        return new RegExp(pattern);
    };
    SolutionDayTwelve.prototype.unfold = function (instruction, joinString) {
        var instructions = [];
        for (var i = 0; i < 5; i++) {
            instructions.push(instruction);
        }
        return instructions.join(joinString);
    };
    SolutionDayTwelve.prototype.scaleArray = function (numberArray) {
        var numbers = [];
        for (var i = 0; i < 5; i++) {
            numbers.push(numberArray);
        }
        return numbers;
    };
    SolutionDayTwelve.prototype.partOne = function () {
        var _this = this;
        var result = 0;
        this.lines.forEach(function (instruction, index) {
            var permutations = _this.getAllPermutations(instruction);
            var pattern = _this.createRegExp(_this.patterns.at(index));
            permutations.forEach(function (perm) {
                result += pattern.test(perm) ? 1 : 0;
            });
        });
        console.log("Solution Part One: ".concat(result));
    };
    SolutionDayTwelve.prototype.partTwo = function () {
        var _this = this;
        var result = 0;
        this.lines.forEach(function (instruction, index) {
            var permutations = _this.getAllPermutations(_this.unfold(instruction, "?"));
            var pattern = _this.createRegExp(_this.scaleArray(_this.patterns.at(index)));
            permutations.forEach(function (perm) {
                result += pattern.test(perm) ? 1 : 0;
            });
        });
        console.log("Solution Part Two: ".concat(result));
    };
    return SolutionDayTwelve;
}());
var solutionDayTwelve = new SolutionDayTwelve("test.txt");
solutionDayTwelve.partOne();
solutionDayTwelve.partTwo();
