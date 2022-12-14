import {ActionIcon, Badge, Container, Grid, LoadingOverlay, Stack} from "@mantine/core";
import {IconArrowLeft}                                             from "@tabler/icons";
import * as React                                                  from "react";
import {StatsGroup}             from "../../components/data/StatsGroup/StatsGroup";
import {Timeline, TimelineItem} from "../../components/data/Timeline/Timeline";
import {UserInfo}               from "../../components/users/UserInfo/UserInfo";

/**
 * StudentEvent
 */
export type StudentEvent = TimelineItem

/**
 * StudentProps
 */
export type StudentProps = {
    loading: boolean
    avatarURL: string
    givenName: string
    familyName: string
    email: string
    job: string
    impactStatement: string
    events: StudentEvent[]
    problemsSolved: number
    problemsSolvedDiff: number
    lessonsCompleted: number
    lessonsCompletedDiff: number
    badgesCompleted: number
    badgesCompletedDiff: number

    onBackClick: () => void
    onScrollBottom: () => void;
}

export const Student = (props: StudentProps) => {
    return <Container size="lg" py="xl">
        <Stack spacing="md">
            <Grid>
                <Grid.Col sm="auto">
                    <Badge
                        variant="filled"
                        leftSection={<ActionIcon onClick={props.onBackClick} color="blue" size="xs" radius="xl" variant="filled">
                            <IconArrowLeft size={14} />
                        </ActionIcon>}
                        size="lg">
                        Users
                    </Badge>

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
            </Grid>

            <div style={{ position: 'relative' }}>
                <LoadingOverlay visible={props.loading} overlayBlur={2} />
                <Stack spacing="lg">
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
            </div>
        </Stack>
    </Container>
}