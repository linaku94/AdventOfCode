"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllMatches = void 0;
function findAllMatches(pattern, line) {
    var match = pattern.exec(line);
    var matches = [];
    while (match) {
        matches.push(match[0]);
        match = pattern.exec(line);
    }
    return matches;
}
exports.findAllMatches = findAllMatches;
