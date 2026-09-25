import * as React from 'react';
import {IconChevronRight} from "@tabler/icons";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
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
    lessonId?: string
    question: string
    updatedAt?: string
    pathwayName?: string
    pathwayId?: string
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
    // Opens the Leave Comment modal (see LeaveCommentModal) prepopulated for the specific submission
    // row clicked - lives per-file (rendered inside each expanded student's FileStack) rather than
    // at the student level, so the comment is scoped to the exact lesson/badge that file is for
    // instead of guessing at one. Table just threads this down along with the row's own userId.
    onComment?: (userId: string, submission: SubmissionItem) => void
    onBadgeClick?: (badgeId: string) => void
    onLessonClick?: (lessonId: string) => void
    onPathwayClick?: (pathwayId: string) => void
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

    // Comment now lives per-file (inside each expanded FileStack), not at the student-row level -
    // this action column is Review Submission only.
    const showActions = !!props.onReview
    const actionsWidthClass = "w-36"

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No files to display"
            description="There are no submitted files to display yet."
            loading={props.loading}
            icon="badges"
        />
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 px-4">
                <SortableHeader label="Student Name" sortKey="name" sortConfig={sortConfig} onSort={requestSort} className="flex-1" />
                <SortableHeader label="Files" sortKey="submissionCount" sortConfig={sortConfig} onSort={requestSort} className="w-16 shrink-0" />
                {showActions && <div className={`${actionsWidthClass} shrink-0`} />}
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
                            {showActions && (
                                <div className={`flex ${actionsWidthClass} shrink-0 gap-2`}>
                                    {props.onReview && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); props.onReview!(row) }}
                                            className="rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3 py-1.5 text-[11px] font-extrabold text-dark-blue-400"
                                        >
                                            Review Submission
                                        </button>
                                    )}
                                </div>
                            )}
                            <IconChevronRight size={16} stroke={2} className={`w-4 shrink-0 text-slate-300 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                        </div>
                        {isOpen && (
                            <div className="border-t border-slate-100 px-4 py-3">
                                <FileStack
                                    items={row.submissions}
                                    hideBadge={props.hideBadge}
                                    hideLesson={props.hideLesson}
                                    hidePathway={props.hidePathway}
                                    onBadgeClick={props.onBadgeClick}
                                    onLessonClick={props.onLessonClick}
                                    onPathwayClick={props.onPathwayClick}
                                    // FileStack hands back the exact same row object it was given (row.submissions,
                                    // typed as SubmissionItem[] here) unmodified - the cast just recovers that type
                                    // across FileStack's own looser local Item shape.
                                    onComment={props.onComment ? (sub) => props.onComment!(row.userId, sub as SubmissionItem) : undefined}
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
}
