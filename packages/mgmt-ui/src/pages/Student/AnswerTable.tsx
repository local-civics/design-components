import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    lessonId: string
    lessonName: string
    badgeName?: string
    questionName: string
    answer: string[]
    href: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * TableProps
 */
export type TableProps = TableData

type LessonGroup = {
    lessonId: string
    lessonName: string
    badgeName?: string
    href: string
    items: Item[]
}

/**
 * Table. Groups the flat, one-row-per-question item list into one card per lesson - incoming order
 * (badge, then curriculum position - see getStudent() in useOrganization.ts) determines group order.
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No answers to display"
            description="There has not been any lesson progress just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    const groups: LessonGroup[] = [];
    const groupByLessonId: Record<string, LessonGroup> = {};
    props.items.forEach((row) => {
        let group = groupByLessonId[row.lessonId];
        if (!group) {
            group = {lessonId: row.lessonId, lessonName: row.lessonName, badgeName: row.badgeName, href: row.href, items: []};
            groupByLessonId[row.lessonId] = group;
            groups.push(group);
        }
        group.items.push(row);
    });

    return (
        <div className="flex flex-col gap-3">
            {groups.map((group) => (
                <div key={group.lessonId} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-4">
                        <Link to={group.href} className="text-sm font-bold text-dark-blue-400 no-underline hover:underline">{group.lessonName}</Link>
                        {group.badgeName && <div className="mt-1 text-xs text-slate-500">{group.badgeName}</div>}
                    </div>
                    {group.items.map((row, i) => (
                        <div
                            key={row.questionName}
                            className={`px-5 py-4 ${i < group.items.length - 1 ? "border-b border-slate-100" : ""}`}
                        >
                            <div className="text-xs font-semibold text-slate-500">{row.questionName}</div>
                            <div className="mt-1 text-xs text-slate-600">{row.answer.join(", ")}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
