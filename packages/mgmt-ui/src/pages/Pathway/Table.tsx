import * as React from 'react';
import {IconChevronDown} from '@tabler/icons';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Stack as BadgeStack, Item as BadgeItem} from "./BadgeStack";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    isComplete?: boolean
    badges: BadgeItem[]
    categoryPoints?: Record<string, number>
    [key: string]: any;
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * Category
 */
export type Category = {
    categoryId: string
    name: string
}

/**
 * TableProps
 */
export type TableProps = TableData & {
    categories?: Category[]
}

/**
 * Table. `categories` is optional and defaults to [] - the original always required it, which meant
 * any caller (or story) that didn't supply one crashed here on `props.categories.map(...)` the
 * moment this table rendered.
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})
    const categories = props.categories || []

    const preparedItems = React.useMemo(() => {
        return (props.items || []).map(item => ({
            ...item,
            ...item.categoryPoints,
        }));
    }, [props.items]);

    const {items: sortedItems, requestSort, sortConfig} = useSortableData(preparedItems);

    if (props.loading && props.items.length === 0) {
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 px-4 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">
                <button onClick={() => requestSort("name")} className="flex-1 text-left hover:text-slate-600">Student Name{indicator("name")}</button>
                <button onClick={() => requestSort("isComplete")} className="w-28 shrink-0 text-center hover:text-slate-600">Status{indicator("isComplete")}</button>
                {categories.map((category) => (
                    <button key={category.categoryId} onClick={() => requestSort(category.categoryId)} className="w-24 shrink-0 text-center hover:text-slate-600">{category.name}{indicator(category.categoryId)}</button>
                ))}
                <div className="w-4 shrink-0" />
            </div>

            {sortedItems.map((row) => {
                const isOpen = !!expanded[row.userId]
                const initials = (row.name?.[0] || row.email[0] || "?").toUpperCase()
                return (
                    <div key={row.userId} className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div
                            onClick={() => setExpanded({...expanded, [row.userId]: !isOpen})}
                            className="flex cursor-pointer items-center gap-4 p-4"
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                {row.avatar
                                    ? <img src={row.avatar} className="h-9 w-9 shrink-0 rounded-full object-cover" alt="" />
                                    : <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-xs font-bold text-dark-blue-400">{initials}</div>
                                }
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-bold text-dark-blue-400">{row.name}</div>
                                    <div className="truncate text-xs text-slate-400">{row.email}</div>
                                </div>
                            </div>
                            <div className="w-28 shrink-0 text-center">
                                {row.isComplete
                                    ? <span className="rounded-full bg-mint-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">Complete</span>
                                    : <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">Incomplete</span>
                                }
                            </div>
                            {categories.map((category) => (
                                <div key={category.categoryId} className="w-24 shrink-0 text-center">
                                    <span className="rounded-full bg-sky-blue-400/15 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                                        {row[category.categoryId] ?? 0} pts
                                    </span>
                                </div>
                            ))}
                            <IconChevronDown size={15} stroke={2.3} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}/>
                        </div>
                        {isOpen && (
                            <div className="border-t border-slate-100 px-4 py-3">
                                <BadgeStack items={row.badges}/>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
