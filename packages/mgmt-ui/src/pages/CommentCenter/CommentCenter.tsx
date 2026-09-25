import * as React from 'react';
import {IconAlbum, IconCheck, IconLambda} from "@tabler/icons";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {
    LeaveCommentModal,
    LeaveCommentBadgeOption,
    LeaveCommentLessonOption,
    LeaveCommentPayload,
    LeaveCommentStudentOption,
} from "../../components/modals/LeaveCommentModal/LeaveCommentModal";

/**
 * CommentCenterClass
 */
export type CommentCenterClass = { classId: string, name: string, active: boolean }

/**
 * CommentCenterItem
 */
export type CommentCenterItem = {
    commentId: string
    recipientId: string
    recipientName: string
    authorId: string
    authorName?: string
    badgeId?: string
    badgeName?: string
    lessonId?: string
    lessonName?: string
    commentText: string
    requireValidation: boolean
    resolvedAt?: string
    createdAt: string
    // True for a comment this session just added optimistically, before a real page reload has
    // confirmed its actual server-assigned id - study's add_comment handler returns no body on
    // success, so there's no real commentId to resolve against yet. Matches
    // SubmissionCommentPanel's identical field/rationale.
    isLocal?: boolean
}

/**
 * CommentCenterStudentClickContext - carries what the clicked row already knows (which badge/
 * lesson it concerns, and every other recipient sharing this same tab group) so the caller can
 * route directly and seed a grading queue without having to re-derive either from the flat
 * `comments` list after the fact.
 */
export type CommentCenterStudentClickContext = {
    badgeId?: string
    lessonId?: string
    // Every recipient in the same group as the clicked row (By badge/By lesson: every student
    // with a comment on that same item; By student: just the one) - deduplicated, in the same
    // newest-first order `comments` already arrives in.
    groupUserIds: string[]
}

/**
 * CommentCenterProps
 */
export type CommentCenterProps = {
    loading: boolean
    classes: CommentCenterClass[]
    classId: string
    comments: CommentCenterItem[]
    students: LeaveCommentStudentOption[]
    badges: LeaveCommentBadgeOption[]
    lessons: LeaveCommentLessonOption[]
    onClassChange: (classId: string) => void
    onResolve: (commentId: string) => void
    onLeaveComment: (comment: LeaveCommentPayload) => void
    // Jumps to the recipient's own badge/lesson preview (or their bare profile, for a "General"
    // comment with neither) - only rendered when supplied, matching FileLocker/Table.tsx's own
    // onStudentClick optionality.
    onStudentClick?: (userId: string, context: CommentCenterStudentClickContext) => void
    // Jump to that badge's/lesson's own org-wide Overview page - distinct from onStudentClick, which
    // always lands on one specific student's preview. Fired from the "By badge"/"By lesson" tabs'
    // own group titles, matching FileLocker/FileLocker.tsx's identical naming/optionality.
    onBadgeClick?: (badgeId: string) => void
    onLessonClick?: (lessonId: string) => void
}

type Tab = "students" | "badges" | "lessons"

const TABS: {value: Tab, label: string}[] = [
    {value: "students", label: "By student"},
    {value: "badges", label: "By badge"},
    {value: "lessons", label: "By lesson"},
]

type Group = {key: string, title: string, items: CommentCenterItem[]}

// Preserves first-seen order (not alphabetical) so the most recently-active student/badge/lesson
// tends to surface first, since `comments` already arrives newest-first (see study's
// queryCommentsByOrganizationSpec: `OrderBy("created_at desc")`).
const groupBy = (items: CommentCenterItem[], keyOf: (i: CommentCenterItem) => string | undefined, titleOf: (i: CommentCenterItem) => string): Group[] => {
    const order: string[] = []
    const map = new Map<string, Group>()
    items.forEach((item) => {
        const key = keyOf(item)
        if (!key) return
        if (!map.has(key)) {
            map.set(key, {key, title: titleOf(item), items: []})
            order.push(key)
        }
        map.get(key)!.items.push(item)
    })
    return order.map((key) => map.get(key)!)
}

/**
 * CommentCenter. Org-wide view of every comment left across the organization - grouped by student,
 * badge, or lesson via the same pill-tab selector and class dropdown FileLocker uses - with the
 * ability to resolve any comment that requires validation (see Comment.RequireValidation on the
 * backend) and to leave a brand new comment for any student via LeaveCommentModal.
 * @param props
 * @constructor
 */
