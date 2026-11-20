import {
    attentionItems, daysSince, formatPoints, INACTIVE_AFTER_DAYS, lastActivityAt, OverviewPathway, pathwayCategories,
    pathwayStatus, percentOf, recentActivity,
} from "./overviewRules";
import {Item as HourItem} from "../Hours/shared";

const seal = (over: Partial<OverviewPathway> = {}): OverviewPathway => ({
    pathwayId: "seal",
    title: "NYS Seal of Civic Readiness",
    badgesCompleted: 0,
    badgesTotal: 10,
    started: false,
    criteria: {total: 6, knowledge: 2, participation: 2},
    points: {total: 0, knowledge: 0, participation: 0},
    categoryNames: {total: "Total", knowledge: "Civic Knowledge", participation: "Civic Participation"},
    categoryParents: {total: null, knowledge: "total", participation: "total"},
    ...over,
})

const hour = (over: Partial<HourItem> = {}): HourItem => ({
    entryId: "h1", revision: 1, userId: "u", studentName: "S", status: "pending", activityDate: "2026-11-01",
    hostName: "Host", activityType: "Internship", minutes: 90, createdAt: "2026-11-02T15:00:00Z", ...over,
})

describe("pathwayCategories", () => {
    it("lists the total first, then requirements by name", () => {
        expect(pathwayCategories(seal()).map((c) => c.categoryId)).toEqual(["total", "knowledge", "participation"])
        expect(pathwayCategories(seal()).map((c) => c.isTotal)).toEqual([true, false, false])
    })

    it("uses counted points and says when a requirement is met", () => {
        const rows = pathwayCategories(seal({points: {total: 3, knowledge: 2, participation: 1}}))
        expect(rows.find((c) => c.categoryId === "knowledge")).toMatchObject({earned: 2, required: 2, met: true})
        expect(rows.find((c) => c.categoryId === "participation")).toMatchObject({earned: 1, required: 2, met: false})
    })

    it("a missing category counts as zero points and falls back to its id as a name", () => {
        const rows = pathwayCategories(seal({points: {}, categoryNames: {}}))
        expect(rows.every((c) => c.earned === 0)).toBe(true)
        expect(rows.map((c) => c.name)).toContain("knowledge")
    })

    it("skips criteria that are not a usable positive number, so a bad value can never read as met", () => {
        const rows = pathwayCategories(seal({criteria: {total: "6", knowledge: 0, participation: "abc", bad: null, worse: {x: 1}, neg: -2}}))
        expect(rows.map((c) => c.categoryId)).toEqual(["total"])
        expect(rows[0].required).toBe(6)
    })

    it("tolerates absent maps", () => {
        expect(pathwayCategories({...seal(), criteria: undefined as any, points: undefined as any})).toEqual([])
    })
})

describe("pathwayStatus (same rule as the student's own transcript)", () => {
    it("Not started with nothing touched", () => {
        expect(pathwayStatus(seal())).toBe("Not started")
    })

    it("In progress once anything is started or a badge is complete, until every criterion is met", () => {
        expect(pathwayStatus(seal({started: true}))).toBe("In progress")
        expect(pathwayStatus(seal({badgesCompleted: 1}))).toBe("In progress")
        expect(pathwayStatus(seal({started: true, points: {total: 6, knowledge: 2, participation: 1}}))).toBe("In progress")
    })

    it("Completed only when EVERY criterion is met", () => {
        expect(pathwayStatus(seal({points: {total: 6, knowledge: 2, participation: 2}}))).toBe("Completed")
        expect(pathwayStatus(seal({points: {total: 6, knowledge: 9, participation: 1}}))).not.toBe("Completed")
    })

    it("a pathway with no usable criteria completes when every badge is complete", () => {
        const plain = seal({criteria: {}, badgesTotal: 3})
        expect(pathwayStatus({...plain, badgesCompleted: 2, started: true})).toBe("In progress")
        expect(pathwayStatus({...plain, badgesCompleted: 3})).toBe("Completed")
        expect(pathwayStatus({...plain, badgesTotal: 0})).toBe("Not started")
    })

    it("a pathway whose only criteria are unusable does not read Completed", () => {
        expect(pathwayStatus(seal({criteria: {total: "abc"}, badgesTotal: 0, badgesCompleted: 0}))).toBe("Not started")
    })
})

describe("formatting", () => {
    it("formatPoints keeps at most one decimal and no trailing zero", () => {
        expect(formatPoints(2)).toBe("2")
        expect(formatPoints(1.5)).toBe("1.5")
        expect(formatPoints(0.25)).toBe("0.3")
        expect(formatPoints(0)).toBe("0")
        expect(formatPoints(NaN)).toBe("0")
    })

    it("percentOf stays between 0 and 100 and never divides by zero", () => {
        expect(percentOf(1, 4)).toBe(25)
        expect(percentOf(8, 2)).toBe(100)
        expect(percentOf(-1, 2)).toBe(0)
        expect(percentOf(3, 0)).toBe(0)
    })

    it("daysSince counts whole days and never goes negative", () => {
        const now = new Date("2026-11-19T12:00:00Z")
        expect(daysSince("2026-11-19T01:00:00Z", now)).toBe(0)
        expect(daysSince("2026-11-05T12:00:00Z", now)).toBe(14)
        expect(daysSince("2026-12-01T00:00:00Z", now)).toBe(0)
        expect(daysSince("not a date", now)).toBe(0)
    })
})

