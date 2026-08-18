import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";
import {relativeTimeFromDates} from "../../utils/time";

/**
 * Item
 */
export interface Item {
    lessonName: string
    studentName: string
    reflection: string
    updatedAt: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * TableMethods
 */
export type TableMethods = {}


/**
 * TableProps
 */
export type TableProps = TableData & TableMethods

/**
 * Table. updatedAt is a plain string on Item, but useSortableData's Date-aware sort branch
 * needs a real Date instance to engage - precomputed here the same way Class/Table.tsx already
 * precomputes fullName for its own sortable identity column.
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const preparedItems = React.useMemo(() => {
        return props.items.map(item => ({
            ...item,
            updatedAtDate: new Date(item.updatedAt),
        }));
    }, [props.items]);

    const {items: sortedItems, requestSort, sortConfig} = useSortableData(preparedItems);

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
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_1fr_2fr_0.8fr] gap-3 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <button onClick={() => requestSort("studentName")} className="flex items-center text-left hover:text-slate-700">Student Name{indicator("studentName")}</button>
                <button onClick={() => requestSort("lessonName")} className="flex items-center text-left hover:text-slate-700">Lesson Name{indicator("lessonName")}</button>
                <div>Reflection</div>
                <button onClick={() => requestSort("updatedAtDate")} className="flex items-center text-left hover:text-slate-700">Updated At{indicator("updatedAtDate")}</button>
            </div>
            {sortedItems.map((row, i) => (
                <div
                    key={row.studentName+row.lessonName}
                    className={`grid grid-cols-[1fr_1fr_2fr_0.8fr] items-center gap-3 px-5 py-3.5 ${
                        i < sortedItems.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                >
                    <div className="truncate text-xs font-bold text-dark-blue-400">{row.studentName}</div>
                    <div className="truncate text-xs text-slate-500">{row.lessonName}</div>
                    <div className="text-xs text-slate-500">{row.reflection}</div>
                    <div className="text-xs text-slate-500">{relativeTimeFromDates(row.updatedAtDate)}</div>
                </div>
            ))}
        </div>
    );
}
