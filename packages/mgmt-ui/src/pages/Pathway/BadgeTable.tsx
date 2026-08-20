import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    badgeId: string
    badgeName: string
    percentageCompletion: number
    href: string
    categories: string[]
    weight: number
    overflowCategories?: string[]
}

/**
 * Category
 */
export type Category = {
    categoryId: string
    name: string
    maxPoints?: number
}

/**
 * TableProps
 */
export type TableProps = {
    loading: boolean
    badges: Item[]
    categories: Category[]
}

/**
 * Table. Groups badges under the pathway's criteria categories (exact-inclusion match on
 * badge.categories, not the prefix-match used elsewhere for badge->pathway matching), following
 * the same grouping pattern already shipped in hub-ui's PathwayTranscript. Badges matching none
 * of the criteria categories land in a trailing "Other badges" section rather than disappearing.
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    const {items: sortedBadges, requestSort, sortConfig} = useSortableData(props.badges);

    if (props.badges.length === 0) {
        return <PlaceholderBanner
            title="No badges to display"
            description="There are no badges in this pathway."
            loading={props.loading}
            icon="badges"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");
    const groupedIds = new Set(props.categories.map((c) => c.categoryId));
    const forCategory = (categoryId: string) => sortedBadges.filter((b) => b.categories?.includes(categoryId));
    const other = sortedBadges.filter((b) => !b.categories?.some((id) => groupedIds.has(id)));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <button onClick={() => requestSort("badgeName")} className="flex-1 text-left hover:text-slate-600">Badge Name{indicator("badgeName")}</button>
                <button onClick={() => requestSort("weight")} className="w-24 shrink-0 text-right hover:text-slate-600">Point Value{indicator("weight")}</button>
                <button onClick={() => requestSort("percentageCompletion")} className="w-36 shrink-0 text-right hover:text-slate-600">Badge Completion{indicator("percentageCompletion")}</button>
            </div>

            {props.categories.map((category) => (
                <CategorySection key={category.categoryId} name={category.name} badges={forCategory(category.categoryId)} />
            ))}

            {other.length > 0 && <CategorySection name="Other badges" badges={other} />}
        </div>
    );
}

const CategorySection = (props: { name: string, badges: Item[] }) => (
    <div className="flex flex-col gap-2">
        <div className="px-1 text-sm font-extrabold tracking-tight text-dark-blue-400">{props.name}</div>

        {props.badges.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 px-4 py-3 text-xs text-slate-400">
                No badges yet.
            </div>
        )}

        {props.badges.map((row) => (
            <Link
                key={row.badgeId}
                to={row.href}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm hover:bg-slate-50"
            >
                <div className="min-w-0 flex-1 text-sm font-bold text-dark-blue-400">{row.badgeName}</div>
                <div className="w-24 shrink-0 text-right text-xs font-black text-mint-400">{row.weight} pts</div>
                <div className="w-36 shrink-0 text-right text-xs text-slate-500">{Math.round((row.percentageCompletion + Number.EPSILON) * 100)}%</div>
            </Link>
        ))}
    </div>
)
