import * as React                                        from 'react'
import { createStyles, Button, Stack, Menu, Group, ActionIcon } from '@mantine/core';
import {
    IconChevronDown,
    IconPlaylistAdd,
    IconClipboardCopy, IconTableExport
}                                                        from '@tabler/icons';
import {Link}                                            from "react-router-dom";

const useStyles = createStyles((theme) => ({
    button: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginLeft: 0,
        marginRight: 0,
    },

    menuControl: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: 0,
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}));

export type SplitButtonProps = {
    href: string
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

export const SplitButton = (props: SplitButtonProps) => {
    const { classes, theme } = useStyles();
    const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];

    return (
        <Stack spacing="sm">
            <Button<typeof Link> component={Link} to={props.href}
                className={classes.button}
                variant="gradient"
            >
                Preview
            </Button>
            <Button
                leftIcon={<IconClipboardCopy size={14} />}
                onClick={props.onCopyLinkClick}
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