describe("recentActivity", () => {
    const input = {
        badges: [
            {badgeId: "b1", badgeName: "Service-Learning", isComplete: true, completedAt: "2026-11-10T10:00:00Z", pathwayName: "Seal"},
            {badgeId: "b2", badgeName: "Unfinished", isComplete: false, completedAt: "2026-11-11T10:00:00Z"},
            {badgeId: "b3", badgeName: "No date", isComplete: true},
        ],
        lessons: [
            {lessonId: "l1", lessonName: "Intro", isComplete: true, finishedAt: "2026-11-12T10:00:00Z", badgeName: "Service-Learning"},
            {lessonId: "l2", lessonName: "Draft", isComplete: false, finishedAt: "2026-11-13T10:00:00Z"},
        ],
        hours: [
            hour({entryId: "h1", createdAt: "2026-11-14T10:00:00Z", status: "pending", minutes: 90}),
            hour({entryId: "h2", createdAt: "2026-11-15T10:00:00Z", status: "withdrawn"}),
            hour({entryId: "h3", createdAt: undefined, activityDate: "2026-11-01", status: "verified", minutes: 60}),
        ],
    }

    it("merges badges, lessons and hours, newest first", () => {
        expect(recentActivity(input).map((i) => i.id)).toEqual(["hours-h1", "lesson-l1", "badge-b1", "hours-h3"])
    })

    it("leaves out unfinished work, undated work and withdrawn hours", () => {
        const ids = recentActivity(input, 50).map((i) => i.id)
        expect(ids).not.toContain("badge-b2")
        expect(ids).not.toContain("badge-b3")
        expect(ids).not.toContain("lesson-l2")
        expect(ids).not.toContain("hours-h2")
    })

    it("words each kind plainly and shows the hours status", () => {
        const byId = Object.fromEntries(recentActivity(input, 50).map((i) => [i.id, i]))
        expect(byId["badge-b1"]).toMatchObject({title: "Earned Service-Learning", detail: "Seal"})
        expect(byId["lesson-l1"]).toMatchObject({title: "Submitted Intro", detail: "Service-Learning"})
        expect(byId["hours-h1"]).toMatchObject({title: "Logged 1 hr 30 min Internship", detail: "Waiting for approval"})
        expect(byId["hours-h3"].detail).toBe("Approved")
    })

    it("respects the limit and handles nothing at all", () => {
        expect(recentActivity(input, 2)).toHaveLength(2)
        expect(recentActivity({badges: [], lessons: []})).toEqual([])
    })

    it("an entry with an unparseable date is dropped rather than sorted to a random place", () => {
        const out = recentActivity({badges: [{badgeId: "x", badgeName: "X", isComplete: true, completedAt: "garbage"}], lessons: []})
        expect(out).toEqual([])
    })

    it("lastActivityAt is the newest item, or undefined", () => {
        expect(lastActivityAt(recentActivity(input, 50))).toBe("2026-11-14T10:00:00Z")
        expect(lastActivityAt([])).toBeUndefined()
    })
})

describe("attentionItems", () => {
    const now = new Date("2026-11-19T12:00:00Z")

    it("flags hours waiting for approval, with a count and a total, and links to the Hours tab", () => {
        const items = attentionItems({pathways: [], now, lastActivity: "2026-11-18T12:00:00Z", hours: [hour({minutes: 90}), hour({entryId: "h2", minutes: 30}), hour({entryId: "h3", status: "verified"})]})
        expect(items).toHaveLength(1)
        expect(items[0]).toMatchObject({id: "pending-hours", tone: "warn", title: "Hours waiting for approval", detail: "2 entries, 2 hr in total", action: {type: "hours"}})
    })

    it("uses the singular for one entry", () => {
        const items = attentionItems({pathways: [], now, lastActivity: "2026-11-18T12:00:00Z", hours: [hour()]})
        expect(items[0].detail).toBe("1 entry, 1 hr 30 min in total")
    })

    it("says so when a student has never done anything", () => {
        const items = attentionItems({pathways: [], now})
        expect(items.map((i) => i.id)).toEqual(["no-activity"])
    })

    it("flags inactivity at the threshold, not before", () => {
        const at = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString()
        expect(attentionItems({pathways: [], now, lastActivity: at(INACTIVE_AFTER_DAYS - 1)})).toEqual([])
        const flagged = attentionItems({pathways: [], now, lastActivity: at(INACTIVE_AFTER_DAYS)})
        expect(flagged[0]).toMatchObject({id: "inactive", tone: "warn", title: `No activity in ${INACTIVE_AFTER_DAYS} days`})
    })

    it("lists requirements with no points only for a pathway that is under way, capped per pathway", () => {
        const underway = seal({started: true})
        const items = attentionItems({pathways: [underway], now, lastActivity: "2026-11-18T12:00:00Z"})
        expect(items.map((i) => i.title)).toEqual(["No Civic Knowledge points yet", "No Civic Participation points yet"])
        expect(items[0].action).toEqual({type: "pathway", pathwayId: "seal"})

        expect(attentionItems({pathways: [underway], now, lastActivity: "2026-11-18T12:00:00Z", maxRequirementsPerPathway: 1})).toHaveLength(1)
        expect(attentionItems({pathways: [seal()], now, lastActivity: "2026-11-18T12:00:00Z"})).toEqual([])
        expect(attentionItems({pathways: [seal({started: true, points: {total: 6, knowledge: 2, participation: 2}})], now, lastActivity: "2026-11-18T12:00:00Z"})).toEqual([])
    })

    it("does not list the pathway total as a missing requirement", () => {
        const items = attentionItems({pathways: [seal({started: true, points: {total: 0, knowledge: 1, participation: 1}})], now, lastActivity: "2026-11-18T12:00:00Z"})
        expect(items).toEqual([])
    })
})

