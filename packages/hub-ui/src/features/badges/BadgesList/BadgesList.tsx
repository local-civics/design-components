import * as React from "react";
import { IconLayoutGrid, IconList } from "@tabler/icons";
import { BadgeEmblem } from "../BadgeEmblem/BadgeEmblem";
import { BadgeProps } from "../Badge/Badge";
import { Tab } from "../../../components/Board";
import { Pill, PillAccent } from "../../home-dashboard/Pill/Pill";

/**
 * BadgesListProps
 */
export type BadgesListProps = {
  badges: BadgeProps[];
  isLoading?: boolean;
  list?: boolean;

  onToggleLayout?: (next: boolean) => void;
};

type FilterLabel = "In Progress" | "Completed" | "Available" | "Locked";

const FILTERS: FilterLabel[] = ["In Progress", "Completed", "Available", "Locked"];

const STATUS_CLASSNAMES: Record<
  FilterLabel,
  { border: string; shadow: string; strip: string; pillAccent: PillAccent; pillLabel: string }
> = {
  "In Progress": {
    border: "border-sky-blue-400/30",
    shadow: "shadow-[0_4px_20px_rgba(59,208,242,0.10)]",
    strip: "from-sky-blue-400 to-mint-400",
    pillAccent: "cyan",
    pillLabel: "Active",
  },
  Completed: {
    border: "border-mint-400/30",
    shadow: "shadow-[0_4px_20px_rgba(30,226,175,0.10)]",
    strip: "from-mint-400 to-gold-400",
    pillAccent: "mint",
    pillLabel: "Done",
  },
  Available: {
    border: "border-gold-400/30",
    shadow: "shadow-[0_4px_20px_rgba(255,212,77,0.10)]",
    strip: "from-gold-400 to-sky-blue-400",
    pillAccent: "gold",
    pillLabel: "Open",
  },
  Locked: {
    border: "border-slate-200",
    shadow: "shadow-sm",
    strip: "from-slate-200 to-slate-200",
    pillAccent: "slate",
    pillLabel: "Locked",
  },
};

/**
 * The full-page "My Badges" grid — the expanded sibling of the Home page's `BadgesCard` widget.
 * Purely presentational, same as `BadgesCard`: each card's `onOpen` (already supplied by
 * `useBadges` in the hub app) is expected to navigate to the existing badge detail page, which
 * already drills into the existing lesson page — this component only needs to get the grid right.
 * Grid/list toggle mirrors `PathwaysCard`/`BadgesCard`'s existing controlled/uncontrolled `list`
 * prop pattern. List rows omit the mockup's progress bar and points figure — both are sourced
 * from lesson-level data that isn't available at this list's data granularity.
 * @param props
 * @constructor
 */
export const BadgesList = (props: BadgesListProps) => {
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

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-slate-400">
          {props.badges.length} badge{props.badges.length === 1 ? "" : "s"}
        </div>
        <div className="flex items-center gap-2.5">
          <div className="grid grid-cols-4 gap-1 rounded-xl border border-slate-200 bg-white p-1">
            {FILTERS.map((label) => (
              <Tab key={label} title={label} secondary active={active === label} onClick={() => setActive(label)} />
            ))}
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
      </div>

      {visible.length === 0 && <p className="text-sm text-slate-400">No badges to display.</p>}

      {visible.length > 0 &&
        (list ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {visible.map((badge, i) => (
              <BadgeListRow key={badge.badgeId || i} {...badge} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {visible.map((badge, i) => (
              <BadgeListCard key={badge.badgeId || i} {...badge} />
            ))}
          </div>
        ))}
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

const pillStatus = (props: BadgeProps): FilterLabel => {
  const hasProgress = !!props.startedAt || !!props.finishedAt || (!!props.progress && props.progress > 0);
  return props.isLocked ? "Locked" : props.finishedAt ? "Completed" : hasProgress ? "In Progress" : "Available";
};

const BadgeListCard = (props: BadgeProps) => {
  const { border, shadow, strip, pillAccent, pillLabel } = STATUS_CLASSNAMES[pillStatus(props)];
  const isDisabled = props.isLocked || !props.onOpen;

  return (
    <div
      onClick={() => !isDisabled && props.onOpen && props.onOpen()}
      className={`overflow-hidden rounded-2xl border bg-white ${border} ${shadow} ${
        isDisabled ? "" : "cursor-pointer hover:bg-slate-50"
      }`}
    >
      <div className={`h-1 bg-gradient-to-r ${strip}`} />
      <div className="flex flex-col items-center gap-2 p-4 text-center">
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
        <div className="w-full truncate text-xs font-bold text-dark-blue-400">{props.displayName}</div>
        <Pill label={pillLabel} accent={pillAccent} />
      </div>
    </div>
  );
};

const BadgeListRow = (props: BadgeProps) => {
  const { pillAccent, pillLabel } = STATUS_CLASSNAMES[pillStatus(props)];
  const isDisabled = props.isLocked || !props.onOpen;

  return (
    <div
      onClick={() => !isDisabled && props.onOpen && props.onOpen()}
      className={`flex items-center gap-3 border-b border-slate-100 px-3.5 py-2.5 last:border-b-0 ${
        isDisabled ? "" : "cursor-pointer hover:bg-slate-50"
      }`}
    >
      <div className={`shrink-0 ${props.isLocked ? "opacity-40" : ""}`}>
        <BadgeEmblem
          icon={props.icon}
          iconURL={props.iconURL}
          imageURL={props.imageURL}
          alt={props.displayName}
          level={props.level}
          size="xxs"
        />
      </div>
      <div className="min-w-0 flex-1 truncate text-xs font-semibold text-dark-blue-400">{props.displayName}</div>
      <Pill label={pillLabel} accent={pillAccent} />
    </div>
  );
};
