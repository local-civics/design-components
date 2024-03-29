import * as React                                              from 'react'
import { createStyles, Text, Title, Image } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.xl * 2,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        border: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
        }`,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            flexDirection: 'column-reverse',
            padding: theme.spacing.xl,
        },
    },

    image: {
        maxWidth: '40%',

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    body: {
        paddingRight: theme.spacing.xl * 4,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingRight: 0,
            marginTop: theme.spacing.xl,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },

    controls: {
        display: 'flex',
        marginTop: theme.spacing.xl,
    },

    inputWrapper: {
        width: '100%',
        flex: '1',
    },

    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
    },

    control: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}));

/**
 * PlaceholderBannerIcon
 */
export type PlaceholderBannerIcon = "badges" | "lessons" | "dashboard" | "groups" | "kindergarten" | "thinking"

/**
 * PlaceholderBannerProps
 */
export type PlaceholderBannerProps = {
    loading: boolean
    icon: PlaceholderBannerIcon
    title?: string,
    description?: string,
}

export const PlaceholderBanner = (props: PlaceholderBannerProps) => {
    const { classes } = useStyles();
    const title = props.title || "Nothing to display"
    const description = props.description || "We don't have anything to show you here just yet. Add data, check back later, or adjust your search."
    return (
        <div className={classes.wrapper}>
            <div className={classes.body}>
                <Title className={classes.title}>{props.loading ? "Loading..." : title}</Title>
                <Text size="sm" color="dimmed">{props.loading ? "Hold on, we're loading your data." : description}</Text>
            </div>

            <Image src={`https://cdn.localcivics.io/illustrations/${props.icon}.svg`} className={classes.image} />
        </div>
    );
}