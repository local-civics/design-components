import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    studentName: string
    impactStatement: string
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
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No impact statements to display"
            description="There are no students with impact statements yet."
            loading={props.loading}
            icon="kindergarten"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_3fr] gap-3 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <button onClick={() => requestSort("studentName")} className="flex items-center text-left hover:text-slate-700">Student Name{indicator("studentName")}</button>
                <div>Impact Statement</div>
            </div>
            {sortedItems.map((row, i) => (
                <div
                    key={row.studentName}
                    className={`grid grid-cols-[1fr_3fr] items-center gap-3 px-5 py-3.5 ${
                        i < sortedItems.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                >
                    <div className="truncate text-xs font-bold text-dark-blue-400">{row.studentName}</div>
                    <div className="text-xs text-slate-500">{row.impactStatement}</div>
                </div>
            ))}
        </div>
    );
}
