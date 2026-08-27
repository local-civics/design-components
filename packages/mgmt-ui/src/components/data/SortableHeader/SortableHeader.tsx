import * as React from 'react';
import {IconCaretUp, IconCaretDown} from "@tabler/icons";

/**
 * SortableHeaderProps
 */
export type SortableHeaderProps = {
    label: string
    sortKey: string
    // `key` is `string | number`, not just `string`, so this accepts useSortableData's
    // SortConfig<T> directly even when T has a string index signature (e.g. a row shape spread
    // with dynamic category-point fields) - keyof T resolves to `string | number` in that case.
    sortConfig: { key: string | number; direction: "asc" | "desc" | null }
    onSort: (key: string) => void
    align?: "center" | "right"
    className?: string
}

/**
 * A sortable column header button with a 3-glyph-state indicator: the active sort column shows a
 * single directional caret (accent-colored, stays visible on hover), every other sortable column
 * shows both carets stacked together to signal "clickable, not currently sorted." The neutral
 * carets have no explicit color of their own - they inherit the button's text color via
 * currentColor, so they darken together with the label on hover.
 * @param props
 * @constructor
 */
export function SortableHeader(props: SortableHeaderProps) {
    const active = props.sortConfig.key === props.sortKey
    const direction = active ? props.sortConfig.direction : null
    const justify = props.align === "right" ? "justify-end" : props.align === "center" ? "justify-center" : ""

    return (
        <button
            type="button"
            onClick={() => props.onSort(props.sortKey)}
            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 hover:text-slate-700 ${justify} ${props.className || ""}`}
        >
            <span>{props.label}</span>
            {active ? (
                direction === "desc"
                    ? <IconCaretDown size={12} stroke={2.5} className="shrink-0 text-sky-blue-400" />
                    : <IconCaretUp size={12} stroke={2.5} className="shrink-0 text-sky-blue-400" />
            ) : (
                <span className="flex shrink-0 flex-col -space-y-[3px]">
                    <IconCaretUp size={10} stroke={2.5} />
                    <IconCaretDown size={10} stroke={2.5} />
                </span>
            )}
        </button>
    )
}
