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
    // Joined onto this student's own row by getLessonActivity() - present whenever they've left a
    // reflection on this lesson, independent of whether they've answered any question-format item
    // (either can be present without the other). There's no separate "By reflection" tab to show
    // these in anymore - they render inline with the question answers instead.
    reflection?: string
    rating?: number
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
 * Also never renders nothing: a student with neither recorded question/answer pairs nor a
 * reflection (e.g. one who's done other work on the lesson but hasn't touched its question-format
 * items or reflection prompt yet) still shows an honest message rather than silently rendering an
 * empty block.
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    const hasAnswers = props.items.length > 0
    const hasReflection = !!props.reflection

    return (
        <Link to={props.href} state={props.state} className="flex flex-col gap-4 no-underline">
            {hasAnswers ? (
                props.items.map((row) => (
                    <div key={row.questionName}>
                        <div className="text-sm font-bold text-dark-blue-400">{row.questionName}</div>
                        <div className="mt-1 text-sm text-slate-600">{row.answer.join(", ") || "No answer."}</div>
                    </div>
                ))
            ) : !hasReflection ? (
                <div className="text-sm font-bold text-dark-blue-400">No question responses recorded yet.</div>
            ) : null}

            {hasReflection && (
                <div>
                    <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-bold text-dark-blue-400">Reflection</div>
                        {!!props.rating && (
                            <div className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                                {props.rating}
                            </div>
                        )}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{props.reflection}</div>
                </div>
            )}

            <div className="text-xs font-bold text-dark-blue-400 hover:underline">View full response →</div>
        </Link>
    );
}
