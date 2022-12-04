import {Loader, Center, ActionIcon, AppShell, Container, createStyles, Group, Image, TabsValue, Text, Title} from "@mantine/core";
import {DateRangePickerValue}                                                                                from "@mantine/dates";
import {IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin}                                            from "@tabler/icons";
import {useState}                                                                                            from "react";
import * as React                                                                                            from 'react';
import {
    BadgeUserItem
}                                                                                                            from "../../../dist/pages/Badges/Badge/BadgeUserTable";
import {
    BadgeItem
}                                                                                                            from "../../../dist/pages/Badges/BadgeTable";
import {Badges, BadgesData}                                                                                  from "../../pages/Badges/Badges";
import {
    GroupStackItem
}                                                                                                            from "../../pages/Groups/GroupsStack";
import {LessonUserItem}                                                                                      from "../../pages/Lessons/Lesson/LessonUserTable";
import {Lessons, LessonsData}                                                                                from "../../pages/Lessons/Lessons";
import {LessonItem}                                                                                          from "../../pages/Lessons/LessonTable";
import {AccountData, SwitchAccount}                                                                          from "./SwitchAccount/SwitchAccount";
import {isPseudoLink, Navbar}                                                                                from "../../components/navigation/Navbar/Navbar";
import {GroupUserItem}                                                                                       from "../../pages/Groups/Group/GroupUserTable";
import {Groups, GroupsData} from "../../pages/Groups/Groups";
import {Home}                              from "../../pages/Home/Home";
import {Dashboard, DashboardData} from "../../pages/Dashboard/Dashboard";
import {HomeData}                                   from "../../pages/Home/Home";

