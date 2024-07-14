"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var pipeMap = new Map([
    ["|", "NS"],
    ["-", "OW"],
    ["L", "NO"],
    ["J", "NW"],
    ["7", "SW"],
    ["F", "SO"],
    [".", ""],
    ["S", ""]
]);
var oppositeDirection = new Map([
    ["N", "S"],
    ["O", "W"],
    ["S", "N"],
    ["W", "O"],
]);
var directionMap = new Map([
    ["N", [1, 0]],
    ["O", [0, -1]],
    ["S", [-1, 0]],
    ["W", [0, 1]],
]);
var SolutionDayTen = /** @class */ (function () {
    function SolutionDayTen(filename) {
        this.field = [];
        this.readInput(filename);
    }
    SolutionDayTen.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        this.loopPositions = [];
        lines.slice(0, -1).forEach(function (line, index) {
            var fieldline = [];
            var xindex = 0;
            for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
                var node = line_1[_i];
                fieldline.push(node);
                if (node == "S") {
                    _this.position = [index, xindex];
                    _this.loopPositions.push(_this.position);
                }
                xindex += 1;
            }
            _this.field.push(fieldline);
        });
        this.direction = this.getPossibleStartDirections();
        console.log(this.direction);
        // console.log(this.field)
    };
    SolutionDayTen.prototype.getCurrentPipeline = function () {
        return this.field.at(this.position[0]).at(this.position[1]);
    };
    SolutionDayTen.prototype.move = function () {
        var _this = this;
        this.position = this.position.map(function (value, index) { return value -= directionMap.get(_this.direction)[index]; });
        this.direction = pipeMap.get(this.getCurrentPipeline()).replace(oppositeDirection.get(this.direction), "");
    };
    SolutionDayTen.prototype.getPossibleStartDirections = function () {
        var _loop_1 = function (direction) {
            var position = this_1.position;
            position = position.map(function (value, index) { return value -= directionMap.get(direction)[index]; });
            var possibleStartPipe = this_1.field.at(position[0]).at(position[1]);
            if (pipeMap.get(possibleStartPipe).includes(oppositeDirection.get(direction))) {
                return { value: direction };
            }
        };
        var this_1 = this;
        // for (let direction of "WSON") {
        for (var _i = 0, _a = "NOSW"; _i < _a.length; _i++) {
            var direction = _a[_i];
            var state_1 = _loop_1(direction);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    SolutionDayTen.prototype.partTwo = function () {
        console.log(this.loopPositions);
    };
    SolutionDayTen.prototype.partOne = function () {
        var _this = this;
        var counter = 1;
        this.position = this.position.map(function (value, index) { return value -= directionMap.get(_this.direction)[index]; });
        this.direction = pipeMap.get(this.getCurrentPipeline()).replace(oppositeDirection.get(this.direction), "");
        while (this.getCurrentPipeline() != "S") {
            this.loopPositions.push(this.position);
            counter += 1;
            this.move();
        }
        console.log("Solution Part One: ".concat(counter / 2));
    };
    return SolutionDayTen;
}());
var solutionDayTen = new SolutionDayTen("input.txt");
solutionDayTen.partOne();
solutionDayTen.partTwo();
