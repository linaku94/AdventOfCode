import * as fs from "fs";
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Cookie', `session=${process.env.COOKIE}`);

const request: RequestInfo = new Request(
    'https://adventofcode.com/2023/day/9/input',
    {headers: requestHeaders, method: "GET"})

fetch(request)
    .then(result => result.text())
    .then(textformat => console.log(textformat))
class SolutionDayNine {
    lines: number[][]
    constructor(filename: string) {
        this.lines = []
        this.readInput(filename)
    }

    readInput(filename: string) {
        let lines = fs.readFileSync(filename, "utf-8").split(/\n/);
        lines.slice(0,-1).forEach(value => {
            this.lines.push(value.split(" ").map(num => +num))
        })
    }

    computeFuture(values: number[]) {
        let lastValues = []
        while (values.reduce((cur, prev) => cur+prev)!=0) {
            lastValues.push(values.at(-1))
            values = values.slice(1).map((val, index) => val-values[index])
        }
        return -lastValues.reduce((res, cur) => res-cur, 0)
    }

    computePast(values: number[]) {
        let firstValues = []
        while (values.reduce((cur, prev) => cur+prev)!=0) {
            firstValues.push(values.at(0))
            values = values.slice(1).map((val, index) => val-values[index])
        }
        return firstValues.reverse().reduce((res, cur) => cur-res)
    }

    partOne() {
        console.log(`Solution Part One: ${this.lines.map(line => this.computeFuture(line)).reduce((p, c) => p+c)}`)
    }

    partTwo() {
        console.log(`Solution Part Two: ${this.lines.map(line => this.computePast(line)).reduce((p, c) => p+c)}`)
    }

}

const solutionDayNine = new SolutionDayNine("input.txt")
solutionDayNine.partOne()
solutionDayNine.partTwo()
