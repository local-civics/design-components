import * as React from 'react'
import {IconTableExport} from '@tabler/icons';

export type SplitButtonProps = {
    href: string
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

/**
 * Kept as its own component/name for continuity even though only one action renders today (Copy
 * link's trigger has been commented out since before this round's restyle - onCopyLinkClick stays
 * wired through in case it's re-enabled later, same as before).
 */
export const SplitButton = (props: SplitButtonProps) => {
    return (
        <button
            onClick={props.onExportDataClick}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-[#f5c300] px-4 py-2.5 text-xs font-extrabold text-dark-blue-400"
        >
            <IconTableExport size={14} stroke={2}/>
            Export data (.csv)
        </button>
    );
}
