import * as React from 'react';
import {Link} from "react-router-dom";
import {IconChevronRight} from "@tabler/icons";

/**
 * Item
 */
export interface Item {
    lessonId: string,
    name: string;
    description: string
    badge?: string
    pathway?: string
    href: string
}

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];
}

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
                No lessons to display.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <div className="flex-1">Lesson</div>
                <div className="w-40 shrink-0">Badge</div>
                <div className="w-40 shrink-0">Pathway</div>
                <div className="w-4 shrink-0" />
            </div>

            {props.items.map((row) => (
                <Link
                    key={row.lessonId}
                    to={row.href}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
                >
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-dark-blue-400">{row.name}</div>
                        {row.description && <div className="mt-1 text-xs leading-relaxed text-slate-500">{row.description}</div>}
                    </div>
                    <div className="w-40 shrink-0 text-xs text-slate-500">{row.badge || "—"}</div>
                    <div className="w-40 shrink-0 text-xs text-slate-500">{row.pathway || "—"}</div>
                    <IconChevronRight size={16} stroke={2} className="w-4 shrink-0 text-slate-300" />
                </Link>
            ))}
        </div>
    );
}
