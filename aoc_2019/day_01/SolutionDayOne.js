"use strict";
exports.__esModule = true;
exports.SolutionDayOne = void 0;
var fs = require("fs");
var SolutionDayOne = /** @class */ (function () {
    function SolutionDayOne() {
        this.modules = this.readInput();
    }
    SolutionDayOne.prototype.readInput = function () {
        var lines = fs.readFileSync("input.txt", "utf-8").split(/\n/);
        return lines;
    };
    SolutionDayOne.prototype.requiredFuelPerModule = function (module) {
        return Math.floor(module / 3) - 2;
    };
    SolutionDayOne.prototype.requiredRecursiveFuelPerModule = function (module) {
        var recursiveFuelRequirement = 0;
        while (this.requiredFuelPerModule(module) > 0) {
            module = this.requiredFuelPerModule(module);
            recursiveFuelRequirement += module;
        }
        return recursiveFuelRequirement;
    };
    SolutionDayOne.prototype.sumOfFuelRequirements = function (recursive) {
        var FuelRequirement = 0;
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var module_1 = _a[_i];
            recursive ?
                (FuelRequirement += this.requiredRecursiveFuelPerModule(module_1))
                :
                    (FuelRequirement += this.requiredFuelPerModule(module_1));
        }
        return FuelRequirement;
    };
    SolutionDayOne.prototype.part1 = function () {
        console.log("Solution part 1: " + this.sumOfFuelRequirements(false));
    };
    SolutionDayOne.prototype.part2 = function () {
        console.log("Solution part 2: " + this.sumOfFuelRequirements(true));
    };
    return SolutionDayOne;
}());
exports.SolutionDayOne = SolutionDayOne;
