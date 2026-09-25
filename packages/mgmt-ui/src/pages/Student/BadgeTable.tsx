import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    badgeId: string
    badgeName: string
    isComplete?: boolean
    // Joined by getStudent() via the same findPathwayForBadge() prefix-match getBadge() already
    // uses - undefined when this badge doesn't belong to any pathway.
    pathwayId?: string
    pathwayName?: string
    // This student's own scoped badge preview - same field/Link convention as AnswerTable.tsx's
    // own href, so both tabs on this page behave identically.
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
 * Table. Sortable on Badge Name + Status only - a single student's own badge completion is a
 * binary isComplete, so there's no Point-Value/Completion-% axis to sort on the way a roster-wide
 * pathway's own BadgeTable has.
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 px-4">
                <SortableHeader label="Badge Name" sortKey="badgeName" sortConfig={sortConfig} onSort={requestSort} className="flex-1" />
                <SortableHeader label="Status" sortKey="isComplete" sortConfig={sortConfig} onSort={requestSort} align="center" className="w-28 shrink-0" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {sortedItems.map((row, i) => (
                    <div
                        key={row.badgeId || row.badgeName}
                        className={`flex items-center justify-between gap-4 px-5 py-4 ${i < sortedItems.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                        <div className="min-w-0 flex-1">
                            <Link to={row.href} className="text-sm font-bold text-dark-blue-400 no-underline hover:underline">{row.badgeName}</Link>
                            {row.pathwayName && <div className="mt-1 text-xs text-slate-500">{row.pathwayName} pathway</div>}
                        </div>
                        <span className={`w-28 shrink-0 rounded-full px-2.5 py-1 text-center text-[10px] font-bold uppercase tracking-wide ${row.isComplete ? "bg-mint-100 text-dark-blue-400" : "bg-slate-100 text-slate-500"}`}>
                            {row.isComplete ? "Complete" : "Incomplete"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
