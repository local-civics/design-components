import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    lessonId: string
    lessonName: string
    badgeName?: string
    // Joined by getStudent() - undefined when this lesson's badge (if any) doesn't belong to a
    // pathway.
    pathwayId?: string
    pathwayName?: string
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
 * Table. Sortable on Lesson Name + Rating - matching Lesson/ReflectionTable.tsx's own established
 * partial sortability (reflection text itself was never sortable there either).
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No reflections to display"
            description="There has not been any lesson progress just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 px-4">
                <SortableHeader label="Lesson Name" sortKey="lessonName" sortConfig={sortConfig} onSort={requestSort} className="flex-1" />
                <SortableHeader label="Rating" sortKey="rating" sortConfig={sortConfig} onSort={requestSort} align="center" className="w-16 shrink-0" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {sortedItems.map((row, i) => {
                    const subtitleParts = [row.badgeName, row.pathwayName ? `${row.pathwayName} pathway` : undefined].filter(Boolean)
                    return (
                        <div
                            key={row.lessonId || row.lessonName}
                            className={`flex items-start justify-between gap-4 px-5 py-4 ${i < sortedItems.length - 1 ? "border-b border-slate-100" : ""}`}
                        >
                            <div className="min-w-0">
                                <Link to={row.href} className="text-sm font-bold text-dark-blue-400 no-underline hover:underline">{row.lessonName}</Link>
                                {subtitleParts.length > 0 && <div className="mt-1 text-xs text-slate-500">{subtitleParts.join(" · ")}</div>}
                                <div className="mt-1.5 text-xs text-slate-600">{row.reflection}</div>
                            </div>
                            <div className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                                {row.rating.toLocaleString()}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
