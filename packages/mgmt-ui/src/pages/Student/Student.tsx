import {useMemo, useState} from "react";
import * as React      from "react";
import {StatsGroup}                                                       from "../../components/data/StatsGroup/StatsGroup";
import {PageHeader}                                                       from "../../components/navigation/PageHeader/PageHeader";
import {PathwayFilterPills}                                               from "../../components/navigation/PathwayFilterPills/PathwayFilterPills";
import {Table as BadgeTable, Item as BadgeItem}                           from "./BadgeTable"
import {Table as AnswerTable, Item as AnswerItem} from "./AnswerTable"
import {Table as ReflectionTable, Item as ReflectionItem} from "./ReflectionTable"

/**
 * StudentProps
 */
export type StudentProps = {
    loading: boolean
    name: string
    impactStatement: string
    numberOfProblemsSolved: number
    percentageOfLessonsCompleted: number
    numberOfLessonsCompleted: number
    badges: BadgeItem[],
    lessons: LessonItem[],
    answers: AnswerItem[],
    reflections: ReflectionItem[],

    onBackClick: () => void
    // "View Files" - jumps straight to File Locker's "By student" tab, opened directly on this
    // student's full submission view (the quick, comprehensive-view use case this page exists
    // for). Omitted entirely when the caller doesn't supply it.
    onFileLockerClick?: () => void
    // Jumps to this student's pathway-scoped transcript. A separate, contextual link rather than
    // the pill's own onClick - matching the established rule already shipped on Badges/Lessons
    // list pages: a pathway pill filters, it never also navigates. Omitted entirely when the
    // caller doesn't supply it, or when no specific pathway is currently selected.
    onViewPathway?: (pathwayId: string) => void
}
type LessonItem = {
    lessonId: string
    lessonName: string
    isComplete: boolean
}
const TABS = [
    {label: "My badges", value: "badges"},
    {label: "My answers", value: "answers"},
    {label: "My reflections", value: "reflections"},
]

// Sentinel for "items with no pathway at all" - distinct from "" (All), which PathwayFilterPills
// already owns as its own convention.
const OTHER_FILTER = "__other__"

export const Student = (props: StudentProps) => {
    const [tab, setTab] = useState("badges")
    // One filter shared across all 3 tabs, not three independent per-tab filters - these tabs read
    // as one "this student's stuff in Pathway X" view, and a per-tab filter would silently reset
    // every time an educator switches tabs.
    const [pathwayFilter, setPathwayFilter] = useState("")
    const numberOfBadgesCompleted = props.badges.length > 0 ? props.badges.filter(b => b.isComplete).length : 0
    const numberOfLessonsCompleted = props.lessons.filter(l => l.isComplete).length

    const activeItems: {pathwayId?: string, pathwayName?: string}[] =
        tab === "badges" ? props.badges : tab === "answers" ? props.answers : props.reflections

    const pathways = useMemo(() => {
        const seen: Record<string, string> = {}
        activeItems.forEach((item) => {
            if (item.pathwayId && item.pathwayName && !(item.pathwayId in seen)) {
                seen[item.pathwayId] = item.pathwayName
            }
        })
        return Object.keys(seen).map((pathwayId) => ({pathwayId, title: seen[pathwayId]}))
    }, [activeItems])

    const hasOther = activeItems.some((item) => !item.pathwayId)

    const filterByPathway = <T extends {pathwayId?: string}>(items: T[]): T[] => {
        if (!pathwayFilter) return items
        if (pathwayFilter === OTHER_FILTER) return items.filter((item) => !item.pathwayId)
        return items.filter((item) => item.pathwayId === pathwayFilter)
    }

    const activePathwayName = pathwayFilter && pathwayFilter !== OTHER_FILTER
        ? pathways.find((p) => p.pathwayId === pathwayFilter)?.title
        : undefined

    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <PageHeader
                onBackClick={props.onBackClick}
                onSecondaryClick={props.onFileLockerClick}
                secondaryLabel="View Files"
                title={props.name || "Student"}
                description={props.impactStatement}
            />

            <StatsGroup data={[
                {
                    title: "PROBLEMS SOLVED",
                    value: props.numberOfProblemsSolved,
                },
                {
                    title: "LESSON COMPLETION",
                    value: numberOfLessonsCompleted,
                },
                {
                    title: "BADGE COMPLETION",
                    value: numberOfBadgesCompleted,
                },
            ]}/>

            <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
                {TABS.map((t) => (
                    <button
                        key={t.value}
                        onClick={() => setTab(t.value)}
                        className={`rounded-lg px-4 py-2 text-xs font-bold ${tab === t.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Only rendered once there's an actual pathway to partition by - if nothing in this
                tab belongs to any named pathway, an "Other"-only filter would just re-show the
                same items with no real distinction, so the whole row is suppressed instead. */}
            {pathways.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                    <PathwayFilterPills pathways={pathways} selected={pathwayFilter} onChange={setPathwayFilter} />
                    {hasOther && (
                        <button
                            type="button"
                            onClick={() => setPathwayFilter(OTHER_FILTER)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${
                                pathwayFilter === OTHER_FILTER
                                    ? "border-sky-blue-400/40 bg-sky-blue-400/20 text-dark-blue-400"
                                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                            }`}
                        >
                            Other
                        </button>
                    )}
                    {activePathwayName && props.onViewPathway && (
                        <button
                            type="button"
                            onClick={() => props.onViewPathway!(pathwayFilter)}
                            className="text-xs font-bold text-dark-blue-400 hover:underline"
                        >
                            View {activePathwayName} Transcript →
                        </button>
                    )}
                </div>
            )}

            {tab === "badges" && <BadgeTable loading={props.loading} items={filterByPathway(props.badges)} />}
            {tab === "answers" && <AnswerTable loading={props.loading} items={filterByPathway(props.answers)} />}
            {tab === "reflections" && <ReflectionTable loading={props.loading} items={filterByPathway(props.reflections)} />}
        </div>
    )
}
