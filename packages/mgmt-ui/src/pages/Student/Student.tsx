import {ActionIcon, Badge, Container, Grid, LoadingOverlay, Stack} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons";
import {useState} from "react";
import * as React      from "react";
import {StatsGroup}                                                       from "../../components/data/StatsGroup/StatsGroup";
import {Tabs}                                                             from "../../components/navigation/Tabs/Tabs";
import {UserInfo}                                                         from "../../components/users/UserInfo/UserInfo";
import {Table as BadgeTable, Item as BadgeItem}                           from "./BadgeTable"
import {Table as AnswerTable, Item as AnswerItem} from "./AnswerTable"
import {Table as ReflectionTable, Item as ReflectionItem} from "./ReflectionTable"

/**
 * StudentProps
 */
export type StudentProps = {
    loading: boolean
    name: string
    impactStatement: string
    numberOfProblemsSolved: number
    percentageOfLessonsCompleted: number
    badges: BadgeItem[],
    answers: AnswerItem[],
    reflections: ReflectionItem[],

    onBackClick: () => void
    onBadgeClick: (item: BadgeItem) => void;
    onAnswerClick: (item: AnswerItem) => void;
    onReflectionClick: (item: ReflectionItem) => void;
}

export const Student = (props: StudentProps) => {
    const [tab, setTab] = useState("badges")
    const numberOfBadges = props.badges.length
    const percentageOfBadgesEarned = numberOfBadges > 0 ? props.badges.filter(b => b.isComplete).length / numberOfBadges : 0

    return <Container size="lg" py="xl">
        <Stack spacing="md">
            <Grid gutter="md">
                <Grid.Col sm="auto">
                    <Badge
                        variant="filled"
                        leftSection={<ActionIcon onClick={props.onBackClick} color="blue" size="xs" radius="xl" variant="filled">
                            <IconArrowLeft size={14} />
                        </ActionIcon>}
                        size="lg">
                        Students
                    </Badge>

                    <UserInfo
                        variant="compact"
                        name={props.name}
                        impactStatement={props.impactStatement}
                    />
                </Grid.Col>
            </Grid>

            <div style={{ position: 'relative' }}>
                <LoadingOverlay visible={props.loading} overlayBlur={2} />
                <Stack spacing="lg">
                    <StatsGroup data={[
                        {
                            title: "PROBLEMS SOLVED",
                            value: props.numberOfProblemsSolved,
                        },
                        {
                            title: "LESSON COMPLETION",
                            value: props.percentageOfLessonsCompleted,
                            unit: "%"
                        },
                        {
                            title: "BADGE COMPLETION",
                            value: percentageOfBadgesEarned,
                            unit: "%"
                        },
                    ]}/>

                    <Stack spacing={0}>
                        <Tabs
                            value={tab}
                            data={[
                                {label: "My badges", value: "badges"},
                                {label: "My answers", value: "answers"},
                                {label: "My reflections", value: "reflections"},
                            ]}
                            onChange={setTab}
                        />

                        { tab === "badges" && <BadgeTable
                            loading={props.loading}
                            items={props.badges}
                            onClick={props.onBadgeClick}
                        /> }

                        { tab === "answers" && <AnswerTable
                            loading={props.loading}
                            items={props.answers}
                            onClick={props.onAnswerClick}
                        /> }

                        { tab === "reflections" && <ReflectionTable
                            loading={props.loading}
                            items={props.reflections}
                            onClick={props.onReflectionClick}
                        /> }
                    </Stack>
                </Stack>
            </div>
        </Stack>
    </Container>
}