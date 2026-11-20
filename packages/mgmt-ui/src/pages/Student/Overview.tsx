import * as React from 'react';
import {IconCheck, IconChevronRight} from "@tabler/icons";
import {Item as HourItem} from "../Hours/shared";
import {
    ActivityBadge, ActivityItem, ActivityKind, ActivityLesson, AttentionAction, AttentionItem, OverviewPathway, OverviewStatus,
    attentionItems, formatPoints, lastActivityAt, pathwayCategories, pathwayStatus, percentOf, recentActivity,
} from "./overviewRules";

/**
 * OverviewProps. Everything on this tab is worked out from data the Student page already has, plus the
 * pathways the student has touched (see overviewRules.ts for the rules).
 */
export type OverviewProps = {
    // The pathways are still being fetched; the rest of the tab is already known.
    loading: boolean
    pathways: OverviewPathway[]
    badges: ActivityBadge[]
    lessons: ActivityLesson[]
    hours?: HourItem[]
    // The moment "no activity in N days" is measured from. Defaults to now; tests and stories pin it.
    now?: Date
    onViewPathway?: (pathwayId: string) => void
    // Goes to the Hours tab, where entries are approved.
    onOpenHours?: () => void
}

const STATUS_PILL: Record<OverviewStatus, string> = {
    "Completed": "bg-mint-100 text-dark-blue-400",
    "In progress": "bg-sky-blue-400/15 text-dark-blue-400",
    "Not started": "bg-slate-100 text-slate-500",
}

const KIND_DOT: Record<ActivityKind, string> = {
    badge: "bg-mint-400",
    lesson: "bg-sky-blue-400",
    hours: "bg-gold-400",
}

const LABEL_CLASS = "text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400"

const shortDate = (value: string) => {
    const d = new Date(value)
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, {month: "short", day: "numeric"})
}

const Bar = (props: { percent: number, met?: boolean }) => (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div className={`h-full ${props.met ? "bg-mint-400" : "bg-sky-blue-400"}`} style={{width: `${props.percent}%`}} />
    </div>
)

const PathwayCard = (props: { pathway: OverviewPathway, onViewPathway?: (pathwayId: string) => void }) => {
    const p = props.pathway
    const status = pathwayStatus(p)
    const rows = pathwayCategories(p)
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-extrabold text-dark-blue-400">{p.title}</h3>
                    <div className="mt-1 text-xs text-slate-500">
                        {p.badgesTotal > 0 ? `${p.badgesCompleted} of ${p.badgesTotal} badges complete` : "No badges in this pathway yet"}
                    </div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_PILL[status]}`}>{status}</span>
            </div>

            {rows.length > 0 && (
                <div className="mt-4 flex flex-col gap-3.5">
                    {rows.map((c) => (
                        <div key={c.categoryId}>
                            <div className="flex items-baseline justify-between gap-3">
                                <div className={`truncate text-xs ${c.isTotal ? "font-extrabold" : "font-bold"} text-dark-blue-400`}>{c.name}</div>
                                <div className="shrink-0 text-xs font-bold text-slate-500">
                                    {formatPoints(c.earned)} / {formatPoints(c.required)}
                                    {c.met && <IconCheck size={13} stroke={3} className="ml-1 inline text-mint-400" />}
                                </div>
                            </div>
                            <div className="mt-1.5"><Bar percent={percentOf(c.earned, c.required)} met={c.met} /></div>
                        </div>
                    ))}
                </div>
            )}

            {props.onViewPathway && (
                <button
                    type="button"
                    onClick={() => props.onViewPathway!(p.pathwayId)}
                    className="mt-5 text-xs font-bold text-dark-blue-400 hover:underline"
                >
                    View transcript →
                </button>
            )}
        </section>
    )
}

const Skeleton = () => (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-hidden="true">
        <div className="h-4 w-1/2 rounded bg-slate-100" />
        <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
        <div className="mt-5 h-2 w-full rounded-full bg-slate-100" />
        <div className="mt-4 h-2 w-full rounded-full bg-slate-100" />
    </div>
)

const AttentionRow = (props: { item: AttentionItem, onAction: (action: AttentionAction) => void, canAct: boolean }) => {
    const {item} = props
    const warn = item.tone === "warn"
    const body = (
        <>
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${warn ? "bg-gold-400" : "bg-slate-400"}`} />
            <div className="min-w-0 flex-1 text-left">
                <div className="text-xs font-bold text-dark-blue-400">{item.title}</div>
                {item.detail && <div className="mt-0.5 text-[11px] text-slate-500">{item.detail}</div>}
            </div>
        </>
    )
    const className = `flex items-start gap-2.5 rounded-lg border px-3.5 py-3 ${warn ? "border-gold-400/50 bg-gold-100/60" : "border-slate-200 bg-slate-50"}`
    if (item.action && props.canAct) {
        return (
            <button type="button" onClick={() => props.onAction(item.action!)} className={`${className} w-full hover:brightness-[0.98]`}>
                {body}
                <IconChevronRight size={16} className="mt-0.5 shrink-0 text-slate-400" />
            </button>
        )
    }

    return <div className={className}>{body}</div>
}

