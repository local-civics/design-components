import * as React                                                                     from 'react';
import { Group, Box, ThemeIcon, Text, createStyles } from '@mantine/core';
import { TablerIcon}                              from '@tabler/icons';
import {Link}                                                                         from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        control: {
            fontWeight: 500,
            width: '100%',
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            fontSize: theme.fontSizes.sm,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },

        controlButton: {
            cursor: 'pointer',
        },

        badge: {
            pointerEvents: 'none',
        },

        link: {
            fontWeight: 500,
            display: 'block',
            textDecoration: 'none',
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
            paddingLeft: 31,
            marginLeft: 30,
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            borderLeft: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor})
                    .background,
                color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
                },
            },
        },

        chevron: {
            transition: 'transform 200ms ease',
        },

        linkIcon: {
            ref: icon,
        },
    }
});

interface LinksGroupProps {
    icon: TablerIcon;
    label: string;
    initiallyOpened?: boolean;
    active?: string
    href: string
}

export function LinksGroup({ icon: Icon, href, label, active}: LinksGroupProps) {
    const { classes, cx } = useStyles();
    return (
        <>
            <Group
                className={cx(classes.control, {
                    [classes.linkActive]: !!active && label === active,
                })}
                position="apart"
                spacing={0}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeIcon variant="light" size={30}>
                        <Icon className={classes.linkIcon} size={18} />
                    </ThemeIcon>
                    <Box ml="md">
                        <Text<typeof Link> component={Link} to={href}>
                            {label}
                        </Text>
                    </Box>
                </Box>
            </Group>
        </>
    );
}