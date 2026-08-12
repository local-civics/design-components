import * as React from 'react';
import {IconChevronLeft, IconChevronRight} from "@tabler/icons";
import {Item} from "./Table";
import {Stack as FileStack} from "./FileStack";

/**
 * SubmissionDetailProps
 */
export type SubmissionDetailProps = {
    student: Item
    context?: string
    onBack: () => void
    onNav: (direction: 1 | -1) => void
}

const initials = (name: string) => name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase()

/**
 * The per-student review view opened from FileLocker's "Review Submission" buttons. Built from data
 * already available on the student/submissions shape - no status pill, no comment thread (neither
 * has any backing data in the API today).
 * @param props
 * @constructor
 */
export function SubmissionDetail(props: SubmissionDetailProps) {
    const {student} = props

    return (
        <div className="flex w-full flex-col gap-4 px-4 py-8">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <button onClick={props.onBack} className="font-bold text-sky-blue-400 hover:underline">File Locker</button>
                <span>/</span>
                <span className="font-bold text-dark-blue-400">{student.name}</span>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                {student.avatar
                    ? <img src={student.avatar} className="h-12 w-12 shrink-0 rounded-full object-cover" alt=""/>
                    : <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mint-400 to-dark-blue-400 text-sm font-bold text-white">
                        {initials(student.name)}
                    </div>}
                <div className="min-w-0 flex-1">
                    <div className="text-lg font-extrabold text-dark-blue-400">{student.name}</div>
                    <div className="mt-0.5 text-xs text-slate-400">
                        {student.email}{props.context ? ` · ${props.context}` : ""}
                    </div>
                </div>
                <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    {student.submissions.length} file{student.submissions.length === 1 ? "" : "s"}
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-extrabold text-dark-blue-400">Files</div>
                <div className="mt-2">
                    <FileStack items={student.submissions}/>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => props.onNav(-1)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                    <IconChevronLeft size={14} stroke={2}/>
                    Previous Submission
                </button>
                <button
                    onClick={() => props.onNav(1)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                    Next Submission
                    <IconChevronRight size={14} stroke={2}/>
                </button>
            </div>
        </div>
    )
}
