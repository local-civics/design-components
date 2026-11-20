import {
    alreadyCreditedCount,
    eligibleStudents,
    filterBadges,
    filterByName,
    filterByPathway,
    NO_PATHWAY,
    pathwayChoices,
    recipientIds,
    resolvePathwayFilter,
    rosterMatchesScope,
    ScopeStudent,
} from "./scope";

const students: ScopeStudent[] = [
    {userId: "ada", name: "Ada Lovelace", hasCredit: false},
    {userId: "grace", name: "Grace Hopper", hasCredit: true},
    {userId: "alan", name: "Alan Turing", hasCredit: false},
    {userId: "katherine", name: "Katherine Johnson", hasCredit: false},
]

describe("recipientIds", () => {
    it("choose: only ticked students who can still receive credit, in roster order", () => {
        const selected = {katherine: true, ada: true, grace: true}
        expect(recipientIds({scope: "choose", classId: "", students, selected})).toEqual(["ada", "katherine"])
    })

    it("choose: ignores a ticked student who has since been credited, and unknown ids", () => {
        expect(recipientIds({scope: "choose", classId: "c1", students, selected: {grace: true, ghost: true}})).toEqual([])
    })

    it("choose: an unticked student is never included", () => {
        expect(recipientIds({scope: "choose", classId: "c1", students, selected: {ada: false}})).toEqual([])
    })

    it("class: everyone not yet credited, but only once a class is chosen", () => {
        expect(recipientIds({scope: "class", classId: "c1", students, selected: {}})).toEqual(["ada", "alan", "katherine"])
        expect(recipientIds({scope: "class", classId: "", students, selected: {}})).toEqual([])
    })

    it("all: everyone not yet credited, but only on the unfiltered roster", () => {
        expect(recipientIds({scope: "all", classId: "", students, selected: {}})).toEqual(["ada", "alan", "katherine"])
        // the page is still showing one class while it switches: nobody may be credited from that roster
        expect(recipientIds({scope: "all", classId: "c1", students, selected: {}})).toEqual([])
    })

    it("whole-roster scopes ignore ticks left over from choose mode", () => {
        expect(recipientIds({scope: "all", classId: "", students, selected: {ada: true}})).toEqual(["ada", "alan", "katherine"])
    })

    it("nobody is credited from an empty roster", () => {
        for (const scope of ["choose", "class", "all"] as const) {
            expect(recipientIds({scope, classId: scope === "class" ? "c1" : "", students: [], selected: {a: true}})).toEqual([])
        }
    })
})

describe("alreadyCreditedCount", () => {
    it("counts who a whole-roster scope leaves out", () => {
        expect(alreadyCreditedCount({scope: "class", classId: "c1", students})).toBe(1)
        expect(alreadyCreditedCount({scope: "all", classId: "", students})).toBe(1)
    })

    it("is zero for choose, and while the roster does not match the scope", () => {
        expect(alreadyCreditedCount({scope: "choose", classId: "c1", students})).toBe(0)
        expect(alreadyCreditedCount({scope: "all", classId: "c1", students})).toBe(0)
        expect(alreadyCreditedCount({scope: "class", classId: "", students})).toBe(0)
    })
})

describe("rosterMatchesScope / eligibleStudents", () => {
    it("matches the scope to the roster on screen", () => {
        expect(rosterMatchesScope("choose", "")).toBe(true)
        expect(rosterMatchesScope("choose", "c1")).toBe(true)
        expect(rosterMatchesScope("class", "c1")).toBe(true)
        expect(rosterMatchesScope("class", "")).toBe(false)
        expect(rosterMatchesScope("all", "")).toBe(true)
        expect(rosterMatchesScope("all", "c1")).toBe(false)
    })

    it("eligible students are those without credit", () => {
        expect(eligibleStudents(students).map((s) => s.userId)).toEqual(["ada", "alan", "katherine"])
    })
})

