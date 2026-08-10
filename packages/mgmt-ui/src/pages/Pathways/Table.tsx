import * as React from 'react';
import {Link} from "react-router-dom";
import {IconChevronRight} from "@tabler/icons";

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
                No pathways to display.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {props.items.map((row) => (
                <Link
                    key={row.badgeId}
                    to={row.href}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
                >
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-dark-blue-400">{row.name}</div>
                        {row.description && <div className="mt-1 text-xs leading-relaxed text-slate-500">{row.description}</div>}
                    </div>
                    <IconChevronRight size={16} stroke={2} className="shrink-0 text-slate-300" />
                </Link>
            ))}
        </div>
    );
}
