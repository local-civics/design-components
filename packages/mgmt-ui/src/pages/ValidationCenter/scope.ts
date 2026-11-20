/**
 * Who a credit goes to. Pure functions, kept apart from the component so the rules that decide which
 * people receive credit (the part that cannot be undone) are covered by tests.
 */

/** "choose": tick students one by one; "class": everyone in the chosen class; "all": everyone the educator can see */
export type Scope = "choose" | "class" | "all"

export type ScopeStudent = { userId: string, name: string, hasCredit: boolean }

type Inputs = {
    scope: Scope
    // The class the roster currently shows; "" means every class the educator can see.
    classId: string
    students: ScopeStudent[]
    // Ticked students, used only by the "choose" scope
    selected: Record<string, boolean>
}

/** Students who can still receive credit. Giving credit again to someone who has it is a no-op. */
export const eligibleStudents = <T extends { hasCredit: boolean }>(students: T[]): T[] =>
    students.filter((s) => !s.hasCredit)

/**
 * Whether the roster on screen is the one this scope refers to. "Entire class" needs a class chosen and
 * "All students" needs the unfiltered roster; while the page is still switching between the two, the
 * roster on screen is the wrong one and nobody may be credited from it.
 */
export const rosterMatchesScope = (scope: Scope, classId: string): boolean => {
    if (scope === "class") return classId !== ""
    if (scope === "all") return classId === ""
    return true
}

/** The people who will receive credit, in roster order. */
export const recipientIds = ({scope, classId, students, selected}: Inputs): string[] => {
    const eligible = eligibleStudents(students)
    if (scope === "choose") {
        return eligible.filter((s) => selected[s.userId]).map((s) => s.userId)
    }

    return rosterMatchesScope(scope, classId) ? eligible.map((s) => s.userId) : []
}

/** How many people in a whole-roster scope are left out because they already have credit. */
export const alreadyCreditedCount = ({scope, classId, students}: Omit<Inputs, "selected">): number => {
    if (scope === "choose" || !rosterMatchesScope(scope, classId)) return 0
    return students.length - eligibleStudents(students).length
}

const normalize = (text: string) => text.trim().toLowerCase()

/** Case-insensitive match on name; an empty query keeps everything. */
export const filterByName = <T extends { name: string }>(items: T[], query: string): T[] => {
    const q = normalize(query)
    return q ? items.filter((item) => item.name.toLowerCase().includes(q)) : items
}

/** Case-insensitive match on a badge's name or pathway; an empty query keeps everything. */
export const filterBadges = <T extends { displayName: string, pathwayName?: string }>(badges: T[], query: string): T[] => {
    const q = normalize(query)
    return q
        ? badges.filter((b) => b.displayName.toLowerCase().includes(q) || (b.pathwayName || "").toLowerCase().includes(q))
        : badges
}

/** The pathway filter's value for "badges that belong to no pathway". "" means every pathway. */
export const NO_PATHWAY = "__none__"

type PathwayBadge = { pathwayId?: string, pathwayName?: string }

/** Which pathway a badge is in: its id when known (two pathways can share a name), else its name; "" when it has none. */
const pathwayKey = (b: PathwayBadge): string => b.pathwayId || b.pathwayName || ""

export type PathwayChoice = { key: string, label: string, count: number }

/**
 * What the pathway filter offers: one choice per pathway that has badges (by name, with how many badges it holds),
 * and how many badges are in no pathway.
 */
export const pathwayChoices = (badges: PathwayBadge[]): { choices: PathwayChoice[], withoutPathway: number } => {
    const byKey: Record<string, PathwayChoice> = {}
    let withoutPathway = 0
    badges.forEach((b) => {
        const key = pathwayKey(b)
        if (!key) {
            withoutPathway++
        } else if (byKey[key]) {
            byKey[key].count++
        } else {
            byKey[key] = {key, label: b.pathwayName || "Unnamed pathway", count: 1}
        }
    })
    const choices = Object.values(byKey).sort((a, b) => a.label.localeCompare(b.label, undefined, {sensitivity: "base"}))
    return {choices, withoutPathway}
}

/** Keeps the badges in the chosen pathway. "" keeps everything; NO_PATHWAY keeps the badges that are in none. */
export const filterByPathway = <T extends PathwayBadge>(badges: T[], filter: string): T[] => {
    if (!filter) return badges
    return badges.filter((b) => (filter === NO_PATHWAY ? pathwayKey(b) === "" : pathwayKey(b) === filter))
}

/**
 * The filter to apply right now. A choice that no longer exists (the badge list changed underneath the page) falls
 * back to "every pathway", so the list can never be empty because of a filter the educator cannot see or clear.
 */
export const resolvePathwayFilter = (filter: string, available: { choices: PathwayChoice[], withoutPathway: number }): string => {
    if (filter === NO_PATHWAY) return available.withoutPathway > 0 ? filter : ""
    return available.choices.some((c) => c.key === filter) ? filter : ""
}
