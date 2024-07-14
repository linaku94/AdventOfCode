"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var rankMap = new Map([
    ["A", 14],
    ["K", 13],
    ["Q", 12],
    ["J", 11],
    ["T", 10],
]);
var rankMapPartTwo = new Map(rankMap);
rankMapPartTwo.set("J", 1);
var Hand = /** @class */ (function () {
    function Hand(hand, partTwo) {
        this.hand = hand;
        this.cardCounts = new Map;
        for (var _i = 0, _a = this.hand; _i < _a.length; _i++) {
            var card = _a[_i];
            var updateValue = this.cardCounts.has(card) ? this.cardCounts.get(card) + 1 : 1;
            this.cardCounts.set(card, updateValue);
        }
        var uniqueCards = new Set(this.hand.split(""));
        this.uniqueCards = Array.from(uniqueCards);
        if (partTwo) {
            this.type = this.getTypePartTwo();
            this.cardRanks = this.getCardRanks(rankMapPartTwo);
        }
        else {
            this.type = this.getType();
            this.cardRanks = this.getCardRanks(rankMap);
        }
    }
    Hand.prototype.getCardRank = function (card, rankMap) {
        return rankMap.has(card) ? rankMap.get(card) : +card;
    };
    Hand.prototype.getCardRanks = function (rankMap) {
        var _this = this;
        var cardRanks = 0;
        Array.from(this.hand.split("")).forEach(function (card, index) {
            cardRanks += _this.getCardRank(card, rankMap) * Math.pow(10, 8 - 2 * index);
        });
        return cardRanks;
    };
    Hand.prototype.getTypePartTwo = function () {
        var _this = this;
        if (this.uniqueCards.includes("J")) {
            var replaceCard_1 = "A";
            this.uniqueCards.forEach(function (card) {
                if (card == "J") {
                    return;
                }
                var count = _this.cardCounts.has(replaceCard_1) ? _this.cardCounts.get(replaceCard_1) : 0;
                if (_this.cardCounts.get(card) > count) {
                    replaceCard_1 = card;
                    return;
                }
                if (_this.cardCounts.get(card) == _this.cardCounts.get(replaceCard_1)) {
                    replaceCard_1 = rankMapPartTwo.get(card) > rankMapPartTwo.get(replaceCard_1) ? card : replaceCard_1;
                }
            });
            var bestHand = new Hand(this.hand.replace(RegExp(/J/g), replaceCard_1), false);
            return bestHand.type;
        }
        else {
            return this.getType();
        }
    };
    Hand.prototype.getType = function () {
        switch (this.uniqueCards.length) {
            case 1: {
                return 6;
            }
            case 2: {
                return Math.max.apply(Math, Array.from(this.cardCounts.values())) == 4 ? 5 : 4;
            }
            case 3: {
                return Math.max.apply(Math, Array.from(this.cardCounts.values())) == 3 ? 3 : 2;
            }
            case 4: {
                return 1;
            }
            default: {
                return 0;
            }
        }
    };
    return Hand;
}());
function compareTwoHands(hand1, hand2) {
    switch (hand1.type == hand2.type) {
        case true: {
            return hand1.cardRanks > hand2.cardRanks;
        }
        default: {
            return hand1.type > hand2.type;
        }
    }
}
var SolutionDaySeven = /** @class */ (function () {
    function SolutionDaySeven(filename, partTwo) {
        this.handsToBids = this.readInput(filename, partTwo);
    }
    SolutionDaySeven.prototype.readInput = function (filename, partTwo) {
        var lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        var handsToBids = new Map;
        lines.slice(0, -1).forEach(function (value) {
            handsToBids.set(new Hand(value.split(" ")[0], partTwo), +value.split(" ")[1]);
        });
        return handsToBids;
    };
    SolutionDaySeven.prototype.solution = function () {
        var _this = this;
        var sortedHands = Array.from(this.handsToBids.keys());
        sortedHands = sortedHands.sort(function (a, b) { return (compareTwoHands(a, b) ? 1 : -1); });
        var result = 0;
        sortedHands.forEach(function (value, index) {
            result += (index + 1) * _this.handsToBids.get(value);
        });
        console.log("Solution Part Two: ".concat(result));
    };
    return SolutionDaySeven;
}());
var solutionDaySevenPartOne = new SolutionDaySeven("input.txt", false);
solutionDaySevenPartOne.solution();
var solutionDaySevenPartTwo = new SolutionDaySeven("input.txt", true);
solutionDaySevenPartTwo.solution();
