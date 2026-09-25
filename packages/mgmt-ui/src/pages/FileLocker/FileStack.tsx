import * as React from 'react';
import {IconDownload, IconMessageCircle2} from "@tabler/icons";

export interface Item {
    link: string
    badgeName: string
    badgeId?: string
    lessonName: string
    lessonId?: string
    pathwayName?: string
    pathwayId?: string
    question: string
}

export type StackProps = {
    items: Item[]
    hideBadge?: boolean
    hideLesson?: boolean
    hidePathway?: boolean
    onBadgeClick?: (badgeId: string) => void
    onLessonClick?: (lessonId: string) => void
    onPathwayClick?: (pathwayId: string) => void
    onComment?: (row: Item) => void
}

/**
 * The per-file list shown both inline (Table.tsx's row-expansion) and inside SubmissionDetail's
 * full review view. Which columns render, and in what order, follows the real Pathway -> Badge ->
 * Lesson -> Question hierarchy left to right - whichever level the calling tab has already fixed
 * (shown once at that tab's group-card level instead - see FileLocker.tsx's per-tab hide* flags)
 * simply drops out of the sequence, it never reorders what's left. Header and every row are direct
 * children of one shared grid (not one grid per row) so column tracks are computed once across all
 * content - a per-row grid would let each row's "auto"-sized action column resolve to a different
 * width than the empty header cell above it, drifting the columns out of alignment. View/Download
 * both point at the same existing `link` - there's no separate filename/size data available (the
 * link is an opaque storage key, not a real filename), so `question` doubles as the file's label
 * the way it already does today.
 */
export function Stack(props: StackProps) {
    const {items, hideBadge, hideLesson, hidePathway, onBadgeClick, onLessonClick, onPathwayClick, onComment} = props
    if (!items.length) return null;

    // Columns follow the real Pathway -> Badge -> Lesson -> Question hierarchy, left to right,
    // with whichever levels the calling tab has already fixed (hidden here) simply dropped out of
    // the sequence rather than reordered - Question is the leaf, so it always sits immediately
    // before the action column, not first.
    const columns = [
        !hidePathway && "minmax(0,1.3fr)",
        !hideBadge && "minmax(0,1.3fr)",
        !hideLesson && "minmax(0,1.3fr)",
        "minmax(0,2fr)",
        "auto",
    ].filter(Boolean).join(" ")

    const headerCell = "border-b border-slate-100 pb-2 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400"
    const dataCell = "py-3"

    return (
        <div className="grid items-center gap-x-3" style={{gridTemplateColumns: columns}}>
            {!hidePathway && <div className={headerCell}>Pathway</div>}
            {!hideBadge && <div className={headerCell}>Badge</div>}
            {!hideLesson && <div className={headerCell}>Lesson</div>}
            <div className={headerCell}>Question</div>
            <div className={headerCell}/>

            {items.map((row, i) => {
                const rowBorder = i > 0 ? "border-t border-slate-100" : ""
                return (
                    <React.Fragment key={i}>
                        {!hidePathway && (
                            row.pathwayId && onPathwayClick ? (
                                <button type="button" onClick={() => onPathwayClick(row.pathwayId as string)} className={`${dataCell} ${rowBorder} truncate text-left text-[11px] font-semibold text-sky-blue-400 hover:underline`}>
                                    {row.pathwayName || "—"}
                                </button>
                            ) : (
                                <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.pathwayName || "—"}</div>
                            )
                        )}
                        {!hideBadge && (
                            row.badgeId && onBadgeClick ? (
                                <button type="button" onClick={() => onBadgeClick(row.badgeId as string)} className={`${dataCell} ${rowBorder} truncate text-left text-[11px] font-semibold text-sky-blue-400 hover:underline`}>
                                    {row.badgeName}
                                </button>
                            ) : (
                                <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.badgeName}</div>
                            )
                        )}
                        {!hideLesson && (
                            row.lessonId && onLessonClick ? (
                                <button type="button" onClick={() => onLessonClick(row.lessonId as string)} className={`${dataCell} ${rowBorder} truncate text-left text-[11px] font-semibold text-sky-blue-400 hover:underline`}>
                                    {row.lessonName}
                                </button>
                            ) : (
                                <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.lessonName}</div>
                            )
                        )}
                        <div className={`${dataCell} ${rowBorder} text-xs font-semibold text-dark-blue-400`}>{row.question}</div>
                        <div className={`${dataCell} ${rowBorder} flex shrink-0 gap-2`}>
                            {onComment && (
                                <button
                                    type="button"
                                    onClick={() => onComment(row)}
                                    className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
                                >
                                    <IconMessageCircle2 size={12} stroke={2}/>
                                    Comment
                                </button>
                            )}
                            <a
                                href={row.link}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 no-underline hover:bg-slate-50"
                            >
                                <IconDownload size={12} stroke={2}/>
                                Download
                            </a>
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
}
