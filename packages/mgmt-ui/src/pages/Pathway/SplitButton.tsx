import * as React from 'react'
import {Link} from "react-router-dom";
import {IconClipboardCopy, IconTableExport} from '@tabler/icons';

/**
 * SplitButtonProps
 */
export type SplitButtonProps = {
    href: string
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
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3.5 py-2 text-xs font-bold text-dark-blue-400 shadow-[0_3px_12px_rgba(255,212,77,0.35)]"
            >
                <IconTableExport size={13} stroke={2} />
                Export data (.csv)
            </button>
        </div>
    );
}
