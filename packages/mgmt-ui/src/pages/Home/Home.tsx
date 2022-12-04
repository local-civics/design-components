import * as React                                                                                from 'react';
import {Container, Grid, Stack} from '@mantine/core';
import {Timeline}                                                                                from "../../components/data/Timeline/Timeline";
import {StatsGroup}                                                                from "../../components/stats/StatsGroup/StatsGroup";
import {UserInfo}                                                                  from "../../components/users/UserInfo/UserInfo";
import {TenantBanner}                                                              from "../../components/banners/TenantBanner/TenantBanner";

/**
 * HomeData
 */
export type HomeData = {
    user: {
        avatar: string
        givenName: string
        familyName: string
        email: string
        job: string
        quote: string
    }
    tenant: {
        name: string
        description: string
        image: string
        website: string
    }
    stats: {
        "PROBLEMS SOLVED": {
            value: number
            diff: number
        },
        "LESSONS COMPLETED": {
            value: number
            diff: number
        },
        "BADGES EARNED": {
            value: number
            diff: number
        },
    }
    timeline: {key: string, name: string, link?: string, description: string, time: string}[],
}

/**
 * HomeMethods
 */
export type HomeMethods = {
    onTimelineScrollBottom: () => void;
}

/**
 * HomeProps
 */
export type HomeProps = HomeData & HomeMethods

/**
 * Home
 * @param props
 * @constructor
 */
export const Home = (props: HomeProps) => {
    return <Container size="lg">
        <Stack spacing="lg">
            <Grid gutter="md">
                <Grid.Col md={6}>
                    <UserInfo data={props.user}/>
                </Grid.Col>
                <Grid.Col md={6}>
                    <TenantBanner
                        title={props.tenant.name}
                        description={props.tenant.description}
                        image={props.tenant.image}
                        action={
                            {
                                label: "Visit website",
                                link: props.tenant.website,
                            }
                        }
                    />
                </Grid.Col>
            </Grid>

            <StatsGroup data={[
                {
                    title: "PROBLEMS SOLVED",
                    value: props.stats["PROBLEMS SOLVED"].value,
                    diff: props.stats["PROBLEMS SOLVED"].diff,
                },
                {
                    title: "LESSONS COMPLETED",
                    value: props.stats["LESSONS COMPLETED"].value,
                    diff: props.stats["LESSONS COMPLETED"].diff,
                },
                {
                    title: "BADGES EARNED",
                    value: props.stats["BADGES EARNED"].value,
                    diff: props.stats["BADGES EARNED"].diff,
                },
            ]}/>

            <Timeline onScrollBottom={props.onTimelineScrollBottom} data={props.timeline} />
        </Stack>
    </Container>
}