export const CommentCenter = (props: CommentCenterProps) => {
    const [tab, setTab] = React.useState<Tab>("students")
    const [leavingComment, setLeavingComment] = React.useState(false)

    const groups = React.useMemo(() => {
        if (tab === "students") return groupBy(props.comments, (i) => i.recipientId, (i) => i.recipientName)
        if (tab === "badges") return groupBy(props.comments, (i) => i.badgeId, (i) => i.badgeName || "Badge")
        return groupBy(props.comments, (i) => i.lessonId, (i) => i.lessonName || "Lesson")
    }, [props.comments, tab])

    return (
        <div className="flex w-full flex-col gap-5 px-4 py-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Comment Center</h1>
                    <p className="mt-1 text-sm text-slate-500">Every comment left across your organization.</p>
                </div>
                <button
                    onClick={() => setLeavingComment(true)}
                    className="rounded-lg bg-dark-blue-400 px-4 py-2.5 text-xs font-bold text-white"
                >
                    Leave a Comment
                </button>
            </div>

            <select
                value={props.classId}
                onChange={(e) => props.onClassChange(e.target.value)}
                className="w-64 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"
            >
                <option value="">Select a class</option>
                {props.classes.map((c) => <option key={c.classId} value={c.classId}>{c.name}</option>)}
            </select>

            <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
                {TABS.map((t) => (
                    <button
                        key={t.value}
                        onClick={() => setTab(t.value)}
                        className={`rounded-lg px-4 py-2 text-xs font-bold ${tab === t.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {props.comments.length === 0 ? (
                <PlaceholderBanner
                    title="No comments to display"
                    description="Nothing has been left for this organization yet."
                    loading={props.loading}
                    icon="thinking"
                />
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-[1.3fr_1.3fr_2fr_1fr_1fr] items-center gap-3 px-5 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                        <div>{tab === "students" ? "Badge / Lesson" : "Student"}</div>
                        <div>Left By</div>
                        <div>Comment</div>
                        <div className="text-center">Flag</div>
                        <div className="text-center">Status</div>
                    </div>

                    {groups.map((group) => {
                        const groupUserIds = Array.from(new Set(group.items.map((gi) => gi.recipientId)))
                        // Which recipient/routing this group's own title jumps to depends on the tab -
                        // student rows go through onStudentClick (a bare profile, no badge/lesson
                        // scope of its own); badge/lesson rows go to that item's own aggregate
                        // Overview page instead, via the 2 dedicated callbacks below.
                        const onTitleClick = tab === "students"
                            ? (props.onStudentClick ? () => props.onStudentClick!(group.key, {badgeId: undefined, lessonId: undefined, groupUserIds}) : undefined)
                            : tab === "badges"
                            ? (props.onBadgeClick ? () => props.onBadgeClick!(group.key) : undefined)
                            : (props.onLessonClick ? () => props.onLessonClick!(group.key) : undefined)

                        return (
                        <div key={group.key} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/60 px-5 py-2.5">
                                {tab === "students" ? (
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-[10px] font-bold text-dark-blue-400">
                                        {(group.title[0] || "?").toUpperCase()}
                                    </div>
                                ) : tab === "badges" ? (
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-mint-400/15">
                                        <IconAlbum size={15} stroke={2} className="text-mint-400" />
                                    </div>
                                ) : (
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold-400/15">
                                        <IconLambda size={15} stroke={2} className="text-gold-400" />
                                    </div>
                                )}
                                {onTitleClick ? (
                                    <button type="button" onClick={onTitleClick} className="text-left text-xs font-extrabold text-sky-blue-400 hover:underline">
                                        {group.title}
                                    </button>
                                ) : (
                                    <div className="text-xs font-extrabold text-dark-blue-400">{group.title}</div>
                                )}
                            </div>
                            {group.items.map((item, i) => {
                                const materialName = tab === "students" ? (item.badgeName || item.lessonName || "General") : item.recipientName
                                const materialType = tab === "students" ? (item.badgeId ? "Badge" : item.lessonId ? "Lesson" : undefined) : undefined
                                return (
                                <div
                                    key={item.commentId}
                                    className={`grid grid-cols-[1.3fr_1.3fr_2fr_1fr_1fr] items-start gap-3 px-5 py-3.5 ${i < group.items.length - 1 ? "border-b border-slate-100" : ""}`}
                                >
                                    <div className="min-w-0">
                                        {props.onStudentClick ? (
                                            <button
                                                type="button"
                                                title={materialName}
                                                onClick={() => props.onStudentClick!(item.recipientId, {
                                                    badgeId: item.badgeId,
                                                    lessonId: item.lessonId,
                                                    groupUserIds,
                                                })}
                                                className="line-clamp-2 text-left text-xs font-bold text-sky-blue-400 hover:underline"
                                            >
                                                {materialName}
                                            </button>
                                        ) : (
                                            <div title={materialName} className="line-clamp-2 text-xs font-bold text-dark-blue-400">
                                                {materialName}
                                            </div>
                                        )}
                                        {materialType && (
                                            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-dark-blue-400 ${materialType === "Badge" ? "bg-mint-400/15" : "bg-gold-400/15"}`}>
                                                {materialType}
                                            </span>
                                        )}
                                    </div>
                                    <div className="truncate text-[11px] text-slate-500">{item.authorName || "—"}</div>
                                    <div className="text-xs text-slate-600">{item.commentText}</div>
                                    <div className="flex justify-center">
                                        {item.requireValidation && (
                                            <span className="rounded-full bg-gold-400/15 px-2 py-0.5 text-[10px] font-bold text-dark-blue-400">
                                                Requires validation
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-center">
                                        {!item.requireValidation ? (
                                            <span className="text-[11px] text-slate-400">—</span>
                                        ) : item.resolvedAt ? (
                                            <IconCheck size={16} stroke={3} className="text-mint-400" />
                                        ) : item.isLocal ? (
                                            <span className="text-[11px] text-slate-400">Pending</span>
                                        ) : (
                                            <button
                                                onClick={() => props.onResolve(item.commentId)}
                                                className="rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3 py-1.5 text-[11px] font-extrabold text-dark-blue-400"
                                            >
                                                Resolve
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )})}
                        </div>
                    )})}
                </div>
            )}

            <LeaveCommentModal
                opened={leavingComment}
                onClose={() => setLeavingComment(false)}
                onSubmit={(comment) => { props.onLeaveComment(comment); setLeavingComment(false) }}
                students={props.students}
                badges={props.badges}
                lessons={props.lessons}
            />
        </div>
    )
}
