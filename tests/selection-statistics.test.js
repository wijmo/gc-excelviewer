"use strict";

const assert = require("assert");
const stats = require("../out/selection-statistics");

function test(name, fn) {
    try {
        fn();
        process.stdout.write(`PASS ${name}\n`);
    } catch (error) {
        process.stderr.write(`FAIL ${name}\n${error.stack}\n`);
        process.exitCode = 1;
    }
}

test("matches Excel count versus numeric aggregation semantics", () => {
    const result = stats.calculate([
        "tct_s",
        164.22, 165.08, 154.58, 238.77, 204.18, 193.68, 165.1,
        218.29, 248.56, 301.49, 199.55, 133.68, 172.96, 162.02
    ]);
    assert.strictEqual(result.count, 15);
    assert.strictEqual(result.numericCount, 14);
    assert.strictEqual(result.sum, 2722.16);
    assert.strictEqual(result.average, 194.44);
    assert.ok(Math.abs(result.standardDeviation - 45.12661094503569) < 1e-12);
    assert.strictEqual(result.min, 133.68);
    assert.strictEqual(result.max, 301.49);
});

test("ignores blanks, dates, booleans, NaN, and infinity for numeric metrics", () => {
    const result = stats.calculate([null, undefined, "", new Date(0), false, NaN, Infinity, -2, 5]);
    assert.deepStrictEqual(result, {
        count: 6,
        numericCount: 2,
        sum: 3,
        average: 1.5,
        standardDeviation: 4.949747468305833,
        min: -2,
        max: 5
    });
});

test("deduplicates overlapping selection ranges", () => {
    const grid = {
        rows: [{}, {}],
        columns: [{}, {}],
        selectionRanges: [
            { row: 0, row2: 1, col: 0, col2: 0 },
            { row: 1, row2: 1, col: 0, col2: 1 }
        ],
        getCellData(row, col) {
            return [[1, 2], [3, 4]][row][col];
        }
    };
    assert.deepStrictEqual(stats.calculateGridSelection(grid), {
        count: 3,
        numericCount: 3,
        sum: 8,
        average: 8 / 3,
        standardDeviation: Math.sqrt(7 / 3),
        min: 1,
        max: 4
    });
});

test("uses stable summation for common decimal values", () => {
    const result = stats.calculate([0.1, 0.2, 0.3]);
    assert.strictEqual(result.sum, 0.6);
    assert.ok(Math.abs(result.average - 0.2) < 1e-15);
    assert.strictEqual(stats.formatNumber(result.average), "0.2");
});

test("shows no sample standard deviation for a single numeric cell", () => {
    assert.strictEqual(stats.calculate([7]).standardDeviation, null);
});
