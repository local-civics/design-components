import * as React from 'react';
import {Link} from "react-router-dom";

/**
 * Item
 */
export interface Item {
    badgeId: string,
    name: string;
    description: string
    href: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[];
}

/**
 * TableProps
 */
export type TableProps = TableData

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if (props.loading) {
        return <div className="text-sm text-slate-400">Loading…</div>;
    }

    if (props.items.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400 shadow-sm">
                No badges to display.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {props.items.map((row, i) => (
                <Link
                    key={row.badgeId}
                    to={row.href}
                    className={`block px-5 py-4 no-underline hover:bg-slate-50 ${i < props.items.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                    <div className="text-sm font-bold text-dark-blue-400">{row.name}</div>
                    {row.description && <div className="mt-1 text-xs leading-relaxed text-slate-500">{row.description}</div>}
                </Link>
            ))}
        </div>
    );
}
