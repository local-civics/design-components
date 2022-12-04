import * as React               from 'react';
import {Container, Grid, Stack} from '@mantine/core';
import {Timeline, TimelineItem} from "../../components/data/Timeline/Timeline";
import {StatsGroup}             from "../../components/data/StatsGroup/StatsGroup";
import {UserInfo}               from "../../components/users/UserInfo/UserInfo";
import {TenantBanner}           from "../../components/banners/TenantBanner/TenantBanner";

/**
 * HomeUserEvent
 */
export type HomeUserEvent = TimelineItem

/**
 * HomeProps
 */
export type HomeProps = {
    loading: boolean
    avatarURL: string
    givenName: string
    familyName: string
    email: string
    job: string
    impactStatement: string
    tenantName: string
    tenantDescription: string
    tenantImage: string
    tenantWebsite: string
    events: HomeUserEvent[]
    problemsSolved: number
    problemsSolvedDiff: number
    lessonsCompleted: number
    lessonsCompletedDiff: number
    badgesCompleted: number
    badgesCompletedDiff: number

    onScrollBottom: () => void;
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
                    <UserInfo
                        variant="compact"
                        givenName={props.givenName}
                        familyName={props.familyName}
                        avatar={props.avatarURL}
                        email={props.email}
                        quote={props.impactStatement}
                        job={props.job}
                    />
                </Grid.Col>
                <Grid.Col md={6}>
                    <TenantBanner
                        title={props.tenantName}
                        description={props.tenantDescription}
                        image={props.tenantImage}
                        action={
                            {
                                label: "Visit website",
                                link: props.tenantWebsite,
                            }
                        }
                    />
                </Grid.Col>
            </Grid>

            <StatsGroup data={[
                {
                    title: "PROBLEMS SOLVED",
                    value: props.problemsSolved,
                    diff: props.problemsSolvedDiff,
                },
                {
                    title: "LESSONS COMPLETED",
                    value: props.lessonsCompleted,
                    diff: props.lessonsCompletedDiff,
                },
                {
                    title: "BADGES EARNED",
                    value: props.badgesCompleted,
                    diff: props.badgesCompletedDiff,
                },
            ]}/>

            <Timeline onScrollBottom={props.onScrollBottom} items={props.events} />
        </Stack>
    </Container>
}