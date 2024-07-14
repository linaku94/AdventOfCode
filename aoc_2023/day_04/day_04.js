"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionDayFour = void 0;
var fs = require("fs");
var utils_1 = require("../utils");
function parseCardSet(setString) {
    var winningNumbers = new Set((0, utils_1.findAllMatches)(new RegExp(/\d+/, "g"), setString[0]).map(function (value) { return +value; }));
    var ownNumbers = new Set((0, utils_1.findAllMatches)(new RegExp(/\d+/, "g"), setString[1]).map(function (value) { return +value; }));
    return {
        winningNumbers: winningNumbers,
        ownNumbers: ownNumbers,
    };
}
var SolutionDayFour = /** @class */ (function () {
    function SolutionDayFour(filename) {
        this.sets = new Map;
        this.numberOfSets = new Map;
        this.readInput(filename);
    }
    SolutionDayFour.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0, -1).forEach(function (line, index) {
            var setStrings = line.split(": ")[1].split(" | ");
            _this.sets.set(index + 1, parseCardSet(setStrings));
            _this.numberOfSets.set(index + 1, 1);
        });
    };
    SolutionDayFour.prototype.intersectSets = function (set1, set2) {
        var lengthOfIntersection = 0;
        set1.forEach(function (card) {
            if (set2.has(card)) {
                lengthOfIntersection += 1;
            }
        });
        return lengthOfIntersection;
    };
    SolutionDayFour.prototype.partOne = function () {
        var _this = this;
        var points = 0;
        this.sets.forEach(function (cardSet, index) {
            var numberOfWinningCards = _this.intersectSets(cardSet.ownNumbers, cardSet.winningNumbers);
            if (numberOfWinningCards > 0) {
                points += Math.pow(2, numberOfWinningCards - 1);
            }
        });
        console.log("Solution Part 1: ".concat(points));
    };
    SolutionDayFour.prototype.partTwo = function () {
        var _this = this;
        this.sets.forEach(function (cardSet, index) {
            var numberOfWinningCards = _this.intersectSets(cardSet.ownNumbers, cardSet.winningNumbers);
            for (var i = 0; i < numberOfWinningCards; i++) {
                _this.numberOfSets.set(index + i + 1, _this.numberOfSets.get(index + i + 1) + _this.numberOfSets.get(index));
            }
        });
        var sum = 0;
        this.numberOfSets.forEach(function (value) { return sum += value; });
        console.log("Solution Part 2: ".concat(sum));
    };
    return SolutionDayFour;
}());
exports.SolutionDayFour = SolutionDayFour;
var solutionDayFour = new SolutionDayFour("input.txt");
solutionDayFour.partOne();
solutionDayFour.partTwo();