const Timeline = (props: { items: ActivityItem[] }) => (
    <ol className="flex flex-col">
        {props.items.map((item, i) => (
            <li key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${KIND_DOT[item.kind]}`} />
                    {i < props.items.length - 1 && <span className="mt-1 w-px flex-1 bg-slate-200" />}
                </div>
                <div className={`min-w-0 flex-1 ${i < props.items.length - 1 ? "pb-4" : ""}`}>
                    <div className="flex items-baseline justify-between gap-3">
                        <div className="text-xs font-bold text-dark-blue-400">{item.title}</div>
                        <div className="shrink-0 text-[11px] font-bold text-slate-400">{shortDate(item.at)}</div>
                    </div>
                    {item.detail && <div className="mt-0.5 text-[11px] text-slate-500">{item.detail}</div>}
                </div>
            </li>
        ))}
    </ol>
)

/**
 * Overview. A student's pathways at a glance, what needs the educator's attention, and what the student has
 * done lately. Everything here is read-only; acting on an item (approving hours) happens on its own tab.
 * @param props
 * @constructor
 */
export const Overview = (props: OverviewProps) => {
    const now = props.now || new Date()
    const activity = recentActivity({badges: props.badges, lessons: props.lessons, hours: props.hours}, Number.MAX_SAFE_INTEGER)
    const attention = attentionItems({pathways: props.pathways, hours: props.hours, lastActivity: lastActivityAt(activity), now})
    const onAction = (action: AttentionAction) => {
        if (action.type === "hours") props.onOpenHours?.()
        if (action.type === "pathway") props.onViewPathway?.(action.pathwayId)
    }

    return (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="flex min-w-0 flex-col gap-5">
                {props.loading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : props.pathways.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
                        No pathway activity yet. A pathway appears here once the student starts one of its badges or lessons.
                    </div>
                ) : (
                    props.pathways.map((p) => <PathwayCard key={p.pathwayId} pathway={p} onViewPathway={props.onViewPathway} />)
                )}
            </div>

            <div className="flex min-w-0 flex-col gap-5">
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className={LABEL_CLASS}>Needs your attention</h3>
                    <div className="mt-3 flex flex-col gap-2.5">
                        {attention.length === 0 ? (
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <IconCheck size={14} stroke={3} className="text-mint-400" />
                                Nothing needs attention right now.
                            </div>
                        ) : attention.map((item) => (
                            <AttentionRow
                                key={item.id}
                                item={item}
                                onAction={onAction}
                                canAct={item.action?.type === "hours" ? !!props.onOpenHours : !!props.onViewPathway}
                            />
                        ))}
                    </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className={LABEL_CLASS}>Recent activity</h3>
                    <div className="mt-3">
                        {activity.length === 0
                            ? <div className="text-xs text-slate-500">No activity yet.</div>
                            : <Timeline items={activity.slice(0, 6)} />}
                    </div>
                </section>
            </div>
        </div>
    )
}
