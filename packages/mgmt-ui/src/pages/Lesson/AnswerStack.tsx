import * as React from 'react';
import {Link} from 'react-router-dom';
import {AnswerValue} from "../../components/data/AnswerValue/AnswerValue";

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
 * Stack. A student's recorded answers and reflection on this lesson, with a "View full response"
 * link to their full response. Only that link navigates - the block used to be one big link, which
 * meant an uploaded file couldn't be a link of its own and showed as a raw address. Answers go
 * through AnswerValue, so files and pasted links open directly from here.
 * Also never renders nothing: a student with neither recorded question/answer pairs nor a
 * reflection (e.g. one who's done other work on the lesson but hasn't touched its question-format
 * items or reflection prompt yet) still shows an honest message rather than silently rendering an
 * empty block.
 * @param props
 * @constructor
 */
export function Stack(props: StackProps) {
    const hasAnswers = props.items.length > 0
    const hasReflection = !!props.reflection

    return (
        <div className="flex flex-col gap-4">
            {hasAnswers ? (
                props.items.map((row) => (
                    <div key={row.questionName}>
                        <div className="text-sm font-bold text-dark-blue-400">{row.questionName}</div>
                        <AnswerValue answer={row.answer} emptyText="No answer." className="mt-1 text-sm text-slate-600" />
                    </div>
                ))
            ) : !hasReflection && !props.rating ? (
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

            {/* A rating can be left without a reflection; it used to show only inside the
                reflection block. */}
            {!hasReflection && !!props.rating && (
                <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-bold text-dark-blue-400">Rating</div>
                    <div className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                        {props.rating}
                    </div>
                </div>
            )}

            <Link to={props.href} state={props.state} className="w-fit text-xs font-bold text-dark-blue-400 no-underline hover:underline">
                View full response →
            </Link>
        </div>
    );
}
