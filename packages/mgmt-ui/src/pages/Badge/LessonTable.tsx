import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    lessonId: string
    lessonName: string
    percentageCompletion: number
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

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No lessons to display"
            description="There are no lessons in this badge."
            loading={props.loading}
            icon="badges"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <button onClick={() => requestSort("lessonName")} className="flex-1 text-left hover:text-slate-600">Lesson Name{indicator("lessonName")}</button>
                <button onClick={() => requestSort("percentageCompletion")} className="w-36 shrink-0 text-right hover:text-slate-600">Lesson Completion{indicator("percentageCompletion")}</button>
            </div>

            {sortedItems.map((row) => (
                <Link
                    key={row.lessonId}
                    to={row.href}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
                >
                    <div className="min-w-0 flex-1 text-sm font-bold text-dark-blue-400">{row.lessonName}</div>
                    <div className="w-36 shrink-0 text-right text-xs text-slate-500">{Math.round((row.percentageCompletion + Number.EPSILON) * 100)}%</div>
                </Link>
            ))}
        </div>
    );
}
