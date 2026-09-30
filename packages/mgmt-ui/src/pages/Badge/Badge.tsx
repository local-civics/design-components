import {IconAlbum, IconCategory2} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {StudentStatusFilter, StudentStatusFilterBar, matchesStudentStatus} from "../../components/data/StudentStatusFilter/StudentStatusFilter";
import {PageHeader, PageHeaderBreadcrumbSegment} from "../../components/navigation/PageHeader/PageHeader";
import {SplitButton} from "./SplitButton";
import {Table, Item} from "./Table";
import {Table as LessonTable, Item as LessonItem} from "./LessonTable"
import {classOptionLabels} from "../../utils/classOptions";

/**
 * BadgeUserItem
 */
export type BadgeUserItem = Item

/**
 * BadgeStudentStatusFilter - an alias of the shared StudentStatusFilter, matching Lesson's.
 */
export type BadgeStudentStatusFilter = StudentStatusFilter

/**
 * BadgeClass
 */
export type BadgeClass = {
    classId: string
    name: string
    active: boolean
    // Used to tell apart classes that share a name in the class dropdown.
    description?: string
    numberOfStudents?: number
}

/**
 * BadgeProps
 */
export type BadgeProps = {
    loading: boolean
    // Distinct from `loading` - that flips false once displayName/description resolve, well before
    // the students/lessons fan-out this page's own export reads has finished. Gates the Export
    // button specifically, not the page's own loading overlay.
    exportDisabled?: boolean
    // True while that same second fetch runs - drives the pulse placeholders on the completion stat
    // and the lesson completion column, and the "By student" table's "Loading…" banner.
    activityLoading?: boolean
    displayName: string,
    description: string
    imageURL?: string
    weight?: number
    classes: BadgeClass[]
    lessons: LessonItem[]
    classId: string
    students: BadgeUserItem[]
    href: string
    trial?: boolean
    lessonsCompleted?: number
    pathwayId?: string
    breadcrumb?: PageHeaderBreadcrumbSegment[]
    // Forwarded into the "By student" tab's Table -> LessonStack - see Pathway.tsx's identical field.
    linkState?: any
    // Controlled, like Lesson's: the caller also uses this value to narrow the Prev/Next grading
    // queue for the "By student" rows. Defaults to "all" when omitted.
    statusFilter?: BadgeStudentStatusFilter
    onStatusFilterChange?: (filter: BadgeStudentStatusFilter) => void
    // Jumps to a student's own profile from the "By student" tab - see Pathway.tsx's identical field.
    onStudentClick?: (userId: string) => void
    // Which tab shows - controlled when given, see Pathway.tsx's identical field.
    tab?: string
    onTabChange?: (tab: string) => void

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
    // "View Files" - jumps straight to File Locker pre-filtered to this badge (an educator's most
    // likely reason to be looking at this page's roster in the first place: checking who has and
    // hasn't submitted files for it). Omitted entirely when the caller doesn't supply it.
    onFileLockerClick?: () => void;
}

// "By student" first - see Pathway.tsx's TABS.
const TABS = [
    {label: "By student", value: "students"},
    {label: "By lesson", value: "lessons"},
]

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
    const classLabels = classOptionLabels(props.classes || [])
    const [localTab, setLocalTab] = useState("students")
    const tab = TABS.some((t) => t.value === props.tab) ? props.tab as string : localTab
    const setTab = (next: string) => {
        setLocalTab(next)
        props.onTabChange && props.onTabChange(next)
    }
    const [search, setSearch] = useState("")
    const statusFilter = props.statusFilter || "all"
    const activityLoading = !!props.activityLoading

    const numberOfStudents = props.students.length
    const numberOfBadges = numberOfStudents > 0 ? props.students.filter(u => u.isComplete).length : 0
    // The completion stat above always counts the full roster; only the table below is narrowed.
    // Search is local (a "find this student" convenience) and doesn't shrink the grading queue.
    const searchLower = search.trim().toLowerCase()
    const visibleStudents = props.students.filter((s) =>
        matchesStudentStatus(s, statusFilter) && (!searchLower || (s.name || "").toLowerCase().includes(searchLower))
    )

    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <PageHeader
                icon={IconAlbum}
                iconAccent="mint"
                imageURL={props.imageURL}
                onBackClick={props.onBackClick}
                breadcrumb={props.breadcrumb}
                onSecondaryClick={props.onFileLockerClick}
                secondaryLabel="View Files"
                title={props.displayName || "Badge"}
                description={props.description}
                actions={!props.trial && (
                    <SplitButton
                        href={props.href}
                        exportDisabled={props.exportDisabled}
                        onCopyLinkClick={props.onCopyLinkClick}
                        onExportDataClick={props.onExportDataClick}
                    />
                )}
            />

            <StatsGroup data={[
                {
                    title: props.trial ? "LESSONS SUBMITTED" : "BADGE COMPLETION",
                    value: props.trial ? props.lessonsCompleted || 0 : numberOfBadges,
                    loading: activityLoading,
                },
                {
                    title: "POINT VALUE",
                    value: props.weight || 0,
                },
            ]}/>

            {!props.trial && (
                <div className="relative w-full max-w-xs">
                    <IconCategory2 size={16} stroke={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                        value={props.classId}
                        onChange={(e) => props.onClassChange(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-dark-blue-400 focus:border-sky-blue-400 focus:outline-none"
                    >
                        <option value="">All classes</option>
                        {props.classes.map((c) => <option key={c.classId} value={c.classId}>{classLabels[c.classId] || c.name}</option>)}
                    </select>
                </div>
            )}

            <div className="flex flex-col gap-3">
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

                {(!!props.trial || tab === "lessons") && <LessonTable loading={props.loading} completionLoading={activityLoading} items={props.lessons} />}
                {(!props.trial && tab === "students") && (
                    <div className="flex flex-col gap-3">
                        <StudentStatusFilterBar
                            statusFilter={statusFilter}
                            onStatusFilterChange={props.onStatusFilterChange}
                            search={search}
                            onSearchChange={setSearch}
                        />
                        {props.students.length > 0 && visibleStudents.length === 0 ? (
                            <p className="px-4 text-sm text-slate-400">No students match this filter.</p>
                        ) : (
                            <Table loading={props.loading || activityLoading} items={visibleStudents} linkState={props.linkState} onStudentClick={props.onStudentClick} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
