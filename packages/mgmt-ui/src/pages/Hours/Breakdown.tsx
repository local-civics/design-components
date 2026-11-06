import * as React from 'react';
import {IconChevronDown, IconChevronRight} from "@tabler/icons";
import {Item} from "./shared";

/**
 * BreakdownRow. Hours of one kind (a type, a pathway, or one requirement of a pathway) for one student.
 */
export type BreakdownRow = {
    key: string
    label: string
    approved: number
    pending: number
}

/**
 * PathwayRow. A pathway's hours, with the requirements they were linked to underneath.
 */
export type PathwayRow = BreakdownRow & {requirements: BreakdownRow[]}

const NO_REQUIREMENT = "none"

const byWeight = (a: BreakdownRow, b: BreakdownRow) =>
    (b.approved - a.approved) || (b.pending - a.pending) || a.label.localeCompare(b.label)

// Biggest first, but a catch-all ("no specific requirement") always last.
const byWeightCatchAllLast = (a: BreakdownRow, b: BreakdownRow) => {
    if (a.key === NO_REQUIREMENT || b.key === NO_REQUIREMENT) {
        return a.key === NO_REQUIREMENT ? 1 : -1
    }

    return byWeight(a, b)
}

const add = (rows: Record<string, BreakdownRow>, key: string, label: string, item: Item) => {
    const row = rows[key] || (rows[key] = {key, label, approved: 0, pending: 0})
    if (item.status === "verified") {
        row.approved += item.hours
    } else {
        row.pending += item.hours
    }

    return row
}

/**
 * summarize. One student's hours totalled by type, and by pathway with each pathway's requirements.
 * Only approved and pending hours count: invalidated and withdrawn entries are not part of the total.
 */
export const summarize = (items: Item[]) => {
    const types: Record<string, BreakdownRow> = {}
    const pathways: Record<string, PathwayRow & {byRequirement: Record<string, BreakdownRow>}> = {}
    const unlinked: BreakdownRow = {key: "unlinked", label: "Not linked to a pathway", approved: 0, pending: 0}

    items.forEach((item) => {
        if (item.status !== "verified" && item.status !== "pending") {
            return
        }

        const type = item.activityType || "Other"
        add(types, type, type, item)

        if (!item.pathwayId) {
            add({unlinked}, "unlinked", unlinked.label, item)
            return
        }

        // Older callers pass only the joined "Pathway · Requirement" text.
        const parts = (item.supports || "").split(" · ")
        const pathwayLabel = item.pathwayTitle || parts[0] || "Pathway"
        const requirementLabel = item.categoryName || parts.slice(1).join(" · ") || "Requirement"

        const pathway = pathways[item.pathwayId] || (pathways[item.pathwayId] = {
            key: item.pathwayId,
            label: pathwayLabel,
            approved: 0,
            pending: 0,
            requirements: [],
            byRequirement: {},
        })
        if (item.status === "verified") {
            pathway.approved += item.hours
        } else {
            pathway.pending += item.hours
        }

        add(
            pathway.byRequirement,
            item.categoryId || NO_REQUIREMENT,
            item.categoryId ? requirementLabel : "No specific requirement",
            item
        )
    })

    const byPathway: PathwayRow[] = Object.keys(pathways).map((k) => {
        const {byRequirement, ...pathway} = pathways[k]
        return {...pathway, requirements: Object.keys(byRequirement).map((r) => byRequirement[r]).sort(byWeightCatchAllLast)}
    }).sort(byWeight)

    return {
        byType: Object.keys(types).map((k) => types[k]).sort(byWeight),
        byPathway,
        unlinked: unlinked.approved + unlinked.pending > 0 ? unlinked : undefined,
    }
}

const hrs = (n: number) => `${n} hr${n === 1 ? "" : "s"}`

const total = (row: BreakdownRow) => row.approved + row.pending

const labelClass = "text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400"

const Metrics = (props: {row: BreakdownRow}) => (
    <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-dark-blue-400">
        {hrs(props.row.approved)}
        {props.row.pending > 0 && (
            <span className="ml-1.5 rounded-full bg-gold-400/15 px-1.5 py-0.5 text-[10px] font-bold">+{props.row.pending} pending</span>
        )}
    </span>
)

