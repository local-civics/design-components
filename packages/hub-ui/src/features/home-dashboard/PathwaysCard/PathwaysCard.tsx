import * as React from "react";
import { IconLayoutGrid, IconList, IconRoute } from "@tabler/icons";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";
import { Progress } from "../../../components/Progress/Progress";
import { Loader } from "../../../components/Loader";
import { PathwayCardProps } from "../../pathways/types";

/**
 * A single pathway as rendered by the dashboard - the same shape `PathwaySection` already
 * consumes (see `usePathways` in the hub app), so this is a drop-in replacement for the data.
 */
export type PathwayItem = PathwayCardProps & { pathwayId?: string; onClick?: () => void };

/**
 * PathwaysCardProps
 */
export type PathwaysCardProps = {
  pathways: PathwayItem[];
  isLoading?: boolean;
  list?: boolean;

  onToggleLayout?: (next: boolean) => void;
};

/**
 * The student dashboard's "My Pathways & Seals" card - a presentational replacement for
 * `PathwaySection` scoped to the Home page. Keeps the same list/grid-toggle behavior; the
 * in-progress/completed/available/locked grouping isn't reproduced because `PathwaySection`'s
 * own grouping is currently stubbed (everything lands in "in progress"), so a flat grid is
 * behaviorally equivalent to what ships today.
 * @param props
 * @constructor
 */
export const PathwaysCard = (props: PathwaysCardProps) => {
  const [list, setList] = React.useState(props.list);

  React.useEffect(() => {
    setList(props.list);
  }, [props.list]);

  React.useEffect(() => {
    if (list !== undefined && props.list !== list && props.onToggleLayout) {
      props.onToggleLayout(list);
    }
  }, [list]);

  const gridClassName = list ? "grid grid-cols-1 gap-2" : "grid grid-cols-1 gap-3 sm:grid-cols-2";

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-sky-blue-400/20 bg-white shadow-[0_4px_20px_rgba(59,208,242,0.10)]">
      <div className="h-1 bg-gradient-to-r from-sky-blue-400 via-mint-400 to-gold-400" />
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-mint-400/15">
            <IconRoute size={18} stroke={2} className="text-mint-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-dark-blue-400">My Pathways & Seals</div>
            <div className="text-xs text-slate-400">{props.pathways.length} pathways</div>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setList(false)}
            className={`flex h-7 w-7 items-center justify-center rounded-md ${
              !list ? "bg-slate-100 text-dark-blue-400" : "text-slate-300 hover:text-slate-400"
            }`}
          >
            <IconLayoutGrid size={14} stroke={1.75} />
          </button>
          <button
            type="button"
            onClick={() => setList(true)}
            className={`flex h-7 w-7 items-center justify-center rounded-md ${
              list ? "bg-slate-100 text-dark-blue-400" : "text-slate-300 hover:text-slate-400"
            }`}
          >
            <IconList size={14} stroke={1.75} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 p-4">
        <Loader isLoading={props.isLoading}>
          {props.pathways.length === 0 && <p className="text-sm text-slate-400">No pathways to display.</p>}
          {props.pathways.length > 0 && (
            <div className={gridClassName}>
              {props.pathways.map((pathway, i) => (
                <PathwayTile key={pathway.pathwayId || i} {...pathway} />
              ))}
            </div>
          )}
        </Loader>
      </div>
    </div>
  );
};

const PathwayTile = (props: PathwayItem) => {
  const badgeCount = props.badges?.length || 0;
  const target = props.target || badgeCount || 1;
  const progress = props.progress || 0;

  return (
    <div
      onClick={props.onClick}
      className={`flex items-center gap-3 rounded-xl border border-slate-200 p-3 ${
        props.onClick ? "cursor-pointer hover:bg-slate-50" : ""
      }`}
    >
      <div className="shrink-0">
        <BadgeEmblem iconURL={props.imageURL} alt={props.title} size="xxs" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-dark-blue-400">{props.title}</div>
        <div className="text-xs text-slate-400">{badgeCount} badges</div>
        <div className="mt-1.5 h-1.5">
          <Progress rounded color="sky-blue" start={progress} end={target} />
        </div>
      </div>
    </div>
  );
};
