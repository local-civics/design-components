import * as React from 'react';
import {IconPointer} from '@tabler/icons';
import {Link} from "react-router-dom";

/**
 * AccessCodeProps
 */
export type AccessCodeProps = {
    value: string
    peopleLink: string
    onCopyCode: () => void;
}

/**
 * AccessCode
 * @param props
 * @constructor
 */
export function AccessCode(props: AccessCodeProps) {
    return (
        <div className="max-w-[460px]">
            <h2 className="text-lg font-extrabold text-dark-blue-400">Access code</h2>
            <p className="text-sm text-slate-500">Grant access to join your organization</p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <input
                    value={props.value}
                    readOnly
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-dark-blue-400"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <Link to={props.peopleLink} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 no-underline hover:text-slate-700">
                        <IconPointer size={12} stroke={1.5} />
                        See people in my organization
                    </Link>
                    <button
                        type="button"
                        onClick={props.onCopyCode}
                        className="rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-4 py-2 text-xs font-bold text-dark-blue-400 shadow-[0_3px_12px_rgba(255,212,77,0.35)]"
                    >
                        Copy code
                    </button>
                </div>
            </div>
        </div>
    );
}
