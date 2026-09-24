import * as React from 'react';
import { Modal, Checkbox } from "@mantine/core";

/**
 * LeaveCommentStudentOption
 */
export type LeaveCommentStudentOption = { userId: string, name: string, email?: string }

/**
 * LeaveCommentBadgeOption
 */
export type LeaveCommentBadgeOption = { badgeId: string, displayName: string }

/**
 * LeaveCommentLessonOption
 */
export type LeaveCommentLessonOption = { lessonId: string, displayName: string }

/**
 * LeaveCommentPayload
 */
export type LeaveCommentPayload = {
    userId: string
    commentText: string
    requireValidation: boolean
    badgeId?: string
    lessonId?: string
}

/**
 * LeaveCommentModalProps
 */
export type LeaveCommentModalProps = {
    opened: boolean
    onClose: () => void
    onSubmit: (comment: LeaveCommentPayload) => void
    students: LeaveCommentStudentOption[]
    badges: LeaveCommentBadgeOption[]
    lessons: LeaveCommentLessonOption[]
    // Prepopulation - e.g. from the File Locker's "Comment" button, which already knows exactly
    // which student and badge/lesson the file belongs to. The form stays fully editable either way.
    initialUserId?: string
    initialBadgeId?: string
    initialLessonId?: string
    // Hides the student picker entirely and fixes the recipient - used when the comment can only
    // ever be about one student (e.g. opened from that student's own File Locker row).
    hideStudentPicker?: boolean
}

type Target = "none" | "badge" | "lesson"

const TARGETS: { value: Target, label: string }[] = [
    { value: "none", label: "General" },
    { value: "badge", label: "Badge" },
    { value: "lesson", label: "Lesson" },
]

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"

/**
 * LeaveCommentModal. Shared by the Comment Center's "Leave a comment" action and the File Locker's
 * per-row "Comment" button (see FileLocker.tsx) - opened from File Locker it arrives prepopulated
 * with the student and badge/lesson a specific file belongs to; opened from the Comment Center it
 * starts blank. A comment that requires validation must be tied to a badge (mirrors study's
 * NewComment validation), so the checkbox only appears once a badge target is selected. Only calls
 * onSubmit with the assembled payload - the caller owns the actual API call, closing the modal, and
 * any refresh, exactly like every other page in this package.
 * @param props
 * @constructor
 */
export function LeaveCommentModal(props: LeaveCommentModalProps) {
    const [userId, setUserId] = React.useState("")
    const [target, setTarget] = React.useState<Target>("none")
    const [badgeId, setBadgeId] = React.useState("")
    const [lessonId, setLessonId] = React.useState("")
    const [commentText, setCommentText] = React.useState("")
    const [requireValidation, setRequireValidation] = React.useState(false)

    // Reset (and prepopulate) every time the modal opens, rather than once on mount - the same
    // modal instance is reused across every row's "Comment" button, so each open needs a clean
    // slate seeded from that row's own context.
    React.useEffect(() => {
        if (!props.opened) return
        setUserId(props.initialUserId || "")
        setBadgeId(props.initialBadgeId || "")
        setLessonId(props.initialLessonId || "")
        setTarget(props.initialBadgeId ? "badge" : props.initialLessonId ? "lesson" : "none")
        setCommentText("")
        setRequireValidation(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.opened, props.initialUserId, props.initialBadgeId, props.initialLessonId])

    const canSubmit = !!userId
        && !!commentText.trim()
        && (target !== "badge" || !!badgeId)
        && (target !== "lesson" || !!lessonId)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSubmit) return
        props.onSubmit({
            userId,
            commentText: commentText.trim(),
            requireValidation: target === "badge" && requireValidation,
            badgeId: target === "badge" ? badgeId : undefined,
            lessonId: target === "lesson" ? lessonId : undefined,
        })
    }

    return (
        <Modal
            opened={props.opened}
            onClose={props.onClose}
            title={<span className="text-base font-extrabold text-dark-blue-400">Leave a Comment</span>}
            size="md"
            centered
        >
            <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
                {!props.hideStudentPicker && (
                    <div>
                        <label className="mb-1 block text-xs font-bold text-slate-500">Student</label>
                        <select value={userId} onChange={(e) => setUserId(e.target.value)} className={inputClass}>
                            <option value="">Select a student</option>
                            {props.students.map((s) => (
                                <option key={s.userId} value={s.userId}>{s.email ? `${s.name} (${s.email})` : s.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="mb-1 block text-xs font-bold text-slate-500">Leave this comment on</label>
                    <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
                        {TARGETS.map((t) => {
                            // Disabled (not hidden) when the caller has scoped this modal to a
                            // context with no possible option for that target - e.g. a lesson with
                            // no owning badge, or a badge whose own lessons list is empty. A caller
                            // passing the org's full catalogs (Comment Center, File Locker) is
                            // unaffected either way - a real org always has at least one badge/
                            // lesson, so this only ever activates for a deliberately narrow list.
                            const disabled = (t.value === "badge" && props.badges.length === 0)
                                || (t.value === "lesson" && props.lessons.length === 0)
                            return (
                                <button
                                    key={t.value}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => setTarget(t.value)}
                                    className={`rounded-lg px-4 py-2 text-xs font-bold ${
                                        target === t.value
                                            ? "bg-sky-blue-400/20 text-dark-blue-400"
                                            : disabled
                                            ? "cursor-not-allowed text-slate-200"
                                            : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {target === "badge" && (
                    <div>
                        <label className="mb-1 block text-xs font-bold text-slate-500">Badge</label>
                        <select value={badgeId} onChange={(e) => setBadgeId(e.target.value)} className={inputClass}>
                            <option value="">Select a badge</option>
                            {props.badges.map((b) => <option key={b.badgeId} value={b.badgeId}>{b.displayName}</option>)}
                        </select>
                    </div>
                )}

                {target === "lesson" && (
                    <div>
                        <label className="mb-1 block text-xs font-bold text-slate-500">Lesson</label>
                        <select value={lessonId} onChange={(e) => setLessonId(e.target.value)} className={inputClass}>
                            <option value="">Select a lesson</option>
                            {props.lessons.map((l) => <option key={l.lessonId} value={l.lessonId}>{l.displayName}</option>)}
                        </select>
                    </div>
                )}

                <div>
                    <label className="mb-1 block text-xs font-bold text-slate-500">Comment</label>
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Leave a comment..."
                        rows={4}
                        className={`${inputClass} resize-none`}
                    />
                </div>

                {target === "badge" && !!badgeId && (
                    <Checkbox
                        checked={requireValidation}
                        onChange={(e) => setRequireValidation(e.currentTarget.checked)}
                        label="Requires validation - unsubmits this badge until the comment is resolved"
                    />
                )}

                <button
                    type="submit"
                    disabled={!canSubmit}
                    className="mt-1 rounded-lg bg-dark-blue-400 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40"
                >
                    Leave Comment
                </button>
            </form>
        </Modal>
    );
}
