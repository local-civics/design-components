import * as React from 'react'
import {Link} from "react-router-dom";
import {IconClipboardCopy, IconTableExport} from '@tabler/icons';

/**
 * SplitButtonProps
 */
export type SplitButtonProps = {
    href: string
    // True while the page's own activity fan-out (student/lesson completion data) is still loading -
    // the header/title resolve first and the page stops showing its own loading overlay well before
    // this second fetch finishes, so without this the button was clickable into a header-only CSV.
    exportDisabled?: boolean
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

/**
 * SplitButton
 * @param props
 * @constructor
 */
export const SplitButton = (props: SplitButtonProps) => {
    return (
        <div className="flex gap-2">
            <Link
                to={props.href}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 no-underline hover:bg-slate-50"
            >
                Preview
            </Link>
            <button
                type="button"
                onClick={props.onCopyLinkClick}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
                <IconClipboardCopy size={13} stroke={2} />
                Copy link
            </button>
            <button
                type="button"
                onClick={props.onExportDataClick}
                disabled={props.exportDisabled}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3.5 py-2 text-xs font-bold text-dark-blue-400 shadow-[0_3px_12px_rgba(255,212,77,0.35)] disabled:cursor-not-allowed disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
                <IconTableExport size={13} stroke={2} />
                {props.exportDisabled ? "Preparing data…" : "Export data (.csv)"}
            </button>
        </div>
    );
}
