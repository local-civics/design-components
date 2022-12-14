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

export type UserInfoProps = {
    variant?: "compact"
    name: string
    impactStatement: string
}

/**
 * UserInfo
 * @constructor
 * @param props
 */
export const UserInfo = (props: UserInfoProps) => {
    const { classes } = useStyles();
    return <>
        <Title className={classes.title}>
            {props.name}
        </Title>

        <Text color="dimmed" className={classes.description} mt="xs">
            {props.impactStatement}
        </Text>
    </>
}