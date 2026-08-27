import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
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

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_1fr_2fr_0.8fr] items-center gap-3 border-b border-slate-100 px-5 py-3">
                <SortableHeader label="Student Name" sortKey="studentName" sortConfig={sortConfig} onSort={requestSort} />
                <SortableHeader label="Lesson Name" sortKey="lessonName" sortConfig={sortConfig} onSort={requestSort} />
                <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">Reflection</div>
                <SortableHeader label="Updated At" sortKey="updatedAtDate" sortConfig={sortConfig} onSort={requestSort} />
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
