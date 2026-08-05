import * as React from "react";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";
import { Progress } from "../../../components/Progress/Progress";
import { Pill, PillAccent } from "../../home-dashboard/Pill/Pill";
import { PathwayCardProps } from "../types";

/**
 * PathwayDetailProps
 */
export type PathwayDetailProps = PathwayCardProps & {
  onBack?: () => void;
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

type Accent = "cyan" | "mint" | "gold";

const ACCENT_ORDER: Accent[] = ["cyan", "mint", "gold"];
const PROGRESS_COLOR: Record<Accent, "sky-blue" | "mint" | "gold"> = {
  cyan: "sky-blue",
  mint: "mint",
  gold: "gold",
};

/**
 * The full-page single-pathway detail — the mockup's "Pathway Detail" screen. Data-wiring
 * (category progress/filter, badge checklist Start/Continue/Review state) mirrors the existing
 * `PathwayOverview` verbatim; only the markup/styling is new. Each badge row's button reuses the
 * badge's own `onClick`, already wired (in the hub app's `usePathway`/`withBadges`) to navigate to
 * the matching badge detail page — this component doesn't need to know about that.
 * @param props
 * @constructor
 */
export const PathwayDetail = (props: PathwayDetailProps) => {
  const badges = props.badges || [];
  const completedCount = badges.filter((b) => b.completedAt).length;
  const target = badges.length;
  const anyStarted = badges.some((b) => b.startedAt);

  const status: Status =
    target > 0 && completedCount === target ? "Completed" : anyStarted || completedCount > 0 ? "In Progress" : "Available";
  const { border, shadow, pillAccent } = STATUS_CLASSNAMES[status];

  const categoryIds = Object.keys(props.rawCriteria || {});
  const [catFilter, setCatFilter] = React.useState<string | null>(null);
  const filteredBadges = catFilter ? badges.filter((b) => b.categories?.includes(catFilter)) : badges;

  return (
    <div className="flex max-w-2xl flex-col gap-3.5">
      {props.onBack && (
        <div onClick={props.onBack} className="w-max cursor-pointer text-xs font-bold text-sky-blue-400">
          ← Back to My Pathways
        </div>
      )}

      <div className={`overflow-hidden rounded-2xl border bg-white ${border} ${shadow}`}>
        <div className="flex gap-4 p-5">
          <div className="shrink-0">
            <BadgeEmblem iconURL={props.imageURL} alt={props.title} size="sm" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-extrabold text-dark-blue-400">{props.title}</div>
            {!!(props.displayTags && props.displayTags.length) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {props.displayTags.map((tag) => (
                  <Pill key={tag} label={tag} accent={pillAccent} />
                ))}
              </div>
            )}
            {!!props.description && <div className="mt-2 text-xs text-slate-500">{props.description}</div>}
            <div className="mt-2.5">
              <Pill label={status} accent={pillAccent} />
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl border bg-white p-5 ${border} ${shadow}`}>
        <div className="text-sm font-bold text-dark-blue-400">Pathway Badges & Criteria</div>
        <div className="mt-1.5 text-xs text-slate-500">
          This pathway is comprised of {target} badge{target === 1 ? "" : "s"}. It includes required and elective
          programming.
        </div>
        <div className="text-xs text-slate-500">
          Progress: {completedCount} / {target} badges completed.
        </div>

        {categoryIds.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {categoryIds.map((id, i) => {
              const accent = ACCENT_ORDER[i % ACCENT_ORDER.length];
              const label = props.categoryNames?.[id] || id;
              const max = props.rawCriteria?.[id] || 0;
              const value = props.points?.[id] || 0;
              return (
                <div key={id}>
                  <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>{label}</span>
                    <span>
                      {value} / {max}
                    </span>
                  </div>
                  <div className="h-1.5">
                    <Progress rounded color={PROGRESS_COLOR[accent]} start={value} end={max || 1} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {categoryIds.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <div
              onClick={() => setCatFilter(null)}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold ${
                catFilter === null ? "bg-dark-blue-400 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              All
            </div>
            {categoryIds.map((id) => (
              <div
                key={id}
                onClick={() => setCatFilter(id)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold ${
                  catFilter === id ? "bg-dark-blue-400 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {props.categoryNames?.[id] || id}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col">
          {filteredBadges.map((b, i) => {
            const buttonText = b.completedAt ? "Review" : b.startedAt ? "Continue" : "Start";

            return (
              <div key={b.badgeId || i} className="flex items-center gap-3.5 border-b border-slate-100 py-3.5 last:border-b-0">
                <div
                  className={`h-[18px] w-[18px] shrink-0 rounded-full border-2 ${
                    b.completedAt ? "border-mint-400 bg-mint-400" : "border-slate-300 bg-transparent"
                  }`}
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-dark-blue-400">{b.displayName}</div>
                  <div className="mt-0.5 text-[10.5px] font-bold text-mint-400">
                    {b.weight} point{b.weight === 1 ? "" : "s"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={b.onClick}
                  className={`shrink-0 rounded-lg px-4 py-1.5 text-xs font-bold ${
                    b.completedAt
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
      </div>
    </div>
  );
};
