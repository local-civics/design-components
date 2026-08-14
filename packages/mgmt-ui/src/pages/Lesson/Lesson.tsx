import {IconArrowLeft, IconCategory2} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {compact} from "../../utils/numbers";
import {Item as ReflectionItem, Table as ReflectionTable} from "./ReflectionTable";
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
    reflections: ReflectionItem[],
    questions: QuestionItem[],
    trial?: boolean
    lessonsCompleted?: number
    contributors?: {name: string}[]

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
    const [tab, setTab] = useState("question")

    const numberOfStudents = props.students.length
    const numberOfLessons = numberOfStudents > 0 ? props.students.filter(u => u.isComplete).length : 0
    const contributors = props.contributors || []
    const visibleContributors = contributors.slice(0, 5)
    const remainingContributors = contributors.slice(5).length

    const tabs = props.trial ? [
        {label: "By question", value: "question"},
        {label: "By student", value: "students"},
    ] : [
        {label: "By question", value: "question"},
        {label: "By student", value: "students"},
        {label: "By reflection", value: "reflections"},
    ]

    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1.5">
                    <div onClick={props.onBackClick} className="flex w-max cursor-pointer items-center gap-1 text-xs font-bold text-sky-blue-400">
                        <IconArrowLeft size={13} stroke={2.5} />
                        Back
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.displayName || "Lesson"}</h1>
                    <p className="max-w-xl text-sm text-slate-500">{props.description || "No description"}</p>
                </div>

                <SplitButton
                    href={props.href}
                    noExport={props.trial}
                    onCopyLinkClick={props.onCopyLinkClick}
                    onExportDataClick={props.onExportDataClick}
                />
            </div>

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
                {tab === "reflections" && <ReflectionTable loading={props.loading} items={props.reflections} />}
                {tab === "students" && <Table loading={props.loading} items={props.students} />}
            </div>
        </div>
    )
}
