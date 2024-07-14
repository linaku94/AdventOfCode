"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolutionDayTwo = void 0;
var fs = require("fs");
var SolutionDayTwo = /** @class */ (function () {
    function SolutionDayTwo() {
    }
    SolutionDayTwo.prototype.readInput = function () {
        var _this = this;
        var lines = fs.readFileSync("input.txt", "utf-8").split(/\n/);
        return lines.map(function (value, index) { return ({ gameIndex: +index + 1, sets: _this.parseStringToGameSets(value.split(": ")[1].split("; ")) }); });
    };
    SolutionDayTwo.prototype.parseStringToGameSets = function (gameString) {
        var result = [];
        for (var _i = 0, gameString_1 = gameString; _i < gameString_1.length; _i++) {
            var game = gameString_1[_i];
            var matchGreen = new RegExp(/\d*\sgreen/).exec(game);
            var matchBlue = new RegExp(/\d*\sblue/).exec(game);
            var matchRed = new RegExp(/\d*\sred/).exec(game);
            result.push({
                blue: matchBlue ? +matchBlue[0].split(" ")[0] : 0,
                red: matchRed ? +matchRed[0].split(" ")[0] : 0,
                green: matchGreen ? +matchGreen[0].split(" ")[0] : 0,
            });
        }
        return result;
    };
    SolutionDayTwo.prototype.findPossibleGames = function (games, referenceSet) {
        var result = 0;
        for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
            var game = games_1[_i];
            var gameIsValid = true;
            for (var _a = 0, _b = game.sets; _a < _b.length; _a++) {
                var gameSet = _b[_a];
                gameIsValid = (gameSet.blue <= referenceSet.blue && gameSet.red <= referenceSet.red && gameSet.green <= referenceSet.green && gameIsValid);
            }
            result += gameIsValid ? game.gameIndex : 0;
        }
        return result;
    };
    SolutionDayTwo.prototype.findMinimumSets = function (games) {
        var result = [];
        for (var _i = 0, games_2 = games; _i < games_2.length; _i++) {
            var game = games_2[_i];
            var a = result.push({
                blue: Math.max.apply(Math, game.sets.map(function (value, index) { return value.blue; })),
                red: Math.max.apply(Math, game.sets.map(function (value, index) { return value.red; })),
                green: Math.max.apply(Math, game.sets.map(function (value, index) { return value.green; })),
            });
        }
        return result;
    };
    SolutionDayTwo.prototype.partOne = function () {
        var games = this.readInput();
        var fullCubeSet = {
            red: 12,
            green: 13,
            blue: 14,
        };
        console.log(this.findPossibleGames(games, fullCubeSet));
    };
    SolutionDayTwo.prototype.partTwo = function () {
        var games = this.readInput();
        var minimumSets = this.findMinimumSets(games);
        var sum = function () {
            var arr = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arr[_i] = arguments[_i];
            }
            return __spreadArray([], arr, true).reduce(function (acc, val) { return acc + val; }, 0);
        };
        console.log(sum.apply(void 0, minimumSets.map(function (value, index) { return value.blue * value.red * value.green; })));
    };
    return SolutionDayTwo;
}());
exports.SolutionDayTwo = SolutionDayTwo;
var solutionDayTwo = new SolutionDayTwo();
solutionDayTwo.partOne();
solutionDayTwo.partTwo();
