import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
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

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_3fr] items-center gap-3 border-b border-slate-100 px-5 py-3">
                <SortableHeader label="Student Name" sortKey="studentName" sortConfig={sortConfig} onSort={requestSort} />
                <div className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">Impact Statement</div>
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
