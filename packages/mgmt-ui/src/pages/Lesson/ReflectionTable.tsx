import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    studentName: string
    reflection: string
    rating: number
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
 * Table. Reflection text itself was never sortable - only Student Name and Rating are, same as
 * before this restyle.
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No reflections to display"
            description="There has not been any lesson progress just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <button onClick={() => requestSort("studentName")} className="w-40 shrink-0 text-left hover:text-slate-600">Student Name{indicator("studentName")}</button>
                <div className="flex-1">Reflection</div>
                <button onClick={() => requestSort("rating")} className="w-20 shrink-0 text-right hover:text-slate-600">Rating{indicator("rating")}</button>
            </div>

            {sortedItems.map((row, i) => (
                <div key={`${row.studentName}-${i}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-40 shrink-0 text-sm font-bold text-dark-blue-400">{row.studentName}</div>
                        <div className="flex-1 text-sm text-slate-600">{row.reflection}</div>
                        <div className="w-20 shrink-0 text-right text-sm text-slate-500">{row.rating}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
