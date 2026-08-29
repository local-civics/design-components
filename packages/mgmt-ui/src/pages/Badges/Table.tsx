import * as React from 'react';
import {Link} from "react-router-dom";
import {IconAlbum, IconChevronRight} from "@tabler/icons";
import {Emblem} from "../../components/media/Emblem/Emblem";

/**
 * Item
 */
export interface Item {
    badgeId: string,
    name: string;
    description?: string
    imageURL?: string
    pathway?: string
    numberOfLessons?: number
    weight?: number
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
        <div className="flex flex-col gap-3">
            <div className="flex gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <div className="w-14 shrink-0" />
                <div className="w-56 shrink-0">Badge</div>
                <div className="flex-1">Description</div>
                <div className="w-40 shrink-0">Pathway</div>
                <div className="w-28 shrink-0">Lessons</div>
                <div className="w-24 shrink-0 text-right">Point Value</div>
                <div className="w-4 shrink-0" />
            </div>

            {props.items.map((row) => (
                <Link
                    key={row.badgeId}
                    to={row.href}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
                >
                    <Emblem imageURL={row.imageURL} alt={row.name} size="sm" icon={IconAlbum} accent="mint" />
                    <div title={row.name} className="w-56 shrink-0 truncate text-sm font-bold text-dark-blue-400">
                        {row.name}
                    </div>
                    <div title={row.description} className="line-clamp-2 min-w-0 flex-1 text-xs leading-relaxed text-slate-500">
                        {row.description || "—"}
                    </div>
                    <div className="w-40 shrink-0 text-xs text-slate-500">{row.pathway || "—"}</div>
                    <div className="w-28 shrink-0 text-xs text-slate-500">
                        {row.numberOfLessons ? `${row.numberOfLessons} lesson${row.numberOfLessons === 1 ? "" : "s"}` : "—"}
                    </div>
                    <div className="w-24 shrink-0 text-right text-xs text-slate-500">
                        {row.weight ? `${row.weight} pts` : "—"}
                    </div>
                    <IconChevronRight size={16} stroke={2} className="w-4 shrink-0 text-slate-300" />
                </Link>
            ))}
        </div>
    );
}
