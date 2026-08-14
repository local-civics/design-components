import * as React from 'react';
import {Link} from "react-router-dom";

/**
 * Item
 */
export interface Item {
    lessonName: string
    completion: number
    isStarted?: boolean
    href: string
}

/**
 * StackData
 */
export type StackData = {
    items: Item[]
}

/**
 * StackProps
 */
export type StackProps = StackData

/**
 * Stack
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    if (props.items.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-2">
            {props.items.map((row) => (
                <div key={row.lessonName} className="flex items-center justify-between gap-4 py-1.5">
                    <Link to={row.href} className="text-sm font-bold text-dark-blue-400 no-underline hover:underline">{row.lessonName}</Link>
                    {row.completion >= 1 && <span className="shrink-0 rounded-full bg-mint-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">Complete</span>}
                    {row.completion === 0 && !row.isStarted && <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">Not started</span>}
                    {row.completion > 0 && row.completion < 1 && <span className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">{Math.round((row.completion + Number.EPSILON) * 100)}% Complete</span>}
                </div>
            ))}
        </div>
    );
}
