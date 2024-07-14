"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SolutionDayThirteen = /** @class */ (function () {
    function SolutionDayThirteen(filename) {
        this.fields = [];
        this.verticalIndices = [];
        this.horizontalIndices = [];
        this.readInput(filename);
    }
    SolutionDayThirteen.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n\n/);
        lines.forEach(function (field, index) {
            var fieldArray = { field: [] };
            field.split(/\n/).forEach(function (fieldvalue) {
                if (fieldvalue == "") {
                    return;
                }
                fieldArray.field.push(fieldvalue);
            });
            _this.fields.push(fieldArray);
        });
    };
    SolutionDayThirteen.prototype.findVerticalMirror = function (field) {
        var results = [];
        var _loop_1 = function (index) {
            var left = field.field.map(function (value) { return value.slice(0, index); });
            var right = field.field.map(function (value) { return value.slice(index).split("").reverse().join(""); });
            var rightInLeft = left.map(function (value, leftindex) { return value.slice(index - right.at(leftindex).length) == (right.at(leftindex)); }).reduce(function (a, b) { return a && b; });
            var LeftInRight = right.map(function (value, rightindex) { return value.slice(right.at(rightindex).length - left.at(rightindex).length) == (left.at(rightindex)); }).reduce(function (a, b) { return a && b; });
            if (rightInLeft || LeftInRight) {
                results.push(index);
            }
        };
        for (var index = 1; index < field.field.at(0).length; index++) {
            _loop_1(index);
        }
        return results.length > 0 ? results : [0];
    };
    SolutionDayThirteen.prototype.findHorizontalMirror = function (field) {
        var results = [];
        var fieldLength = field.field.length;
        var _loop_2 = function (index) {
            var top_1 = field.field.slice(0, index);
            var bottom = field.field.slice(index, 2 * index).reverse();
            if (top_1.slice(top_1.length - bottom.length).map(function (value, topindex) { return bottom.at(topindex) == value; }).reduce(function (a, b) { return a && b; }) || bottom.map(function (value, bottomindex) { return top_1.at(top_1.length - bottomindex) == value; }).reduce(function (a, b) { return a && b; })) {
                results.push(index);
            }
        };
        for (var index = 1; index < fieldLength; index++) {
            _loop_2(index);
        }
        return results.length > 0 ? results : [0];
    };
    SolutionDayThirteen.prototype.partOne = function () {
        var _this = this;
        this.fields.forEach(function (field, index) {
            var verticalMirror = _this.findVerticalMirror(field).at(0);
            _this.verticalIndices.push(verticalMirror);
            var horizontalMirror = _this.findHorizontalMirror(field).at(0);
            _this.horizontalIndices.push(horizontalMirror);
        });
        console.log("Solution Part One: ".concat(this.verticalIndices.reduce(function (prev, current) { return prev + current; }) + this.horizontalIndices.reduce(function (prev, current) { return prev + current; }) * 100));
    };
    SolutionDayThirteen.prototype.partTwo = function () {
        var _this = this;
        var result = 0;
        this.fields.forEach(function (field, index) {
            try {
                field.field.forEach(function (fieldline, lineindex) {
                    var chars = fieldline.split("");
                    chars.forEach(function (char, charindex) {
                        chars[charindex] = chars[charindex] == "." ? "#" : ".";
                        field.field[lineindex] = chars.join("");
                        var verticalMirror = _this.findVerticalMirror(field);
                        if ((verticalMirror.at(0) && !(_this.verticalIndices.at(index) == verticalMirror.at(0))) || verticalMirror.length > 1) {
                            _this.verticalIndices[index] = verticalMirror.at(0) != _this.verticalIndices.at(index) ? verticalMirror.at(0) : verticalMirror.at(1);
                            result += _this.verticalIndices.at(index);
                            throw ("foundNewMirror");
                        }
                        var horizontalMirror = _this.findHorizontalMirror(field);
                        if ((horizontalMirror.at(0) && !(_this.horizontalIndices.at(index) == horizontalMirror.at(0))) || horizontalMirror.length > 1) {
                            _this.horizontalIndices[index] = horizontalMirror.at(0) != _this.horizontalIndices.at(index) ? horizontalMirror.at(0) : horizontalMirror.at(1);
                            result += _this.horizontalIndices.at(index) * 100;
                            throw ("foundNewMirror");
                        }
                        chars[charindex] = chars[charindex] == "." ? "#" : ".";
                        field.field[lineindex] = chars.join("");
                    });
                });
            }
            catch (e) {
                if (e !== "foundNewMirror") {
                    console.error(e);
                }
            }
        });
        console.log("Solution Part Two: ".concat(result));
    };
    return SolutionDayThirteen;
}());
var solutionDayThirteen = new SolutionDayThirteen("input.txt");
solutionDayThirteen.partOne();
solutionDayThirteen.partTwo();
