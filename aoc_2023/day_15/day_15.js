"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SolutionDayFifteen = /** @class */ (function () {
    function SolutionDayFifteen(filename) {
        this.boxes = new Map(Array.from(Array(256).keys()).map(function (value, index) { return [value, new Map]; }));
        this.instructions = [];
        this.readInput(filename);
    }
    SolutionDayFifteen.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/,/);
        lines.forEach(function (value) {
            _this.instructions.push(value);
        });
    };
    SolutionDayFifteen.prototype.computeHash = function (word) {
        var res = 0;
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var letter = word_1[_i];
            res += letter.charCodeAt(0);
            res *= 17;
            res %= 256;
        }
        return res;
    };
    SolutionDayFifteen.prototype.performInstruction = function (instruction) {
        var instructionList = instruction.split(new RegExp(/([=\-])/));
        var focalLength = +instructionList[2];
        var boxLabel = instructionList[0];
        var boxNumber = this.computeHash(instructionList[0]);
        if (instruction.includes("=")) {
            this.boxes.get(boxNumber).set(boxLabel, focalLength);
        }
        if (instruction.includes("-")) {
            if (this.boxes.get(boxNumber).has(boxLabel)) {
                this.boxes.get(boxNumber).delete(boxLabel);
            }
        }
    };
    SolutionDayFifteen.prototype.computeFocusingPower = function () {
        var results = 0;
        this.boxes.forEach(function (boxContent, boxNumber) {
            var i = 1;
            boxContent.forEach(function (focalLength, lense) {
                results += focalLength * i * (boxNumber + 1);
                i++;
            });
        });
        return results;
    };
    SolutionDayFifteen.prototype.partOne = function () {
        var _this = this;
        console.log("Solution Part One: ".concat(this.instructions.map(function (value) { return _this.computeHash(value); }).reduce(function (c, p) { return c + p; })));
    };
    SolutionDayFifteen.prototype.partTwo = function () {
        var _this = this;
        this.instructions.forEach(function (instruction) {
            _this.performInstruction(instruction);
        });
        console.log(this.boxes);
        console.log("Solution Part Two: ".concat(this.computeFocusingPower()));
    };
    return SolutionDayFifteen;
}());
var solutionDayFifteen = new SolutionDayFifteen("input.txt");
solutionDayFifteen.partOne();
solutionDayFifteen.partTwo();
