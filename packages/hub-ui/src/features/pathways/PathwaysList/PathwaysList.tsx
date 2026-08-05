import * as React from "react";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";
import { Progress } from "../../../components/Progress/Progress";
import { PathwayItem } from "../../home-dashboard/PathwaysCard/PathwaysCard";

/**
 * PathwaysListProps
 */
export type PathwaysListProps = {
  pathways: PathwayItem[];
};

/**
 * The accent cycled across pathway cards, by grid position.
 */
type ListAccent = "cyan" | "mint" | "gold";

const ACCENT_ORDER: ListAccent[] = ["cyan", "mint", "gold"];

const ACCENT_CLASSNAMES: Record<
  ListAccent,
  { border: string; shadow: string; strip: string; progress: "sky-blue" | "mint" | "gold" }
> = {
  cyan: {
    border: "border-sky-blue-400/30",
    shadow: "shadow-[0_4px_20px_rgba(59,208,242,0.10)]",
    strip: "from-sky-blue-400 to-mint-400",
    progress: "sky-blue",
  },
  mint: {
    border: "border-mint-400/30",
    shadow: "shadow-[0_4px_20px_rgba(30,226,175,0.10)]",
    strip: "from-mint-400 to-gold-400",
    progress: "mint",
  },
  gold: {
    border: "border-gold-400/30",
    shadow: "shadow-[0_4px_20px_rgba(255,212,77,0.10)]",
    strip: "from-gold-400 to-sky-blue-400",
    progress: "gold",
  },
};

/**
 * The full-page "My Pathways & Seals" list — the expanded, grid-of-large-cards sibling of the
 * Home page's `PathwaysCard` widget. Purely presentational, same as `PathwaysCard`: each card's
 * `onClick` (already supplied by `usePathways` in the hub app) is expected to navigate to the
 * existing pathway detail page, not open an in-page detail view.
 * @param props
 * @constructor
 */
export const PathwaysList = (props: PathwaysListProps) => {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="text-xs font-semibold text-slate-400">
        {props.pathways.length} pathway{props.pathways.length === 1 ? "" : "s"}
      </div>

      {props.pathways.length === 0 && <p className="text-sm text-slate-400">No pathways to display.</p>}

      {props.pathways.length > 0 && (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {props.pathways.map((pathway, i) => (
            <PathwayListCard key={pathway.pathwayId || i} accent={ACCENT_ORDER[i % ACCENT_ORDER.length]} {...pathway} />
          ))}
        </div>
      )}
    </div>
  );
};

type PathwayListCardProps = PathwayItem & { accent: ListAccent };

const PathwayListCard = (props: PathwayListCardProps) => {
  const { border, shadow, strip, progress } = ACCENT_CLASSNAMES[props.accent];
  const badgeCount = props.badges?.length || 0;
  const target = props.target || badgeCount || 1;
  const value = props.progress || 0;

  return (
    <div
      onClick={props.onClick}
      className={`overflow-hidden rounded-2xl border bg-white ${border} ${shadow} ${
        props.onClick ? "cursor-pointer hover:bg-slate-50" : ""
      }`}
    >
      <div className={`h-1 bg-gradient-to-r ${strip}`} />
      <div className="flex gap-4 p-4">
        <div className="shrink-0">
          <BadgeEmblem iconURL={props.imageURL} alt={props.title} size="xs" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-dark-blue-400">{props.title}</div>
          {props.description && <div className="mt-1.5 text-xs text-slate-500">{props.description}</div>}
          <div className="mt-3 flex items-center gap-2.5">
            <div className="h-1.5 flex-1">
              <Progress rounded color={progress} start={value} end={target} />
            </div>
            <div className="whitespace-nowrap text-[10.5px] font-semibold text-slate-400">
              {value}/{target} badges
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
