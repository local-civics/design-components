import {formatMinutes, Item as HourItem} from "../Hours/shared";

/**
 * What the educator sees on a student's Overview tab, worked out from data the page already has: the
 * pathways the student has touched, their badges and lessons, and their hours entries. Pure functions,
 * kept apart from the component so the rules (when a pathway reads Completed, what needs attention) are
 * covered by tests.
 */

export type OverviewStatus = "Not started" | "In progress" | "Completed"

/**
 * OverviewPathway. The raw ingredients of one pathway for one student; the status and the progress rows
 * are derived here, so every screen that shows them can use the same rules.
 */
export type OverviewPathway = {
    pathwayId: string
    title: string
    imageURL?: string
    badgesCompleted: number
    badgesTotal: number
    // Any badge or lesson in this pathway has been started or finished.
    started: boolean
    // {categoryId: points required}, as the pathway defines it. Values arrive untyped from the API.
    criteria: Record<string, unknown>
    // Points counted so far per category, already capped by each category's maximum.
    points: Record<string, number>
    categoryNames: Record<string, string>
    // categoryId -> parent categoryId; a category with no parent is the pathway's total.
    categoryParents: Record<string, string | null | undefined>
}

export type OverviewCategory = {
    categoryId: string
    name: string
    earned: number
    required: number
    // The pathway's own total (a category with no parent) rather than one of its requirements.
    isTotal: boolean
    met: boolean
}

/** A threshold from the pathway's criteria, or undefined when it is not a usable number. */
const threshold = (value: unknown): number | undefined => {
    const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN
    return Number.isFinite(n) && n > 0 ? n : undefined
}

/**
 * The pathway's progress rows, one per criterion: the total first, then each requirement by name.
 * Criteria that are not a usable positive number are skipped, so a bad value can never read as met.
 */
export const pathwayCategories = (p: OverviewPathway): OverviewCategory[] => {
    const rows: OverviewCategory[] = []
    Object.keys(p.criteria || {}).forEach((categoryId) => {
        const required = threshold(p.criteria[categoryId])
        if (required === undefined) return
        const earned = Number(p.points?.[categoryId]) || 0
        rows.push({
            categoryId,
            name: p.categoryNames?.[categoryId] || categoryId,
            earned,
            required,
            isTotal: !p.categoryParents?.[categoryId],
            met: earned >= required,
        })
    })

    return rows.sort((a, b) => (a.isTotal === b.isTotal ? a.name.localeCompare(b.name) : a.isTotal ? -1 : 1))
}

/**
 * Same rule as the student's own transcript (hub-ui PathwayTranscript): with criteria, Completed means
 * every criterion is met; without, every badge in the pathway is complete. Anything started otherwise
 * reads In progress.
 */
export const pathwayStatus = (p: OverviewPathway): OverviewStatus => {
    const rows = pathwayCategories(p)
    const touched = p.started || p.badgesCompleted > 0
    if (rows.length > 0) {
        if (rows.every((r) => r.met)) return "Completed"
        return touched ? "In progress" : "Not started"
    }

    if (p.badgesTotal > 0 && p.badgesCompleted === p.badgesTotal) return "Completed"
    return touched ? "In progress" : "Not started"
}

