import * as React from 'react';
import {IconChevronDown, IconChevronRight} from "@tabler/icons";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
import {useSortableData} from "../../utils/useSortableData";
import {InvalidateModal} from "./InvalidateModal";
import {Item as SharedItem, ServiceHourStatus as SharedStatus, formatDate} from "./shared";

/**
 * ServiceHourStatus, as the server derives it from the entry.
 */
export type ServiceHourStatus = SharedStatus

/**
 * Item. One entry a student logged.
 */
export type Item = SharedItem

/**
 * TableProps
 */
export type TableProps = {
    loading: boolean
    items: Item[]
    // For one student's own list (the Student page), where the student is already known.
    hideStudent?: boolean
    // Each resolves when the request has finished; the caller replaces the entry with what the server returned.
    onApprove?: (item: Item) => Promise<any>
    onInvalidate?: (item: Item, reason: string) => Promise<any>
    onStudentClick?: (userId: string) => void
}

const STATUS: Record<ServiceHourStatus, {label: string, className: string}> = {
    pending: {label: "Pending", className: "bg-sky-blue-400/15"},
    verified: {label: "Approved", className: "bg-mint-400/15"},
    invalidated: {label: "Invalidated", className: "bg-gold-400/15"},
    withdrawn: {label: "Withdrawn", className: "bg-slate-100"},
}

// What the Status column sorts by. Not alphabetical: the pending queue comes first.
const STATUS_RANK: Record<ServiceHourStatus, number> = {pending: 0, invalidated: 1, verified: 2, withdrawn: 3}

// An entry with the values its columns sort by (useSortableData sorts on a plain key of each row).
type SortRow = {
    item: Item
    studentName: string
    serviceDate: string
    service: string
    supports?: string
    hours: number
    statusRank: number
}

// Static header labels share the sortable headers' type style, so a row of mixed headers reads as one.
const staticLabelClass = "text-[10px] font-bold uppercase tracking-wide text-slate-500"

// One column list shared by the header and every row (all tracks are minmax(0, Nfr), so the rows
// line up with the header however long a cell's text is).
const columns = (hideStudent?: boolean) => [
    ...(hideStudent ? [] : ["minmax(0,1.3fr)"]),
    "minmax(0,0.8fr)",   // date
    "minmax(0,1.6fr)",   // service
    "minmax(0,1.3fr)",   // supports
    "minmax(0,0.5fr)",   // hours
    "minmax(0,0.6fr)",   // evidence
    "minmax(0,0.9fr)",   // status
    "minmax(0,1.4fr)",   // actions
    "1.25rem",           // expand chevron
].join(" ")

const labelClass = "text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400"

/**
 * Table. Service hours entries for review: one row per entry with approve and invalidate, and the
 * full detail (description, supervisor, edit history, earlier reason) when a row is opened.
 * @param props
 * @constructor
 */
