import * as React from "react"
import { FileLockerUserItem } from "./FileLocker"

export type Submission = {
    badgeId: string
    lessonName: string
}

export const useFilteredStudents = (students: FileLockerUserItem[]) => {
    return React.useMemo(() => {

        const byBadge = (badgeId: string): FileLockerUserItem[] =>
            students
                .map(s => ({
                    ...s,
                    submissions: (s.submissions || []).filter(
                        (sub) => sub.badgeId === badgeId
                    )
                }))
                .filter(s => s.submissions.length)

        const byLesson = (lessonName: string): FileLockerUserItem[] =>
            students
                .map(s => ({
                    ...s,
                    submissions: (s.submissions || []).filter(
                        (sub) => sub.lessonName === lessonName
                    )
                }))
                .filter(s => s.submissions.length)

        const byPathway = (
            pathwayId: string,
            badges: any[]
        ): FileLockerUserItem[] => {

            const validBadgeIds = badges
                .filter((b: any) =>
                    Array.isArray(b.categories) &&
                    b.categories.some((c: string) =>
                        c.startsWith(pathwayId)
                    )
                )
                .map((b: any) => b.badgeId)

            return students
                .map(s => ({
                    ...s,
                    submissions: (s.submissions || []).filter(
                        (sub) => validBadgeIds.includes(sub.badgeId)
                    )
                }))
                .filter(s => s.submissions.length)
        }

        return { byBadge, byLesson, byPathway }

    }, [students])
}