import * as React from 'react';
import {IconChevronDown, IconChevronLeft} from "@tabler/icons";
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {SplitButton} from "./SplitButton";
import {Table, Item} from "./Table";
import {SubmissionDetail} from "./SubmissionDetail";
import {useFilteredStudents} from "./useFilteredStudents"

/**
 * FileLockerUserItem
 */
export type FileLockerUserItem = Item

/**
 * FileLockerClass
 */
export type FileLockerClass = {
    classId: string
    name: string
    active: boolean
}

/**
 * FileLockerProps
 */
export type FileLockerProps = {
    loading: boolean
    displayName: string,
    description: string
    classes: FileLockerClass[]
    lessons: {lessonId: string, lessonName: string}[]
    classId: string
    students: FileLockerUserItem[]
    href: string
    trial?: boolean
    lessonsCompleted?: number
    pathways?: {
        pathwayId: string
        title: string
        description: string
    }[]

    badges?: {
        badgeId: string
        displayName: string
        categories?: string[]
        // Already present on every badge returned by getFileLocker() - just wasn't declared here
        // before. No new API call, no hub change: needed client-side to resolve a lesson's badge
        // (and from there, its pathway) for the group-card breadcrumbs below.
        lessonIds?: string[]
    }[]

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

type Reviewing = {
    student: Item
    list: Item[]
    context?: string
}

const TABS: {value: string, label: string}[] = [
    {value: "students", label: "By student"},
    {value: "pathways", label: "By pathway"},
    {value: "badges", label: "By badge"},
    {value: "lessons", label: "By lesson"},
]

const countFiles = (students: Item[]) => students.reduce((acc, s) => acc + (s.submissions?.length || 0), 0)

/**
 * A group's expand/collapse card - shared visual treatment for the pathway/badge/lesson tabs, each
 * of which is a list of these wrapping a filtered Table of students.
 */
const GroupCard = (props: {title: string, description?: string, count: number, children: React.ReactNode}) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div onClick={() => setOpen(!open)} className="flex cursor-pointer items-center gap-3.5 p-4">
                <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold text-dark-blue-400">{props.title}</div>
                    {props.description && <div className="mt-1 text-xs leading-relaxed text-slate-500">{props.description}</div>}
                </div>
                <div className="shrink-0 rounded-full bg-mint-100 px-2.5 py-1 text-xs font-bold text-dark-blue-400">{props.count}</div>
                <IconChevronDown size={15} stroke={2.3} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}/>
            </div>
            {open && <div className="border-t border-slate-100 p-4">{props.children}</div>}
        </div>
    )
}

type GroupsProps = {
    students: Item[]
    loading: boolean
    onReview: (item: Item, list: Item[], context?: string) => void
}

/**
 * By Pathway: pathway is fixed (shown on the card), badge/lesson still vary per submission so both
 * stay visible in the nested table.
 */
const PathwayGroups = (props: GroupsProps & {pathways: NonNullable<FileLockerProps["pathways"]>, badges: NonNullable<FileLockerProps["badges"]>}) => {
    const {byPathway} = useFilteredStudents(props.students)
    return (
        <div className="flex flex-col gap-3">
            {props.pathways.map((p) => {
                const filtered = byPathway(p.pathwayId, props.badges)
                return (
                    <GroupCard key={p.pathwayId} title={p.title} description={p.description} count={countFiles(filtered)}>
                        <Table loading={props.loading} items={filtered} hidePathway onReview={(item) => props.onReview(item, filtered, p.title)}/>
                    </GroupCard>
                )
            })}
        </div>
    )
}

/**
 * By Badge: badge is fixed (card title) and its owning pathway is shown as a subtitle, so neither
 * needs to repeat in the nested table - only lesson still varies per submission.
 */
