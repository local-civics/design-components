import * as React from 'react';
import {Link} from "react-router-dom";
import {IconChevronRight, IconRoute} from "@tabler/icons";
import {Emblem} from "../../components/media/Emblem/Emblem";

/**
 * Item
 */
export interface Item {
    pathwayId: string,
    name: string;
    description: string
    imageURL?: string
    displayTags?: string[]
    numberOfBadges?: number
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
                    key={row.pathwayId}
                    to={row.href}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
                >
                    <Emblem imageURL={row.imageURL} alt={row.name} size="sm" icon={IconRoute} accent="cyan" />
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-dark-blue-400">{row.name}</div>
                        {row.description && <div className="mt-1 text-xs leading-relaxed text-slate-500">{row.description}</div>}
                        {!!row.displayTags?.length && (
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {row.displayTags.map((tag) => (
                                    <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                    {!!row.numberOfBadges && (
                        <div className="w-24 shrink-0 text-right text-xs text-slate-500">
                            {row.numberOfBadges} badge{row.numberOfBadges === 1 ? "" : "s"}
                        </div>
                    )}
                    <IconChevronRight size={16} stroke={2} className="shrink-0 text-slate-300" />
                </Link>
            ))}
        </div>
    );
}
