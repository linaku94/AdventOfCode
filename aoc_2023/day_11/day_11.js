"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function manhattan(a, b) {
    return Math.abs.apply(Math, [a[0] - b[0]]) + Math.abs.apply(Math, [a[1] - b[1]]);
}
var SolutionDayEleven = /** @class */ (function () {
    function SolutionDayEleven(filename) {
        this.readInput(filename);
    }
    SolutionDayEleven.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        this.field = [];
        this.yLinesToInsert = [];
        lines.slice(0, -1).forEach(function (line, yindex) {
            var fieldline = [];
            for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
                var space = line_1[_i];
                fieldline.push(space == ".");
            }
            _this.field.push(fieldline);
            if (fieldline.reduce(function (a, b) { return a && b; })) {
                _this.yLinesToInsert.push(yindex);
            }
        });
        var yDim = this.field.length;
        var xDim = this.field.at(0).length;
        this.xLinesToInsert = [];
        for (var xindex = 0; xindex < xDim; xindex++) {
            var insert = true;
            for (var yindex = 0; yindex < yDim; yindex++) {
                insert = insert && this.field.at(yindex).at(xindex);
            }
            if (insert) {
                this.xLinesToInsert.push(xindex);
            }
        }
    };
    SolutionDayEleven.prototype.computeLocations = function (scale) {
        var _this = this;
        this.locations = [];
        var xOffset = 0;
        var yOffset = 0;
        scale -= 1;
        this.field.forEach(function (line, lineIndex) {
            _this.yLinesToInsert.forEach(function (yvalue) { yOffset += lineIndex == yvalue ? scale : 0; });
            line.forEach(function (location, locationIndex) {
                _this.xLinesToInsert.forEach(function (xvalue) { xOffset += locationIndex == xvalue ? scale : 0; });
                if (!_this.field.at(lineIndex).at(locationIndex)) {
                    _this.locations.push([lineIndex + yOffset, locationIndex + xOffset]);
                }
            });
            xOffset = 0;
        });
    };
    SolutionDayEleven.prototype.getDistances = function () {
        var _this = this;
        var result = 0;
        this.locations.forEach(function (location) {
            result += _this.locations.map(function (line) { return manhattan(line, location); }).reduce(function (p, a) { return p + a; }, 0);
        });
        return result / 2;
    };
    SolutionDayEleven.prototype.partOne = function () {
        var scale = 2;
        this.computeLocations(scale);
        console.log("solution part one: ".concat(this.getDistances()));
    };
    SolutionDayEleven.prototype.partTwo = function () {
        var scale = 1000000;
        this.computeLocations(scale);
        console.log("solution part one: ".concat(this.getDistances()));
    };
    return SolutionDayEleven;
}());
var solutionDayEleven = new SolutionDayEleven("input.txt");
solutionDayEleven.partOne();
solutionDayEleven.partTwo();
