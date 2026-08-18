import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    studentId: string
    studentName: string
    className: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[];
}

/**
 * TableMethods
 */
export type TableMethods = {
    onViewProfile: (item: Item) => void;
}

/**
 * TableProps
 */
export type TableProps = TableData & TableMethods

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No students to display"
            description="You don't have any students yet, add them and revisit."
            loading={props.loading}
            icon="groups"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[2fr_1fr] gap-3 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <button onClick={() => requestSort("studentName")} className="flex items-center text-left hover:text-slate-700">Student Name{indicator("studentName")}</button>
                <button onClick={() => requestSort("className")} className="flex items-center text-left hover:text-slate-700">Class Name{indicator("className")}</button>
            </div>
            {sortedItems.map((row, i) => (
                <div
                    key={row.studentId}
                    className={`grid grid-cols-[2fr_1fr] items-center gap-3 px-5 py-3.5 ${
                        i < sortedItems.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => props.onViewProfile(row)}
                        className="truncate text-left text-xs font-bold text-dark-blue-400 hover:text-sky-blue-400"
                    >
                        {row.studentName}
                    </button>
                    <div className="truncate text-xs text-slate-500">{row.className}</div>
                </div>
            ))}
        </div>
    );
}
