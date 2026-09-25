import * as React from "react";
import { IconCheck, IconMessageCircle } from "@tabler/icons";

/**
 * CommentsItem
 */
export type CommentsItem = {
  commentId: string;
  // Denormalized snapshot of the commenter's display name, captured by study at the moment the
  // comment was made (see study's Comment.CommenterName) - not looked up client-side, since a
  // student can't otherwise resolve another user's identity from just their id.
  commenterName?: string;
  badgeId?: string;
  badgeName?: string;
  lessonId?: string;
  lessonName?: string;
  commentText: string;
  requireValidation: boolean;
  resolvedAt?: string;
  // True once the comment itself has been resolved but the badge/lesson it's tied to is still
  // unsubmitted - i.e. addComment's validation cascade pulled credit for it and nothing has been
  // resubmitted since. Computed by the hub hook (useOrganization.ts's getMyComments), not derived
  // here, since it needs this student's own badge/lesson activity data to know.
  needsSubmission?: boolean;
  createdAt: string;
};

/**
 * CommentsProps
 */
export type CommentsProps = {
  loading: boolean;
  comments: CommentsItem[];
  onBadgeClick?: (badgeId: string) => void;
  onLessonClick?: (lessonId: string) => void;
};

/**
 * The student-facing Comments page - a self-scoped breakdown of every comment an educator has left
 * for the current student, each showing which badge or lesson (if any) it's associated with. The
 * educator-side counterpart is mgmt-ui's CommentCenter (its "By student" tab, scoped to one
 * student); here there's no student dimension left to group by since the whole page is already
 * scoped to "me", so each comment's own badge/lesson association is shown inline instead of behind
 * a tab selector.
 * @param props
 * @constructor
 */
export const Comments = (props: CommentsProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Comments</h1>
        <p className="text-sm text-slate-500">Feedback your educators have left on your badges and lessons.</p>
      </div>

      <div className="flex flex-col gap-3">
        {props.loading && <p className="text-sm text-slate-400">Loading...</p>}

        {!props.loading && props.comments.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <IconMessageCircle size={28} stroke={1.5} className="text-slate-300" />
            <p className="text-sm text-slate-400">No comments yet.</p>
          </div>
        )}

        {!props.loading &&
          props.comments.map((comment) => (
            <CommentCard
              key={comment.commentId}
              comment={comment}
              onBadgeClick={props.onBadgeClick}
              onLessonClick={props.onLessonClick}
            />
          ))}
      </div>
    </div>
  );
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

const CommentCard = (props: {
  comment: CommentsItem;
  onBadgeClick?: (badgeId: string) => void;
  onLessonClick?: (lessonId: string) => void;
}) => {
  const { comment } = props;
  const target = comment.badgeId
    ? {
        label: comment.badgeName || "Badge",
        onClick: props.onBadgeClick ? () => props.onBadgeClick!(comment.badgeId as string) : undefined,
      }
    : comment.lessonId
    ? {
        label: comment.lessonName || "Lesson",
        onClick: props.onLessonClick ? () => props.onLessonClick!(comment.lessonId as string) : undefined,
      }
    : { label: "General", onClick: undefined };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {target.onClick ? (
            <button
              type="button"
              onClick={target.onClick}
              className="text-left text-xs font-extrabold text-sky-blue-400 hover:underline"
            >
              {target.label}
            </button>
          ) : (
            <div className="text-xs font-extrabold text-dark-blue-400">{target.label}</div>
          )}
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
            {comment.commenterName && <span>Commenter: {comment.commenterName}</span>}
            {comment.commenterName && comment.createdAt && <span>·</span>}
            {comment.createdAt && <span>{formatDate(comment.createdAt)}</span>}
          </div>
        </div>
        {comment.requireValidation &&
          (!comment.resolvedAt ? (
            <span className="shrink-0 rounded-full bg-gold-400/15 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
              Needs attention
            </span>
          ) : comment.needsSubmission ? (
            <span className="shrink-0 rounded-full bg-sky-blue-400/15 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
              Needs submission
            </span>
          ) : (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-mint-400/15 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
              <IconCheck size={11} stroke={3} className="text-mint-400" />
              Resolved
            </span>
          ))}
      </div>
      <p className="mt-2.5 text-xs text-slate-600">{comment.commentText}</p>
    </div>
  );
};
