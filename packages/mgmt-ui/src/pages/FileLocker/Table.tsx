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
    // True only when this student has a real account in the organization's own sphere directory
    // (see useOrganization.ts's getStudents()) - a roster member resolved only via lake (no sphere
    // account) has this false. Drives whether the student's name links to their profile page at
    // all, since that page has nothing to show for someone who was never a real platform user.
    hasAccount?: boolean
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
    // Opens the Leave Comment modal (see LeaveCommentModal). The context argument pre-fills the
    // target: whichever of hideLesson/hideBadge is true tells us this whole table is already fixed
    // to one specific lesson or badge (a tab/group already narrowed it), so that's what gets
    // pre-filled; when neither is set (the flat "By student" tab, or "By pathway", which spans more
    // than one badge/lesson) each file resolves its own target instead (see fileCommentContextFor) -
    // nothing is guessed at the row level, since the per-row "Comment" button now lives inside each
    // expanded student's FileStack, not on the collapsed row itself.
    onComment?: (item: Item, context?: {badgeId?: string, lessonId?: string}) => void
    onBadgeClick?: (badgeId: string) => void
    onLessonClick?: (lessonId: string) => void
    onPathwayClick?: (pathwayId: string) => void
    // Jumps to this student's own profile page. Only rendered when the caller supplies it - kept
    // optional since this table is reused for "By student" specifically (the one context where a
    // student-level link makes sense) but the type is shared, not duplicated, for every tab.
    onStudentClick?: (userId: string) => void
    // Opens FileLocker's own local "No account yet" pop-up for a roster entry with no real account -
    // same optionality/reasoning as onStudentClick, since the two are mutually exclusive per row
    // (a row is either a real account you can jump to, or an account-less one you can check locally).
    onOpenAccountPending?: (item: Item) => void
}

const initials = (name: string) => name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()

// Governs each individual file's own Comment button (nested FileStack rows, both here and in
// SubmissionDetail). Every File Locker submission is fundamentally about one lesson (only
// sometimes also credited toward a badge) - see LeaveCommentModal's own lesson-preferred
// prepopulation - so this defaults to the row's lessonId whenever it has one. hideLesson (the
// whole table is already fixed to a single lesson, i.e. By Lesson) is really the same rule taken
// to its limit; badgeId is only a fallback for a submission with no lessonId at all.
export const fileCommentContextFor = (hideLesson: boolean | undefined, sub?: {badgeId?: string, lessonId?: string}) => {
    if (hideLesson || sub?.lessonId) return {lessonId: sub?.lessonId}
    return {badgeId: sub?.badgeId}
}

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
                                    {props.onStudentClick && row.hasAccount ? (
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); props.onStudentClick!(row.userId) }}
                                            className="truncate text-sm font-bold text-sky-blue-400 hover:underline"
                                        >
                                            {row.name}
                                        </button>
                                    ) : (
                                        <div className="flex min-w-0 items-center gap-1.5">
                                            <div className="truncate text-sm font-bold text-dark-blue-400">{row.name}</div>
                                            {props.onStudentClick && (
                                                props.onOpenAccountPending ? (
                                                    <button
                                                        type="button"
                                                        title="This person hasn't created an account in your organization yet - click to see details"
                                                        onClick={(e) => { e.stopPropagation(); props.onOpenAccountPending!(row) }}
                                                        className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 hover:bg-slate-200"
                                                    >
                                                        No account
                                                    </button>
                                                ) : (
                                                    <span
                                                        title="This person hasn't created an account in your organization yet"
                                                        className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500"
                                                    >
                                                        No account
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                    <div className="truncate text-xs text-slate-400">{row.email}</div>
                                </div>
                            </div>
                            <div className="w-16 shrink-0 text-sm font-bold text-dark-blue-400">{row.submissions.length}</div>
                            {showActions && (
                                <div className={`flex ${actionsWidthClass} shrink-0 gap-2`}>
                                    {props.onReview && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); props.onReview!(row) }}
                                            className="rounded-lg border border-sky-blue-400/40 bg-sky-blue-400/10 px-3 py-1.5 text-[11px] font-extrabold text-dark-blue-400 hover:bg-sky-blue-400/20"
                                        >
                                            View Submissions
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
                                    onComment={props.onComment ? (sub) => props.onComment!(row, fileCommentContextFor(props.hideLesson, sub)) : undefined}
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
}