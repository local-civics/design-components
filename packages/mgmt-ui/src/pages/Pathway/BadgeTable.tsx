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
    activeCategoryId?: string
    activeCategoryLabel?: string
}

const OTHER_FILTER = "__other__";

/**
 * Table. Badges are matched to the pathway's criteria categories via exact-inclusion on
 * badge.categories (not the prefix-match used elsewhere for badge->pathway matching), following
 * the same grouping pattern already shipped in hub-ui's PathwayTranscript. Rather than always
 * stacking every category's badges into its own always-visible section - which disconnected the
 * single sortable header row from the badges grouped below it - the same mapping now drives a row
 * of filter pills above one continuous, sortable table. Badges matching none of the criteria
 * categories stay reachable via the "Other" pill rather than disappearing.
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    const {items: sortedBadges, requestSort, sortConfig} = useSortableData(props.badges);
    const [categoryFilter, setCategoryFilter] = React.useState("");

    // Lets a parent (the Categories popup, via Pathway.tsx) drive this table's own filter pill
    // selection without lifting the pill state itself out of this component.
    React.useEffect(() => {
        if (props.activeCategoryId !== undefined) {
            setCategoryFilter(props.activeCategoryId);
        }
    }, [props.activeCategoryId]);

    if (props.badges.length === 0) {
        return <PlaceholderBanner
            title="No badges to display"
            description="There are no badges in this pathway."
            loading={props.loading}
            icon="badges"
        />
    }

    const groupedIds = new Set(props.categories.map((c) => c.categoryId));
    const other = sortedBadges.filter((b) => !b.categories?.some((id) => groupedIds.has(id)));

    // The Categories popup can select any node in the full tree, not just the criteria-level
    // categories that normally get their own pill - when that happens, add a pill for it too, so
    // the active filter is always visibly confirmed rather than silently applied with nothing
    // highlighted.
    const extraCategory =
        categoryFilter && categoryFilter !== OTHER_FILTER && !groupedIds.has(categoryFilter)
            ? { categoryId: categoryFilter, name: props.activeCategoryLabel || categoryFilter }
            : undefined;

    const visibleBadges = !categoryFilter
        ? sortedBadges
        : categoryFilter === OTHER_FILTER
            ? other
            : sortedBadges.filter((b) => b.categories?.includes(categoryFilter));

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
                <CategoryPill label="All" active={!categoryFilter} onClick={() => setCategoryFilter("")} />
                {props.categories.map((category) => (
                    <CategoryPill
                        key={category.categoryId}
                        label={category.name}
                        active={categoryFilter === category.categoryId}
                        onClick={() => setCategoryFilter(category.categoryId)}
                    />
                ))}
                {extraCategory && (
                    <CategoryPill label={extraCategory.name} active onClick={() => setCategoryFilter(extraCategory.categoryId)} />
                )}
                {other.length > 0 && (
                    <CategoryPill label="Other" active={categoryFilter === OTHER_FILTER} onClick={() => setCategoryFilter(OTHER_FILTER)} />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex gap-4 px-4">
                    <SortableHeader label="Badge Name" sortKey="badgeName" sortConfig={sortConfig} onSort={requestSort} className="flex-1" />
                    <SortableHeader label="Point Value" sortKey="weight" sortConfig={sortConfig} onSort={requestSort} align="right" className="w-24 shrink-0" />
                    <SortableHeader label="Badge Completion" sortKey="percentageCompletion" sortConfig={sortConfig} onSort={requestSort} align="right" className="w-36 shrink-0" />
                </div>

                {visibleBadges.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-200 px-4 py-3 text-xs text-slate-400">
                        {categoryFilter ? "No badges in this category yet." : "No badges yet."}
                    </div>
                )}

                {visibleBadges.map((row) => (
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
        </div>
    );
}

const CategoryPill = (props: { label: string, active: boolean, onClick: () => void }) => (
    <button
        type="button"
        onClick={props.onClick}
        className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${
            props.active
                ? "border-sky-blue-400/40 bg-sky-blue-400/20 text-dark-blue-400"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        }`}
    >
        {props.label}
    </button>
)
