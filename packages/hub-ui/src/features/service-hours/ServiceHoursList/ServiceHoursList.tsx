import * as React from "react";
import { IconCircleCheck, IconClockHour4, IconHourglass } from "@tabler/icons";
import { Tab } from "../../../components/Board";
import { SortableHeader } from "../../../components/SortableHeader";
import { useSortableData } from "../../../utils/useSortableData";
import { Pill, PillAccent } from "../../home-dashboard/Pill/Pill";
import { Form, FormPathwayOption } from "../../service-tracking/Form/Form";

/**
 * The state of a service hours entry, as the server derives it.
 */
export type ServiceHourStatus = "pending" | "verified" | "invalidated" | "withdrawn";

/**
 * One logged block of service.
 */
export type ServiceHourItem = {
  entryId: string;
  /** The version the student is looking at. Edit and withdraw send it back so a stale change is refused. */
  revision: number;
  status: ServiceHourStatus;
  /** YYYY-MM-DD, or a full timestamp (only the date part is used). */
  serviceDate: string;
  hostName: string;
  serviceType: string;
  hours: number;
  description?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  pathwayId?: string;
  categoryId?: string;
  /** What this entry supports, already joined by the caller, e.g. "Civic Readiness · 2b. Service-Learning Project". */
  supports?: string;
  evidenceUrl?: string;
  /** The educator's reason for invalidating. Kept visible after the student edits and resubmits. */
  reviewNote?: string;
  /** Hours logged before individual entries were tracked. Read-only. */
  isLegacy?: boolean;
};

/**
 * ServiceHoursListProps
 */
export type ServiceHoursListProps = {
  entries: ServiceHourItem[];
  loading?: boolean;
  /** For the edit form's optional pathway and category link. */
  pathways?: FormPathwayOption[];
  onPathwayChange?: (pathwayId: string) => void;

  /**
   * Saves an edit. `responses` are the form's own keys (organizationName, totalHours, type, date,
   * pathwayId, evidenceUrl, ...). Resolve with nothing on success, or a truthy value to keep the form open.
   */
  onEdit?: (entry: ServiceHourItem, responses: any) => Promise<any>;
  /** Withdraws an entry after the student confirms in the row. */
  onWithdraw?: (entry: ServiceHourItem) => Promise<any>;
};

type FilterLabel = "All" | "Pending" | "Approved" | "Needs attention";

const FILTERS: FilterLabel[] = ["All", "Pending", "Approved", "Needs attention"];

const FILTER_STATUS: Record<FilterLabel, ServiceHourStatus | undefined> = {
  All: undefined,
  Pending: "pending",
  Approved: "verified",
  "Needs attention": "invalidated",
};

const STATUS: Record<ServiceHourStatus, { label: string; accent: PillAccent }> = {
  pending: { label: "Pending", accent: "cyan" },
  verified: { label: "Approved", accent: "mint" },
  invalidated: { label: "Needs attention", accent: "gold" },
  withdrawn: { label: "Withdrawn", accent: "slate" },
};

const formatDate = (value: string) => {
  const [year, month, day] = (value || "").slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) {
    return value || "—";
  }

  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// What the Status column sorts by. Not alphabetical: what needs the student's attention comes first.
const STATUS_RANK: Record<ServiceHourStatus, number> = { invalidated: 0, pending: 1, verified: 2, withdrawn: 3 };

// An entry with the values its columns sort by (useSortableData sorts on a plain key of each row).
type SortRow = {
  entry: ServiceHourItem;
  date: string;
  service: string;
  supports?: string;
  hours: number;
  statusRank: number;
};

const hoursLabel = (hours: number) => `${hours} hr${hours === 1 ? "" : "s"}`;

const initialValues = (entry: ServiceHourItem): Record<string, string> => ({
  organizationName: entry.hostName || "",
  contactPerson: entry.contactPerson || "",
  contactPhoneNumber: entry.contactPhone || "",
  contactEmail: entry.contactEmail || "",
  date: (entry.serviceDate || "").slice(0, 10),
  totalHours: String(entry.hours),
  type: entry.serviceType || "",
  description: entry.description || "",
  pathwayId: entry.pathwayId || "",
  categoryId: entry.categoryId || "",
  evidenceUrl: entry.evidenceUrl || "",
});

/**
 * A student's own service hours: totals, a status filter, and each entry with edit and withdraw.
 * @param props
 * @constructor
 */
