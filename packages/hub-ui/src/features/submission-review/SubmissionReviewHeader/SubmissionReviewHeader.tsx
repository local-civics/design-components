import * as React from "react";

/**
 * SubmissionReviewHeaderProps
 */
export type SubmissionReviewHeaderProps = {
  name?: string;
  email?: string;
  // Makes the whole identity block (avatar + name + email) a single click target to that student's
  // own cross-class profile page - distinct from onSecondaryAction/onViewOverview below, which both
  // jump to *this specific badge/lesson's* own context, not the student's broader record. Optional
  // since not every caller resolves a profile route the same way.
  onViewProfile?: () => void;
  // A real "go back" affordance, for pages that have no other way out - e.g. StudentBadge, whose
  // content component only ever renders forward links (Go to Pathway, View Badge Overview, Start).
  // Rendered first among the action slots (leftmost), with a leading arrow rather than the trailing
  // one onSecondaryAction/onViewOverview use, since it signals the opposite direction. Same "only
  // render when both are supplied" gating as every other slot here.
  onBack?: () => void;
  backLabel?: string;
  // Jumps to the aggregate "all students" view for whatever this preview is scoped to (a badge or
  // lesson overview) - the one explicit way back out of a single-student drill-down, since neither
  // the breadcrumb (which only goes up through Pathway/Badge, never sideways to the aggregate view)
  // nor the shell's own Back button covers this. Only rendered when both this and overviewLabel are
  // supplied, so a caller with nothing sensible to link to (there isn't always an overview route for
  // every context this header could end up in) simply doesn't show it rather than showing a dead
  // or mislabeled link.
  onViewOverview?: () => void;
  overviewLabel?: string;
  // A second, generic secondary action slot alongside onViewOverview - e.g. StudentLesson's "View
  // Student Badge" (jumping to the lesson's owning badge, distinct from both the shell's own
  // smartBack Back button and the aggregate onViewOverview link). Kept generic rather than
  // lesson/badge-specific since this header is shared by both StudentBadge and StudentLesson, and
  // only one of them currently needs it. Same "only render when both are supplied" gating.
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
};

const initialsFor = (name?: string, email?: string): string => {
  const trimmedName = (name || "").trim();
  if (trimmedName) {
    const parts = trimmedName.split(/\s+/).filter(Boolean);
    const first = parts[0]?.charAt(0) || "";
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase() || "?";
  }
  return (email || "?").charAt(0).toUpperCase();
};

/**
 * A compact identity strip shown above a single-student badge/lesson preview, so an educator
 * always knows exactly whose submission they're looking at and that the view is read-only -
 * distinct from EducatorPageShell's own generic "You're viewing this as an educator." subtitle,
 * which says nothing about *who*. Deliberately simple (name + email + a "Preview" pill) rather
 * than a full profile card - the page below already carries the actual submission content.
 * @param props
 * @constructor
 */
export const SubmissionReviewHeader = (props: SubmissionReviewHeaderProps) => {
  if (!props.name && !props.email) {
    return null;
  }

  const showEmailLine = !!props.name && !!props.email && props.name !== props.email;

  const avatar = (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-blue-400/15 text-sm font-bold text-sky-blue-400">
      {initialsFor(props.name, props.email)}
    </div>
  );

  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      {props.onViewProfile ? (
        <button type="button" onClick={props.onViewProfile} className="group flex min-w-0 flex-1 items-center gap-3 text-left">
          {avatar}
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-extrabold text-dark-blue-400 group-hover:underline">{props.name || props.email}</div>
            {showEmailLine && <div className="truncate text-xs text-slate-400">{props.email}</div>}
          </div>
        </button>
      ) : (
        <>
          {avatar}
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-extrabold text-dark-blue-400">{props.name || props.email}</div>
            {showEmailLine && <div className="truncate text-xs text-slate-400">{props.email}</div>}
          </div>
        </>
      )}
      {props.onBack && props.backLabel && (
        <button
          type="button"
          onClick={props.onBack}
          className="shrink-0 text-xs font-bold text-dark-blue-400 hover:underline"
        >
          ← {props.backLabel}
        </button>
      )}
      {props.onSecondaryAction && props.secondaryActionLabel && (
        <button
          type="button"
          onClick={props.onSecondaryAction}
          className="shrink-0 text-xs font-bold text-dark-blue-400 hover:underline"
        >
          {props.secondaryActionLabel} →
        </button>
      )}
      {props.onViewOverview && props.overviewLabel && (
        <button
          type="button"
          onClick={props.onViewOverview}
          className="shrink-0 text-xs font-bold text-dark-blue-400 hover:underline"
        >
          {props.overviewLabel} →
        </button>
      )}
      <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
        Preview
      </span>
    </div>
  );
};
