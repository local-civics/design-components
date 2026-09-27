import * as React from 'react';
import {IconSearch} from "@tabler/icons";

/**
 * StudentStatusFilter - "all" is the default. Callers keep this as controlled state (one level
 * above the page component) because the same value also decides who belongs in the Prev/Next
 * grading queue built for a "By student" tab's rows.
 */
export type StudentStatusFilter = "all" | "submitted" | "active" | "inactive"

const STATUS_FILTERS: {value: StudentStatusFilter, label: string}[] = [
    {value: "all", label: "All"},
    {value: "submitted", label: "Submitted"},
    {value: "active", label: "Active"},
    {value: "inactive", label: "Inactive"},
]

/**
 * The one rule behind the status pills: "submitted" = complete, "active" = started but not
 * complete, "inactive" = neither. Exported so hub's grading-queue filter and the table stay in
 * lockstep instead of each re-deriving it.
 */
export const matchesStudentStatus = (student: {isComplete?: boolean, isStarted?: boolean}, filter: StudentStatusFilter) =>
    filter === "all" ? true :
    filter === "submitted" ? !!student.isComplete :
    filter === "active" ? (!student.isComplete && !!student.isStarted) :
    (!student.isComplete && !student.isStarted)

/**
 * StudentStatusFilterBarProps
 */
export type StudentStatusFilterBarProps = {
    statusFilter: StudentStatusFilter
    onStatusFilterChange?: (filter: StudentStatusFilter) => void
    search: string
    onSearchChange: (search: string) => void
}

/**
 * Status pills plus a name search, shown above a "By student" table (Lesson and Badge Overview).
 * @param props
 * @constructor
 */
export const StudentStatusFilterBar = (props: StudentStatusFilterBarProps) => (
    <div className="flex flex-wrap items-center gap-3">
        <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
            {STATUS_FILTERS.map((f) => (
                <button
                    key={f.value}
                    onClick={() => props.onStatusFilterChange && props.onStatusFilterChange(f.value)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-bold ${props.statusFilter === f.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                >
                    {f.label}
                </button>
            ))}
        </div>
        <div className="flex min-w-[220px] flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <IconSearch size={15} stroke={1.75} className="text-slate-400" />
            <input
                type="text"
                value={props.search}
                placeholder="Search by student name"
                onChange={(e) => props.onSearchChange(e.target.value)}
                className="w-full flex-1 border-none bg-transparent text-sm text-dark-blue-400 outline-none placeholder:text-slate-400"
            />
        </div>
    </div>
)
