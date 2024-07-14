"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var SolutionDayNineTeen = /** @class */ (function () {
    function SolutionDayNineTeen(filename) {
        this.parts = [];
        this.rules = new Map;
        this.readInput(filename);
    }
    SolutionDayNineTeen.prototype.readInput = function (filename) {
        var _this = this;
        var lines = fs.readFileSync(filename, "utf-8").split(/\n\n/);
        lines.at(-1).split(/\n/).slice(0, -1).forEach(function (value) {
            _this.parts.push(new Map([
                ["x", +new RegExp(/x=\d*/).exec(value)[0].split("=").at(-1)],
                ["m", +new RegExp(/m=\d*/).exec(value)[0].split("=").at(-1)],
                ["a", +new RegExp(/a=\d*/).exec(value)[0].split("=").at(-1)],
                ["s", +new RegExp(/s=\d*/).exec(value)[0].split("=").at(-1)],
            ]));
        });
        lines.at(0).split(/\n/).forEach(function (value) {
            _this.rules.set(value.split("{")[0], { rules: value.split("{")[1].replace("}", "").split(",") });
        });
    };
    SolutionDayNineTeen.prototype.processWorkflow = function (part, workflowName) {
        var workflow = this.rules.get(workflowName);
        var result = "";
        for (var _i = 0, _a = workflow.rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (rule.includes(">")) {
                if (part.get(rule.split(">")[0]) > +rule.split(">")[1].split(":")[0]) {
                    return rule.split(":")[1];
                }
            }
            else if (rule.includes("<")) {
                if (part.get(rule.split("<")[0]) < +rule.split("<")[1].split(":")[0]) {
                    return rule.split(":")[1];
                }
            }
            else {
                return rule;
            }
        }
    };
    SolutionDayNineTeen.prototype.processPart = function (part) {
        var result = this.processWorkflow(part, "in");
        while (!(result == "A" || result == "R")) {
            result = this.processWorkflow(part, result);
        }
        return result;
    };
    SolutionDayNineTeen.prototype.partOne = function () {
        var _this = this;
        console.log(this.parts);
        console.log(this.rules);
        var result = 0;
        this.parts.forEach(function (part) {
            console.log(part);
            result += _this.processPart(part) == "A" ? Array.from(part.values()).reduce(function (p, c) { return p + c; }) : 0;
        });
        console.log("Solution Part One: ".concat(result));
    };
    SolutionDayNineTeen.prototype.partTwo = function () {
        console.log("Solution Part Two: ");
    };
    return SolutionDayNineTeen;
}());
var solutionDayNineTeen = new SolutionDayNineTeen("input.txt");
solutionDayNineTeen.partOne();
solutionDayNineTeen.partTwo();