describe("filters", () => {
    it("filterByName is case-insensitive, trims, and an empty query keeps everyone", () => {
        expect(filterByName(students, "  AL").map((s) => s.userId)).toEqual(["alan"])
        expect(filterByName(students, "a").length).toBe(4)
        expect(filterByName(students, "")).toBe(students)
        expect(filterByName(students, "zzz")).toEqual([])
    })

    it("filterBadges matches the badge name or its pathway", () => {
        const badges = [
            {badgeId: "1", displayName: "Service-Learning Project", pathwayName: "NYS Seal of Civic Readiness"},
            {badgeId: "2", displayName: "Career Exploration"},
        ]
        expect(filterBadges(badges, "service").map((b) => b.badgeId)).toEqual(["1"])
        expect(filterBadges(badges, "seal").map((b) => b.badgeId)).toEqual(["1"])
        expect(filterBadges(badges, "career").map((b) => b.badgeId)).toEqual(["2"])
        expect(filterBadges(badges, "")).toBe(badges)
    })
})

describe("pathway filter", () => {
    const badges = [
        {badgeId: "1", displayName: "Civic Leadership", pathwayId: "sacr", pathwayName: "NYS Seal of Civic Readiness"},
        {badgeId: "2", displayName: "Service-Learning", pathwayId: "sacr", pathwayName: "NYS Seal of Civic Readiness"},
        {badgeId: "3", displayName: "Seal of Biliteracy", pathwayId: "sb", pathwayName: "Biliteracy"},
        {badgeId: "4", displayName: "Career Exploration"},
        {badgeId: "5", displayName: "Four-Year Plan"},
    ]

    it("pathwayChoices lists each pathway once, by name, with its badge count, and counts the badges in none", () => {
        expect(pathwayChoices(badges)).toEqual({
            choices: [
                {key: "sb", label: "Biliteracy", count: 1},
                {key: "sacr", label: "NYS Seal of Civic Readiness", count: 2},
            ],
            withoutPathway: 2,
        })
    })

    it("two pathways that share a name stay separate when they have different ids", () => {
        const twins = [
            {pathwayId: "a", pathwayName: "Civics"},
            {pathwayId: "b", pathwayName: "Civics"},
        ]
        expect(pathwayChoices(twins).choices.map((c) => c.key)).toEqual(["a", "b"])
        expect(filterByPathway(twins, "a")).toEqual([twins[0]])
    })

    it("badges that only carry a pathway name are still grouped by it", () => {
        const named = [{pathwayName: "Civics"}, {pathwayName: "Civics"}, {}]
        expect(pathwayChoices(named)).toEqual({choices: [{key: "Civics", label: "Civics", count: 2}], withoutPathway: 1})
    })

    it("no badges have a pathway: nothing to choose from", () => {
        expect(pathwayChoices([{}, {}])).toEqual({choices: [], withoutPathway: 2})
        expect(pathwayChoices([])).toEqual({choices: [], withoutPathway: 0})
    })

    it("filterByPathway keeps one pathway, the badges in none, or everything", () => {
        expect(filterByPathway(badges, "sacr").map((b) => b.badgeId)).toEqual(["1", "2"])
        expect(filterByPathway(badges, NO_PATHWAY).map((b) => b.badgeId)).toEqual(["4", "5"])
        expect(filterByPathway(badges, "")).toBe(badges)
        expect(filterByPathway(badges, "gone")).toEqual([])
    })

    it("the pathway filter and the search work together", () => {
        const inPathway = filterByPathway(badges, "sacr")
        expect(filterBadges(inPathway, "service").map((b) => b.badgeId)).toEqual(["2"])
        expect(filterBadges(inPathway, "biliteracy")).toEqual([])
    })

    it("resolvePathwayFilter drops a choice that no longer exists", () => {
        const available = pathwayChoices(badges)
        expect(resolvePathwayFilter("sacr", available)).toBe("sacr")
        expect(resolvePathwayFilter(NO_PATHWAY, available)).toBe(NO_PATHWAY)
        expect(resolvePathwayFilter("gone", available)).toBe("")
        expect(resolvePathwayFilter(NO_PATHWAY, pathwayChoices([badges[0]]))).toBe("")
        expect(resolvePathwayFilter("", available)).toBe("")
    })
})
