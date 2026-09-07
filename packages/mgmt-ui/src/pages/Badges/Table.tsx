import * as React from 'react';
import {Link} from "react-router-dom";
import {IconAlbum, IconChevronRight} from "@tabler/icons";
import {Emblem} from "../../components/media/Emblem/Emblem";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
import {useSortableData} from "../../utils/useSortableData";

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
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

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
            <div className="flex items-center gap-4 px-4">
                {/* "Badge" starts flush-left, at the same x-position as the emblem below it, not
                    offset to align with the name text. The cell itself still spans the full
                    emblem+gap+name width (56+16+224=296px) so the fixed-width columns after it
                    (Pathway/Lessons/Point Value) line up correctly with their rows either way. */}
                <div className="w-[296px] shrink-0">
                    <SortableHeader label="Badge" sortKey="name" sortConfig={sortConfig} onSort={requestSort} />
                </div>
                <div className="flex-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">Description</div>
                <SortableHeader className="w-40 shrink-0" label="Pathway" sortKey="pathway" sortConfig={sortConfig} onSort={requestSort} />
                <SortableHeader className="w-28 shrink-0" label="Lessons" sortKey="numberOfLessons" sortConfig={sortConfig} onSort={requestSort} />
                <SortableHeader className="w-24 shrink-0" label="Point Value" sortKey="weight" sortConfig={sortConfig} onSort={requestSort} align="right" />
                <div className="w-4 shrink-0" />
            </div>

            {sortedItems.map((row) => (
                <Link
                    key={row.badgeId}
                    to={row.href}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
                >
                    <Emblem imageURL={row.imageURL} alt={row.name} size="sm" icon={IconAlbum} accent="mint" />
                    <div title={row.name} className="line-clamp-2 w-56 shrink-0 text-sm font-bold text-dark-blue-400">
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
