import {IconBackpack, IconBatteryEco, IconBooks} from "@tabler/icons";
import * as React                                                                           from 'react';
import {Modal, SimpleGrid, UnstyledButton, Card, ScrollArea, Text, createStyles, Center, Loader} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 34,
        fontWeight: 900,
        [theme.fn.smallerThan('sm')]: {
            fontSize: 24,
        },
    },

    description: {
        maxWidth: 600,
        margin: 'auto',

        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    card: {
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: `${theme.shadows.md} !important`,
            transform: 'scale(1.02)',
        },
    },

    cardTitle: {
        '&::after': {
            content: '""',
            display: 'block',
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
        },
    },
}));

/**
 * AccountItem
 */
export type AccountItem = {
    accountId: string
    name: string
    isAdmin?: boolean
    isGroupAdmin?: boolean
}

/**
 * SwitchAccountProps
 */
export type SwitchAccountProps = {
    opened: boolean
    account: string
    loading: boolean
    accounts: AccountItem[]
    onClick: (account: string) => void;
    onClose: () => void;
}

/**
 * SwitchAccount
 * @param props
 * @constructor
 */
export const SwitchAccount = (props: SwitchAccountProps) => {
    const { classes, theme } = useStyles();

    const options = props.accounts.map(a => {
        return <UnstyledButton onClick={() => props.onClick && props.onClick(a.accountId)} key={a.accountId} p={theme.spacing.md}>
            <Card withBorder shadow="md" radius="md" className={classes.card} p="xl">
                { a.isAdmin && <><IconBatteryEco size={50} stroke={2} color={theme.fn.primaryColor()}/></> }
                { a.isGroupAdmin && !a.isAdmin && <><IconBooks size={50} stroke={2} color={theme.fn.primaryColor()}/></>}
                { !a.isAdmin && !a.isGroupAdmin && <><IconBackpack size={50} stroke={2} color={theme.fn.primaryColor()}/></>}

                <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
                    {a.name}
                </Text>
                <Text size="sm" color="dimmed" mt="sm">
                    {a.isAdmin ? "Admin" : a.isGroupAdmin ? "Educator" : "Student"}
                </Text>
            </Card>
        </UnstyledButton>
    })

    return <Modal centered
                  fullScreen
                  opened={props.opened}
                  onClose={() => props.onClose && props.onClose()}
                  size="sm"
    >
        <div style={{ position: 'relative' }}>
            { props.loading && <Center style={{ height: 400 }}><Loader/></Center> }
            { !props.loading && <ScrollArea.Autosize maxHeight={600}>
                <SimpleGrid p={20} cols={3} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                    {options}
                </SimpleGrid>
            </ScrollArea.Autosize>
            }
        </div>
    </Modal>
}