export const ServiceHoursList = (props: ServiceHoursListProps) => {
  const [active, setActive] = React.useState<FilterLabel>("All");
  const [editing, setEditing] = React.useState<ServiceHourItem | undefined>(undefined);
  const editingPathwayId = editing && editing.pathwayId;

  // Editing an entry already linked to a pathway needs that pathway's categories to show it.
  React.useEffect(() => {
    if (editingPathwayId && props.onPathwayChange) {
      props.onPathwayChange(editingPathwayId);
    }
  }, [editingPathwayId]);

  // The total counts what the server counts: everything not withdrawn or invalidated.
  const sum = (status: ServiceHourStatus) =>
    props.entries.filter((e) => e.status === status).reduce((total, e) => total + e.hours, 0);
  const approved = sum("verified");
  const pending = sum("pending");

  const status = FILTER_STATUS[active];
  const visible = props.entries.filter((e) => !status || e.status === status);
  const needsAttention = props.entries.filter((e) => e.status === "invalidated").length;

  const rows: SortRow[] = React.useMemo(
    () =>
      visible.map((entry) => ({
        entry,
        date: (entry.serviceDate || "").slice(0, 10),
        service: entry.hostName || entry.serviceType,
        supports: entry.supports,
        hours: entry.hours,
        statusRank: STATUS_RANK[entry.status],
      })),
    [props.entries, active]
  );
  // Newest service date first, which is the order the server returns them in.
  const {
    items: sortedRows,
    requestSort,
    sortConfig,
  } = useSortableData<SortRow>(rows, { key: "date", direction: "desc" });

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex gap-2.5">
        <StatCell icon={IconClockHour4} value={approved + pending} label="Total hours" accent="cyan" />
        <StatCell icon={IconCircleCheck} value={approved} label="Approved" accent="mint" />
        <StatCell icon={IconHourglass} value={pending} label="Waiting for review" accent="gold" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-semibold text-slate-400">
          {props.entries.length} entr{props.entries.length === 1 ? "y" : "ies"}
          {needsAttention > 0 && ` · ${needsAttention} need${needsAttention === 1 ? "s" : ""} attention`}
        </div>
        <div className="grid grid-cols-4 gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {FILTERS.map((label) => (
            <Tab key={label} title={label} secondary active={active === label} onClick={() => setActive(label)} />
          ))}
        </div>
      </div>

      {props.loading && <p className="text-sm text-slate-400">Loading…</p>}

      {!props.loading && props.entries.length === 0 && (
        <p className="text-sm text-slate-400">You haven't logged any service hours yet.</p>
      )}

      {!props.loading && props.entries.length > 0 && visible.length === 0 && (
        <p className="text-sm text-slate-400">No service hours to display.</p>
      )}

      {!props.loading && visible.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-start gap-3 border-b border-slate-100 bg-slate-50/60 px-3.5 py-2">
            <SortableHeader label="Date" sortKey="date" sortConfig={sortConfig} onSort={requestSort} className="w-24 shrink-0" />
            <SortableHeader label="Service" sortKey="service" sortConfig={sortConfig} onSort={requestSort} className="min-w-0 flex-1" />
            <SortableHeader
              label="Supports"
              sortKey="supports"
              sortConfig={sortConfig}
              onSort={requestSort}
              className="hidden w-40 shrink-0 md:inline-flex"
            />
            <SortableHeader label="Hours" sortKey="hours" sortConfig={sortConfig} onSort={requestSort} align="right" className="w-14 shrink-0" />
            <SortableHeader
              label="Status"
              sortKey="statusRank"
              sortConfig={sortConfig}
              onSort={requestSort}
              align="right"
              className="w-36 shrink-0"
            />
          </div>
          {sortedRows.map(({ entry }) => (
            <ServiceHourRow
              key={entry.entryId}
              entry={entry}
              onEdit={props.onEdit ? () => setEditing(entry) : undefined}
              onWithdraw={props.onWithdraw}
            />
          ))}
        </div>
      )}

      {editing && (
        <Form
          title="Edit Service Entry"
          subtitle="Changing an entry sends it back to your educator for review."
          initialValues={initialValues(editing)}
          pathways={props.pathways}
          onPathwayChange={props.onPathwayChange}
          successTitle="Your changes are saved!"
          successMessage="If you changed anything, your educator will review it again."
          onSubmit={(responses) => (props.onEdit ? props.onEdit(editing, responses) : Promise.resolve())}
          onClose={() => setEditing(undefined)}
        />
      )}
    </div>
  );
};

