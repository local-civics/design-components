import * as React from "react";
import { IconLayoutGrid, IconList } from "@tabler/icons";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";
import { Pill, PillAccent } from "../../home-dashboard/Pill/Pill";
import { PathwayProgressBarChart } from "../PathwayProgressBarChart/PathwayProgressBarChart";
import { BadgeItem, PathwayCardProps } from "../types";

type Status = "In Progress" | "Completed" | "Available";

const STATUS_PILL_ACCENT: Record<Status, PillAccent> = {
  "In Progress": "cyan",
  Completed: "mint",
  Available: "gold",
};

/**
 * A read-only, print-friendly summary of a single pathway's progress — the same data already
 * shown on `PathwayDetail`, condensed into a record-style layout. Toggled alongside
 * `PathwayDetail` from `Pathway.tsx`, not a routed page of its own.
 *
 * In-progress badge activity is intentionally omitted: that classification depends on
 * `startedAt`, which isn't reliably populated without lesson-level data yet. Only completed
 * activity is shown until that's sorted out.
 * @param props
 * @constructor
 */
export const PathwayTranscript = (props: PathwayCardProps) => {
  const [layout, setLayout] = React.useState<"list" | "grid">("list");

  const today = React.useMemo(
    () => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    []
  );

  // Maps technical category ids to display names, same remap `PathwayCard` used to do externally
  // before this component read straight from `rawCriteria`/`points`/`categoryNames`.
  const mappedTargets = React.useMemo(() => {
    const t: Record<string, number> = {};
    Object.entries(props.rawCriteria ?? {}).forEach(([id, val]) => {
      t[props.categoryNames?.[id] || id] = val;
    });
    return t;
  }, [props.rawCriteria, props.categoryNames]);

  const mappedPoints = React.useMemo(() => {
    const p: Record<string, number> = {};
    Object.entries(props.points ?? {}).forEach(([id, val]) => {
      p[props.categoryNames?.[id] || id] = val;
    });
    return p;
  }, [props.points, props.categoryNames]);

  const badges = props.badges || [];
  const completedBadges = badges.filter((b) => !!b.completedAt);

  const rootIds = Object.keys(props.categoryParents || {}).filter((id) => !props.categoryParents?.[id]);
  const level2Ids = Object.keys(props.categoryParents || {}).filter((id) => {
    const parentId = props.categoryParents?.[id];
    return parentId && rootIds.includes(parentId);
  });

  // Total points earned, read off the top-level categoryId.
  const targetKeys = props.rawCriteria || props.criteria || {};
  const topLevelId = rootIds.find((id) => targetKeys[id] !== undefined) || rootIds[0];
  const totalPointsEarned = topLevelId ? props.points?.[topLevelId] || 0 : 0;

  const badgesEarnedCount = completedBadges.length;

  // Same status vocabulary/derivation as PathwayDetail. Kept local rather than passed as a prop
  // since the two are independently-toggled siblings in Pathway.tsx, not parent/child.
  const target = badges.length;
  const anyStarted = badges.some((b) => b.startedAt);
  const status: Status =
    target > 0 && badgesEarnedCount === target
      ? "Completed"
      : anyStarted || badgesEarnedCount > 0
      ? "In Progress"
      : "Available";

  const safeRender = (val: unknown) => (typeof val === "string" || typeof val === "number" ? val : "");

  const renderBadgePool = (badgePool: BadgeItem[]) => {
    if (badgePool.length === 0) return null;

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completed Activity</h2>
          <span className="rounded-full bg-mint-400/15 px-2 py-0.5 text-[10px] font-bold text-mint-400">
            {badgePool.length}
          </span>
        </div>

        {level2Ids.map((l2Id) => {
          const groupBadges = badgePool.filter((b) => b.categories.includes(l2Id));
          if (groupBadges.length === 0) return null;

          return (
            <div key={l2Id} className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-dark-blue-400">
                <span className="h-4 w-1 rounded-full bg-sky-blue-400" />
                {props.categoryNames?.[l2Id] || l2Id}
              </h3>
              <div className={layout === "grid" ? "grid grid-cols-3 gap-3" : "space-y-2"}>
                {groupBadges.map((b) => (
                  <div
                    key={b.badgeId}
                    className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${
                      layout === "grid" ? "flex flex-col items-center gap-2 text-center" : "flex items-center justify-between"
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${layout === "grid" ? "flex-col" : ""}`}>
                      <BadgeEmblem size="sm" iconURL={b.iconURL} />
                      <p className="text-xs font-bold text-dark-blue-400">{b.displayName}</p>
                    </div>
                    <span className="text-xs font-black text-mint-400">{b.weight} pts</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 p-6">
      {/* STUDENT HEADER */}
      <div className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
        <div>
          <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-400">Student</p>
          <p className="font-bold text-dark-blue-400">{safeRender(props.studentName) || "Guest User"}</p>
          <p className="mt-0.5 text-[11px] text-slate-500">{safeRender(props.studentEmail)}</p>
        </div>
        <div>
          <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-400">Organization</p>
          <p className="font-bold text-dark-blue-400">{safeRender(props.schoolName) || "Not Provided"}</p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {props.gradeLevel ? `Grade ${safeRender(props.gradeLevel)}` : ""}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-400">Record Status</p>
          <Pill label="Verified" accent="mint" />
          <p className="mt-1 text-[10px] text-slate-400">{today}</p>
        </div>
      </div>

      {/* PATHWAY DETAILS & ACHIEVEMENTS SUMMARY */}
      <section className="space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">
            {props.title || "Untitled Pathway"}
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-500">
            {props.description || "No description provided for this pathway."}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <span className="text-2xl font-black text-dark-blue-400">{totalPointsEarned.toLocaleString()}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Points</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <span className="text-2xl font-black text-dark-blue-400">{badgesEarnedCount}</span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Badges Earned</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <Pill label={status} accent={STATUS_PILL_ACCENT[status]} />
            <span className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Pathway Status</span>
          </div>
        </div>
      </section>

      {/* CRITERIA & PROGRESS */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Criteria &amp; Progress</p>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <PathwayProgressBarChart targets={mappedTargets} points={mappedPoints} height="md" />
        </div>
      </section>

      {/* COMPLETED ACTIVITY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activity History</p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${
                layout === "grid" ? "bg-slate-100 text-dark-blue-400" : "text-slate-300 hover:text-slate-400"
              }`}
            >
              <IconLayoutGrid size={14} stroke={1.75} />
            </button>
            <button
              type="button"
              onClick={() => setLayout("list")}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${
                layout === "list" ? "bg-slate-100 text-dark-blue-400" : "text-slate-300 hover:text-slate-400"
              }`}
            >
              <IconList size={14} stroke={1.75} />
            </button>
          </div>
        </div>

        {renderBadgePool(completedBadges)}
        {completedBadges.length === 0 && <p className="text-sm text-slate-400">No completed activity yet.</p>}
      </section>
    </div>
  );
};
