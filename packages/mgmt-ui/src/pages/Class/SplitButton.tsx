import * as React                                                      from 'react'
import {Button, Stack} from '@mantine/core';
import {
    IconPlaylistAdd,
    IconClipboardCopy, IconTableExport
}                                                                      from '@tabler/icons';

export type SplitButtonProps = {
    onAddMembersClick: () => void;
    onCopyClassLinkClick: () => void;
    onExportDataClick: () => void;
}

export const SplitButton = (props: SplitButtonProps) => {
    return (
        <Stack spacing="sm">
            <Button
                leftIcon={<IconPlaylistAdd size={14} />}
                onClick={props.onAddMembersClick}
            >
                Add students
            </Button>

            <Button
                leftIcon={<IconClipboardCopy size={14} />}
                onClick={props.onCopyClassLinkClick}
            >
                Copy class link
            </Button>
            <Button
                leftIcon={<IconTableExport size={14} />}
                onClick={props.onExportDataClick}
            >
                Export data (.csv)
            </Button>
        </Stack>
    );
}