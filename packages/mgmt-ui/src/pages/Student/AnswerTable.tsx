import * as React from 'react';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item. One entry per lesson this student has any activity record for - not per question, and not
 * split from a separate reflection entry. Replaces the old separate answers[]/reflections[] shapes,
 * which each silently dropped lessons the other didn't care about (see getStudent() in
 * useOrganization.ts for the full rationale).
 */
export interface Item {
    lessonId: string
    lessonName: string
    badgeName?: string
    // Joined by getStudent() - undefined when this lesson's badge (if any) doesn't belong to a
    // pathway.
    pathwayId?: string
    pathwayName?: string
    href: string
    isComplete: boolean
    // At least one answered question, or a non-empty reflection - independent of isComplete, since
    // a lesson can be submitted with nothing recorded (rare) or have real in-progress work without
    // ever being formally submitted.
    hasResponses: boolean
    questions: {questionName: string, answer: string[]}[]
    reflection: string
    rating: number | string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * TableProps
 */
export type TableProps = TableData

/**
 * Table. One card per lesson - question/answer pairs and, when present, the lesson's own reflection
 * and rating render together in the same card, replacing what used to be two separate tabs (My
 * answers, My reflections). Incoming order (badge, then curriculum position - see getStudent() in
 * useOrganization.ts) determines card order; the caller (Student.tsx) applies any pathway/status
 * filtering before items reach this component.
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No lessons to display"
            description="There has not been any lesson progress just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 px-4">
                <SortableHeader label="Lesson Name" sortKey="lessonName" sortConfig={sortConfig} onSort={requestSort} className="flex-1" />
                <SortableHeader label="Status" sortKey="isComplete" sortConfig={sortConfig} onSort={requestSort} align="center" className="w-28 shrink-0" />
            </div>

            <div className="flex flex-col gap-3">
                {sortedItems.map((row) => {
                    const subtitleParts = [row.badgeName, row.pathwayName ? `${row.pathwayName} pathway` : undefined].filter(Boolean)
                    return (
                        <div key={row.lessonId} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
                                <div className="min-w-0">
                                    <Link to={row.href} className="text-sm font-bold text-dark-blue-400 no-underline hover:underline">{row.lessonName}</Link>
                                    {subtitleParts.length > 0 && <div className="mt-1 text-xs text-slate-500">{subtitleParts.join(" · ")}</div>}
                                </div>
                                <span className={`w-28 shrink-0 rounded-full px-2.5 py-1 text-center text-[10px] font-bold uppercase tracking-wide ${row.isComplete ? "bg-mint-100 text-dark-blue-400" : "bg-slate-100 text-slate-500"}`}>
                                    {row.isComplete ? "Complete" : "Incomplete"}
                                </span>
                            </div>

                            {row.questions.length === 0 && !row.reflection ? (
                                <div className="px-5 py-4 text-xs text-slate-400">No responses recorded yet.</div>
                            ) : (
                                <>
                                    {row.questions.map((q, i) => (
                                        <div
                                            key={q.questionName}
                                            className={`px-5 py-4 ${i < row.questions.length - 1 || row.reflection ? "border-b border-slate-100" : ""}`}
                                        >
                                            <div className="text-xs font-semibold text-slate-500">{q.questionName}</div>
                                            <div className="mt-1 text-xs text-slate-600">{q.answer.join(", ")}</div>
                                        </div>
                                    ))}
                                    {row.reflection && (
                                        <div className="flex items-start justify-between gap-4 px-5 py-4">
                                            <div className="min-w-0">
                                                <div className="text-xs font-semibold text-slate-500">Reflection</div>
                                                <div className="mt-1 text-xs text-slate-600">{row.reflection}</div>
                                            </div>
                                            {!!row.rating && (
                                                <div className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">
                                                    {row.rating.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
