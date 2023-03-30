import * as React from 'react';
import {
    Navbar as NavbarCore,
    Avatar,
    Image,
    Center,
    createStyles,
    Group, Code, ScrollArea, Burger,
    Badge,
} from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconLogout,
    IconSwitchHorizontal, IconLambda, IconCategory2, IconAlbum, IconBuilding, IconVideo,
} from '@tabler/icons';
import {UserButton} from "../../users/UserButton/UserButton";
import {LinksGroup} from "../NavbarLinksGroups/NavbarLinksGroups";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        },

        navHeader: {
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                height: 71,
                position: 'absolute',
                top: 0,
            },
        },

        navBody: {
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                display: 'none',
            },
        },

        burger: {
            [theme.fn.largerThan('sm')]: {
                display: 'none',
            },
        },

        header: {
            padding: theme.spacing.md,
            paddingTop: 0,
            marginLeft: -theme.spacing.md,
            marginRight: -theme.spacing.md,
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        links: {
            marginLeft: -theme.spacing.md,
            marginRight: -theme.spacing.md,
        },

        user: {
            margin: theme.spacing.md,
            marginLeft: 0,
            marginRight: 0,
        },

        linksInner: {
            paddingBottom: theme.spacing.xl,
        },

        footer: {
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.md,
            borderTop: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        },

        active: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    }
});

/**
 * NavbarProps
 */
export interface NavbarProps {
    active: string
    version: string
    image: string
    name: string
    email: string
    links: Record<string, {notifications: number, href: string, hidden?: boolean}>
    trial?: boolean
    loading?: boolean
    onLogout: () => void;
    onGettingStarted: () => void;
    onSwitchAccounts?: () => void;
}

const data = [
    {label: 'Home', icon: IconHome2},
    {label: 'Dashboard', icon: IconGauge},
    {label: 'Classes', icon: IconCategory2},
    {label: 'Badges', icon: IconAlbum},
    {label: 'Lessons', icon: IconLambda},
    {label: 'Organization',
        icon: IconBuilding,
        links: [
            {label: 'Overview'},
            {label: 'People'},
        ],
    }
]

const TRIAL_PAGES = [
    'Home',
    'Lessons',
    'Badges',
]

export function Navbar(props: NavbarProps) {
    const { classes, cx } = useStyles();
    const [burgerOpen, setBurgerOpen] = React.useState(false)
    const toggle = () => setBurgerOpen(!burgerOpen)
    const links = data.map((item) => {
        const context = props.links[item.label] || {notifications: 0, href: ""}
        if(context.hidden || props.trial && TRIAL_PAGES.indexOf(item.label) === -1){
            return null
        }

        if(props.loading && item.label !== 'Home'){
            return null
        }

        return <LinksGroup
            key={item.label}
            active={props.active}
            {...item}
            {...context}
            links={(item.links || []).map((link) => {
                return {...link, ...props.links[`${item.label}/${link.label}`] || {notifications: 0, href: ""}}
            })}
        />
    });

    return (
        <>
            <NavbarCore width={{ sm: 300 }} p="md" className={cx(classes.navbar, {[classes.navHeader]: !burgerOpen})}>
                <NavbarCore.Section className={classes.header}>
                    <Group position="apart">
                        <Center>
                            <Avatar color="blue" radius="sm">
                                <div style={{ width: 15, marginLeft: 'auto', marginRight: 'auto' }}>
                                    <Image fit="contain" src="https://cdn.localcivics.io/brand/l.png"/>
                                </div>
                            </Avatar>
                        </Center>
                        <Group position="apart">
                            <Code sx={{ fontWeight: 700 }}>{props.version}</Code>
                            { !!props.trial && <Badge color="violet" radius="xs">Trial</Badge>}
                            <Burger opened={burgerOpen} onClick={toggle} className={classes.burger} size="sm" />
                        </Group>
                    </Group>
                </NavbarCore.Section>

                <div className={cx({[classes.navBody]: !burgerOpen})}>
                    { !props.loading && <UserButton
                        className={classes.user}
                        image={props.image}
                        name={props.name}
                        email={props.email}
                    /> }

                    <NavbarCore.Section grow className={classes.links} component={ScrollArea}>
                        <div className={classes.linksInner}>{links}</div>
                    </NavbarCore.Section>

                    { !props.loading && <NavbarCore.Section className={classes.footer}>
                        { props.trial && <a href="#" className={classes.link} onClick={(event) => {
                            event.preventDefault()
                            props.onGettingStarted()
                        }}>
                            <IconVideo className={classes.linkIcon} stroke={1.5} />
                            <span>Getting started</span>
                        </a>}

                        { !!props.onSwitchAccounts && <a href="#" className={classes.link} onClick={(event) => {
                            event.preventDefault()
                            props.onSwitchAccounts && props.onSwitchAccounts()
                        }}>
                            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                            <span>Change account</span>
                        </a>}

                        <a href="#" className={classes.link} onClick={(event) => {
                            event.preventDefault()
                            props.onLogout()
                        }}>
                            <IconLogout className={classes.linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </a>
                    </NavbarCore.Section> }
                </div>
            </NavbarCore>
        </>
    );
}