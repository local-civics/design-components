import {
  formatMinutes,
  MAX_MINUTES_PER_ENTRY,
  minutesFromResponses,
  responsesFromMinutes,
  timeProblem,
} from "./minutes";

describe("formatMinutes", () => {
  it("shows whole hours and minutes, never a decimal", () => {
    expect(formatMinutes(165)).toBe("2 hr 45 min");
    expect(formatMinutes(90)).toBe("1 hr 30 min");
    expect(formatMinutes(75)).toBe("1 hr 15 min");
  });

  it("leaves out a part that is zero", () => {
    expect(formatMinutes(60)).toBe("1 hr");
    expect(formatMinutes(120)).toBe("2 hr");
    expect(formatMinutes(45)).toBe("45 min");
    expect(formatMinutes(1)).toBe("1 min");
    expect(formatMinutes(0)).toBe("0 min");
  });

  it("shows the awkward thirds exactly, because it never divides", () => {
    expect(formatMinutes(20)).toBe("20 min");
    expect(formatMinutes(80)).toBe("1 hr 20 min");
    expect(formatMinutes(10)).toBe("10 min");
    expect(formatMinutes(50)).toBe("50 min");
  });

  it("copes with a missing or odd value", () => {
    expect(formatMinutes(NaN)).toBe("0 min");
    expect(formatMinutes(-30)).toBe("0 min");
    expect(formatMinutes(undefined as any)).toBe("0 min");
    expect(formatMinutes(MAX_MINUTES_PER_ENTRY)).toBe("24 hr");
  });

  it("totals three 20 minute entries to exactly 1 hr", () => {
    expect(formatMinutes(20 + 20 + 20)).toBe("1 hr");
  });
});

describe("the form's two boxes", () => {
  it("adds hours and minutes into whole minutes", () => {
    expect(minutesFromResponses({ totalHours: "1", totalMinutes: "30" })).toBe(90);
    expect(minutesFromResponses({ totalHours: "2" })).toBe(120);
    expect(minutesFromResponses({ totalMinutes: "45" })).toBe(45);
    expect(minutesFromResponses({ totalHours: "", totalMinutes: "" })).toBe(0);
  });

  it("refuses anything that is not a whole number instead of rounding it", () => {
    expect(minutesFromResponses({ totalHours: "1.5" })).toBeNaN();
    expect(minutesFromResponses({ totalHours: "-1", totalMinutes: "0" })).toBeNaN();
    expect(minutesFromResponses({ totalHours: "abc" })).toBeNaN();
  });

  it("splits stored minutes back into the two boxes", () => {
    expect(responsesFromMinutes(90)).toEqual({ totalHours: "1", totalMinutes: "30" });
    expect(responsesFromMinutes(45)).toEqual({ totalHours: "0", totalMinutes: "45" });
    expect(responsesFromMinutes(120)).toEqual({ totalHours: "2", totalMinutes: "0" });
  });

  it("round trips every minute of a day", () => {
    for (let m = 1; m <= MAX_MINUTES_PER_ENTRY; m++) {
      expect(minutesFromResponses(responsesFromMinutes(m))).toBe(m);
    }
  });

  it("accepts 1 minute up to a day and says why otherwise", () => {
    expect(timeProblem(1)).toBe("");
    expect(timeProblem(MAX_MINUTES_PER_ENTRY)).toBe("");
    expect(timeProblem(0)).not.toBe("");
    expect(timeProblem(MAX_MINUTES_PER_ENTRY + 1)).not.toBe("");
    expect(timeProblem(NaN)).not.toBe("");
  });
});
