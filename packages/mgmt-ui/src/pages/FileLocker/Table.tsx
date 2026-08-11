import * as React from 'react';
import {IconChevronRight} from "@tabler/icons";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Stack as FileStack} from "./FileStack";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    submissions: SubmissionItem[]
}

export interface SubmissionItem {
    link: string
    badgeName: string
    badgeId: string
    lessonName: string
    question: string
    // Already present on every submission returned by getFileLocker() (useOrganization.ts) - just
    // wasn't declared here before, so nothing read it. No new API call, no hub change: this data is
    // already flowing through today, purely a type-level addition to unlock it.
    updatedAt?: string
    // Derived client-side in FileLocker.tsx from badgeId (badge -> pathway prefix-match), not part
    // of the raw API response - attached before these items ever reach this component.
    pathwayName?: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * TableProps
 */
export type TableProps = TableData & {
    hideBadge?: boolean
    hideLesson?: boolean
    hidePathway?: boolean
    onReview?: (item: Item) => void
}

const initials = (name: string) => name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

    const preparedItems = React.useMemo(() => {
        return props.items.map(item => ({
            ...item,
            submissionCount: item.submissions?.length || 0,
        }));
    }, [props.items]);

    const { items: sortedItems, requestSort, sortConfig } = useSortableData(preparedItems);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No files to display"
            description="There are no submitted files to display yet."
            loading={props.loading}
            icon="badges"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴")

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <button onClick={() => requestSort("name")} className="flex-1 text-left hover:text-slate-600">Student Name{indicator("name")}</button>
                <button onClick={() => requestSort("submissionCount")} className="w-16 shrink-0 text-left hover:text-slate-600">Files{indicator("submissionCount")}</button>
                {props.onReview && <div className="w-36 shrink-0" />}
                <div className="w-4 shrink-0" />
            </div>

            {sortedItems.map((row) => {
                const isOpen = !!expanded[row.userId]
                return (
                    <div key={row.userId} className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div
                            onClick={() => setExpanded({...expanded, [row.userId]: !isOpen})}
                            className="flex cursor-pointer items-center gap-4 p-4"
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                {row.avatar
                                    ? <img src={row.avatar} className="h-9 w-9 shrink-0 rounded-full object-cover" alt=""/>
                                    : <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mint-400 to-dark-blue-400 text-xs font-bold text-white">
                                        {initials(row.name)}
                                    </div>}
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-bold text-dark-blue-400">{row.name}</div>
                                    <div className="truncate text-xs text-slate-400">{row.email}</div>
                                </div>
                            </div>
                            <div className="w-16 shrink-0 text-sm font-bold text-dark-blue-400">{row.submissions.length}</div>
                            {props.onReview && (
                                <div className="w-36 shrink-0">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); props.onReview!(row) }}
                                        className="rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3 py-1.5 text-[11px] font-extrabold text-dark-blue-400"
                                    >
                                        Review Submission
                                    </button>
                                </div>
                            )}
                            <IconChevronRight size={16} stroke={2} className={`w-4 shrink-0 text-slate-300 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                        </div>
                        {isOpen && (
                            <div className="border-t border-slate-100 px-4 py-3">
                                <FileStack items={row.submissions} hideBadge={props.hideBadge} hideLesson={props.hideLesson} hidePathway={props.hidePathway} />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
}
