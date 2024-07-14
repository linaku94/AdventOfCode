"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionDayFive = exports.parseMapFromString = exports.ResourceMap = void 0;
var fs = require("fs");
var ResourceMap = /** @class */ (function () {
    function ResourceMap() {
        this.name = "";
        this.ranges = [];
    }
    ResourceMap.prototype.getTargetResource = function (source) {
        for (var _i = 0, _a = this.ranges; _i < _a.length; _i++) {
            var resourceRange = _a[_i];
            if (source >= resourceRange.sourceStart && source < resourceRange.sourceStart + resourceRange.size) {
                return resourceRange.targetStart + source - resourceRange.sourceStart;
            }
        }
        return source;
    };
    ResourceMap.prototype.getSourceResource = function (target) {
        for (var _i = 0, _a = this.ranges; _i < _a.length; _i++) {
            var resourceRange = _a[_i];
            if (target >= resourceRange.targetStart && target < resourceRange.targetStart + resourceRange.size) {
                return resourceRange.sourceStart + target - resourceRange.targetStart;
            }
        }
        return target;
    };
    return ResourceMap;
}());
exports.ResourceMap = ResourceMap;
function parseMapFromString(parseString) {
    var newResourceMap = new ResourceMap();
    newResourceMap.name = parseString.split(":")[0].split(" ")[0];
    for (var _i = 0, _a = parseString.split("\n").slice(1); _i < _a.length; _i++) {
        var rangeString = _a[_i];
        var numbers = rangeString.split(" ").map(function (value) { return +value; });
        newResourceMap.ranges.push({
            targetStart: numbers[0],
            sourceStart: numbers[1],
            size: numbers[2],
        });
    }
    return newResourceMap;
}
exports.parseMapFromString = parseMapFromString;
var SolutionDayFive = /** @class */ (function () {
    function SolutionDayFive(inputFilename) {
        this.resourceMaps = [];
        this.seeds = [];
        this.seedRanges = new Map;
        this.readInput(inputFilename);
    }
    SolutionDayFive.prototype.readInput = function (inputFilename) {
        var _this = this;
        var lines = fs.readFileSync(inputFilename, "utf-8").split(/\n\n/);
        this.seeds = lines[0].split(": ")[1].split(" ").map(function (value) { return +value; });
        this.seeds.forEach(function (seed, index) {
            if (index % 2 == 0) {
                _this.seedRanges.set(seed, _this.seeds[index + 1]);
            }
        });
        for (var _i = 0, _a = lines.slice(1); _i < _a.length; _i++) {
            var line = _a[_i];
            this.resourceMaps.push(parseMapFromString(line));
        }
    };
    SolutionDayFive.prototype.isInSeedRange = function (seed) {
        var result = false;
        this.seedRanges.forEach(function (range, start) {
            if (seed >= start && seed <= start + range) {
                result = true;
            }
        });
        return result;
    };
    SolutionDayFive.prototype.partOne = function () {
        var results = [];
        var _loop_1 = function (seed) {
            this_1.resourceMaps.forEach(function (resourceMap) {
                seed = resourceMap.getTargetResource(seed);
            });
            results.push(seed);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.seeds; _i < _a.length; _i++) {
            var seed = _a[_i];
            _loop_1(seed);
        }
        console.log("solution part 1: ".concat(Math.min.apply(Math, results)));
    };
    SolutionDayFive.prototype.partTwo = function () {
        var _loop_2 = function (i) {
            var target = i;
            this_2.resourceMaps.reverse().forEach(function (resourceMap) {
                target = resourceMap.getSourceResource(target);
            });
            this_2.resourceMaps.reverse();
            if (this_2.isInSeedRange(target)) {
                console.log("solution Part 2: ".concat(i));
                return { value: i };
            }
        };
        var this_2 = this;
        for (var i = 0; i <= 1000000000; i++) {
            var state_1 = _loop_2(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    return SolutionDayFive;
}());
exports.SolutionDayFive = SolutionDayFive;
var solutionDayFive = new SolutionDayFive("input.txt");
solutionDayFive.partOne();
solutionDayFive.partTwo();
