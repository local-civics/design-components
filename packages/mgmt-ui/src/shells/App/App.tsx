import {Loader, Center, ActionIcon, AppShell, Container, createStyles, Group, Image, Text, Title} from "@mantine/core";
import {IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin}                                            from "@tabler/icons";
import {useState}                                                                                            from "react";
import * as React                                from 'react';
import {AccountItem, SwitchAccount} from "./SwitchAccount/SwitchAccount";
import {Navbar, NavbarProps}                     from "../../components/navigation/Navbar/Navbar";

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

export {SwitchAccount, AccountItem, Navbar}

/**
 * AppProps
 */
export type AppProps = {
    loading: boolean
    account: string
    accounts: AccountItem[]

    navbar: React.ReactElement<NavbarProps>
    page: React.ReactNode
    onAccountChange: (account: string) => void;
}

/**
 * App
 * @param props
 * @constructor
 */
export const App = (props: AppProps) => {
    const { classes } = useStyles();
    const account = useAccount(props.account, props.accounts, props.onAccountChange)

    return <AppShell
        padding="xs"
        navbar={<Navbar
            active={props.navbar.props.active}
            navigate={props.navbar.props.navigate}
            onLogout={props.navbar.props.onLogout}
            onSwitchAccounts={() => account.setChangeModalOpen(true)}/>
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
            { (props.loading || account.opened) && <Center style={{ height: 400 }}><Loader/></Center> }
            { (!props.loading && !account.opened) && props.page }
        </div>
        <SwitchAccount
            opened={account.opened}
            account={account.account}
            accounts={account.accounts}
            onChange={account.onAccountChange}
            onClose={() => account.setChangeModalOpen(false)}
        />
    </AppShell>
}

const useAccount = (account: string, accounts: AccountItem[], onAccountChange: (account: string) => void) => {
    const accountsKey = JSON.stringify(accounts)
    const [changeModalOpen, setChangeModalOpen] = useState(false);
    const [active, setActive] = useState(account);

    React.useEffect(() => {
        setActive(account)
    }, [account, accountsKey])

    return {
        opened: changeModalOpen,
        account: active,
        accounts: accounts,
        setChangeModalOpen,
        onAccountChange: (account: string) => {
            setActive(account)
            setChangeModalOpen(false)
            onAccountChange(account)
        }
    }
}