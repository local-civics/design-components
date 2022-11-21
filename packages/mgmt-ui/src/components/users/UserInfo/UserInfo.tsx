import * as React                                                    from 'react';
import {Avatar, Text, Paper, Blockquote, Title, createStyles, Stack} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 34,
        fontWeight: 900,
        marginTop: 16,
        [theme.fn.smallerThan('sm')]: {
            fontSize: 24,
        },
    },
    description: {
        maxWidth: 600,
    },
}));

interface UserData {
    avatar?: string
    givenName: string
    familyName: string
    email: string
    job: string
    quote: string
}

interface UserInfoProps {
    variant?: "compact"
    data: UserData
}

/**
 * UserInfo
 * @constructor
 * @param props
 */
export const UserInfo = (props: UserInfoProps) => {
    const { classes } = useStyles();
    const name = props.data.givenName ? [props.data.givenName, props.data.familyName].join(' ').trim() : props.data.email
    const friendlyName = props.data.givenName ? props.data.givenName : "Me"

    if(props.variant === "compact"){
        return <>
            <Title className={classes.title}>
                {name}
            </Title>

            <Text color="dimmed" className={classes.description} mt="xs">
                {props.data.quote}
            </Text>
        </>
    }

    return (
        <>
            <Paper
                radius="md"
                withBorder
                p="lg"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                })}
            >
                <Avatar src={props.data.avatar} size={135} radius={120} mx="auto" />
                <Text align="center" size="lg" weight={500} mt="md">
                    {name}
                </Text>
                <Text align="center" color="dimmed" size="sm">
                    {props.data.email} • {props.data.job}
                </Text>
            </Paper>
            <Blockquote mt="xl" color="blue" cite={`– ${friendlyName}`}>
                {props.data.quote}
            </Blockquote>
        </>
    );
}