const BadgeGroups = (props: GroupsProps & {badges: NonNullable<FileLockerProps["badges"]>, pathwayNameForBadge: Record<string, string>}) => {
    const {byBadge} = useFilteredStudents(props.students)
    return (
        <div className="flex flex-col gap-3">
            {props.badges.map((b) => {
                const filtered = byBadge(b.badgeId)
                const pathwayTitle = props.pathwayNameForBadge[b.badgeId]
                return (
                    <GroupCard key={b.badgeId} title={b.displayName} description={pathwayTitle ? `${pathwayTitle} pathway` : undefined} count={countFiles(filtered)}>
                        <Table loading={props.loading} items={filtered} hideBadge hidePathway onReview={(item) => props.onReview(item, filtered, b.displayName)}/>
                    </GroupCard>
                )
            })}
        </div>
    )
}

/**
 * By Lesson: lesson is fixed (card title) and its owning badge + pathway are shown as a subtitle,
 * so all three are implied - only question still varies per submission.
 */
const LessonGroups = (props: GroupsProps & {lessons: FileLockerProps["lessons"], badgeForLesson: Record<string, {displayName: string, badgeId: string}>, pathwayNameForBadge: Record<string, string>}) => {
    const {byLesson} = useFilteredStudents(props.students)
    return (
        <div className="flex flex-col gap-3">
            {props.lessons.map((l) => {
                const filtered = byLesson(l.lessonName)
                const badge = props.badgeForLesson[l.lessonId]
                const pathwayTitle = badge ? props.pathwayNameForBadge[badge.badgeId] : undefined
                const description = badge
                    ? (pathwayTitle ? `${badge.displayName} · ${pathwayTitle} pathway` : badge.displayName)
                    : undefined
                return (
                    <GroupCard key={l.lessonId} title={l.lessonName} description={description} count={countFiles(filtered)}>
                        <Table loading={props.loading} items={filtered} hideBadge hideLesson hidePathway onReview={(item) => props.onReview(item, filtered, l.lessonName)}/>
                    </GroupCard>
                )
            })}
        </div>
    )
}

/**
 * FileLocker
 * @param props
 * @constructor
 */
