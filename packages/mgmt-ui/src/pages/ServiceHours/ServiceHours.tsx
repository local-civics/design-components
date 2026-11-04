import * as React from 'react';
import {IconSearch} from "@tabler/icons";
import {Table} from "./Table";
import {Item} from "./shared";

/**
 * ServiceHourReviewItem
 */
export type ServiceHourReviewItem = Item

/**
 * ServiceHoursProps
 */
export type ServiceHoursProps = {
    loading: boolean
    items: ServiceHourReviewItem[]
    // More entries exist on the server than were loaded; "Load more" asks for the next page.
    hasMore?: boolean
    loadingMore?: boolean

    // Each resolves when the request has finished. The caller replaces the entry with the one the
    // server returned (or reloads it on a conflict), so what shows is always the server's version.
    onApprove: (item: ServiceHourReviewItem) => Promise<any>
    onInvalidate: (item: ServiceHourReviewItem, reason: string) => Promise<any>
    onStudentClick?: (userId: string) => void
    onLoadMore?: () => void
}

type StatusFilter = "pending" | "verified" | "invalidated" | "withdrawn" | "all"

// Pending first and the default: it is the queue an educator comes here to clear.
const FILTERS: {label: string, value: StatusFilter}[] = [
    {label: "Pending", value: "pending"},
    {label: "Approved", value: "verified"},
    {label: "Invalidated", value: "invalidated"},
    {label: "Withdrawn", value: "withdrawn"},
    {label: "All", value: "all"},
]

/**
 * ServiceHours. Every service hours entry students in the organization have logged, with approve
 * and invalidate. Defaults to the pending queue; search narrows by student or host organization.
 * @param props
 * @constructor
 */
export const ServiceHours = (props: ServiceHoursProps) => {
    const [filter, setFilter] = React.useState<StatusFilter>("pending")
    const [search, setSearch] = React.useState("")

    const count = (status: StatusFilter) =>
        status === "all" ? props.items.length : props.items.filter((i) => i.status === status).length

    const term = search.trim().toLowerCase()
    const visible = props.items.filter((i) =>
        (filter === "all" || i.status === filter) &&
        (!term || i.studentName.toLowerCase().includes(term) || (i.hostName || "").toLowerCase().includes(term)))

    return (
        <div className="flex w-full flex-col gap-5 px-4 py-8">
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Service Hours</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Review the service hours your students log. Approve what checks out, and tell students what to fix on the rest.
                </p>
            </div>

            <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
                {FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`rounded-lg px-4 py-2 text-xs font-bold ${filter === f.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        {f.label} ({count(f.value)})
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <IconSearch size={15} stroke={1.75} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by student or organization"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border-none bg-transparent text-sm text-dark-blue-400 outline-none placeholder:text-slate-400"
                />
            </div>

            <Table
                loading={props.loading}
                items={visible}
                onApprove={props.onApprove}
                onInvalidate={props.onInvalidate}
                onStudentClick={props.onStudentClick}
            />

            {props.hasMore && props.onLoadMore && (
                <button
                    type="button"
                    disabled={props.loadingMore}
                    onClick={props.onLoadMore}
                    className="w-fit self-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                >
                    {props.loadingMore ? "Loading..." : "Load more"}
                </button>
            )}
        </div>
    )
}
