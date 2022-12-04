import * as React from 'react';
import { Navbar as NavbarCore, Avatar, Image, Center, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
import {
    TablerIcon,
    IconHome2,
    IconGauge,
    IconLogout,
    IconSwitchHorizontal, IconLambda, IconCategory2, IconAlbum,
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
    onClick?: () => void;
}

const data = [
    { icon: IconHome2, label: 'Home', href: '/home' },
    { icon: IconGauge, label: 'Dashboard', href: '/dashboard' },
    { icon: IconCategory2, label: 'Groups', href: 'groups' },
    { icon: IconAlbum, label: 'Badges', href: '/badges' },
    { icon: IconLambda, label: 'Lessons', href: '/lessons' },
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

/**
 * NavbarProps
 */
export interface NavbarProps {
    active: string
    navigate: (to: string) => void;
    onLogout: () => void;
    onSwitchAccounts?: () => void;
}

/**
 * Navbar
 * @param props
 * @constructor
 */
export const Navbar = (props: NavbarProps) => {
    const links = data.map((link) => (
        <NavbarLink
            key={link.label}
            label={link.label}
            icon={link.icon}
            active={link.label === props.active}
            onClick={() => props.navigate(link.href)}
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
                        label="Switch accounts"
                        onClick={props.onSwitchAccounts}
                    />
                    <NavbarLink
                        icon={IconLogout}
                        label="Logout"
                        onClick={props.onLogout}
                    />
                </Stack>
            </NavbarCore.Section>
        </NavbarCore>
    );
}