"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// @ts-ignore
var dotenv_1 = require("dotenv");
dotenv_1.default.config(); // Load environment variables from .env file
var requestHeaders = new Headers();
requestHeaders.set('Cookie', "session=".concat(process.env.COOKIE));
var request = new Request('https://adventofcode.com/2023/day/9/input', { headers: requestHeaders, method: "GET" });
fetch(request)
    .then(function (result) { return result.text(); })
    .then(function (textformat) { return console.log(textformat); });
var SolutionDayNine = /** @class */ (function () {
    function SolutionDayNine(filename) {
        this.lines = [];
        this.readInput(filename);
    }
    SolutionDayNine.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (value) {
            _this.lines.push(value.split(" ").map(function (num) { return +num; }));
        });
    };
    SolutionDayNine.prototype.computeFuture = function (values) {
        var lastValues = [];
        while (values.reduce(function (cur, prev) { return cur + prev; }) != 0) {
            lastValues.push(values.at(-1));
            values = values.slice(1).map(function (val, index) { return val - values[index]; });
        }
        return -lastValues.reduce(function (res, cur) { return res - cur; }, 0);
    };
    SolutionDayNine.prototype.computePast = function (values) {
        var firstValues = [];
        while (values.reduce(function (cur, prev) { return cur + prev; }) != 0) {
            firstValues.push(values.at(0));
            values = values.slice(1).map(function (val, index) { return val - values[index]; });
        }
        return firstValues.reverse().reduce(function (res, cur) { return cur - res; });
    };
    SolutionDayNine.prototype.partOne = function () {
        var _this = this;
        console.log("Solution Part One: ".concat(this.lines.map(function (line) { return _this.computeFuture(line); }).reduce(function (p, c) { return p + c; })));
    };
    SolutionDayNine.prototype.partTwo = function () {
        var _this = this;
        console.log("Solution Part Two: ".concat(this.lines.map(function (line) { return _this.computePast(line); }).reduce(function (p, c) { return p + c; })));
    };
    return SolutionDayNine;
}());
var solutionDayNine = new SolutionDayNine("input.txt");
solutionDayNine.partOne();
solutionDayNine.partTwo();
