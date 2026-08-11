import * as React from 'react';
import {IconDownload, IconExternalLink} from "@tabler/icons";

export interface Item {
    link: string
    badgeName: string
    lessonName: string
    pathwayName?: string
    question: string
}

export type StackProps = {
    items: Item[]
    hideBadge?: boolean
    hideLesson?: boolean
    hidePathway?: boolean
}

/**
 * The per-file list shown both inline (Table.tsx's row-expansion) and inside SubmissionDetail's
 * full review view. Which columns render depends on which level of the Pathway -> Badge -> Lesson
 * -> Question hierarchy the calling tab has already fixed (shown once at that tab's group-card
 * level instead - see FileLocker.tsx's per-tab hide* flags). Header and every row are direct
 * children of one shared grid (not one grid per row) so column tracks are computed once across all
 * content - a per-row grid would let each row's "auto"-sized action column resolve to a different
 * width than the empty header cell above it, drifting the columns out of alignment. View/Download
 * both point at the same existing `link` - there's no separate filename/size data available (the
 * link is an opaque storage key, not a real filename), so `question` doubles as the file's label
 * the way it already does today.
 */
export function Stack(props: StackProps) {
    const {items, hideBadge, hideLesson, hidePathway} = props
    if (!items.length) return null;

    const columns = [
        "minmax(0,2fr)",
        !hidePathway && "minmax(0,1.3fr)",
        !hideLesson && "minmax(0,1.3fr)",
        !hideBadge && "minmax(0,1.3fr)",
        "auto",
    ].filter(Boolean).join(" ")

    const headerCell = "border-b border-slate-100 pb-2 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400"
    const dataCell = "py-3"

    return (
        <div className="grid items-center gap-x-3" style={{gridTemplateColumns: columns}}>
            <div className={headerCell}>Question</div>
            {!hidePathway && <div className={headerCell}>Pathway</div>}
            {!hideLesson && <div className={headerCell}>Lesson</div>}
            {!hideBadge && <div className={headerCell}>Badge</div>}
            <div className={headerCell}/>

            {items.map((row, i) => {
                const rowBorder = i > 0 ? "border-t border-slate-100" : ""
                return (
                    <React.Fragment key={i}>
                        <div className={`${dataCell} ${rowBorder} text-xs font-semibold text-dark-blue-400`}>{row.question}</div>
                        {!hidePathway && <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.pathwayName || "—"}</div>}
                        {!hideLesson && <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.lessonName}</div>}
                        {!hideBadge && <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.badgeName}</div>}
                        <div className={`${dataCell} ${rowBorder} flex shrink-0 gap-2`}>
                            <a
                                href={row.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 no-underline hover:bg-slate-50"
                            >
                                <IconExternalLink size={12} stroke={2}/>
                                Preview
                            </a>
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
