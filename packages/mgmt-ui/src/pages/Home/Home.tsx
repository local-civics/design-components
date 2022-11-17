import * as React                                                                                from 'react';
import {Blockquote, Container, Grid, Stack} from '@mantine/core';
import {Timeline}                                                                                from "../../components/data/Timeline/Timeline";
import {StatsGroup}                                                                from "../../components/stats/StatsGroup/StatsGroup";
import {UserInfo}                                                                  from "../../components/users/UserInfo/UserInfo";
import {TenantBanner}                                                              from "../../components/banners/TenantBanner/TenantBanner";

/**
 * HomeData
 */
export interface HomeData {
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
 * HomeProps
 */
export interface HomeProps {
    data: HomeData
    onTimelineScrollBottom: () => void;
}

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
                    <UserInfo data={props.data.user}/>
                </Grid.Col>
                <Grid.Col md={6}>
                    <TenantBanner
                        title={props.data.tenant.name}
                        description={props.data.tenant.description}
                        image={props.data.tenant.image}
                        action={
                            {
                                label: "Visit website",
                                link: props.data.tenant.website,
                            }
                        }
                    />
                </Grid.Col>
            </Grid>

            <StatsGroup data={[
                {
                    title: "PROBLEMS SOLVED",
                    value: props.data.stats["PROBLEMS SOLVED"].value,
                    diff: props.data.stats["PROBLEMS SOLVED"].diff,
                },
                {
                    title: "LESSONS COMPLETED",
                    value: props.data.stats["LESSONS COMPLETED"].value,
                    diff: props.data.stats["LESSONS COMPLETED"].diff,
                },
                {
                    title: "BADGES EARNED",
                    value: props.data.stats["BADGES EARNED"].value,
                    diff: props.data.stats["BADGES EARNED"].diff,
                },
            ]}/>

            <Timeline onScrollBottom={props.onTimelineScrollBottom} data={props.data.timeline} />
        </Stack>
    </Container>
}