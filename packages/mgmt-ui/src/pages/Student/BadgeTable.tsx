import * as React from 'react';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    badgeId: string
    badgeName: string
    isComplete?: boolean
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
    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {props.items.map((row, i) => (
                <div
                    key={row.badgeId || row.badgeName}
                    className={`flex items-center justify-between gap-4 px-5 py-4 ${i < props.items.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                    <div className="text-sm font-bold text-dark-blue-400">{row.badgeName}</div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${row.isComplete ? "bg-mint-100 text-dark-blue-400" : "bg-slate-100 text-slate-500"}`}>
                        {row.isComplete ? "Complete" : "Incomplete"}
                    </span>
                </div>
            ))}
        </div>
    );
}
