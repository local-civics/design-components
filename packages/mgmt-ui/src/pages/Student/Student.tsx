import {useState} from "react";
import * as React      from "react";
import {StatsGroup}                                                       from "../../components/data/StatsGroup/StatsGroup";
import {PageHeader}                                                       from "../../components/navigation/PageHeader/PageHeader";
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

export const Student = (props: StudentProps) => {
    const [tab, setTab] = useState("badges")
    const numberOfBadgesCompleted = props.badges.length > 0 ? props.badges.filter(b => b.isComplete).length : 0
    const numberOfLessonsCompleted = props.lessons.filter(l => l.isComplete).length

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

            {tab === "badges" && <BadgeTable loading={props.loading} items={props.badges} />}
            {tab === "answers" && <AnswerTable loading={props.loading} items={props.answers} />}
            {tab === "reflections" && <ReflectionTable loading={props.loading} items={props.reflections} />}
        </div>
    )
}