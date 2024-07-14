"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SolutionDayThirteen = /** @class */ (function () {
    function SolutionDayThirteen(filename) {
        this.field = [];
        this.readInput(filename);
    }
    SolutionDayThirteen.prototype.logField = function () {
        console.log("".concat(this.field.join("\n"), "\n"));
    };
    SolutionDayThirteen.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (fieldline) {
            _this.field.push(fieldline);
        });
        this.logField();
    };
    SolutionDayThirteen.prototype.rotateClockwise = function () {
        var listField = this.field.map(function (line) { return line.split(""); });
        listField = listField[0].map(function (col, colIndex) { return listField.map(function (row) { return row[colIndex]; }); });
        this.field = listField.map(function (line) { return line.reverse().join(""); });
    };
    SolutionDayThirteen.prototype.tiltToTop = function () {
        var _loop_1 = function (lineIndex) {
            var fieldline = this_1.field.map(function (line) { return line.at(lineIndex); });
            var emptySpot = -1;
            fieldline.forEach(function (item, itemIndex) {
                if (item == "." && emptySpot == -1) {
                    emptySpot = itemIndex;
                }
                else if (item == "#") {
                    emptySpot = -1;
                }
                else if (item == "O" && emptySpot != -1) {
                    fieldline[emptySpot] = item;
                    fieldline[itemIndex] = ".";
                    emptySpot += 1;
                }
            });
            this_1.field = this_1.field.map(function (value, index) {
                var values = value.split("");
                values[lineIndex] = fieldline[index];
                return values.join("");
            });
        };
        var this_1 = this;
        for (var lineIndex = 0; lineIndex < this.field.at(0).length; lineIndex++) {
            _loop_1(lineIndex);
        }
    };
    SolutionDayThirteen.prototype.performCycle = function () {
        for (var i = 0; i < 4; i++) {
            this.tiltToTop();
            this.rotateClockwise();
        }
    };
    SolutionDayThirteen.prototype.getLoad = function () {
        return this.field.map(function (line, index) { return (line.split("O").length - 1) * (line.length - index); }).reduce(function (prev, cur) { return prev + cur; });
    };
    SolutionDayThirteen.prototype.partOne = function () {
        this.tiltToTop();
        console.log("Solution Part One: ".concat(this.getLoad()));
    };
    SolutionDayThirteen.prototype.partTwo = function () {
        var _this = this;
        var loads = [];
        var iterations = 1000000000;
        for (var i = 0; i < iterations; i++) {
            if (loads.includes(this.field.join(""))) {
                console.log(i);
                break;
            }
            loads.push(this.field.join(""));
            this.performCycle();
        }
        var period = loads.length - loads.findIndex(function (value) { return value == _this.field.join(""); });
        for (var i = 0; i < ((iterations - loads.length) % period); i++) {
            this.performCycle();
        }
        console.log("Solution Part Two: ".concat(this.getLoad()));
    };
    return SolutionDayThirteen;
}());
var solutionDayThirteen = new SolutionDayThirteen("input.txt");
solutionDayThirteen.partOne();
solutionDayThirteen.partTwo();
