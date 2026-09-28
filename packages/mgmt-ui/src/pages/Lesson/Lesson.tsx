import {IconCategory2} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {StudentStatusFilter, StudentStatusFilterBar, matchesStudentStatus} from "../../components/data/StudentStatusFilter/StudentStatusFilter";
import {PageHeader, PageHeaderBreadcrumbSegment} from "../../components/navigation/PageHeader/PageHeader";
import {compact} from "../../utils/numbers";
import {SplitButton} from "./SplitButton";
import {Table, Item} from "./Table";
import {Stack as QuestionStack, Item as QuestionItem} from "./QuestionStack";
import {classOptionLabels} from "../../utils/classOptions";

/**
 * LessonUserItem
 */
export type LessonUserItem = Item

/**
 * LessonClass
 */
export type LessonClass = {
    classId: string
    name: string
    active: boolean
    // Used to tell apart classes that share a name in the class dropdown.
    description?: string
    numberOfStudents?: number
}

/**
 * LessonStudentStatusFilter - kept as an alias of the shared StudentStatusFilter, since hub
 * imports it by this name.
 */
export type LessonStudentStatusFilter = StudentStatusFilter

/**
 * LessonProps
 */
export type LessonProps = {
    loading: boolean
    // Distinct from `loading` - that flips false once displayName/description resolve, well before
    // the students/questions fan-out this page's own export reads has finished. Gates the Export
    // button specifically, not the page's own loading overlay.
    exportDisabled?: boolean
    // True while that same second fetch runs - drives the pulse placeholder on the completion stat
    // and the "Loading…" banners on both tabs, instead of showing 0 / "No students".
    activityLoading?: boolean
    displayName: string
    description: string
    href: string
    classId: string
    classes: LessonClass[]
    students: LessonUserItem[]
    questions: QuestionItem[],
    trial?: boolean
    lessonsCompleted?: number
    contributors?: {name: string}[]
    breadcrumb?: PageHeaderBreadcrumbSegment[]
    // Forwarded into the "By student" tab's Table -> AnswerStack - see Pathway.tsx's identical field.
    linkState?: any
    // Defaults to "all" if omitted. See LessonStudentStatusFilter's own doc comment for why this
    // is controlled rather than local component state.
    statusFilter?: LessonStudentStatusFilter
    onStatusFilterChange?: (filter: LessonStudentStatusFilter) => void
    // Jumps to a student's own profile from the "By student" tab - see Pathway.tsx's identical field.
    onStudentClick?: (userId: string) => void

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

const initialsFor = (name: string) => name.split(/[ -]/).map((n) => n.charAt(0)).join('').toUpperCase()

/**
 * Lesson
 * @param props
 * @constructor
 */
export const Lesson = (props: LessonProps) => {
    const classLabels = classOptionLabels(props.classes || [])
    // null until the educator picks a tab. Until then, open on "By question" only when there's a
    // multiple-choice chart to show; most lessons are file uploads, where that tab is just an
    // empty placeholder. Deriving it on each render (rather than seeding state once) follows the
    // questions when they arrive after the first render.
    const [pickedTab, setTab] = useState<string | null>(null)
    const tab = pickedTab ?? ((props.questions || []).some((q) => q.chart) ? "question" : "students")
    const [search, setSearch] = useState("")
    const statusFilter = props.statusFilter || "all"

    // Stats/contributors below are always computed from the full, unfiltered roster - filtering
    // here only ever narrows what the "By student" table shows, never the aggregate numbers, so
    // browsing with a filter active doesn't make the completion stat look wrong.
    const numberOfStudents = props.students.length
    const numberOfLessons = numberOfStudents > 0 ? props.students.filter(u => u.isComplete).length : 0
    const contributors = props.contributors || []
    const visibleContributors = contributors.slice(0, 5)
    const remainingContributors = contributors.slice(5).length

    // Search is deliberately local/uncontrolled, unlike statusFilter above - it's a "find this
    // student in a long roster" convenience, not something that should also shrink the Prev/Next
    // grading queue (searching "Jane" to jump to her row shouldn't leave you stepping through only
    // other Janes afterward).
    const searchLower = search.trim().toLowerCase()
    const visibleStudents = props.students.filter((s) =>
        matchesStudentStatus(s, statusFilter) && (!searchLower || (s.name || "").toLowerCase().includes(searchLower))
    )
    const activityLoading = !!props.activityLoading

    // Trial and non-trial modes always showed the same 2 tabs here - "By reflection" was the only
    // one ever dropped for trial, and it no longer exists at all (reflection/rating now render
    // inline on each student's own row, see Table.tsx/AnswerStack.tsx), so there's nothing left to
    // vary by mode.
    const tabs = [
        {label: "By question", value: "question"},
        {label: "By student", value: "students"},
    ]

    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <PageHeader
                onBackClick={props.onBackClick}
                breadcrumb={props.breadcrumb}
                title={props.displayName || "Lesson"}
                description={props.description}
                actions={
                    <SplitButton
                        href={props.href}
                        noExport={props.trial}
                        exportDisabled={props.exportDisabled}
                        onCopyLinkClick={props.onCopyLinkClick}
                        onExportDataClick={props.onExportDataClick}
                    />
                }
            />

            <StatsGroup data={[
                {
                    title: props.trial ? "# OF SUBMISSIONS" : "LESSON COMPLETION",
                    value: props.trial ? props.lessonsCompleted || 0 : numberOfLessons,
                    loading: activityLoading,
                },
            ]}/>

            {contributors.length > 0 && (
                <div className="flex">
                    {visibleContributors.map((u, i) => (
                        <div
                            key={i}
                            className="-ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-mint-400/20 text-[10px] font-bold text-dark-blue-400 first:ml-0"
                        >
                            {initialsFor(u.name)}
                        </div>
                    ))}
                    {remainingContributors > 0 && (
                        <div className="-ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-bold text-slate-600">
                            +{compact(remainingContributors)}
                        </div>
                    )}
                </div>
            )}

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
                <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
                    {tabs.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => setTab(t.value)}
                            className={`rounded-lg px-4 py-2 text-xs font-bold ${tab === t.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {tab === "question" && <QuestionStack loading={props.loading || activityLoading} items={props.questions} />}
                {tab === "students" && (
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
