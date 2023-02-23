import * as React                                        from 'react'
import { createStyles, Button, Menu, Group, ActionIcon } from '@mantine/core';
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
    noExport?: boolean
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

export const SplitButton = (props: SplitButtonProps) => {
    const { classes, theme } = useStyles();
    const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];

    return (
        <Group noWrap spacing={0}>
            <Button<typeof Link> component={Link} to={props.href}
                className={classes.button}
                variant="gradient"
            >
                Preview
            </Button>
            <Menu transition="pop" position="bottom-end">
                <Menu.Target>
                    <ActionIcon
                        variant="gradient"
                        color={theme.primaryColor}
                        size={36}
                        className={classes.menuControl}
                    >
                        <IconChevronDown size={16} stroke={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        icon={<IconClipboardCopy size={16} stroke={1.5} color={menuIconColor} />}
                        onClick={props.onCopyLinkClick}
                    >
                        Copy link
                    </Menu.Item>
                    {!props.noExport && <Menu.Item
                        icon={<IconTableExport size={16} stroke={1.5} color={menuIconColor} />}
                        onClick={props.onExportDataClick}
                    >
                        Export data (.csv)
                    </Menu.Item>}
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}