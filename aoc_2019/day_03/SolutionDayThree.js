"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionDayThree = exports.manhattanDistance = void 0;
var fs = require("fs");
var ORIGIN = { x: 0, y: 0, steps: 0 };
function manhattanDistance(point1) {
    return Math.abs(point1.x - ORIGIN.x) + Math.abs(point1.y - ORIGIN.y);
}
exports.manhattanDistance = manhattanDistance;
var SolutionDayThree = /** @class */ (function () {
    function SolutionDayThree() {
        var _a;
        this.wireA = [ORIGIN];
        this.wireB = [ORIGIN];
        _a = this.readInput(), this.wireInstructionsA = _a[0], this.wireInstructionsB = _a[1];
        this.layWire(this.wireA, this.wireInstructionsA);
        this.layWire(this.wireB, this.wireInstructionsB);
        this.findWireIntersections();
    }
    SolutionDayThree.prototype.readInput = function () {
        function extractInstruction(instructionString) {
            return {
                direction: instructionString.charAt(0),
                length: +instructionString.slice(1)
            };
        }
        var wireInstructions = fs.readFileSync("input.txt", "utf-8").split(/\n/);
        var wireInstructionsB = wireInstructions[1].split(/,/).map(extractInstruction);
        var wireInstructionsA = wireInstructions[0].split(/,/).map(extractInstruction);
        return [wireInstructionsA, wireInstructionsB];
    };
    SolutionDayThree.prototype.executeWireInstruction = function (instruction, wire) {
        var startPoint = wire.at(-1);
        var steps = wire.at(-1).steps;
        switch (instruction.direction) {
            case "R": {
                for (var xValue = startPoint.x + 1; xValue <= instruction.length + startPoint.x; xValue++) {
                    steps++;
                    wire.push({ x: xValue, y: startPoint.y, steps: steps });
                }
                break;
            }
            case "L": {
                for (var xValue = startPoint.x - 1; xValue >= -instruction.length + startPoint.x; xValue--) {
                    steps++;
                    wire.push({ x: xValue, y: startPoint.y, steps: steps });
                }
                break;
            }
            case "U": {
                for (var yValue = startPoint.y + 1; yValue <= instruction.length + startPoint.y; yValue++) {
                    steps++;
                    wire.push({ x: startPoint.x, y: yValue, steps: steps });
                }
                break;
            }
            case "D": {
                for (var yValue = startPoint.y - 1; yValue >= -instruction.length + startPoint.y; yValue--) {
                    steps++;
                    wire.push({ x: startPoint.x, y: yValue, steps: steps });
                }
                break;
            }
            default: {
                console.log("invalid instruction");
            }
        }
    };
    SolutionDayThree.prototype.layWire = function (wire, wireInstructions) {
        for (var _i = 0, wireInstructions_1 = wireInstructions; _i < wireInstructions_1.length; _i++) {
            var wireInstruction = wireInstructions_1[_i];
            this.executeWireInstruction(wireInstruction, wire);
        }
    };
    SolutionDayThree.prototype.findWireIntersections = function () {
        var intersections = [];
        var stepsToIntersections = [];
        for (var _i = 0, _a = this.wireA; _i < _a.length; _i++) {
            var pointA = _a[_i];
            for (var _b = 0, _c = this.wireB; _b < _c.length; _b++) {
                var pointB = _c[_b];
                if (pointA.x == pointB.x && pointA.y == pointB.y) {
                    intersections.push(pointA);
                    stepsToIntersections.push(pointA.steps + pointB.steps);
                }
            }
        }
        this.intersections = intersections.slice(1);
        this.stepsToIntersections = stepsToIntersections.slice(1);
    };
    SolutionDayThree.prototype.part1 = function () {
        console.log("Solution Part 1: " + Math.min.apply(Math, this.intersections.map(manhattanDistance)));
    };
    SolutionDayThree.prototype.part2 = function () {
        console.log("Solution Part 2: " + Math.min.apply(Math, this.stepsToIntersections));
    };
    return SolutionDayThree;
}());
exports.SolutionDayThree = SolutionDayThree;
