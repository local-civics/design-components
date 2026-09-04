import * as React from "react";
import { IconCalendar, IconCalendarStats, IconClipboard } from "@tabler/icons";
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
};

const TABS = [
  { value: "pathways", label: "By pathway" },
  { value: "badges", label: "By badge" },
  { value: "lessons", label: "By lesson" },
];

const DAY_MS = 24 * 60 * 60 * 1000;

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
  const [tab, setTab] = React.useState("pathways");
  const filtered = useFilteredSubmissions(props.submissions);

  const files = props.submissions.length;
  const now = Date.now();
  const weekAgo = now - 7 * DAY_MS;
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

  const thisWeek = props.submissions.filter((s) => s.updatedAt && new Date(s.updatedAt).getTime() >= weekAgo).length;
  const thisMonth = props.submissions.filter((s) => s.updatedAt && new Date(s.updatedAt).getTime() >= startOfMonth).length;

  const pathwayGroups = props.pathways
    .map((p) => ({ pathway: p, items: filtered.byPathway(p.pathwayId, props.badges) }))
    .filter((g) => g.items.length > 0);

  const badgeGroups = props.badges
    .map((b) => ({ badge: b, items: filtered.byBadge(b.badgeId) }))
    .filter((g) => g.items.length > 0);

  const lessonGroups = props.lessons
    .map((l) => ({ lesson: l, items: filtered.byLesson(l.lessonId) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.displayName || "File Locker"}</h1>
        <p className="text-sm text-slate-500">{props.description || "Files and links you've submitted through your lessons"}</p>
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

      <div className="flex flex-col gap-3">
        {props.loading && <p className="text-sm text-slate-400">Loading...</p>}

        {!props.loading && tab === "pathways" &&
          pathwayGroups.map(({ pathway, items }) => (
            <GroupCard
              key={pathway.pathwayId}
              title={pathway.title}
              description={pathway.description}
              onClick={props.onPathwayClick ? () => props.onPathwayClick!(pathway.pathwayId) : undefined}
            >
              <FileList items={items} onBadgeClick={props.onBadgeClick} onLessonClick={props.onLessonClick} />
            </GroupCard>
          ))}

        {!props.loading && tab === "badges" &&
          badgeGroups.map(({ badge, items }) => (
            <GroupCard key={badge.badgeId} title={badge.displayName} description={badgeSubtitle(items)}>
              <FileList items={items} hideBadge onLessonClick={props.onLessonClick} />
            </GroupCard>
          ))}

        {!props.loading && tab === "lessons" &&
          lessonGroups.map(({ lesson, items }) => (
            <GroupCard key={lesson.lessonId} title={lesson.lessonName} description={lessonSubtitle(items)}>
              <FileList items={items} hideBadge hideLesson />
            </GroupCard>
          ))}

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

const GroupCard = (props: { title: string; description?: string; onClick?: () => void; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
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
);

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
