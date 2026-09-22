import * as React from "react";
import { IconCalendar, IconCalendarStats, IconClipboard, IconRefresh, IconSearch } from "@tabler/icons";
import { FileList, FileListItem } from "../FileList/FileList";
import { useFilteredSubmissions } from "./useFilteredSubmissions";

/**
 * SubmissionItem
 */
export type SubmissionItem = FileListItem & {
  lessonId: string;
  badgeId: string;
  updatedAt?: string;
  pathwayName?: string;
};

/**
 * FileLockerBadge
 */
export type FileLockerBadge = {
  badgeId: string;
  displayName: string;
  categories?: string[];
};

/**
 * FileLockerPathway
 */
export type FileLockerPathway = {
  pathwayId: string;
  title: string;
  description?: string;
};

/**
 * FileLockerProps
 */
export type FileLockerProps = {
  loading: boolean;
  displayName: string;
  description: string;
  submissions: SubmissionItem[];
  lessons: { lessonId: string; lessonName: string }[];
  badges: FileLockerBadge[];
  pathways: FileLockerPathway[];
  onBadgeClick?: (badgeId: string) => void;
  onLessonClick?: (lessonId: string) => void;
  onPathwayClick?: (pathwayId: string) => void;
  // "Updated H:MM:SS" - already formatted by the caller. Omitted entirely (no label, no refresh
  // button) until the first fetch has landed.
  fetchedAtLabel?: string;
  // Whether a manually-triggered refresh is currently in flight - spins the refresh icon.
  refreshing?: boolean;
  // A lightweight, non-destructive way to force a fresh fetch without losing tab/search state.
  onRefresh?: () => void;
  // Optionally-controlled active tab (one of TABS' own values below) - lets a caller deep-link
  // straight into a specific tab via the URL, and have Back/Forward naturally restore it. Falls
  // back to local state when omitted, so every existing standalone/Storybook usage is unaffected.
  tab?: string;
  onTabChange?: (tab: string) => void;
  // Which single pathway/badge/lesson (matching whichever tab is active) should start expanded.
  // Consumed once per distinct value, not re-applied on every render.
  focusId?: string;
};

const TABS = [
  { value: "pathways", label: "By pathway" },
  { value: "badges", label: "By badge" },
  { value: "lessons", label: "By lesson" },
];

// The search box cross-matches every tab against pathway, badge, lesson, and question text at once
// - not just whichever field happens to be that tab's own primary grouping key - so one placeholder
// describes all 3 tabs' behavior identically.
const SEARCH_PLACEHOLDER = "Search by pathway, badge, lesson, or question";

const DAY_MS = 24 * 60 * 60 * 1000;

// Cross-field match used by every tab: a submission matches if its badge, lesson, pathway, or
// question text matches. Used both to decide whether a whole group should show at all, and to
// narrow which submissions appear inside a group that only matches because of one of its items,
// not its own name.
const matchesSearch = (item: SubmissionItem, term: string): boolean => {
  if (!term) return true;
  return (
    item.badgeName.toLowerCase().includes(term) ||
    item.lessonName.toLowerCase().includes(term) ||
    !!item.pathwayName?.toLowerCase().includes(term) ||
    item.question.toLowerCase().includes(term)
  );
};

/**
 * The student-facing File Locker - a self-scoped view of the current student's own uploaded
 * lesson submissions and links, grouped by pathway/badge/lesson the same way the educator File
 * Locker groups by those dimensions across a whole roster, but flattened for a single user: no
 * per-student table, no row-expansion, no dedicated review/detail view with student-to-student
 * navigation, since there's no "next student" to page through in a self-view - each group's
 * FileList is shown directly. A group only renders when it actually has at least one matching
 * submission, so a student isn't shown an empty section for every badge/pathway/lesson in the
 * org they haven't touched.
 * @param props
 * @constructor
 */
