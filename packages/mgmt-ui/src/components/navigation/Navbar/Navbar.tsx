import * as React from 'react';
import { Navbar as NavbarCore, Avatar, Image, Center, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
import {
    TablerIcon,
    IconHome2,
    IconGauge,
    IconLogout,
    IconSwitchHorizontal, IconLambda, IconCategory2, IconAlbum, IconTooltip,
} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?(): void;
}

const data = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconCategory2, label: 'Groups' },
    { icon: IconAlbum, label: 'Badges' },
    { icon: IconLambda, label: 'Lessons' },
];

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const pseudoLinks = ["Logout", "Change account"]

export const isPseudoLink = (link: string) => pseudoLinks.indexOf(link) !== -1

/**
 * NavbarProps
 */
export interface NavbarProps {
    active?: string
    onClick: (label: string) => void
}

/**
 * Navbar
 * @param props
 * @constructor
 */
export const Navbar = (props: NavbarProps) => {
    const links = data.map((link) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={link.label === props.active}
            onClick={() => props.onClick && props.onClick(link.label)}
        />
    ));

    return (
        <NavbarCore width={{ base: 80 }} p="md">
            <Center>
                <Avatar color="blue" radius="sm">
                    <div style={{ width: 15, marginLeft: 'auto', marginRight: 'auto' }}>
                        <Image fit="contain" src="https://cdn.localcivics.io/brand/l.png"/>
                    </div>
                </Avatar>
            </Center>
            <NavbarCore.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </NavbarCore.Section>
            <NavbarCore.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink
                        icon={IconSwitchHorizontal}
                        label="Change account"
                        onClick={() => props.onClick && props.onClick("Change account")}
                    />
                    <NavbarLink
                        icon={IconLogout}
                        label="Logout"
                        onClick={() => props.onClick && props.onClick("Logout")}
                    />
                </Stack>
            </NavbarCore.Section>
        </NavbarCore>
    );
}