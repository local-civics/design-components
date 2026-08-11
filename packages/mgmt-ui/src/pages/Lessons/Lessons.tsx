import * as React from 'react';
import {IconSearch} from "@tabler/icons";
import {Table, Item} from "./Table";

/**
 * LessonItem
 */
export type LessonItem = Item

/**
 * LessonsProps
 */
export type LessonsProps = {
    loading: boolean
    lessons: LessonItem[]

    onAutocompleteChange: (next: string) => void
}

/**
 * Lessons
 * @param props
 * @constructor
 */
export const Lessons = (props: LessonsProps) => {
    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Lessons</h1>
                <p className="text-sm text-slate-500">Bite-sized activities and learning experiences accelerating students achievement</p>
            </div>

            <div className="relative">
                <IconSearch size={16} stroke={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search for a lesson that fits your needs"
                    onChange={(e) => props.onAutocompleteChange(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-dark-blue-400 placeholder:text-slate-400 focus:border-sky-blue-400 focus:outline-none"
                />
            </div>

            <Table loading={props.loading} items={props.lessons} />
        </div>
    )
}
