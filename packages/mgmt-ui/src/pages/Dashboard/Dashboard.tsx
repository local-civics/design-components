import {IconCategory2} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {Item as StudentItem, Table as StudentTable} from "./StudentTable";
import {Table as ReflectionTable, Item as ReflectionItem} from "./ReflectionTable";
import {Item as ImpactItem, Table as ImpactTable} from "./ImpactTable";
import {Item as BadgeItem, Table as BadgeTable} from "./BadgeTable";
import {Item as LessonItem, Table as LessonTable} from "./LessonTable";

/**
 * DashboardClass
 */
export type DashboardClass = {
    classId: string
    name: string
}

/**
 * DashboardProps
 */
export type DashboardProps = {
    loading: boolean
    students: StudentItem[]
    impacts: ImpactItem[]
    reflections: ReflectionItem[],
    classes: DashboardClass[],
    badges: BadgeItem[],
    lessons: LessonItem[],
    classId: string
    percentageOfAccountsCreated: number
    numberOfBadgesEarned: number
    numberOfLessonsCompleted: number

    onClassChange: (classId: string) => void;
    onViewStudentProfile: (student: StudentItem) => void
    onBadgeClick: (badge: BadgeItem) => void;
    onLessonClick: (lesson: LessonItem) => void;
}

const TABS = [
    {label: "My students", value: "students"},
    {label: "Impact statements", value: "impact"},
    {label: "Reflections", value: "reflections"},
    {label: "Badges", value: "badges"},
    {label: "Lessons", value: "lessons"},
]

/**
 * Dashboard
 * @param props
 * @constructor
 */
export const Dashboard = (props: DashboardProps) => {
    const [tab, setTab] = useState("students")

    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <div className="space-y-1.5">
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Dashboard</h1>
                <p className="max-w-xl text-sm text-slate-500">Track your students' pathway progress</p>
            </div>

            <StatsGroup data={[
                {
                    title: "# OF STUDENTS",
                    value: props.students.length,
                },
                {
                    title: "ACCOUNT CREATION",
                    value: props.percentageOfAccountsCreated,
                    unit: "%",
                },
                {
                    title: "BADGES EARNED",
                    value: props.numberOfBadgesEarned,
                },
                {
                    title: "LESSONS COMPLETED",
                    value: props.numberOfLessonsCompleted,
                },
            ]}/>

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

            <div className="flex flex-col gap-3">
                <div className="flex w-fit flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1">
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

                { tab === "impact" && <ImpactTable
                    loading={props.loading}
                    items={props.impacts}
                />}

                { tab === "reflections" && <ReflectionTable
                    loading={props.loading}
                    items={props.reflections}
                /> }

                { tab === "badges" && <BadgeTable
                    loading={props.loading}
                    items={props.badges}
                    onClick={props.onBadgeClick}
                /> }

                { tab === "lessons" && <LessonTable
                    loading={props.loading}
                    items={props.lessons}
                    onClick={props.onLessonClick}
                /> }

                { tab === "students" && <StudentTable
                    loading={props.loading}
                    items={props.students}
                    onViewProfile={props.onViewStudentProfile}
                />}
            </div>
        </div>
    )
}
