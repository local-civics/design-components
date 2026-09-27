import * as React from 'react';

/**
 * StudentNameCellProps
 */
export type StudentNameCellProps = {
    userId: string
    name: string
    email: string
    avatar?: string
    // When supplied, the avatar/name/email block becomes its own button that opens the student's
    // profile. It stops propagation, so the row's own expand/collapse click doesn't also fire.
    onStudentClick?: (userId: string) => void
}

/**
 * The avatar + name + email block at the start of a "By student" row (Pathway, Badge and Lesson
 * Overview). Shared so the three tables' name click-through looks and behaves the same.
 * @param props
 * @constructor
 */
export const StudentNameCell = (props: StudentNameCellProps) => {
    const initials = (props.name?.[0] || props.email?.[0] || "?").toUpperCase()
    const avatar = props.avatar
        ? <img src={props.avatar} className="h-9 w-9 shrink-0 rounded-full object-cover" alt="" />
        : <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-xs font-bold text-dark-blue-400">{initials}</div>

    if (props.onStudentClick) {
        return (
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); props.onStudentClick!(props.userId) }}
                className="group flex min-w-0 flex-1 items-center gap-3 text-left"
            >
                {avatar}
                <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-sky-blue-400 group-hover:underline">{props.name}</div>
                    <div className="truncate text-xs text-slate-400">{props.email}</div>
                </div>
            </button>
        )
    }

    return (
        <div className="flex min-w-0 flex-1 items-center gap-3">
            {avatar}
            <div className="min-w-0">
                <div className="truncate text-sm font-bold text-dark-blue-400">{props.name}</div>
                <div className="truncate text-xs text-slate-400">{props.email}</div>
            </div>
        </div>
    )
}
