import * as React                                                      from 'react'
import {Button, Stack} from '@mantine/core';
import {
    IconPlaylistAdd,
    IconClipboardCopy
}                                                                      from '@tabler/icons';

export type SplitButtonProps = {
    onAddMembersClick: () => void;
    onCopyClassLinkClick: () => void;
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
        </Stack>
    );
}