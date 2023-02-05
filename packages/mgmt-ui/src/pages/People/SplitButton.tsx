import * as React from 'react'
import { createStyles, Button, Menu, Group, ActionIcon } from '@mantine/core';
import {
    IconChevronDown,
    IconPlaylistAdd,
    IconClipboardCopy
}                                                        from '@tabler/icons';

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
    withOrganizationLink?: boolean
    onAddUsersClick: () => void;
    onCopyOrganizationLinkClick: () => void;
}

export const SplitButton = (props: SplitButtonProps) => {
    const { classes, theme } = useStyles();
    const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];

    const hasMenu = !!props.withOrganizationLink

    return (
        <Group noWrap spacing={0}>
            <Button
                className={hasMenu ? classes.button: ""}
                leftIcon={<IconPlaylistAdd size={14} />}
                onClick={props.onAddUsersClick}
            >
                Add members
            </Button>
            { hasMenu && <Menu transition="pop" position="bottom-end">
                <Menu.Target>
                    <ActionIcon
                        variant="filled"
                        color={theme.primaryColor}
                        size={36}
                        className={classes.menuControl}
                    >
                        <IconChevronDown size={16} stroke={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    { !!props.withOrganizationLink && <Menu.Item
                        icon={<IconClipboardCopy size={16} stroke={1.5} color={menuIconColor} />}
                        onClick={props.onCopyOrganizationLinkClick}
                    >
                        Copy organization link
                    </Menu.Item> }
                </Menu.Dropdown>
            </Menu> }
        </Group>
    );
}