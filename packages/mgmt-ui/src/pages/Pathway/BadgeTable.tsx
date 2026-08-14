import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    badgeId: string
    badgeName: string
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
            title="No badges to display"
            description="There are no badges in this pathway."
            loading={props.loading}
            icon="badges"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <button onClick={() => requestSort("badgeName")} className="flex-1 text-left hover:text-slate-600">Badge Name{indicator("badgeName")}</button>
                <button onClick={() => requestSort("percentageCompletion")} className="w-36 shrink-0 text-right hover:text-slate-600">Badge Completion{indicator("percentageCompletion")}</button>
            </div>

            {sortedItems.map((row) => (
                <Link
                    key={row.badgeId}
                    to={row.href}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
                >
                    <div className="min-w-0 flex-1 text-sm font-bold text-dark-blue-400">{row.badgeName}</div>
                    <div className="w-36 shrink-0 text-right text-xs text-slate-500">{Math.round((row.percentageCompletion + Number.EPSILON) * 100)}%</div>
                </Link>
            ))}
        </div>
    );
}