// Bars are drawn against `max`, so a small row still reads as small.
const Bar = (props: {row: BreakdownRow, max: number, thin?: boolean}) => (
    <div className={`mt-1 flex overflow-hidden rounded-full bg-slate-100 ${props.thin ? "h-1" : "h-1.5"}`}>
        <div className="bg-mint-400" style={{width: `${(props.row.approved / props.max) * 100}%`}} />
        <div className="bg-gold-400/60" style={{width: `${(props.row.pending / props.max) * 100}%`}} />
    </div>
)

const Row = (props: {row: BreakdownRow, max: number, small?: boolean}) => (
    <div>
        <div className="flex items-baseline justify-between gap-3">
            <span
                title={props.row.label}
                className={`min-w-0 truncate font-bold ${props.small ? "text-[11px] text-slate-600" : "text-xs text-dark-blue-400"}`}
            >
                {props.row.label}
            </span>
            <Metrics row={props.row} />
        </div>
        <Bar row={props.row} max={props.max} thin={props.small} />
    </div>
)

const Section = (props: {title: string, children: React.ReactNode}) => (
    <div className="min-w-0">
        <div className={labelClass}>{props.title}</div>
        <div className="mt-2 flex flex-col gap-2.5">{props.children}</div>
    </div>
)

// One pathway: its total and bar, opening to the requirements its hours were linked to.
const PathwayGroup = (props: {row: PathwayRow, max: number}) => {
    const [open, setOpen] = React.useState(false)
    const {row} = props
    // Hours linked to a pathway but not to a requirement have nothing to open into.
    const expandable = row.requirements.some((r) => r.key !== NO_REQUIREMENT)
    const count = row.requirements.filter((r) => r.key !== NO_REQUIREMENT).length
    const childMax = total(row) || 1

    if (!expandable) {
        return <Row row={row} max={props.max} />
    }

    return (
        <div>
            <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="block w-full text-left">
                <div className="flex items-baseline justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-1 text-xs font-bold text-dark-blue-400">
                        {open
                            ? <IconChevronDown size={13} stroke={2} className="shrink-0 self-center text-slate-400" />
                            : <IconChevronRight size={13} stroke={2} className="shrink-0 self-center text-slate-400" />}
                        <span title={row.label} className="truncate">{row.label}</span>
                        <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                            {count} requirement{count === 1 ? "" : "s"}
                        </span>
                    </span>
                    <Metrics row={row} />
                </div>
                <Bar row={row} max={props.max} />
            </button>
            {open && (
                <div className="ml-1.5 mt-2 flex flex-col gap-2 border-l-2 border-slate-100 pl-3">
                    {row.requirements.map((requirement) => (
                        <Row key={requirement.key} row={requirement} max={childMax} small />
                    ))}
                </div>
            )}
        </div>
    )
}

/**
 * Breakdown. A student's approved and pending hours by type and by pathway (each pathway opens to its
 * requirements). Shows nothing until there is something to total.
 * @param props
 * @constructor
 */
export const Breakdown = (props: {items: Item[]}) => {
    const {byType, byPathway, unlinked} = React.useMemo(() => summarize(props.items), [props.items])
    if (byType.length === 0) {
        return null
    }

    const typeMax = byType.reduce((m, r) => Math.max(m, total(r)), 0) || 1
    const pathwayMax = [...byPathway, ...(unlinked ? [unlinked] : [])].reduce((m, r) => Math.max(m, total(r)), 0) || 1

    return (
        <div className="grid gap-6 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:grid-cols-2">
            <Section title="By type">
                {byType.map((row) => <Row key={row.key} row={row} max={typeMax} />)}
            </Section>
            <Section title="By pathway">
                {byPathway.map((row) => <PathwayGroup key={row.key} row={row} max={pathwayMax} />)}
                {unlinked && <Row row={unlinked} max={pathwayMax} />}
            </Section>
        </div>
    )
}
