import * as React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

/**
 * SubmissionQueueNavProps
 */
export type SubmissionQueueNavProps = {
  // 0-based position of the student currently being reviewed within the queue.
  index: number;
  total: number;
  // Omitted (not just disabled) at either edge of the queue - there's nothing to wrap around to,
  // and a disabled-but-present button would invite a click that does nothing.
  onPrevious?: () => void;
  onNext?: () => void;
  // Optional context for the position label, e.g. a class name ("Student 4 of 23 - Test Class").
  label?: string;
};

/**
 * A Prev/Next strip letting an educator step through the same batch of students they were already
 * looking at (a class roster, a badge/lesson's own "By student" table, a Comment/Validation Center
 * filter) without leaving StudentBadge/StudentLesson and going back to that table for every
 * student. The batch itself travels as a `queue` on React Router's own `location.state` (see
 * navigationTrail.ts) - this component only renders the current position within it and fires
 * Prev/Next, it has no idea where the queue came from.
 * @param props
 * @constructor
 */
export const SubmissionQueueNav = (props: SubmissionQueueNavProps) => {
  if (props.total <= 1) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
      {props.onPrevious ? (
        <button
          type="button"
          onClick={props.onPrevious}
          className="flex items-center gap-1 text-xs font-bold text-dark-blue-400 hover:underline"
        >
          <IconChevronLeft size={14} stroke={2.5} />
          Previous
        </button>
      ) : (
        <span />
      )}
      <div className="shrink-0 text-xs font-bold text-slate-500">
        Student {props.index + 1} of {props.total}
        {props.label ? ` — ${props.label}` : ""}
      </div>
      {props.onNext ? (
        <button
          type="button"
          onClick={props.onNext}
          className="flex items-center gap-1 text-xs font-bold text-dark-blue-400 hover:underline"
        >
          Next
          <IconChevronRight size={14} stroke={2.5} />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
};
