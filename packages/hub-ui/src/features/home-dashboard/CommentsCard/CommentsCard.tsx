import * as React from "react";
import { IconMessageCircle } from "@tabler/icons";
import { Loader } from "../../../components/Loader";
import { Pill } from "../Pill/Pill";

/**
 * A single comment as My Profile's CommentsCard needs it - the same shape hub's useMyComments()
 * hook already produces (Comments.tsx, Badge.tsx, Lesson.tsx all resolve badgeName/lessonName
 * client-side the same way, since study's own comment records only carry raw badgeId/lessonId).
 */
export type CommentItem = {
  commentId: string;
  commentText: string;
  requireValidation: boolean;
  resolvedAt?: string;
  // Unused by this card's own rendering (always "Your educator" on the student side, redundant to
  // repeat) - kept on the type and named commenterName, not authorName, only so it stays honest
  // against the real shape hub's useMyComments() passes in (matches CommentCenter.tsx/hub-ui's
  // Comments.tsx/SubmissionCommentPanel, all independently aligned to the same field name).
  commenterName?: string;
  createdAt: string;
  badgeId?: string;
  badgeName?: string;
  lessonId?: string;
  lessonName?: string;
  // True once the comment itself has been resolved but the badge/lesson it's tied to is still
  // unsubmitted - i.e. addComment's validation cascade pulled credit for it and nothing has been
  // resubmitted since (computed in hub's hooks/comments.ts via utils/commentStatus.ts). Counted in
  // its own "Needs submission" stat below.
  needsSubmission?: boolean;
};

/**
 * CommentsCardProps
 */
export type CommentsCardProps = {
  comments: CommentItem[];
  isLoading?: boolean;
  onViewAll?: () => void;
  onBadgeClick?: (badgeId: string) => void;
  onLessonClick?: (lessonId: string) => void;
};

const RECENT_COUNT = 4;

const formatDate = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

/**
 * My Profile's "Comments" summary card - a presentational sibling to PathwaysCard/BadgesCard.
 * Gives a student a passive, at-a-glance view of what's been said about their own badges/lessons
 * without having to visit the standalone /comments page first: 3 status stats (Needs validation /
 * Needs submission / Resolved), then the most recent comments themselves, each with a hyperlink
 * straight to the badge/lesson it concerns. "View All" is the same destination the sidebar's own
 * Comments tab already points at - this card is a summary of that page, not a replacement for it.
 * @param props
 * @constructor
 */
export const CommentsCard = (props: CommentsCardProps) => {
  const comments = props.comments || [];
  // The same three states, with the same labels, as every other comment surface: "Needs
  // validation" (not yet resolved), "Needs submission" (resolved, but the work it named is still
  // unsubmitted), "Resolved". The header pill counts the first two - everything still open.
  const needsValidation = comments.filter((c) => c.requireValidation && !c.resolvedAt).length;
  const needsSubmission = comments.filter((c) => c.requireValidation && !!c.resolvedAt && c.needsSubmission).length;
  const resolved = comments.filter((c) => !!c.resolvedAt && !c.needsSubmission).length;
  const open = needsValidation + needsSubmission;
  const recent = [...comments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, RECENT_COUNT);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-mint-400/20 bg-white shadow-[0_4px_20px_rgba(88,214,141,0.12)]">
      <div className="h-1 bg-gradient-to-r from-mint-400 to-sky-blue-400" />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-mint-400/15">
            <IconMessageCircle size={18} stroke={2} className="text-mint-400" />
          </div>
          <div className="text-sm font-bold text-dark-blue-400">Comments</div>
          {open > 0 && <Pill label={`${open} open`} accent="gold" />}
        </div>
        {props.onViewAll && (
          <button
            type="button"
            onClick={props.onViewAll}
            className="shrink-0 text-xs font-bold text-sky-blue-400 hover:underline"
          >
            View All →
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-slate-100 px-4 py-3">
        <StatCell label="Needs validation" value={needsValidation} />
        <StatCell label="Needs submission" value={needsSubmission} />
        <StatCell label="Resolved" value={resolved} />
      </div>

      <div className="relative flex-1 p-4">
        <Loader isLoading={props.isLoading}>
          {recent.length === 0 && <p className="text-sm text-slate-400">No comments yet.</p>}
          {recent.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {recent.map((c) => (
                <CommentRow
                  key={c.commentId}
                  comment={c}
                  onBadgeClick={props.onBadgeClick}
                  onLessonClick={props.onLessonClick}
                />
              ))}
            </div>
          )}
        </Loader>
      </div>
    </div>
  );
};

const StatCell = (props: { label: string; value: number }) => (
  <div className="flex flex-col items-center rounded-lg bg-slate-50 py-2">
    <div className="text-base font-extrabold text-dark-blue-400">{props.value}</div>
    <div className="text-center text-[10px] font-bold uppercase tracking-wide text-slate-400">{props.label}</div>
  </div>
);

const CommentRow = (props: {
  comment: CommentItem;
  onBadgeClick?: (id: string) => void;
  onLessonClick?: (id: string) => void;
}) => {
  const c = props.comment;
  const resolved = !!c.resolvedAt;
  // Lesson first: a validation-required lesson comment also names its badge (so study can pull that
  // badge's credit), but it's still a comment about the lesson.
  const materialLabel = c.lessonName || c.badgeName;
  const onClick = c.lessonId && props.onLessonClick
    ? () => props.onLessonClick!(c.lessonId as string)
    : c.badgeId && props.onBadgeClick
    ? () => props.onBadgeClick!(c.badgeId as string)
    : undefined;

  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {onClick ? (
            <button
              type="button"
              onClick={onClick}
              className="text-left text-xs font-bold text-sky-blue-400 hover:underline"
            >
              {materialLabel || "General"}
            </button>
          ) : (
            <span className="text-xs font-bold text-dark-blue-400">{materialLabel || "General"}</span>
          )}
          {(c.badgeId || c.lessonId) && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                c.lessonId ? "bg-gold-400/15 text-dark-blue-400" : "bg-mint-400/15 text-dark-blue-400"
              }`}
            >
              {c.lessonId ? "Lesson" : "Badge"}
            </span>
          )}
        </div>
        <div className="shrink-0 text-[10.5px] text-slate-400">{formatDate(c.createdAt)}</div>
      </div>
      <p className="mt-1.5 line-clamp-2 text-xs text-slate-600">{c.commentText}</p>
      {c.requireValidation && (
        <span
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            !resolved ? "bg-gold-100 text-dark-blue-400"
            : c.needsSubmission ? "bg-sky-blue-400/15 text-dark-blue-400"
            : "bg-mint-100 text-dark-blue-400"
          }`}
        >
          {!resolved ? "Needs validation" : c.needsSubmission ? "Needs submission" : "Resolved"}
        </span>
      )}
    </div>
  );
};
