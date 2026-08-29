import * as React from "react";
import { IconLayoutGrid, IconList, IconSearch } from "@tabler/icons";
import { BadgeEmblem } from "../BadgeEmblem/BadgeEmblem";
import { BadgeProps } from "../Badge/Badge";
import { Tab } from "../../../components/Board";
import { SortableHeader } from "../../../components/SortableHeader";
import { Pill, PillAccent } from "../../home-dashboard/Pill/Pill";
import { useSortableData } from "../../../utils/useSortableData";

/**
 * BadgesListProps
 */
export type BadgesListProps = {
  badges: BadgeProps[];
  isLoading?: boolean;
  list?: boolean;

  pathways?: { pathwayId: string; title: string }[];
  selectedPathway?: string;

  onToggleLayout?: (next: boolean) => void;
  onPathwayChange?: (pathwayId: string) => void;
  onSearch?: (value: string) => void;
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
  const [active, setActive] = React.useState<FilterLabel>("Available");
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
  const { items: sortedVisible, requestSort, sortConfig } = useSortableData(visible);

  return (
    <div className="flex flex-col gap-3.5">
      <PathwayPills
        pathways={props.pathways || []}
        selected={props.selectedPathway || ""}
        onChange={props.onPathwayChange || (() => {})}
      />

      {props.onSearch && (
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <IconSearch size={15} stroke={1.75} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search for a badge that fits your needs"
            onChange={(e) => props.onSearch && props.onSearch(e.target.value)}
            className="flex-1 border-none bg-transparent text-sm text-dark-blue-400 outline-none placeholder:text-slate-400"
          />
        </div>
      )}

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
            <BadgeListRowHeader sortConfig={sortConfig} onSort={requestSort} />
            {sortedVisible.map((badge, i) => (
              <BadgeListRow key={badge.badgeId || i} {...badge} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {sortedVisible.map((badge, i) => (
              <BadgeListCard key={badge.badgeId || i} {...badge} />
            ))}
          </div>
        ))}
    </div>
  );
};

const PathwayPills = (props: {
  pathways: { pathwayId: string; title: string }[];
  selected: string;
  onChange: (pathwayId: string) => void;
}) => {
  if (props.pathways.length === 0) {
    return null;
  }

  const pillClass = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-xs font-bold ${
      active
        ? "border-sky-blue-400/40 bg-sky-blue-400/20 text-dark-blue-400"
        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
    }`;

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => props.onChange("")} className={pillClass(!props.selected)}>
        All
      </button>
      {props.pathways.map((p) => (
        <button
          key={p.pathwayId}
          type="button"
          onClick={() => props.onChange(p.pathwayId)}
          className={pillClass(props.selected === p.pathwayId)}
        >
          {p.title}
        </button>
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
  const countsLine = [
    props.numberOfLessons ? `${props.numberOfLessons} lesson${props.numberOfLessons === 1 ? "" : "s"}` : undefined,
    props.weight ? `${props.weight} pts` : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

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
            size="md"
          />
        </div>
        <div title={props.displayName} className="line-clamp-4 w-full text-xs font-bold text-dark-blue-400">
          {props.displayName}
        </div>
        {props.pathwayName && (
          <div title={props.pathwayName} className="line-clamp-2 w-full text-[10.5px] text-slate-400">
            {props.pathwayName}
          </div>
        )}
        {countsLine && <div className="w-full text-[10.5px] text-slate-400">{countsLine}</div>}
        <Pill label={pillLabel} accent={pillAccent} />
      </div>
    </div>
  );
};

const BadgeListRowHeader = (props: {
  sortConfig: { key: string | number; direction: "asc" | "desc" | null };
  onSort: (key: string) => void;
}) => (
  <div className="flex items-start gap-3 border-b border-slate-100 px-3.5 pb-2 pt-2.5 leading-tight">
    <div className="w-16 shrink-0" />
    <SortableHeader
      label="Badge"
      sortKey="displayName"
      sortConfig={props.sortConfig}
      onSort={props.onSort}
      className="w-40 shrink-0"
    />
    <div className="hidden min-w-0 flex-1 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400 md:block">
      Description
    </div>
    <SortableHeader
      label="Pathway"
      sortKey="pathwayName"
      sortConfig={props.sortConfig}
      onSort={props.onSort}
      className="hidden w-32 shrink-0 md:inline-flex"
    />
    <SortableHeader
      label="Lessons"
      sortKey="numberOfLessons"
      sortConfig={props.sortConfig}
      onSort={props.onSort}
      className="hidden w-20 shrink-0 sm:inline-flex"
    />
    <SortableHeader
      label="Points"
      sortKey="weight"
      sortConfig={props.sortConfig}
      onSort={props.onSort}
      align="right"
      className="hidden w-14 shrink-0 sm:inline-flex"
    />
    <div className="w-20 shrink-0" />
  </div>
);

const BadgeListRow = (props: BadgeProps) => {
  const { pillAccent, pillLabel } = STATUS_CLASSNAMES[pillStatus(props)];
  const isDisabled = props.isLocked || !props.onOpen;

  return (
    <div
      onClick={() => !isDisabled && props.onOpen && props.onOpen()}
      className={`flex items-start gap-3 border-b border-slate-100 px-3.5 py-2.5 last:border-b-0 ${
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
          size="xs"
        />
      </div>
      <div title={props.displayName} className="line-clamp-4 w-40 shrink-0 text-xs font-semibold text-dark-blue-400">
        {props.displayName}
      </div>
      <div title={props.summary} className="hidden min-w-0 flex-1 text-[11px] text-slate-400 md:line-clamp-4">
        {props.summary || "—"}
      </div>
      <div className="hidden w-32 shrink-0 truncate text-[11px] text-slate-400 md:block">
        {props.pathwayName || "—"}
      </div>
      <div className="hidden w-20 shrink-0 text-[11px] text-slate-400 sm:block">
        {props.numberOfLessons ? `${props.numberOfLessons} lesson${props.numberOfLessons === 1 ? "" : "s"}` : "—"}
      </div>
      <div className="hidden w-14 shrink-0 text-right text-[11px] text-slate-400 sm:block">
        {props.weight ? `${props.weight} pts` : "—"}
      </div>
      <div className="flex w-20 shrink-0 justify-end">
        <Pill label={pillLabel} accent={pillAccent} />
      </div>
    </div>
  );
};
