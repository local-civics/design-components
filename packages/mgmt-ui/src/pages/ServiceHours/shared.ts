/**
 * ServiceHourStatus, as the server derives it from the entry.
 */
export type ServiceHourStatus = "pending" | "verified" | "invalidated" | "withdrawn"

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
    status: ServiceHourStatus
    // YYYY-MM-DD, or a full timestamp (only the date part is shown).
    serviceDate: string
    hostName: string
    serviceType: string
    hours: number
    description?: string
    contactPerson?: string
    contactPhone?: string
    contactEmail?: string
    // What the entry supports, already joined by the caller, e.g. "Civic Readiness · 2b. Service-Learning Project".
    supports?: string
    evidenceUrl?: string
    // The reason an educator gave when invalidating. Kept after the student edits and resubmits.
    reviewNote?: string
    editedAt?: string
    createdAt?: string
}

export const formatDate = (value?: string) => {
    const [year, month, day] = (value || "").slice(0, 10).split("-").map(Number)
    if (!year || !month || !day) {
        return value || "—"
    }

    return new Date(year, month - 1, day).toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"})
}
