import * as React from 'react';
import {IconBulb, IconTableExport} from '@tabler/icons';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
import {StudentNameCell} from "../../components/data/StudentNameCell/StudentNameCell";
import {useSortableData} from "../../utils/useSortableData";

/**
 * InterventionColumn. Rule-specific columns (the shared Student/Class/Grade columns are fixed).
 */
export type InterventionColumn = {
    key: string
    label: string
    numeric?: boolean
}

/**
 * InterventionRow. One student on one list; `values` is keyed by InterventionColumn.key.
 */
export type InterventionRow = {
    userId: string
    name: string
    email: string
    className: string
    grade: string
    // False for a roster entry that hasn't created an account yet.
    hasAccount?: boolean
    values: Record<string, string | number>
}

/**
 * InterventionList. One rule's cohort: who needs attention, why, and what the educator can do.
 */
export type InterventionList = {
    code: string
    title: string
    purpose: string
    action: string
    columns: InterventionColumn[]
    rows: InterventionRow[]
}

/**
 * InterventionsProps
 */
export type InterventionsProps = {
    // True while the students' activity is still loading, so an empty list isn't mistaken for a
    // list with nobody on it.
    loading: boolean
    interventions: InterventionList[]
    // Jumps to the student's own profile, matching the other "By student" tables.
    onStudentClick?: (userId: string) => void
    // Downloads one list as a CSV; hub builds the file from the same rows shown here.
    onExport?: (code: string) => void
}

// Free-text columns need room to wrap; numbers and short labels don't. Each width is paired with
// its pixel value so the table's minimum width is computed from the same numbers the Tailwind
// classes use (the classes must stay literal strings here for Tailwind to generate them).
const COL = {
    klass: {cls: "w-28", px: 112},
    grade: {cls: "w-14", px: 56},
    narrow: {cls: "w-28", px: 112},
    wide: {cls: "w-56", px: 224},
}
// Room the student name always keeps; below the total this implies, the table scrolls sideways
// instead of squeezing the name down to an ellipsis.
const NAME_MIN_PX = 176
const GAP_PX = 16
const ROW_PADDING_PX = 32

// Free text (a list of missing items, a category name) is wide; numbers and the short status
// label are not.
const isWide = (c: InterventionColumn) => !c.numeric && c.key !== "status"
const widthOf = (c: InterventionColumn) => (isWide(c) ? COL.wide : COL.narrow)

const formatValue = (value: string | number | undefined) => {
    if (value === undefined || value === "") return "-"
    if (typeof value === "number") return String(Math.round(value * 100) / 100)
    return value
}

// Values are flattened under a prefix so a rule's column key can never collide with a row field.
const valueKey = (key: string) => `v_${key}`

type ListProps = {
    list: InterventionList
    onStudentClick?: (userId: string) => void
}

