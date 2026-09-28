import * as React from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

/**
 * ExpandableBodyProps
 */
export type ExpandableBodyProps = {
  // The height cap while collapsed, as a Tailwind class (e.g. "max-h-[26rem]"). Written out in the
  // calling file so Tailwind's scanner sees the literal class.
  collapsedClassName: string;
  // Changes whenever the rendered content changes (tab, layout, item count), so overflow is
  // re-measured and the collapsed scroll position goes back to the top.
  contentKey: string;
  expandLabel?: string;
  collapseLabel?: string;
  children: React.ReactNode;
};

/**
 * The body of a My Profile dashboard card, capped at a fixed height with its own scrollbar so a long
 * list (70+ badges) doesn't stretch the whole page. When the content is taller than the cap, a
 * "Show all" bar under it removes the cap; "Show less" puts it back. Content that fits shows no bar,
 * so a short card looks exactly as it did before.
 *
 * Overflow is measured when contentKey changes and on window resize. The cards' tiles have fixed
 * sizes, so the content height only changes when the data, tab or layout does.
 * @param props
 * @constructor
 */
export const ExpandableBody = (props: ExpandableBodyProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [overflows, setOverflows] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || expanded) {
      return;
    }
    el.scrollTop = 0;
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [props.contentKey, expanded]);

  const showFooter = expanded || overflows;

  return (
    <>
      <div className="relative flex-1">
        <div
          ref={ref}
          className={`relative h-full p-4 ${expanded ? "" : `${props.collapsedClassName} overflow-y-auto`}`}
        >
          {props.children}
        </div>
        {!expanded && overflows && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {showFooter && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-1 border-t border-slate-100 py-2 text-xs font-bold text-sky-blue-400 hover:bg-slate-50"
        >
          {expanded ? props.collapseLabel || "Show less" : props.expandLabel || "Show all"}
          {expanded ? <IconChevronUp size={14} stroke={2} /> : <IconChevronDown size={14} stroke={2} />}
        </button>
      )}
    </>
  );
};
