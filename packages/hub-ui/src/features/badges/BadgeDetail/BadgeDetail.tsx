import * as React from "react";
import { BadgeEmblem } from "../BadgeEmblem/BadgeEmblem";
import { BadgeActivityProps } from "../BadgeActivity/BadgeActivity";
import { IconName } from "../../../components/Icon/icons";
import { Pill, PillAccent } from "../../home-dashboard/Pill/Pill";

/**
 * CriterionProps
 */
type CriterionProps = {
  criterionId?: string;
  displayName?: string;
  namespace?: string;
  options?: BadgeActivityProps[];
};

/**
 * BadgeDetailProps
 */
export type BadgeDetailProps = {
  icon?: IconName;
  iconURL?: string;
  imageURL?: string;
  displayName?: string;
  level?: number;
  summary?: string;
  criteria?: CriterionProps[];
  choices?: BadgeActivityProps[];
  canSubmit?: boolean;
  finishedAt?: string;

  onBack?: () => void;
  onSubmit?: () => void;
};

type Status = "In Progress" | "Completed" | "Available";

const STATUS_CLASSNAMES: Record<Status, { border: string; shadow: string; pillAccent: PillAccent }> = {
  "In Progress": {
    border: "border-sky-blue-400/30",
    shadow: "shadow-[0_4px_20px_rgba(59,208,242,0.10)]",
    pillAccent: "cyan",
  },
  Completed: {
    border: "border-mint-400/30",
    shadow: "shadow-[0_4px_20px_rgba(30,226,175,0.10)]",
    pillAccent: "mint",
  },
  Available: {
    border: "border-gold-400/30",
    shadow: "shadow-[0_4px_20px_rgba(255,212,77,0.10)]",
    pillAccent: "gold",
  },
};

/**
 * The full-page single-badge detail — the mockup's "Badge Detail" screen. Data-wiring (criteria/
 * choice cross-reference, Start/Continue/Review button state, Submit gating) mirrors the existing
 * `BadgeCard` verbatim; only the markup/styling is new. Each criterion row's button reuses
 * `choice.onClick`, already wired (in the hub app's `useBadge`/`withLessons`) to navigate to the
 * matching lesson — this component doesn't need to know about that.
 * @param props
 * @constructor
 */
export const BadgeDetail = (props: BadgeDetailProps) => {
  const criteria = props.criteria || [];
  const choices: Record<string | number, BadgeActivityProps> = {};
  const criteriaNames = criteria.map((c) => c.displayName).filter(Boolean) as string[];
  let xp = 0;
  let completed = 0;
  let anyStarted = false;

  (props.choices || []).forEach((c, i) => {
    const id = c.criterionId ?? i;
    choices[id] = c;
    xp += c.xp || 0;
    if (c.completedAt) completed += 1;
    if (c.startedAt) anyStarted = true;
  });

  const status: Status = props.finishedAt ? "Completed" : anyStarted || xp > 0 ? "In Progress" : "Available";
  const { border, shadow, pillAccent } = STATUS_CLASSNAMES[status];
  const showSubmit = !props.finishedAt && criteria.length > 0;

  return (
    <div className="flex max-w-2xl flex-col gap-3.5">
      {props.onBack && (
        <div onClick={props.onBack} className="w-max cursor-pointer text-xs font-bold text-sky-blue-400">
          ← Back to My Badges
        </div>
      )}

      <div className={`overflow-hidden rounded-2xl border bg-white ${border} ${shadow}`}>
        <div className="flex gap-4 p-5">
          <div className="shrink-0">
            <BadgeEmblem
              icon={props.icon}
              iconURL={props.iconURL}
              imageURL={props.imageURL}
              alt={props.displayName}
              level={props.level}
              size="sm"
            />
          </div>
          <div className="flex-1">
            <div className="text-lg font-extrabold text-dark-blue-400">{props.displayName}</div>
            <div className="mt-2 text-xs text-slate-500">
              <span className="font-semibold">Level {(props.level || 0) + 1}.</span>
              {!!xp && <span className="ml-1.5 font-bold text-mint-400">{xp} XP</span>}
            </div>
            {!!props.summary && <div className="mt-2 text-xs text-slate-500">{props.summary}</div>}
            <div className="mt-2.5">
              <Pill label={status} accent={pillAccent} />
            </div>
          </div>
        </div>
      </div>

      {criteriaNames.length > 0 && (
        <div className={`rounded-2xl border bg-white p-5 ${border} ${shadow}`}>
          <div className="text-sm font-bold text-dark-blue-400">Badge Criteria</div>
          <div className="mt-1.5 text-xs text-slate-500">Complete 1 of each: {criteriaNames.join(", ")}</div>

          <div className="mt-4 flex flex-col">
            {criteria.map((c, i) => {
              const id = c.criterionId ?? i;
              const choice = choices[id];
              if (!choice) {
                return null;
              }
              const buttonText = choice.completedAt ? "Review" : choice.startedAt ? "Continue" : "Start";

              return (
                <div key={id} className="flex items-center gap-3.5 border-b border-slate-100 py-3.5 last:border-b-0">
                  <div
                    className={`h-[18px] w-[18px] shrink-0 rounded-full border-2 ${
                      choice.completedAt ? "border-mint-400 bg-mint-400" : "border-slate-300 bg-transparent"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-dark-blue-400">{choice.activityName}</div>
                    <div className="mt-0.5 text-[10.5px] text-slate-400">
                      {c.displayName}
                      {!!choice.xp && <span className="ml-1.5 font-bold text-mint-400">{choice.xp} points</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={choice.onClick}
                    className={`shrink-0 rounded-lg px-4 py-1.5 text-xs font-bold ${
                      choice.completedAt
                        ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        : "bg-dark-blue-400 text-white hover:bg-dark-blue-400/90"
                    }`}
                  >
                    {buttonText}
                  </button>
                </div>
              );
            })}
          </div>

          {showSubmit && (
            <div className="mt-4 flex justify-end border-t border-slate-100 pt-3.5">
              <button
                type="button"
                disabled={!props.canSubmit && completed < criteria.length}
                onClick={props.onSubmit}
                className="rounded-lg bg-gold-400 px-5 py-2 text-xs font-bold text-dark-blue-400 hover:bg-gold-400/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