const useStyles = createStyles((theme) => ({
    footer: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        paddingLeft: theme.spacing.xl * 3,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    logo: {
        maxWidth: 200,

        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    description: {
        marginTop: 5,

        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    wrapper: {
        width: 160,
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: 3,
        paddingBottom: 3,

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    title: {
        fontSize: theme.fontSizes.md,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs / 2,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    social: {
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
        },
    },
}));

/**
 * MgmtData
 */
export type MgmtData = {
    loading: boolean
    navbar: {active: string}
    home: HomeData
    dashboard: DashboardData
    groups: GroupsData
    account: AccountData
    lessons: LessonsData
    badges: BadgesData
}

/**
 * MgmtMethods
 */
export type MgmtMethods = {
    onAccountChange: (next: string) => void;
    onDashboardBreakdownMetricChange: (next: string) => void;
    onDashboardDateRangeChange: (next: DateRangePickerValue) => void
    onDashboardGroupChange: (next: string) => void;
    onDashboardOverviewMetricChange: (next: string) => void;
    onDashboardTabChange: (next: TabsValue) => void;
    onHomeTimelineScrollBottom: () => void;
    onNavbarClick: (label: string) => void;
    onCreateGroup: (group: GroupStackItem) => void
    onCreateGroupUsers: (users: GroupUserItem[]) => void
    onDeleteGroup: (group: GroupStackItem) => void
    onDeleteGroupUser: (user: GroupUserItem) => void
    onEditGroup: (group: GroupStackItem) => void
    onViewGroupUser: (user: GroupUserItem) => void
    onGroupBackClick: () => void;
    onGroupUserRoleChange: (user: GroupUserItem, next: string | null) => void
    onGroupUserBackClick: () => void;
    onLessonAutocompleteChange: (next: string) => void
    onLessonGroupChange: (next: string) => void;
    onLessonClick: (lesson: LessonItem) => void
    onLessonPreview: (id: string) => void;
    onLessonTabChange: (tab: TabsValue) => void;
    onLessonUserClick: (user: LessonUserItem) => void;
    onLessonBackClick: () => void;
    onGroupUserTimelineScrollBottom: () => void;
    onBadgeAutocompleteChange: (next: string) => void
    onBadgePreview: (id: string) => void;
    onBadgeGroupChange: (next: string) => void;
    onBadgeClick: (badge: BadgeItem) => void
    onBadgeTabChange: (tab: TabsValue) => void;
    onBadgeUserClick: (user: BadgeUserItem) => void;
    onBadgeBackClick: () => void;

}

/**
 * MgmtProps
 */
export type MgmtProps = MgmtData & MgmtMethods

/**
 * Mgmt
 * @param props
 * @constructor
 */
export const Mgmt = (props: MgmtProps) => {
    const { classes } = useStyles();
    const account = useAccount(props.account, props.onAccountChange)
    const onNavbarClick = (next: string) => {
        switch (next){
        case "Change account":
            account.setChangeModalOpen(true)
            break
        }
        props.onNavbarClick && props.onNavbarClick(next)
    }
    const navbar = useNavbar(props.navbar.active, onNavbarClick)

    return <AppShell
        padding="xs"
        navbar={<Navbar
            key={navbar.key}
            active={navbar.active}
            onClick={navbar.onClick}/>
        }
        footer={<>{!account.opened && <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Group spacing="xs">
                        <div style={{ width: 15 }}>
                            <Image fit="contain" src="https://cdn.localcivics.io/brand/l.png"/>
                        </div>
                        <Title color="dimmed" size="h5">Local Civics</Title>
                    </Group>
                    <Text size="xs" color="dimmed" className={classes.description}>
                        We connect students to powerful civic learning experiences.
                    </Text>
                </div>
                <div className={classes.groups}>
                    <div className={classes.wrapper}>
                        <Text
                            className={classes.link}
                            component="a"
                            href="https://www.localcivics.io"
                            target="_blank"
                        >
                            About
                        </Text>
                        <Text
                            className={classes.link}
                            component="a"
                            href="https://www.localcivics.io/terms-of-service"
                            target="_blank"
                        >
                            Terms
                        </Text>
                        <Text
                            className={classes.link}
                            component="a"
                            href="https://www.localcivics.io/privacy-policy"
                            target="_blank"
                        >
                            Privacy
                        </Text>
                        <Text
                            className={classes.link}
                            component="a"
                            href="https://localcivics.notion.site/Help-Center-b52300f587b64fc0a61f512686e7626d"
                            target="_blank"
                        >
                            FAQ
                        </Text>
                    </div>
                </div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © {new Date().getFullYear()} Local Civics. All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon component="a" target="_blank" href="https://www.instagram.com/localcivics/" size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component="a" target="_blank" href="https://www.linkedin.com/company/localcivics" size="lg">
                        <IconBrandLinkedin size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon component="a" target="_blank" href="https://www.facebook.com/localcivics/" size="lg">
                        <IconBrandFacebook size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>}</>}
        styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
    >
        <div style={{ position: 'relative' }}>
            { (props.loading === null || account.opened) && <Center style={{ height: 400 }}><Loader/></Center> }
            { (props.loading !== null && !account.opened) && <Body {...props} active={navbar.active}/> }
        </div>
        <SwitchAccount
            opened={account.opened}
            data={account.data}
            onChange={account.onAccountChange}
            onClose={() => account.setChangeModalOpen(false)}
        />
    </AppShell>
}

const useAccount = (initial: AccountData, onAccountChange: (account: string) => void) => {
    const [changeModalOpen, setChangeModalOpen] = useState(false);
    const [active, setActive] = useState(initial.active);

    return {
        opened: changeModalOpen,
        data: {
            ...initial,
            active,
        },
        setChangeModalOpen,
        onAccountChange: (next: string) => {
            setActive(next)
            setChangeModalOpen(false)
            onAccountChange && onAccountChange(next)
        }
    }
}

const useNavbar = (initial: string, onClick: (label: string) => void) => {
    const [active, setActive] = useState(initial || "Home");

    return {
        key: active,
        active: active,
        onClick: (next: string) => {
            if(active !== next){
                if(!isPseudoLink(next)){
                    setActive(next)
                }
                onClick && onClick(next)
            }
        }
    }
}

const Body = (props: MgmtProps & {active: string}) => {
    switch (props.active){
    case 'Dashboard':
        return <Dashboard
            {...props.dashboard}
            onBreakdownMetricChange={props.onDashboardBreakdownMetricChange}
            onDateRangeChange={props.onDashboardDateRangeChange}
            onGroupChange={props.onDashboardGroupChange}
            onOverviewMetricChange={props.onDashboardOverviewMetricChange}
            onTabChange={props.onDashboardTabChange}
        />
    case 'Home':
        return <Home
            {...props.home}
            onTimelineScrollBottom={props.onHomeTimelineScrollBottom}
        />
    case 'Groups':
        return <Groups
            {...props.groups}
            onBackClick={props.onGroupBackClick}
            onCreateGroup={props.onCreateGroup}
            onCreateGroupUsers={props.onCreateGroupUsers}
            onDeleteGroup={props.onDeleteGroup}
            onDeleteGroupUser={props.onDeleteGroupUser}
            onEditGroup={props.onEditGroup}
            onViewGroupUser={props.onViewGroupUser}
            onGroupUserRoleChange={props.onGroupUserRoleChange}
            onGroupUserBackClick={props.onGroupUserBackClick}
            onTimelineScrollBottom={props.onGroupUserTimelineScrollBottom}
        />
    case 'Lessons':
        return <Lessons
            {...props.lessons}
            onBackClick={props.onLessonBackClick}
            onAutocompleteChange={props.onLessonAutocompleteChange}
            onGroupChange={props.onLessonGroupChange}
            onLessonClick={props.onLessonClick}
            onPreview={props.onLessonPreview}
            onTabChange={props.onLessonTabChange}
            onUserClick={props.onLessonUserClick}
        />
    case 'Badges':
        return <Badges
            {...props.badges}
            onBackClick={props.onBadgeBackClick}
            onAutocompleteChange={props.onBadgeAutocompleteChange}
            onGroupChange={props.onBadgeGroupChange}
            onBadgeClick={props.onBadgeClick}
            onPreview={props.onBadgePreview}
            onTabChange={props.onBadgeTabChange}
            onUserClick={props.onBadgeUserClick}
        />
    default:
        return null
    }
}