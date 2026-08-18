import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    badgeId: string,
    name: string;
    description: string
    percentageCompletion: number
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
    onClick: (badge: Item) => void
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
            title="No badges to display"
            description="We don't have any badges to show you just yet."
            loading={props.loading}
            icon="badges"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1.5fr_2fr_0.8fr] gap-3 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <button onClick={() => requestSort("name")} className="flex items-center text-left hover:text-slate-700">Badge Name{indicator("name")}</button>
                <div>Description</div>
                <button onClick={() => requestSort("percentageCompletion")} className="flex items-center justify-center text-center hover:text-slate-700">Completion{indicator("percentageCompletion")}</button>
            </div>
            {sortedItems.map((row, i) => (
                <div
                    key={row.badgeId}
                    className={`grid grid-cols-[1.5fr_2fr_0.8fr] items-center gap-3 px-5 py-3.5 ${
                        i < sortedItems.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => props.onClick && props.onClick(row)}
                        className="truncate text-left text-xs font-bold text-dark-blue-400 hover:text-sky-blue-400"
                    >
                        {row.name}
                    </button>
                    <div className="truncate text-xs text-slate-500">{row.description}</div>
                    <div className="text-center text-xs font-bold text-dark-blue-400">{Math.round((row.percentageCompletion + Number.EPSILON) * 100)}%</div>
                </div>
            ))}
        </div>
    );
}
