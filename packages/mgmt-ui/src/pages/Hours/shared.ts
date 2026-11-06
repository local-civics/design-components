/**
 * HourStatus, as the server derives it from the entry.
 */
export type HourStatus = "pending" | "verified" | "invalidated" | "withdrawn"

/**
 * Item. One entry a student logged.
 */
export type Item = {
    entryId: string
    // The version the educator is looking at. Approve and invalidate send it back, so reviewing an
    // entry the student has since edited is refused instead of silently approving the new version.
    revision: number
    userId: string
    studentName: string
    status: HourStatus
    // YYYY-MM-DD, or a full timestamp (only the date part is shown).
    activityDate: string
    hostName: string
    activityType: string
    hours: number
    description?: string
    contactPerson?: string
    contactPhone?: string
    contactEmail?: string
    // What the entry supports, already joined by the caller, e.g. "Civic Readiness · 2b. Service-Learning Project".
    supports?: string
    // The pathway and requirement the entry counts toward (ids), when the student linked one, and their
    // names (the two halves of `supports`) so the breakdown can group requirements under their pathway.
    pathwayId?: string
    categoryId?: string
    pathwayTitle?: string
    categoryName?: string
    evidenceUrl?: string
    // The reason an educator gave when invalidating. Kept after the student edits and resubmits.
    reviewNote?: string
    editedAt?: string
    createdAt?: string
}

// The day an entry was submitted, in the viewer's own time zone (the server sends a UTC timestamp, so
// slicing the string, as formatDate does for a plain date, would show tomorrow for an evening submission).
export const formatTimestamp = (value?: string) => {
    const date = value ? new Date(value) : undefined
    if (!date || isNaN(date.getTime())) {
        return "—"
    }

    return date.toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"})
}

export const formatDate = (value?: string) => {
    const [year, month, day] = (value || "").slice(0, 10).split("-").map(Number)
    if (!year || !month || !day) {
        return value || "—"
    }

    return new Date(year, month - 1, day).toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"})
}
