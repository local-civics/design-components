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
    // Carried through to the block's own <Link state={...}> - see Pathway/BadgeStack.tsx's
    // identical field for the full rationale.
    state?: any
}

/**
 * StackProps
 */
export type StackProps = StackData

/**
 * Stack. The whole block is one link to the student's full response - but unlike Badge/LessonStack's
 * short, conventionally-blue lesson-name links, there's no single short label to color here (a
 * question/answer preview reads as prose, not a list row), so nothing about it visually signals
 * "this is clickable" on its own. The trailing "View full response" line exists specifically to fix
 * that - it's the one piece of this block styled like every other link in the app (dark-blue,
 * underline on hover), so the block's own click-through is discoverable rather than accidental.
 * Also never renders nothing: a lesson with zero recorded question/answer pairs (e.g. one where the
 * student hasn't touched the question-format items yet, even if they've done other work on the
 * lesson) used to return null here - silently unreachable, with no way to tell why. It now still
 * links through, worded honestly instead of implying there's a real preview to show.
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    if (props.items.length === 0) {
        return (
            <Link to={props.href} state={props.state} className="block text-sm font-bold text-dark-blue-400 no-underline hover:underline">
                No question responses recorded yet - view full response →
            </Link>
        )
    }

    return (
        <Link to={props.href} state={props.state} className="flex flex-col gap-4 no-underline">
            {props.items.map((row) => (
                <div key={row.questionName}>
                    <div className="text-sm font-bold text-dark-blue-400">{row.questionName}</div>
                    <div className="mt-1 text-sm text-slate-600">{row.answer.join(", ") || "No answer."}</div>
                </div>
            ))}
            <div className="text-xs font-bold text-dark-blue-400 hover:underline">View full response →</div>
        </Link>
    );
}
