import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeWHtR,
  da5500WaistAverage,
  roundDownHalfInch,
  roundNearestHalfInch,
  truncateRatio,
} from "./whtr.ts";

describe("truncateRatio", () => {
  it("discards digits past the third decimal (does not round)", () => {
    assert.equal(truncateRatio(0.5499), 0.549);
    assert.equal(truncateRatio(0.5494), 0.549);
    assert.equal(truncateRatio(0.5501), 0.55);
    assert.equal(truncateRatio(0.55), 0.55);
    assert.equal(truncateRatio(0.54857), 0.548);
  });
});

describe("computeWHtR — AD 2026-13", () => {
  it("70 in / 38.4 in waist records 0.548 and passes", () => {
    const r = computeWHtR(38.4, 70);
    assert.ok(r);
    assert.equal(r.recorded, 0.548);
    assert.equal(r.passes, true);
    assert.equal(r.maxWaistIn, 38.5);
  });

  it("70 in / 38.5 in waist is exactly 0.550 and fails", () => {
    const r = computeWHtR(38.5, 70);
    assert.ok(r);
    assert.equal(r.recorded, 0.55);
    assert.equal(r.passes, false);
  });

  it("70 in / 38.49 in truncates to 0.549 and passes", () => {
    const r = computeWHtR(38.49, 70);
    assert.ok(r);
    assert.equal(r.recorded, 0.549);
    assert.equal(r.passes, true);
  });

  it("72 in at the 0.55 line (39.6) fails", () => {
    const r = computeWHtR(39.6, 72);
    assert.ok(r);
    assert.equal(r.passes, false);
    assert.equal(r.recorded, 0.55);
  });

  it("66 in / 36.2 passes; 36.3 fails", () => {
    const pass = computeWHtR(36.2, 66);
    const fail = computeWHtR(36.3, 66);
    assert.ok(pass && fail);
    assert.equal(pass.passes, true);
    assert.equal(fail.passes, false);
  });

  it("rejects non-positive measurements", () => {
    assert.equal(computeWHtR(0, 70), null);
    assert.equal(computeWHtR(36, 0), null);
  });
});

describe("roundDownHalfInch", () => {
  it("floors to the nearest 0.50 inch", () => {
    assert.equal(roundDownHalfInch(36.9), 36.5);
    assert.equal(roundDownHalfInch(36.5), 36.5);
    assert.equal(roundDownHalfInch(36.49), 36);
    assert.equal(roundDownHalfInch(38.0), 38);
  });
});

describe("roundNearestHalfInch — DA 5500 height", () => {
  it("rounds 0.25 and above up to the next half inch", () => {
    assert.equal(roundNearestHalfInch(70.2), 70);
    assert.equal(roundNearestHalfInch(70.25), 70.5);
    assert.equal(roundNearestHalfInch(70.3), 70.5);
    assert.equal(roundNearestHalfInch(69.75), 70);
    assert.equal(roundNearestHalfInch(70), 70);
  });
});

describe("da5500WaistAverage — JUL 2026 form", () => {
  it("rounds each tape down, then averages to 3 decimals", () => {
    const { recorded, average } = da5500WaistAverage([36.9, 37.2, 36.8]);
    assert.deepEqual(recorded, [36.5, 37, 36.5]);
    assert.equal(average, 36.667);
  });

  it("36.5 / 36.5 / 37.0 at 70 in records WHtR 0.523 and passes", () => {
    const { average } = da5500WaistAverage([36.5, 36.5, 37.0]);
    assert.equal(average, 36.667);
    const r = computeWHtR(average, 70);
    assert.ok(r);
    assert.equal(r.recorded, 0.523);
    assert.equal(r.passes, true);
  });
});
