import {IconCategory2, IconSearch} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {PageHeader, PageHeaderBreadcrumbSegment} from "../../components/navigation/PageHeader/PageHeader";
import {compact} from "../../utils/numbers";
import {SplitButton} from "./SplitButton";
import {Table, Item} from "./Table";
import {Stack as QuestionStack, Item as QuestionItem} from "./QuestionStack";

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
}

/**
 * LessonStudentStatusFilter - "all" is the default. Controlled (not local) state, unlike the
 * name search below - the caller also uses this same value to decide who belongs in the
 * Prev/Next grading queue built for the "By student" tab's rows, so it has to live one level up
 * rather than being a purely presentational concern of this component.
 */
export type LessonStudentStatusFilter = "all" | "submitted" | "active" | "inactive"

/**
 * LessonProps
 */
export type LessonProps = {
    loading: boolean
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

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

const STATUS_FILTERS: {value: LessonStudentStatusFilter, label: string}[] = [
    {value: "all", label: "All"},
    {value: "submitted", label: "Submitted"},
    {value: "active", label: "Active"},
    {value: "inactive", label: "Inactive"},
]

const initialsFor = (name: string) => name.split(/[ -]/).map((n) => n.charAt(0)).join('').toUpperCase()

/**
 * Lesson
 * @param props
 * @constructor
 */
export const Lesson = (props: LessonProps) => {
    const [tab, setTab] = useState("question")
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
    const visibleStudents = props.students.filter((s) => {
        const matchesStatus =
            statusFilter === "all" ? true :
            statusFilter === "submitted" ? !!s.isComplete :
            statusFilter === "active" ? (!s.isComplete && !!s.isStarted) :
            (!s.isComplete && !s.isStarted)
        const matchesSearch = !searchLower || (s.name || "").toLowerCase().includes(searchLower)
        return matchesStatus && matchesSearch
    })

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
                        onCopyLinkClick={props.onCopyLinkClick}
                        onExportDataClick={props.onExportDataClick}
                    />
                }
            />

            <StatsGroup data={[
                {
                    title: props.trial ? "# OF SUBMISSIONS" : "LESSON COMPLETION",
                    value: props.trial ? props.lessonsCompleted || 0 : numberOfLessons,
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
                        {props.classes.map((c) => <option key={c.classId} value={c.classId}>{c.name}</option>)}
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

                {tab === "question" && <QuestionStack loading={props.loading} items={props.questions} />}
                {tab === "students" && (
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
                                {STATUS_FILTERS.map((f) => (
                                    <button
                                        key={f.value}
                                        onClick={() => props.onStatusFilterChange && props.onStatusFilterChange(f.value)}
                                        className={`rounded-lg px-3.5 py-2 text-xs font-bold ${statusFilter === f.value ? "bg-sky-blue-400/20 text-dark-blue-400" : "text-slate-400 hover:text-slate-600"}`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                            <div className="flex min-w-[220px] flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                                <IconSearch size={15} stroke={1.75} className="text-slate-400" />
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Search by student name"
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full flex-1 border-none bg-transparent text-sm text-dark-blue-400 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                        <Table loading={props.loading} items={visibleStudents} linkState={props.linkState} />
                    </div>
                )}
            </div>
        </div>
    )
}
