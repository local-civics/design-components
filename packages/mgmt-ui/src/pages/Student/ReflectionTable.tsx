import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    lessonId: string
    lessonName: string
    badgeName?: string
    reflection: string
    rating: number
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
            {props.items.map((row, i) => (
                <div
                    key={row.lessonId || row.lessonName}
                    className={`flex items-start justify-between gap-4 px-5 py-4 ${i < props.items.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                    <div className="min-w-0">
                        <Link to={row.href} className="text-sm font-bold text-dark-blue-400 no-underline hover:underline">{row.lessonName}</Link>
                        {row.badgeName && <div className="mt-1 text-xs text-slate-500">{row.badgeName}</div>}
                        <div className="mt-1.5 text-xs text-slate-600">{row.reflection}</div>
                    </div>
                    <div className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                        {row.rating.toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
    );
}
