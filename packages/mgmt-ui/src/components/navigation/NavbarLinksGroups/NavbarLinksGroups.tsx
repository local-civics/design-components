import * as React                                                                     from 'react';
import { useState }                                                                   from 'react';
import { Group, Badge, Box, Collapse, ThemeIcon, Text, UnstyledButton, createStyles } from '@mantine/core';
import { TablerIcon, IconChevronLeft, IconChevronRight }           from '@tabler/icons';
import {compact}                                                                      from "../../../utils/numbers";

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
    notifications: number
    href: string
    links?: { notifications: number, label: string, href: string;}[];
}

export function LinksGroup({ icon: Icon, href, label, initiallyOpened, links, active, notifications}: LinksGroupProps) {
    const { classes, theme, cx } = useStyles();
    const hasLinks = Array.isArray(links) && links.length > 0;
    const hasActiveLinks = Array.isArray(links) && links.map(l => !!active && active === `${label}/${l.label}`).reduce((a, b) => a || b, false)
    const [opened, setOpened] = useState(initiallyOpened || hasActiveLinks || false);

    React.useEffect(() => {
        setOpened(hasActiveLinks)
    }, [hasActiveLinks])

    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? links : []).map((link) => {
        return <Box
            className={cx(classes.link, { [classes.linkActive]: !!active && active === `${label}/${link.label}`})}
            key={link.label}>
            <Group position="apart" spacing={0}>
                <Text<'a'> component='a' href={link.href}>
                    {link.label}
                </Text>
                {!!link.notifications && (
                    <Badge size="sm" variant="filled" className={classes.badge}>
                        {compact(link.notifications)}
                    </Badge>
                )}
            </Group>
        </Box>
    });

    return (
        <>
            <Group
                className={cx(classes.control, {
                    [classes.linkActive]: !!active && !hasLinks && label === active,
                    [classes.controlButton]: hasLinks
                })}
                onClick={() => setOpened((o) => !o)}
                position="apart"
                spacing={0}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeIcon variant="light" size={30}>
                        <Icon className={classes.linkIcon} size={18} />
                    </ThemeIcon>
                    <Box ml="md">
                        <Text<'a'> component='a' href={href}>
                            {label}
                        </Text>
                    </Box>
                </Box>

                {!!notifications && (
                    <Badge size="sm" variant="filled" className={classes.badge}>
                        {compact(notifications)}
                    </Badge>
                )}

                {hasLinks && (
                    <ChevronIcon
                        className={classes.chevron}
                        size={14}
                        stroke={1.5}
                        style={{
                            transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                        }}
                    />
                )}
            </Group>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}