export const FileLocker = (props: FileLockerProps) => {
    const [tab, setTab] = React.useState("students")
    const [reviewing, setReviewing] = React.useState<Reviewing | null>(null)

    const numberOfFiles = countFiles(props.students)

    const {thisWeek, thisMonth} = React.useMemo(() => {
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const fom = new Date(now.getFullYear(), now.getMonth(), 1)
        let week = 0, month = 0
        props.students.forEach((s) => {
            (s.submissions || []).forEach((sub) => {
                if (!sub.updatedAt) return
                const d = new Date(sub.updatedAt)
                if (d >= weekAgo) week += 1
                if (d >= fom) month += 1
            })
        })
        return {thisWeek: week, thisMonth: month}
    }, [props.students])

    // Pure client-side derivation over data already in props (same badge->pathway prefix-match
    // useOrganization.ts's own getPathway() uses) - zero new API calls, zero hub changes. Lets every
    // tab show a submission's full Pathway/Badge/Lesson context without repeating whatever the
    // current grouping already fixes.
    const pathwayNameForBadge = React.useMemo(() => {
        const map: Record<string, string> = {}
        ;(props.badges || []).forEach((b) => {
            if (!Array.isArray(b.categories)) return
            const pathway = (props.pathways || []).find((p) => b.categories!.some((c) => c.startsWith(p.pathwayId)))
            if (pathway) map[b.badgeId] = pathway.title
        })
        return map
    }, [props.badges, props.pathways])

    const badgeForLesson = React.useMemo(() => {
        const map: Record<string, {displayName: string, badgeId: string}> = {}
        ;(props.badges || []).forEach((b) => {
            if (!Array.isArray(b.lessonIds)) return
            b.lessonIds.forEach((lessonId) => {
                if (!(lessonId in map)) map[lessonId] = {displayName: b.displayName, badgeId: b.badgeId}
            })
        })
        return map
    }, [props.badges])

    const enrichedStudents = React.useMemo(() => {
        return props.students.map((s) => ({
            ...s,
            submissions: (s.submissions || []).map((sub) => ({...sub, pathwayName: pathwayNameForBadge[sub.badgeId] || ""})),
        }))
    }, [props.students, pathwayNameForBadge])

    const {byPathway} = useFilteredStudents(enrichedStudents)
    const mostActivePathway = React.useMemo(() => {
        return (props.pathways || []).reduce<{title: string, count: number} | null>((best, p) => {
            const count = countFiles(byPathway(p.pathwayId, props.badges || []))
            return count > 0 && (!best || count > best.count) ? {title: p.title, count} : best
        }, null)
    }, [props.pathways, props.badges, byPathway])

    const onReview = (item: Item, list: Item[], context?: string) => setReviewing({student: item, list, context})
    const onNav = (dir: 1 | -1) => {
        if (!reviewing) return
        const idx = reviewing.list.findIndex((s) => s.userId === reviewing.student.userId)
        if (idx === -1) return
        const next = reviewing.list[(idx + dir + reviewing.list.length) % reviewing.list.length]
        setReviewing({...reviewing, student: next})
    }

    if (reviewing) {
        return <SubmissionDetail
            student={reviewing.student}
            context={reviewing.context}
            onBack={() => setReviewing(null)}
            onNav={onNav}
        />
    }

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-4 py-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <button onClick={props.onBackClick} className="flex items-center gap-1 text-xs font-bold text-sky-blue-400 hover:underline">
                        <IconChevronLeft size={13} stroke={2.5}/>
                        Back
                    </button>
                    <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.displayName || "File Locker"}</h1>
                    <p className="mt-1 text-sm text-slate-500">{props.description || "No description"}</p>
                </div>
                {!props.trial && <SplitButton href={props.href} onCopyLinkClick={props.onCopyLinkClick} onExportDataClick={props.onExportDataClick}/>}
            </div>

            <StatsGroup data={props.trial ? [
                {title: "LESSONS SUBMITTED", value: props.lessonsCompleted || 0},
            ] : [
                {title: "FILES", value: numberOfFiles},
                {title: "THIS WEEK", value: thisWeek},
                {title: "THIS MONTH", value: thisMonth},
            ]}/>

            {!props.trial && mostActivePathway && (
                <div className="text-xs text-slate-500">
                    Most active pathway: <span className="font-bold text-dark-blue-400">{mostActivePathway.title}</span> ({mostActivePathway.count} submission{mostActivePathway.count === 1 ? "" : "s"})
                </div>
            )}

            {!props.trial && (
                <select
                    value={props.classId}
                    onChange={(e) => props.onClassChange(e.target.value)}
                    className="w-64 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"
                >
                    <option value="">Select a class</option>
                    {props.classes.map((g) => <option key={g.classId} value={g.classId}>{g.name}</option>)}
                </select>
            )}

            {!props.trial && (
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
            )}

            {!props.trial && tab === "students" && (
                <Table loading={props.loading} items={enrichedStudents} onReview={(item) => onReview(item, enrichedStudents)}/>
            )}
            {!props.trial && tab === "pathways" && (
                <PathwayGroups students={enrichedStudents} loading={props.loading} pathways={props.pathways || []} badges={props.badges || []} onReview={onReview}/>
            )}
            {!props.trial && tab === "badges" && (
                <BadgeGroups students={enrichedStudents} loading={props.loading} badges={props.badges || []} pathwayNameForBadge={pathwayNameForBadge} onReview={onReview}/>
            )}
            {!props.trial && tab === "lessons" && (
                <LessonGroups students={enrichedStudents} loading={props.loading} lessons={props.lessons} badgeForLesson={badgeForLesson} pathwayNameForBadge={pathwayNameForBadge} onReview={onReview}/>
            )}
        </div>
    )
}
