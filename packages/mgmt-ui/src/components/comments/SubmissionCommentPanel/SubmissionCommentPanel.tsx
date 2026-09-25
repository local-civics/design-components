import * as React from 'react';
import {IconMessageCircle} from '@tabler/icons';
import {
    LeaveCommentModal,
    LeaveCommentPayload,
    LeaveCommentBadgeOption,
    LeaveCommentLessonOption,
} from "../../modals/LeaveCommentModal/LeaveCommentModal";

/**
 * SubmissionComment
 */
export type SubmissionComment = {
    commentId: string
    commentText: string
    requireValidation: boolean
    resolvedAt?: string
    // Named to match CommentCenter.tsx/hub-ui's Comments.tsx, both independently renamed from
    // authorName to commenterName - aligned here too so the whole comment feature uses one field
    // name regardless of which component/hub call site produced the record.
    commenterName?: string
    createdAt: string
    // True for a comment this panel just added optimistically, before a real page reload has
    // confirmed its actual server-assigned id - study's add_comment handler returns no body on
    // success (just an error-or-nil), so there's no real commentId to resolve against yet. The
    // "Mark Resolved" action is hidden for these until then, rather than risk silently no-op'ing
    // a resolve call against an id the backend has never seen.
    isLocal?: boolean
    // True once the comment itself has been resolved but the badge/lesson it's tied to is still
    // unsubmitted - i.e. addComment's validation cascade pulled credit for it and nothing has been
    // resubmitted since (see hub-ui's Comments.tsx / useOrganization.ts's getMyComments(), where
    // this is computed). Distinct from "not yet resolved" and "resolved, nothing left to do" -
    // without it, a badge a student still needs to redo would read as plain "Resolved" here.
    needsSubmission?: boolean
}

/**
 * SubmissionCommentPanelProps
 */
export type SubmissionCommentPanelProps = {
    comments: SubmissionComment[]
    // Both write actions are optional - omitting either drops that action from the panel rather
    // than rendering a control with nowhere to send its result. A caller with neither (e.g. a
    // student's own read-only view of comments left on their own badge/lesson - no leave/resolve
    // capability belongs to that audience, only an educator's) gets a plain, presentational thread.
    onResolve?: (commentId: string) => void
    onLeaveComment?: (payload: LeaveCommentPayload) => void
    userId?: string
    // Already scoped by the caller to "what's actually possible from this page" - e.g. a badge
    // page passes just its own badgeId plus that badge's own lessons, not the org's full catalog.
    // This component and the modal it wraps have no opinion on how narrow that list is. Unused
    // (and safe to omit) when onLeaveComment is omitted too.
    badges?: LeaveCommentBadgeOption[]
    lessons?: LeaveCommentLessonOption[]
    initialBadgeId?: string
    initialLessonId?: string
    // Only meaningful on a badge page - omitted entirely (no action rendered) on a lesson page,
    // since study has no lesson-crediting equivalent to badges' validate_badges/verify_badge.
    onValidateBadge?: () => void
    // True once this badge is already credited - swaps the action for a plain confirmation
    // instead of a clickable button that would just re-credit an already-complete badge.
    badgeValidated?: boolean
    // The initial comments fetch hasn't resolved yet - shows a neutral loading line instead of
    // "No comments yet.", which would otherwise flash incorrectly for a split second on every
    // visit. Omitted by every existing caller (StudentBadge.tsx/StudentLesson.tsx), which already
    // wait for their own page-level data before this panel ever mounts.
    loading?: boolean
}

const formatDate = (value?: string) => {
    if (!value) return ""
    const d = new Date(value)
    if (isNaN(d.getTime())) return ""
    return d.toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"})
}

/**
 * SubmissionCommentPanel - the always-visible comment thread + "Leave a Comment" trigger on a
 * single-student badge/lesson review page (StudentBadge.tsx/StudentLesson.tsx). Reuses
 * LeaveCommentModal unchanged for the actual form - this component only owns the thread display,
 * the modal's open/close state, and (badge pages only) the "Credit This Badge" action, so both
 * grading actions live in one place rather than being scattered across the page.
 * @param props
 * @constructor
 */
export function SubmissionCommentPanel(props: SubmissionCommentPanelProps) {
    const [commenting, setCommenting] = React.useState(false)

    return (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <IconMessageCircle size={16} stroke={1.75} className="text-slate-400" />
                    <span className="text-sm font-extrabold text-dark-blue-400">
                        Comments{props.comments.length > 0 ? ` (${props.comments.length})` : ""}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {props.onValidateBadge && !props.badgeValidated && (
                        <button
                            type="button"
                            onClick={props.onValidateBadge}
                            className="rounded-lg bg-mint-400/15 px-3.5 py-2 text-xs font-bold text-mint-400 hover:bg-mint-400/25"
                        >
                            Credit This Badge
                        </button>
                    )}
                    {props.onValidateBadge && props.badgeValidated && (
                        <span className="rounded-full bg-mint-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-dark-blue-400">
                            Credited
                        </span>
                    )}
                    {props.onLeaveComment && (
                        <button
                            type="button"
                            onClick={() => setCommenting(true)}
                            className="rounded-lg bg-dark-blue-400 px-3.5 py-2 text-xs font-bold text-white"
                        >
                            Leave a Comment
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
                {props.loading && (
                    <p className="text-sm text-slate-400">Loading comments…</p>
                )}
                {!props.loading && props.comments.length === 0 && (
                    <p className="text-sm text-slate-400">No comments yet.</p>
                )}
                {!props.loading && props.comments.map((c) => {
                    const resolved = !!c.resolvedAt
                    return (
                        <div key={c.commentId} className="rounded-lg border border-slate-100 bg-slate-50 p-3.5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="text-xs font-bold text-dark-blue-400">{c.commenterName || "Educator"}</div>
                                <div className="text-[10.5px] text-slate-400">{formatDate(c.createdAt)}</div>
                            </div>
                            <p className="mt-1.5 text-sm text-slate-600">{c.commentText}</p>
                            {c.requireValidation && (
                                <div className="mt-2.5 flex items-center gap-2">
                                    {/* sky-blue-400/15 (not a -100 shade, unlike its two siblings) - this package has
                                        no sky-blue-100 token defined, and it's the same tint hub-ui's Comments.tsx
                                        already uses for this identical third state. */}
                                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                        !resolved ? "bg-gold-100 text-dark-blue-400"
                                        : c.needsSubmission ? "bg-sky-blue-400/15 text-dark-blue-400"
                                        : "bg-mint-100 text-dark-blue-400"
                                    }`}>
                                        {!resolved ? "Needs Validation" : c.needsSubmission ? "Needs Submission" : "Resolved"}
                                    </span>
                                    {!resolved && !c.isLocal && props.onResolve && (
                                        <button
                                            type="button"
                                            onClick={() => props.onResolve!(c.commentId)}
                                            className="text-xs font-bold text-sky-blue-400 hover:underline"
                                        >
                                            Mark Resolved
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {props.onLeaveComment && (
                <LeaveCommentModal
                    opened={commenting}
                    onClose={() => setCommenting(false)}
                    onSubmit={(payload) => { props.onLeaveComment!(payload); setCommenting(false) }}
                    hideStudentPicker
                    students={[]}
                    initialUserId={props.userId || ""}
                    initialBadgeId={props.initialBadgeId}
                    initialLessonId={props.initialLessonId}
                    badges={props.badges || []}
                    lessons={props.lessons || []}
                />
            )}
        </div>
    )
}