const ServiceHourRow = (props: {
  entry: ServiceHourItem;
  onEdit?: () => void;
  onWithdraw?: (entry: ServiceHourItem) => Promise<any>;
}) => {
  const { entry } = props;
  const [confirming, setConfirming] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const mounted = React.useRef(true);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const { label, accent } = STATUS[entry.status];
  const editable = !entry.isLegacy && entry.status !== "withdrawn";
  // The server only accepts https links; check again before putting one in an href.
  const evidence = !!entry.evidenceUrl && entry.evidenceUrl.indexOf("https://") === 0 ? entry.evidenceUrl : "";

  const withdraw = () => {
    if (!props.onWithdraw) {
      return;
    }

    setBusy(true);
    const done = () => {
      if (mounted.current) {
        setBusy(false);
        setConfirming(false);
      }
    };
    props.onWithdraw(entry).then(done, done);
  };

  const actionClass = "text-sky-blue-400 hover:underline disabled:opacity-50";

  return (
    <div
      className={`flex items-start gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0 ${
        entry.status === "withdrawn" ? "opacity-60" : ""
      }`}
    >
      <div className="w-24 shrink-0 text-[11px] text-slate-400">{formatDate(entry.serviceDate)}</div>

      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-dark-blue-400">{entry.hostName || entry.serviceType}</div>
        {entry.hostName && <div className="text-[11px] text-slate-400">{entry.serviceType}</div>}
        {entry.description && (
          <div title={entry.description} className="mt-0.5 line-clamp-2 text-[11px] text-slate-400">
            {entry.description}
          </div>
        )}

        {entry.reviewNote && (
          <div className="mt-1.5 rounded-lg bg-gold-400/15 px-2.5 py-1.5 text-[11px] text-dark-blue-400">
            <span className="font-bold">
              {entry.status === "invalidated" ? "Your educator wrote: " : "Earlier note from your educator: "}
            </span>
            {entry.reviewNote}
          </div>
        )}

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold">
          {evidence && (
            <a href={evidence} target="_blank" rel="noopener noreferrer" className={actionClass}>
              View evidence ↗
            </a>
          )}
          {editable && props.onEdit && !confirming && (
            <button type="button" onClick={props.onEdit} className={actionClass}>
              Edit
            </button>
          )}
          {editable && props.onWithdraw && !confirming && (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="text-slate-400 hover:text-slate-600 hover:underline"
            >
              Withdraw
            </button>
          )}
          {confirming && (
            <>
              <span className="font-semibold text-slate-500">Withdraw this entry?</span>
              <button type="button" disabled={busy} onClick={withdraw} className="text-dark-blue-400 hover:underline disabled:opacity-50">
                {busy ? "Withdrawing…" : "Yes, withdraw"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => setConfirming(false)}
                className="text-slate-400 hover:underline disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div title={entry.supports} className="hidden w-40 shrink-0 text-[11px] text-slate-400 md:line-clamp-2">
        {entry.supports || "—"}
      </div>
      <div className="w-14 shrink-0 text-right text-xs font-semibold text-dark-blue-400">{hoursLabel(entry.hours)}</div>
      <div className="flex w-36 shrink-0 justify-end whitespace-nowrap">
        <Pill label={label} accent={accent} />
      </div>
    </div>
  );
};

type StatAccent = "cyan" | "mint" | "gold";

const STAT_ACCENT: Record<StatAccent, { chip: string; icon: string; card: string }> = {
  cyan: { chip: "bg-sky-blue-400/15", icon: "text-sky-blue-400", card: "border-sky-blue-400/20 shadow-[0_2px_12px_rgba(59,208,242,0.12)]" },
  mint: { chip: "bg-mint-400/15", icon: "text-mint-400", card: "border-mint-400/20 shadow-[0_2px_12px_rgba(30,226,175,0.12)]" },
  gold: { chip: "bg-gold-400/15", icon: "text-gold-400", card: "border-gold-400/20 shadow-[0_2px_12px_rgba(255,212,77,0.12)]" },
};

// Matches the stat tiles on File Locker and Home (same classes and spacing), taking a Tabler icon
// directly because StatTile's own icon prop is a fixed set of names with nothing suited to hours.
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
