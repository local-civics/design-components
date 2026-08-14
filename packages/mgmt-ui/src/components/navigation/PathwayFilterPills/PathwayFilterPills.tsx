import * as React from 'react';

/**
 * PathwayFilterPillsProps
 */
export type PathwayFilterPillsProps = {
    pathways: { pathwayId: string, title: string }[]
    selected: string
    onChange: (pathwayId: string) => void
}

/**
 * A single-select row of pathway pills, shared by Badges/Lessons list pages. An empty `selected`
 * means "All" - the caller doesn't need a separate pathwayId for that state.
 * @param props
 * @constructor
 */
export function PathwayFilterPills(props: PathwayFilterPillsProps) {
    if (props.pathways.length === 0) {
        return null;
    }

    const pillClass = (active: boolean) =>
        `rounded-full border px-3.5 py-1.5 text-xs font-bold ${
            active
                ? "border-sky-blue-400/40 bg-sky-blue-400/20 text-dark-blue-400"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        }`;

    return (
        <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => props.onChange("")} className={pillClass(!props.selected)}>
                All
            </button>
            {props.pathways.map((p) => (
                <button
                    key={p.pathwayId}
                    type="button"
                    onClick={() => props.onChange(p.pathwayId)}
                    className={pillClass(props.selected === p.pathwayId)}
                >
                    {p.title}
                </button>
            ))}
        </div>
    );
}