/** Up to one decimal place, no trailing zero: 2 -> "2", 1.5 -> "1.5", 0.25 -> "0.3". */
export const formatPoints = (n: number): string => {
    const rounded = Math.round((Number(n) || 0) * 10) / 10
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

/** Share of a requirement met, 0 to 100, for a progress bar. */
export const percentOf = (earned: number, required: number): number =>
    required > 0 ? Math.max(0, Math.min(100, (earned / required) * 100)) : 0

// ---------------------------------------------------------------------------------------------------------

export type ActivityKind = "badge" | "lesson" | "hours"

export type ActivityItem = {
    id: string
    kind: ActivityKind
    title: string
    detail?: string
    // ISO timestamp or YYYY-MM-DD
    at: string
}

export type ActivityBadge = { badgeId: string, badgeName: string, isComplete?: boolean, completedAt?: string, pathwayName?: string }
export type ActivityLesson = {
    lessonId: string
    lessonName: string
    isComplete: boolean
    // When the student submitted it.
    finishedAt?: string
    badgeName?: string
    // The last time the student saved work on a lesson they have not submitted, and how much they have written:
    // non-empty answers, and any reflection. See workedOn() for how these decide whether it counts as activity.
    updatedAt?: string
    answeredQuestions?: number
    reflection?: string
}

const timeOf = (value?: string): number => {
    const t = value ? new Date(value).getTime() : NaN
    return Number.isFinite(t) ? t : NaN
}

const HOUR_STATUS_TEXT: Record<string, string> = {
    pending: "Waiting for approval",
    verified: "Approved",
    invalidated: "Not approved",
    withdrawn: "Withdrawn",
}

/**
 * Whether a lesson that has not been submitted shows real work: at least one non-empty answer or a reflection
 * has been saved, and the save has a date. Opening a lesson creates an empty record, so a lesson that was only
 * opened does not count. This measures effort that is there, not its quality (that cannot be judged cheaply).
 */
const workedOn = (l: ActivityLesson): number => {
    if (l.isComplete || !l.updatedAt) return 0
    return Math.max(0, Number(l.answeredQuestions) || 0) + (l.reflection && l.reflection.trim() ? 1 : 0)
}

/**
 * The student's latest completed badges, submitted lessons, lessons they are working on, and logged hours, newest
 * first. Entries without a usable date are left out.
 */
export const recentActivity = (
    input: { badges: ActivityBadge[], lessons: ActivityLesson[], hours?: HourItem[] },
    limit = 6,
): ActivityItem[] => {
    const items: ActivityItem[] = []
    input.badges.forEach((b) => {
        if (b.isComplete && b.completedAt) {
            items.push({id: `badge-${b.badgeId}`, kind: "badge", title: `Earned ${b.badgeName}`, detail: b.pathwayName, at: b.completedAt})
        }
    })

    input.lessons.forEach((l) => {
        if (l.isComplete && l.finishedAt) {
            items.push({id: `lesson-${l.lessonId}`, kind: "lesson", title: `Submitted ${l.lessonName}`, detail: l.badgeName, at: l.finishedAt})
        } else if (workedOn(l) > 0 && l.updatedAt) {
            const answered = Number(l.answeredQuestions) || 0
            const what = answered > 0 ? `${answered} question${answered === 1 ? "" : "s"} answered` : "Reflection started"
            items.push({id: `lesson-${l.lessonId}`, kind: "lesson", title: `Worked on ${l.lessonName}`, detail: [what, l.badgeName].filter(Boolean).join(" · "), at: l.updatedAt})
        }
    })

    ;(input.hours || []).forEach((h) => {
        if (h.status === "withdrawn") return
        const at = h.createdAt || h.activityDate
        const what = [formatMinutes(h.minutes), h.activityType].filter(Boolean).join(" ")
        items.push({id: `hours-${h.entryId}`, kind: "hours", title: `Logged ${what}`, detail: HOUR_STATUS_TEXT[h.status] || h.status, at})
    })

    return items
        .filter((i) => Number.isFinite(timeOf(i.at)))
        .sort((a, b) => timeOf(b.at) - timeOf(a.at))
        .slice(0, limit)
}

/** The date of the student's most recent activity of any kind, or undefined when there is none. */
export const lastActivityAt = (items: ActivityItem[]): string | undefined => items.length ? items[0].at : undefined

// ---------------------------------------------------------------------------------------------------------

export type AttentionAction = { type: "hours" } | { type: "pathway", pathwayId: string }

export type AttentionItem = {
    id: string
    tone: "warn" | "info"
    title: string
    detail?: string
    action?: AttentionAction
}

/** A student with no activity for this many days is flagged. */
export const INACTIVE_AFTER_DAYS = 14

const DAY_MS = 24 * 60 * 60 * 1000

/** Whole days between two moments; 0 for the same day or a future date. */
export const daysSince = (at: string, now: Date): number => {
    const t = timeOf(at)
    return Number.isFinite(t) ? Math.max(0, Math.floor((now.getTime() - t) / DAY_MS)) : 0
}

/**
 * What the educator should look at, from what is known today: hours waiting for approval, no recent
 * activity, and requirements with no points yet in a pathway that is under way. More signals (an
 * unresolved comment, a file waiting for review) can be added here once their data reaches this page.
 */
export const attentionItems = (input: {
    pathways: OverviewPathway[]
    hours?: HourItem[]
    // The most recent activity of any kind, from recentActivity() with no limit applied.
    lastActivity?: string
    now: Date
    // Requirements with no points listed per pathway, at most.
    maxRequirementsPerPathway?: number
}): AttentionItem[] => {
    const items: AttentionItem[] = []

    const pending = (input.hours || []).filter((h) => h.status === "pending")
    if (pending.length > 0) {
        const minutes = pending.reduce((sum, h) => sum + (Number(h.minutes) || 0), 0)
        items.push({
            id: "pending-hours",
            tone: "warn",
            title: "Hours waiting for approval",
            detail: `${pending.length} ${pending.length === 1 ? "entry" : "entries"}, ${formatMinutes(minutes)} in total`,
            action: {type: "hours"},
        })
    }

    if (!input.lastActivity) {
        items.push({id: "no-activity", tone: "info", title: "No activity yet", detail: "No lesson work, submissions or hours yet"})
    } else {
        const days = daysSince(input.lastActivity, input.now)
        if (days >= INACTIVE_AFTER_DAYS) {
            items.push({id: "inactive", tone: "warn", title: `No activity in ${days} days`, detail: "Last activity was a while ago"})
        }
    }

    const perPathway = input.maxRequirementsPerPathway ?? 2
    input.pathways.forEach((p) => {
        if (pathwayStatus(p) !== "In progress") return
        pathwayCategories(p)
            .filter((c) => !c.isTotal && c.earned === 0)
            .slice(0, perPathway)
            .forEach((c) => items.push({
                id: `empty-${p.pathwayId}-${c.categoryId}`,
                tone: "info",
                title: `No ${c.name} points yet`,
                detail: p.title,
                action: {type: "pathway", pathwayId: p.pathwayId},
            }))
    })

    return items
}
