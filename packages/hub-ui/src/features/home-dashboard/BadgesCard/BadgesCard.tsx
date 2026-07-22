import * as React from "react";
import { IconAlbum, IconLayoutGrid, IconList } from "@tabler/icons";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";
import { BadgeProps } from "../../badges/Badge/Badge";
import { Tab } from "../../../components/Board";
import { Loader } from "../../../components/Loader";
import { Pill, PillAccent } from "../Pill/Pill";

type FilterLabel = "In Progress" | "Completed" | "Available" | "Locked";

const FILTERS: FilterLabel[] = ["In Progress", "Completed", "Available", "Locked"];

/**
 * BadgesCardProps
 */
export type BadgesCardProps = {
  badges: BadgeProps[];
  isLoading?: boolean;
  list?: boolean;

  onToggleLayout?: (next: boolean) => void;
};

/**
 * The student dashboard's "Badges" card - a presentational replacement for `BadgeSection`
 * scoped to the Home page. Ports `BadgeSection`'s real state classification (in
 * progress/completed/available/locked, driven by `finishedAt`/`isLocked`/`startedAt`) and its
 * grid/list toggle, but shows one state at a time via a single-select tab strip
 * (`Board`'s `Tab` `secondary` variant) to match the mockup's tab look, rather than
 * `BadgeSection`'s original multi-select filter pills.
 * @param props
 * @constructor
 */
export const BadgesCard = (props: BadgesCardProps) => {
  const groups = groupBadges(props.badges);
  const [active, setActive] = React.useState<FilterLabel>("In Progress");
  const [list, setList] = React.useState(props.list);

  React.useEffect(() => {
    setList(props.list);
  }, [props.list]);

  React.useEffect(() => {
    if (list !== undefined && props.list !== list && props.onToggleLayout) {
      props.onToggleLayout(list);
    }
  }, [list]);

  const visible = groups[active];
  const gridClassName = list ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-3 sm:grid-cols-3";

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gold-400/20 bg-white shadow-[0_4px_20px_rgba(255,212,77,0.12)]">
      <div className="h-1 bg-gradient-to-r from-gold-400 to-sky-blue-400" />
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gold-400/15">
            <IconAlbum size={18} stroke={2} className="text-gold-400" />
          </div>
          <div className="text-sm font-bold text-dark-blue-400">Badges</div>
          <Pill label={`${groups.Completed.length} / ${props.badges.length}`} accent="gold" />
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

      <div className="grid grid-cols-4 gap-2 border-b border-slate-100 px-4">
        {FILTERS.map((label) => (
          <Tab key={label} title={label} secondary active={active === label} onClick={() => setActive(label)} />
        ))}
      </div>

      <div className="relative flex-1 p-4">
        <Loader isLoading={props.isLoading}>
          {visible.length === 0 && <p className="text-sm text-slate-400">No badges to display.</p>}
          {visible.length > 0 && (
            <div className={gridClassName}>
              {visible.map((badge, i) => (
                <BadgeTile key={badge.badgeId || i} {...badge} />
              ))}
            </div>
          )}
        </Loader>
      </div>
    </div>
  );
};

const groupBadges = (badges: BadgeProps[]): Record<FilterLabel, BadgeProps[]> => {
  const groups: Record<FilterLabel, BadgeProps[]> = {
    "In Progress": [],
    Completed: [],
    Available: [],
    Locked: [],
  };

  badges.forEach((b) => {
    if (b.finishedAt) {
      groups.Completed.push(b);
    } else if (b.isLocked) {
      groups.Locked.push(b);
    } else if (b.startedAt) {
      groups["In Progress"].push(b);
    } else {
      groups.Available.push(b);
    }
  });

  return groups;
};

const BadgeTile = (props: BadgeProps) => {
  const hasProgress = !!props.startedAt || !!props.finishedAt || (!!props.progress && props.progress > 0);
  const isDisabled = props.isLocked || !props.onOpen;
  const onClick = () => !isDisabled && props.onOpen && props.onOpen();

  const status: { label: string; accent: PillAccent } = props.isLocked
    ? { label: "Locked", accent: "slate" }
    : props.finishedAt
    ? { label: "Done", accent: "mint" }
    : hasProgress
    ? { label: "Active", accent: "cyan" }
    : { label: "Open", accent: "gold" };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-3 text-center ${
        isDisabled ? "" : "cursor-pointer hover:bg-slate-50"
      }`}
    >
      <div className={props.isLocked ? "opacity-40" : ""}>
        <BadgeEmblem
          icon={props.icon}
          iconURL={props.iconURL}
          imageURL={props.imageURL}
          alt={props.displayName}
          level={props.level}
          size="sm"
        />
      </div>
      <div className="w-full truncate text-xs font-semibold text-dark-blue-400">{props.displayName}</div>
      <Pill label={status.label} accent={status.accent} />
    </div>
  );
};
