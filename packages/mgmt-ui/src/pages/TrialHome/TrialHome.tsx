import * as React                                             from 'react';
import {Badge, Button, Container, createStyles, Stack, Title} from '@mantine/core';
import {BadgeGrid, BadgeGridProps}                            from "../../components/grid/BadgeGrid/BadgeGrid";
import {UserInfo}                  from "../../components/users/UserInfo/UserInfo";
import {TenantBanner}            from "../../components/banners/TenantBanner/TenantBanner";

const useStyles = createStyles((theme) => ({
    action: {
        backgroundColor: "inherit",
        ":hover": {
          textDecoration: "underline"
        },
    },
    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: theme.fontSizes.xl,
        lineHeight: 1.5,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: theme.fontSizes.md,
        },
    },
}));

/**
 * TrialHomeProps
 */
export type TrialHomeProps = BadgeGridProps & {
    loading: boolean
    name: string
    firstName: string
    daysRemaining: number
    upgradeHref: string
}

/**
 * TrialHome
 * @param props
 * @constructor
 */
export const TrialHome = (props: TrialHomeProps) => {
    const { classes } = useStyles();
    return <Container size="lg">
        <Badge>{props.daysRemaining} day{props.daysRemaining !== 1 ? "s" : ""} left</Badge>
        <Button
            className={classes.action}
            variant="white"
            component="a"
            size="xs"
            href={props.upgradeHref}
            target="_blank"
        >
            UPGRADE NOW
        </Button>
        <Stack spacing="sm">
            <Stack spacing={0}>
                <UserInfo
                    variant="compact"
                    name={props.name}
                    impactStatement=""
                />
                <TenantBanner
                    title="Trial Account"
                    description={`Welcome to your Local Civics Trial Account${props.firstName ? ", " + props.firstName : ""}!`}
                    image="https://cdn.localcivics.io/hub/landing.jpg"
                />
            </Stack>
            <Title maw={500} mb={20} mt={20} className={classes.title}>
                Based on the tags you selected, check out these lessons to get started with your students!
            </Title>
            <BadgeGrid onAssign={props.onAssign} badges={props.badges}/>
        </Stack>
    </Container>
}