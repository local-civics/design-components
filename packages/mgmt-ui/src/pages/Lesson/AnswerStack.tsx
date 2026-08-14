import * as React from 'react';
import {Link} from 'react-router-dom';

/**
 * Item
 */
export interface Item {
    questionName: string
    answer: string[]
}

/**
 * StackData
 */
export type StackData = {
    href: string
    items: Item[]
}

/**
 * StackProps
 */
export type StackProps = StackData

/**
 * Stack. The whole block is one link to the student's full response, same as before.
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    if (props.items.length === 0) {
        return null
    }

    return (
        <Link to={props.href} className="flex flex-col gap-4 no-underline">
            {props.items.map((row) => (
                <div key={row.questionName}>
                    <div className="text-sm font-bold text-dark-blue-400">{row.questionName}</div>
                    <div className="mt-1 text-sm text-slate-600">{row.answer.join(", ") || "No answer."}</div>
                </div>
            ))}
        </Link>
    );
}