function InterventionTable(props: ListProps) {
    const {list} = props
    const flat = React.useMemo(
        (): (InterventionRow & Record<string, any>)[] => list.rows.map((row) => ({
            ...row,
            ...Object.fromEntries(list.columns.map((c) => [valueKey(c.key), row.values[c.key]])),
        })),
        [list]
    )
    const {items, requestSort, sortConfig} = useSortableData(flat)

    const columnCount = 3 + list.columns.length
    const minWidth = NAME_MIN_PX + COL.klass.px + COL.grade.px
        + list.columns.reduce((sum, c) => sum + widthOf(c).px, 0)
        + GAP_PX * (columnCount - 1) + ROW_PADDING_PX

    return (
        <div className="overflow-x-auto pb-1">
        <div className="flex flex-col gap-3" style={{minWidth}}>
            <div className="flex items-center gap-4 px-4">
                <SortableHeader label="Student Name" sortKey="name" sortConfig={sortConfig} onSort={requestSort} className="flex-1" />
                <SortableHeader label="Class" sortKey="className" sortConfig={sortConfig} onSort={requestSort} className={`${COL.klass.cls} shrink-0`} />
                <SortableHeader label="Grade" sortKey="grade" sortConfig={sortConfig} onSort={requestSort} align="center" className={`${COL.grade.cls} shrink-0`} />
                {list.columns.map((c) => (
                    <SortableHeader
                        key={c.key}
                        label={c.label}
                        sortKey={valueKey(c.key)}
                        sortConfig={sortConfig}
                        onSort={requestSort}
                        align={c.numeric ? "center" : undefined}
                        className={`${widthOf(c).cls} shrink-0`}
                    />
                ))}
            </div>

            {items.map((row) => (
                <div key={row.userId} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <StudentNameCell userId={row.userId} name={row.name} email={row.email} onStudentClick={props.onStudentClick} />
                    <div className={`${COL.klass.cls} shrink-0`}>
                        <div className="truncate text-xs text-slate-600" title={row.className}>{row.className || "-"}</div>
                        {row.hasAccount === false && (
                            <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">No account</span>
                        )}
                    </div>
                    <div className={`${COL.grade.cls} shrink-0 text-center text-xs text-slate-600`}>{row.grade || "-"}</div>
                    {list.columns.map((c) => (
                        <div
                            key={c.key}
                            className={`${widthOf(c).cls} ${isWide(c) ? "text-left" : "text-center"} shrink-0 text-xs font-bold text-dark-blue-400`}
                        >
                            {formatValue(row[valueKey(c.key)])}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </div>
    )
}

/**
 * Interventions. The "Interventions" tab on the Pathway Overview: one pill per applicable rule
 * with its student count, then the selected rule's purpose, suggested action and list. View and
 * export only - nothing here is stored, so a student drops off a list as soon as the data changes.
 * @param props
 * @constructor
 */
export function Interventions(props: InterventionsProps) {
    const lists = props.interventions || []
    const [selected, setSelected] = React.useState<string | undefined>(undefined)
    // Opens on the first list with someone on it; otherwise the first list.
    const active = lists.find((l) => l.code === selected)
        || lists.find((l) => l.rows.length > 0)
        || lists[0]

    if (props.loading) {
        return <PlaceholderBanner loading icon="groups" />
    }

    if (!active) {
        return <PlaceholderBanner
            loading={false}
            title="No intervention lists for this pathway"
            description="Lists appear once the pathway has criteria, or its categories are tagged for them."
            icon="thinking"
        />
    }

    const pillClass = (isActive: boolean) =>
        `flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${
            isActive
                ? "border-sky-blue-400/40 bg-sky-blue-400/20 text-dark-blue-400"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        }`

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
                {lists.map((l) => (
                    <button key={l.code} type="button" onClick={() => setSelected(l.code)} className={pillClass(l.code === active.code)}>
                        <span>{l.title}</span>
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${l.rows.length ? "bg-gold-400/30 text-dark-blue-400" : "bg-slate-100 text-slate-400"}`}>
                            {l.rows.length}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="text-sm font-extrabold text-dark-blue-400">{active.title}</div>
                    <p className="text-xs text-slate-600">{active.purpose}</p>
                    <div className="flex items-start gap-2 rounded-lg bg-gold-400/10 px-3 py-2 text-xs text-dark-blue-400">
                        <IconBulb size={15} stroke={2} className="mt-px shrink-0" />
                        <span><span className="font-bold">Suggested action: </span>{active.action}</span>
                    </div>
                </div>
                {props.onExport && (
                    <button
                        type="button"
                        onClick={() => props.onExport!(active.code)}
                        disabled={active.rows.length === 0}
                        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3.5 py-2 text-xs font-bold text-dark-blue-400 shadow-[0_3px_12px_rgba(255,212,77,0.35)] disabled:cursor-not-allowed disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    >
                        <IconTableExport size={13} stroke={2} />
                        Export list (.csv)
                    </button>
                )}
            </div>

            {active.rows.length === 0
                ? <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-xs text-slate-500">
                    No students are on this list right now.
                </div>
                // Keyed by code so switching lists resets the sort to that list's own columns.
                : <InterventionTable key={active.code} list={active} onStudentClick={props.onStudentClick} />
            }
        </div>
    )
}
