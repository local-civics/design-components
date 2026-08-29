import * as React from "react";
import { IconCaretDown, IconCaretUp } from "@tabler/icons";

/**
 * SortableHeaderProps
 */
export type SortableHeaderProps = {
  label: string;
  sortKey: string;
  sortConfig: { key: string | number; direction: "asc" | "desc" | null };
  onSort: (key: string) => void;
  align?: "center" | "right";
  className?: string;
};

/**
 * A sortable column header button with a 3-glyph-state indicator: the active sort column shows a
 * single directional caret (accent-colored, stays visible on hover), every other sortable column
 * shows both carets stacked together to signal "clickable, not currently sorted." Owns its full
 * text styling rather than relying on a parent's ambient style, since it's meant to be dropped
 * into many different header rows across the app, not just one.
 * @param props
 * @constructor
 */
export function SortableHeader(props: SortableHeaderProps) {
  const active = props.sortConfig.key === props.sortKey;
  const direction = active ? props.sortConfig.direction : null;
  const justify = props.align === "right" ? "justify-end" : props.align === "center" ? "justify-center" : "";

  return (
    <button
      type="button"
      onClick={() => props.onSort(props.sortKey)}
      className={`inline-flex items-center gap-1 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400 hover:text-slate-600 ${justify} ${
        props.className || ""
      }`}
    >
      <span>{props.label}</span>
      {active ? (
        direction === "desc" ? (
          <IconCaretDown size={12} stroke={2.5} className="shrink-0 text-sky-blue-400" />
        ) : (
          <IconCaretUp size={12} stroke={2.5} className="shrink-0 text-sky-blue-400" />
        )
      ) : (
        <span className="flex shrink-0 flex-col -space-y-[3px]">
          <IconCaretUp size={10} stroke={2.5} />
          <IconCaretDown size={10} stroke={2.5} />
        </span>
      )}
    </button>
  );
}