export const Table = (props: TableProps) => {
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})
    const [busy, setBusy] = React.useState<Record<string, boolean>>({})
    const [invalidating, setInvalidating] = React.useState<Item | undefined>(undefined)
    const mounted = React.useRef(true)
    React.useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    const run = (entryId: string, request: () => Promise<any>) => {
        setBusy((b) => ({...b, [entryId]: true}))
        const done = () => {
            if (mounted.current) {
                setBusy((b) => ({...b, [entryId]: false}))
            }
        }
        Promise.resolve(request()).then(done, done)
    }

    const rows: SortRow[] = React.useMemo(() => props.items.map((item) => ({
        item,
        studentName: item.studentName,
        serviceDate: (item.serviceDate || "").slice(0, 10),
        service: item.hostName || item.serviceType,
        supports: item.supports,
        hours: item.hours,
        statusRank: STATUS_RANK[item.status],
    })), [props.items])
    // No initial sort: the server's order (newest submitted first) holds until a header is clicked.
    const {items: sortedRows, requestSort, sortConfig} = useSortableData<SortRow>(rows)

    if (props.items.length === 0) {
        return (
            <PlaceholderBanner
                title="No service hours to display"
                description="Nothing matches here yet. Entries appear when students log service."
                loading={props.loading}
                icon="thinking"
            />
        )
    }

    const template = columns(props.hideStudent)

    return (
        <div className="flex flex-col gap-3">
            <div style={{gridTemplateColumns: template}} className="grid items-center gap-3 px-5">
                {!props.hideStudent && <SortableHeader label="Student" sortKey="studentName" sortConfig={sortConfig} onSort={requestSort} />}
                <SortableHeader label="Date" sortKey="serviceDate" sortConfig={sortConfig} onSort={requestSort} />
                <SortableHeader label="Service" sortKey="service" sortConfig={sortConfig} onSort={requestSort} />
                <SortableHeader label="Supports" sortKey="supports" sortConfig={sortConfig} onSort={requestSort} />
                <SortableHeader label="Hours" sortKey="hours" sortConfig={sortConfig} onSort={requestSort} />
                <div className={staticLabelClass}>Evidence</div>
                <SortableHeader label="Status" sortKey="statusRank" sortConfig={sortConfig} onSort={requestSort} align="center" />
                <div className={`text-center ${staticLabelClass}`}>Review</div>
                <div />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {sortedRows.map(({item}, i) => {
                    const open = !!expanded[item.entryId]
                    const working = !!busy[item.entryId]
                    const status = STATUS[item.status]
                    const canApprove = !!props.onApprove && (item.status === "pending" || item.status === "invalidated")
                    const canInvalidate = !!props.onInvalidate && (item.status === "pending" || item.status === "verified")
                    // The server only accepts https links; check again before putting one in an href.
                    const evidence = !!item.evidenceUrl && item.evidenceUrl.indexOf("https://") === 0 ? item.evidenceUrl : ""

                    return (
                        <div key={item.entryId} className={i < sortedRows.length - 1 ? "border-b border-slate-100" : ""}>
                            <div
                                onClick={() => setExpanded((e) => ({...e, [item.entryId]: !open}))}
                                style={{gridTemplateColumns: template}}
                                className="grid cursor-pointer items-start gap-3 px-5 py-3.5 hover:bg-slate-50"
                            >
                                {!props.hideStudent && (
                                    <div className="flex min-w-0 items-center gap-2">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-[10px] font-bold text-dark-blue-400">
                                            {(item.studentName[0] || "?").toUpperCase()}
                                        </div>
                                        {props.onStudentClick ? (
                                            <button
                                                type="button"
                                                title={item.studentName}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    props.onStudentClick!(item.userId)
                                                }}
                                                className="line-clamp-2 text-left text-xs font-bold text-sky-blue-400 hover:underline"
                                            >
                                                {item.studentName}
                                            </button>
                                        ) : (
                                            <div title={item.studentName} className="line-clamp-2 text-xs font-bold text-dark-blue-400">
                                                {item.studentName}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="text-[11px] text-slate-500">{formatDate(item.serviceDate)}</div>
                                <div className="min-w-0">
                                    <div title={item.hostName} className="line-clamp-2 text-xs font-bold text-dark-blue-400">
                                        {item.hostName || item.serviceType}
                                    </div>
                                    {item.hostName && <div className="truncate text-[11px] text-slate-400">{item.serviceType}</div>}
                                </div>
                                <div title={item.supports} className="line-clamp-2 text-[11px] text-slate-500">{item.supports || "—"}</div>
                                <div className="text-xs font-semibold text-dark-blue-400">{item.hours} hr{item.hours === 1 ? "" : "s"}</div>
                                <div>
                                    {evidence ? (
                                        <a
                                            href={evidence}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-[11px] font-bold text-sky-blue-400 hover:underline"
                                        >
                                            View ↗
                                        </a>
                                    ) : (
                                        <span className="text-[11px] text-slate-400">—</span>
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold text-dark-blue-400 ${status.className}`}>
                                        {status.label}
                                    </span>
                                </div>
                                <div className="flex flex-wrap justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                    {canApprove && (
                                        <button
                                            type="button"
                                            disabled={working}
                                            onClick={() => run(item.entryId, () => props.onApprove!(item))}
                                            className="rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3 py-1.5 text-[11px] font-extrabold text-dark-blue-400 disabled:opacity-50"
                                        >
                                            {working ? "..." : "Approve"}
                                        </button>
                                    )}
                                    {canInvalidate && (
                                        <button
                                            type="button"
                                            disabled={working}
                                            onClick={() => setInvalidating(item)}
                                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                                        >
                                            Invalidate
                                        </button>
                                    )}
                                    {!canApprove && !canInvalidate && <span className="text-[11px] text-slate-400">—</span>}
                                </div>
                                <div className="flex justify-end text-slate-400">
                                    {open ? <IconChevronDown size={14} stroke={2} /> : <IconChevronRight size={14} stroke={2} />}
                                </div>
                            </div>

                            {open && (
                                <div className="grid gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <div className={labelClass}>What they did</div>
                                        <p className="mt-1 text-xs text-slate-600">{item.description || "—"}</p>
                                    </div>
                                    <div>
                                        <div className={labelClass}>Supervisor</div>
                                        <div className="mt-1 text-xs text-slate-600">
                                            {item.contactPerson || item.contactPhone || item.contactEmail ? (
                                                <>
                                                    {item.contactPerson && <div>{item.contactPerson}</div>}
                                                    {item.contactPhone && <div>{item.contactPhone}</div>}
                                                    {item.contactEmail && <div>{item.contactEmail}</div>}
                                                </>
                                            ) : "—"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className={labelClass}>History</div>
                                        <div className="mt-1 text-xs text-slate-600">
                                            <div>Submitted {formatDate(item.createdAt)}</div>
                                            {item.editedAt && <div>Edited {formatDate(item.editedAt)}</div>}
                                        </div>
                                    </div>
                                    {item.reviewNote && (
                                        <div className="rounded-lg bg-gold-400/15 px-3 py-2 text-xs text-dark-blue-400 sm:col-span-2">
                                            <span className="font-bold">
                                                {item.status === "invalidated" ? "Reason given: " : "Earlier reason, before the student edited it: "}
                                            </span>
                                            {item.reviewNote}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <InvalidateModal
                item={invalidating}
                onClose={() => setInvalidating(undefined)}
                onSubmit={(reason) => {
                    const item = invalidating!
                    setBusy((b) => ({...b, [item.entryId]: true}))
                    const done = () => {
                        if (mounted.current) {
                            setBusy((b) => ({...b, [item.entryId]: false}))
                        }
                    }
                    const request = Promise.resolve(props.onInvalidate!(item, reason))
                    request.then(done, done)
                    return request
                }}
            />
        </div>
    )
}