describe("lessons being worked on count as activity", () => {
    const base = {badges: [], hours: []}
    const lesson = (over: object = {}) => ({lessonId: "l1", lessonName: "Co-op Application", isComplete: false, badgeName: "Internship", ...over})

    it("a saved, unsubmitted lesson with answers appears, dated by its last save", () => {
        const out = recentActivity({...base, lessons: [lesson({updatedAt: "2026-11-15T10:00:00Z", answeredQuestions: 3})]})
        expect(out).toEqual([{id: "lesson-l1", kind: "lesson", title: "Worked on Co-op Application", detail: "3 questions answered · Internship", at: "2026-11-15T10:00:00Z"}])
    })

    it("uses the singular for one answer, and says a reflection alone is a start", () => {
        expect(recentActivity({...base, lessons: [lesson({updatedAt: "2026-11-15T10:00:00Z", answeredQuestions: 1})]})[0].detail).toBe("1 question answered · Internship")
        expect(recentActivity({...base, lessons: [lesson({updatedAt: "2026-11-15T10:00:00Z", reflection: "I learned a lot"})]})[0].detail).toBe("Reflection started · Internship")
    })

    it("a lesson that was only opened does not count, however recently it was opened", () => {
        const opened = lesson({updatedAt: "2026-11-18T10:00:00Z", answeredQuestions: 0, reflection: ""})
        expect(recentActivity({...base, lessons: [opened]})).toEqual([])
        expect(recentActivity({...base, lessons: [lesson({updatedAt: "2026-11-18T10:00:00Z", answeredQuestions: 0, reflection: "   "})]})).toEqual([])
    })

    it("work with no save date is left out rather than guessed", () => {
        expect(recentActivity({...base, lessons: [lesson({answeredQuestions: 5})]})).toEqual([])
        expect(recentActivity({...base, lessons: [lesson({updatedAt: "garbage", answeredQuestions: 5})]})).toEqual([])
    })

    it("a submitted lesson is dated by its submission, not by a later save, and appears once", () => {
        const out = recentActivity({...base, lessons: [lesson({isComplete: true, finishedAt: "2026-11-10T10:00:00Z", updatedAt: "2026-11-17T10:00:00Z", answeredQuestions: 4})]})
        expect(out).toHaveLength(1)
        expect(out[0]).toMatchObject({title: "Submitted Co-op Application", at: "2026-11-10T10:00:00Z"})
    })

    it("recent saved work stops a student being flagged inactive", () => {
        const now = new Date("2026-11-19T12:00:00Z")
        const old = {badges: [{badgeId: "b", badgeName: "B", isComplete: true, completedAt: "2026-09-01T10:00:00Z"}], hours: []}
        const withoutWork = recentActivity({...old, lessons: []}, 50)
        expect(attentionItems({pathways: [], now, lastActivity: lastActivityAt(withoutWork)}).map((i) => i.id)).toEqual(["inactive"])

        const withWork = recentActivity({...old, lessons: [lesson({updatedAt: "2026-11-17T10:00:00Z", answeredQuestions: 2})]}, 50)
        expect(attentionItems({pathways: [], now, lastActivity: lastActivityAt(withWork)})).toEqual([])
    })

    it("a student with only an opened lesson is still 'no activity yet'", () => {
        const out = recentActivity({...base, lessons: [lesson({updatedAt: "2026-11-18T10:00:00Z"})]})
        expect(attentionItems({pathways: [], now: new Date("2026-11-19T12:00:00Z"), lastActivity: lastActivityAt(out)}).map((i) => i.id)).toEqual(["no-activity"])
    })
})