export const FileLocker = (props: FileLockerProps) => {
  const [internalTab, setInternalTab] = React.useState(props.tab || "pathways");
  // Optionally-controlled: a caller (My File Locker, reading a ?tab= query param) can drive this
  // directly; every other/Storybook usage falls back to local state, unaffected.
  const tab = props.tab ?? internalTab;
  const setTab = (next: string) => {
    setInternalTab(next);
    props.onTabChange?.(next);
  };
  const [search, setSearch] = React.useState("");
  const searchLower = search.trim().toLowerCase();
  const filtered = useFilteredSubmissions(props.submissions);

  const files = props.submissions.length;
  const now = Date.now();
  const weekAgo = now - 7 * DAY_MS;
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

  const thisWeek = props.submissions.filter((s) => s.updatedAt && new Date(s.updatedAt).getTime() >= weekAgo).length;
  const thisMonth = props.submissions.filter((s) => s.updatedAt && new Date(s.updatedAt).getTime() >= startOfMonth).length;

  // The single search box cross-matches every tab against pathway, badge, lesson, and question
  // text at once. A group whose own name matches shows every one of its submissions unfiltered
  // (today's behavior); a group that only matches because one of its submissions does shows just
  // that narrowed subset instead; a group matching neither its own name nor any submission drops
  // out via the existing "only render groups with at least one item" filter below - the same rule
  // that already hides a group with zero submissions regardless of search.
  const pathwayGroups = props.pathways
    .map((p) => {
      const base = filtered.byPathway(p.pathwayId, props.badges);
      const ownNameMatches = !searchLower || p.title.toLowerCase().includes(searchLower);
      const items = ownNameMatches ? base : base.filter((it) => matchesSearch(it, searchLower));
      return { pathway: p, items };
    })
    .filter((g) => g.items.length > 0);

  const badgeGroups = props.badges
    .map((b) => {
      const base = filtered.byBadge(b.badgeId);
      const ownNameMatches = !searchLower || b.displayName.toLowerCase().includes(searchLower);
      const items = ownNameMatches ? base : base.filter((it) => matchesSearch(it, searchLower));
      return { badge: b, items };
    })
    .filter((g) => g.items.length > 0);

  const lessonGroups = props.lessons
    .map((l) => {
      const base = filtered.byLesson(l.lessonId);
      const ownNameMatches = !searchLower || l.lessonName.toLowerCase().includes(searchLower);
      const items = ownNameMatches ? base : base.filter((it) => matchesSearch(it, searchLower));
      return { lesson: l, items };
    })
    .filter((g) => g.items.length > 0);

  // Deep-link support: scrolls the matching pathway/badge/lesson group into view once per distinct
  // focusId - every group here is already always-expanded (no collapse state to seed, unlike the
  // educator File Locker), so a scroll+highlight is the right equivalent of "auto-open."
  const focusedRef = React.useRef<HTMLDivElement>(null);
  const consumedFocusId = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    if (!props.focusId) return;
    if (consumedFocusId.current === props.focusId) return;
    if (!focusedRef.current) return;
    consumedFocusId.current = props.focusId;
    focusedRef.current.scrollIntoView({behavior: "smooth", block: "center"});
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.displayName || "File Locker"}</h1>
          <p className="text-sm text-slate-500">{props.description || "Files and links you've submitted through your lessons"}</p>
        </div>
        <div className="flex items-center gap-3">
          {props.fetchedAtLabel && <span className="text-[10px] font-semibold text-slate-400">{props.fetchedAtLabel}</span>}
          {props.onRefresh && (
            <button
              type="button"
              onClick={props.onRefresh}
              disabled={props.refreshing}
              title="Refresh"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-dark-blue-400 disabled:opacity-50"
            >
              <IconRefresh size={15} stroke={2} className={props.refreshing ? "animate-spin" : ""} />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2.5">
        <StatCell icon={IconClipboard} value={files} label="Files" accent="cyan" />
        <StatCell icon={IconCalendar} value={thisWeek} label="This Week" accent="mint" />
        <StatCell icon={IconCalendarStats} value={thisMonth} label="This Month" accent="gold" />
      </div>

      <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`rounded-lg px-4 py-2 text-xs font-bold ${
              tab === t.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <IconSearch size={15} stroke={1.75} className="text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={SEARCH_PLACEHOLDER}
          className="flex-1 border-none bg-transparent text-sm text-dark-blue-400 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-col gap-3">
        {props.loading && <p className="text-sm text-slate-400">Loading...</p>}

        {!props.loading && tab === "pathways" &&
          pathwayGroups.map(({ pathway, items }) => (
            <GroupCard
              key={pathway.pathwayId}
              ref={pathway.pathwayId === props.focusId ? focusedRef : undefined}
              focused={pathway.pathwayId === props.focusId}
              title={pathway.title}
              description={pathway.description}
              onClick={props.onPathwayClick ? () => props.onPathwayClick!(pathway.pathwayId) : undefined}
            >
              <FileList items={items} onBadgeClick={props.onBadgeClick} onLessonClick={props.onLessonClick} />
            </GroupCard>
          ))}

        {!props.loading && tab === "badges" &&
          badgeGroups.map(({ badge, items }) => (
            <GroupCard
              key={badge.badgeId}
              ref={badge.badgeId === props.focusId ? focusedRef : undefined}
              focused={badge.badgeId === props.focusId}
              title={badge.displayName}
              description={badgeSubtitle(items)}
              onClick={props.onBadgeClick ? () => props.onBadgeClick!(badge.badgeId) : undefined}
            >
              <FileList items={items} hideBadge onLessonClick={props.onLessonClick} />
            </GroupCard>
          ))}

        {!props.loading && tab === "lessons" &&
          lessonGroups.map(({ lesson, items }) => (
            <GroupCard
              key={lesson.lessonId}
              ref={lesson.lessonId === props.focusId ? focusedRef : undefined}
              focused={lesson.lessonId === props.focusId}
              title={lesson.lessonName}
              description={lessonSubtitle(items)}
              onClick={props.onLessonClick ? () => props.onLessonClick!(lesson.lessonId) : undefined}
            >
              <FileList items={items} hideBadge hideLesson />
            </GroupCard>
          ))}

        {!props.loading && files > 0 && searchLower && (
          (tab === "pathways" && pathwayGroups.length === 0) ||
          (tab === "badges" && badgeGroups.length === 0) ||
          (tab === "lessons" && lessonGroups.length === 0)
        ) && <p className="text-sm text-slate-400">No matching entries.</p>}

        {!props.loading && files === 0 && <p className="text-sm text-slate-400">No files to display.</p>}
      </div>
    </div>
  );
};

const badgeSubtitle = (items: SubmissionItem[]): string | undefined => {
  const pathwayName = items[0]?.pathwayName;
  return pathwayName ? `${pathwayName} pathway` : undefined;
};

const lessonSubtitle = (items: SubmissionItem[]): string | undefined => {
  const sample = items[0];
  if (!sample) {
    return undefined;
  }
  const parts = [sample.badgeName, sample.pathwayName ? `${sample.pathwayName} pathway` : null].filter(Boolean);
  return parts.length ? parts.join(" · ") : undefined;
};

const GroupCard = React.forwardRef<HTMLDivElement, { title: string; description?: string; onClick?: () => void; focused?: boolean; children: React.ReactNode }>((props, ref) => (
  <div ref={ref} className={`rounded-2xl border bg-white p-4 ${props.focused ? "border-sky-blue-400 ring-2 ring-sky-blue-400/30" : "border-slate-200"}`}>
    <div className="mb-3">
      {props.onClick ? (
        <button type="button" onClick={props.onClick} className="text-left text-sm font-extrabold text-sky-blue-400 hover:underline">
          {props.title}
        </button>
      ) : (
        <div className="text-sm font-extrabold text-dark-blue-400">{props.title}</div>
      )}
      {props.description && <div className="text-xs text-slate-500">{props.description}</div>}
    </div>
    {props.children}
  </div>
));

type StatAccent = "cyan" | "mint" | "gold";

const STAT_ACCENT: Record<StatAccent, { chip: string; icon: string; card: string }> = {
  cyan: { chip: "bg-sky-blue-400/15", icon: "text-sky-blue-400", card: "border-sky-blue-400/20 shadow-[0_2px_12px_rgba(59,208,242,0.12)]" },
  mint: { chip: "bg-mint-400/15", icon: "text-mint-400", card: "border-mint-400/20 shadow-[0_2px_12px_rgba(30,226,175,0.12)]" },
  gold: { chip: "bg-gold-400/15", icon: "text-gold-400", card: "border-gold-400/20 shadow-[0_2px_12px_rgba(255,212,77,0.12)]" },
};

// A local stat tile matching StatTile's (../../home-dashboard/StatTile) exact classNames/spacing,
// but taking a real Tabler icon component instead of StatTile's own `icon: IconName` prop - that
// union (components/Icon/icons.tsx) has no entry suited to a file-count/date-range stat, and its
// own story already references names ("badge"/"pathway"/"clock") that don't exist in the type
// today. Not this component's bug to fix; this sidesteps it while staying visually identical.
const StatCell = (props: { icon: React.ComponentType<any>; value: number; label: string; accent: StatAccent }) => {
  const { chip, icon, card } = STAT_ACCENT[props.accent];
  const Icon = props.icon;
  return (
    <div className={`flex flex-1 flex-col gap-2.5 rounded-2xl border bg-white p-4 ${card}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${chip}`}>
        <Icon size={18} stroke={1.75} className={icon} />
      </div>
      <div>
        <div className="text-2xl font-extrabold text-dark-blue-400">{props.value}</div>
        <div className="text-xs text-slate-400">{props.label}</div>
      </div>
    </div>
  );
};
