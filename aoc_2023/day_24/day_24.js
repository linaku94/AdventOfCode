"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var linearEquation = /** @class */ (function () {
    function linearEquation(constructionString) {
        var points = constructionString.split(" @ ")[0].split(", ").map(function (point) { return +point; });
        var velocities = constructionString.split(" @ ")[1].split(", ").map(function (vel) { return +vel; });
        this.x0 = points.at(0);
        this.y0 = points.at(1);
        this.vx = velocities.at(0);
        this.vy = velocities.at(1);
        this.m = velocities.at(1) / velocities.at(0);
        this.b = (points.at(1) * velocities.at(0) - (points.at(0) * velocities.at(1))) / velocities.at(0);
    }
    linearEquation.prototype.evaluate = function (x) {
        return (this.m * x) + this.b;
    };
    linearEquation.prototype.isNotInPast = function (point) {
        return (this.x0 - point.at(0)) * Math.sign(this.vx) < 0 && (this.y0 - point.at(1)) * Math.sign(this.vy) < 0;
    };
    return linearEquation;
}());
function intersection(euq1, equ2) {
    var x = (equ2.b - euq1.b) / (euq1.m - equ2.m);
    var y = euq1.evaluate(x);
    return [x, y];
}
var SolutionDayTwentyFour = /** @class */ (function () {
    function SolutionDayTwentyFour(filename) {
        this.linEquations = [];
        this.readInput(filename);
    }
    SolutionDayTwentyFour.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (line) {
            _this.linEquations.push(new linearEquation(line));
        });
        console.log(this.linEquations);
    };
    SolutionDayTwentyFour.prototype.intersectionWithinLimit = function (intersectionPoint, upperLimit, lowerLimit) {
        return intersectionPoint.map(function (p) { return p >= lowerLimit; }).reduce(function (p, c) { return p && c; }) && intersectionPoint.map(function (p) { return p <= upperLimit; }).reduce(function (p, c) { return p && c; });
    };
    SolutionDayTwentyFour.prototype.partOne = function () {
        var _this = this;
        var lowerLimit = 200000000000000;
        var upperLimit = 400000000000000;
        var numberOfIntersections = 0;
        this.linEquations.forEach(function (equation, index) {
            for (var compIndex = index + 1; compIndex < _this.linEquations.length; compIndex++) {
                var intersectionPoint = intersection(equation, _this.linEquations.at(compIndex));
                numberOfIntersections += _this.intersectionWithinLimit(intersectionPoint, upperLimit, lowerLimit) && equation.isNotInPast(intersectionPoint) && _this.linEquations.at(compIndex).isNotInPast(intersectionPoint) ? 1 : 0;
            }
        });
        console.log("Solution Part One: ".concat(numberOfIntersections));
    };
    SolutionDayTwentyFour.prototype.partTwo = function () {
        console.log("Solution Part Two: ");
    };
    return SolutionDayTwentyFour;
}());
var solutionDayTwentyFour = new SolutionDayTwentyFour("input.txt");
solutionDayTwentyFour.partOne();
solutionDayTwentyFour.partTwo();
