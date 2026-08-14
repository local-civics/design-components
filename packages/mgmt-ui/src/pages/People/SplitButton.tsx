import * as React from 'react'
import {IconPlaylistAdd, IconClipboardCopy} from '@tabler/icons';

/**
 * SplitButtonProps
 */
export type SplitButtonProps = {
    withOrganizationLink?: boolean
    onAddUsersClick: () => void;
    onCopyOrganizationLinkClick: () => void;
}

/**
 * SplitButton. The original hid "Copy organization link" behind a dropdown menu, only shown when
 * withOrganizationLink is true - flattened into a second always-visible button in that same case,
 * matching the plain multi-button pattern already used everywhere else in this package rather than
 * introducing the only dropdown menu in the restyled UI.
 * @param props
 * @constructor
 */
export const SplitButton = (props: SplitButtonProps) => {
    return (
        <div className="flex gap-2">
            <button
                type="button"
                onClick={props.onAddUsersClick}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3.5 py-2 text-xs font-bold text-dark-blue-400 shadow-[0_3px_12px_rgba(255,212,77,0.35)]"
            >
                <IconPlaylistAdd size={13} stroke={2} />
                Add members
            </button>
            {props.withOrganizationLink && (
                <button
                    type="button"
                    onClick={props.onCopyOrganizationLinkClick}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                    <IconClipboardCopy size={13} stroke={2} />
                    Copy organization link
                </button>
            )}
        </div>
    );
}
