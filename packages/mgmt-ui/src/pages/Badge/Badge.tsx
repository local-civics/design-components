import {IconAlbum, IconCategory2} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {PageHeader, PageHeaderBreadcrumbSegment} from "../../components/navigation/PageHeader/PageHeader";
import {SplitButton} from "./SplitButton";
import {Table, Item} from "./Table";
import {Table as LessonTable, Item as LessonItem} from "./LessonTable"

/**
 * BadgeUserItem
 */
export type BadgeUserItem = Item

/**
 * BadgeClass
 */
export type BadgeClass = {
    classId: string
    name: string
    active: boolean
}

/**
 * BadgeProps
 */
export type BadgeProps = {
    loading: boolean
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

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

const TABS = [
    {label: "By lesson", value: "lessons"},
    {label: "By student", value: "students"},
]

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
    const [tab, setTab] = useState("lessons")

    const numberOfStudents = props.students.length
    const numberOfBadges = numberOfStudents > 0 ? props.students.filter(u => u.isComplete).length : 0

    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <PageHeader
                icon={IconAlbum}
                iconAccent="mint"
                imageURL={props.imageURL}
                onBackClick={props.onBackClick}
                breadcrumb={props.breadcrumb}
                title={props.displayName || "Badge"}
                description={props.description}
                actions={!props.trial && (
                    <SplitButton
                        href={props.href}
                        onCopyLinkClick={props.onCopyLinkClick}
                        onExportDataClick={props.onExportDataClick}
                    />
                )}
            />

            <StatsGroup data={[
                {
                    title: props.trial ? "LESSONS SUBMITTED" : "BADGE COMPLETION",
                    value: props.trial ? props.lessonsCompleted || 0 : numberOfBadges,
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
                        {props.classes.map((c) => <option key={c.classId} value={c.classId}>{c.name}</option>)}
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

                {(!!props.trial || tab === "lessons") && <LessonTable loading={props.loading} items={props.lessons} />}
                {(!props.trial && tab === "students") && <Table loading={props.loading} items={props.students} />}
            </div>
        </div>
    )
}
