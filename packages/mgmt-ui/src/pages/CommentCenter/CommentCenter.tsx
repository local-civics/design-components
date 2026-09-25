import * as React from 'react';
import {IconCheck} from "@tabler/icons";
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
    commenterName?: string
    badgeId?: string
    badgeName?: string
    lessonId?: string
    lessonName?: string
    commentText: string
    requireValidation: boolean
    resolvedAt?: string
    createdAt: string
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
}

type Tab = "students" | "badges" | "lessons"

const TABS: {value: Tab, label: string}[] = [
    {value: "students", label: "By student"},
    {value: "badges", label: "By badge"},
    {value: "lessons", label: "By lesson"},
]

type Group = {key: string, title: string, items: CommentCenterItem[]}

const formatDate = (iso: string) => {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return "—"
    return d.toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric"})
}

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
                    <div className="grid grid-cols-[1.2fr_1fr_1.8fr_1fr_0.8fr_0.8fr] items-center gap-3 px-5 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                        <div>{tab === "students" ? "Badge / Lesson" : "Student"}</div>
                        <div>Commenter</div>
                        <div>Comment</div>
                        <div>Left On</div>
                        <div className="text-center">Flag</div>
                        <div className="text-center">Status</div>
                    </div>

                    {groups.map((group) => (
                        <div key={group.key} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-2.5 text-xs font-extrabold text-dark-blue-400">
                                {group.title}
                            </div>
                            {group.items.map((item, i) => (
                                <div
                                    key={item.commentId}
                                    className={`grid grid-cols-[1.2fr_1fr_1.8fr_1fr_0.8fr_0.8fr] items-center gap-3 px-5 py-3.5 ${i < group.items.length - 1 ? "border-b border-slate-100" : ""}`}
                                >
                                    <div className="truncate text-xs font-bold text-dark-blue-400">
                                        {tab === "students" ? (item.badgeName || item.lessonName || "General") : item.recipientName}
                                    </div>
                                    <div className="truncate text-[11px] text-slate-500">{item.commenterName || "—"}</div>
                                    <div className="text-xs text-slate-600">{item.commentText}</div>
                                    <div className="truncate text-[11px] text-slate-400">{formatDate(item.createdAt)}</div>
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
                            ))}
                        </div>
                    ))}
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
