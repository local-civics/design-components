import {IconArrowLeft, IconCategory2} from "@tabler/icons";
import {useState}                     from "react";
import * as React    from 'react';
import {
    createStyles,
    Badge as BadgeCore,
    Title,
    Text,
    Container, Stack, Grid,
    Select, ActionIcon, Group,
    LoadingOverlay,
    UnstyledButton,
}                                                 from '@mantine/core';
import {StatsGroup}                               from "../../components/data/StatsGroup/StatsGroup";
import {Tabs}                                     from "../../components/navigation/Tabs/Tabs";
import {SplitButton}                              from "./SplitButton";
import {Table, Item}                              from "./Table";
import {Table as LessonTable, Item as LessonItem} from "./LessonTable"

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
    },
}));

/**
 * BadgeUserItem
 */
export type BadgeUserItem = Item

/**
 * BadgeClass
 */
export type BadgeClass = {
    classId: string
    name: string
    active: boolean
}

/**
 * BadgeProps
 */
export type BadgeProps = {
    loading: boolean
    displayName: string,
    description: string
    classes: BadgeClass[]
    lessons: LessonItem[]
    classId: string
    students: BadgeUserItem[]
    href: string
    trial?: boolean
    lessonsCompleted?: number

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
    const { classes } = useStyles();
    const [tab, setTab] = useState("lessons")

    const numberOfStudents = props.students.length
    const numberOfBadges = props.students.filter(u => u.isComplete).length 
    const percentageOfBadgesEarned = numberOfStudents > 0 ? props.students.filter(u => u.isComplete).length / numberOfStudents : 0

    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <UnstyledButton onClick={props.onBackClick}>
                            <BadgeCore
                                variant="filled"
                                leftSection={<ActionIcon color="blue" size="xs" radius="xl" variant="filled">
                                    <IconArrowLeft size={14} />
                                </ActionIcon>}
                                size="lg">
                                Back
                            </BadgeCore>
                        </UnstyledButton>
                        <Group>
                            <Stack spacing={0}>
                                <Title order={2} className={classes.title} mt="md">
                                    {props.displayName || "Badge"}
                                </Title>

                                <Text color="dimmed" className={classes.description} mt="sm">
                                    {props.description || "No description"}
                                </Text>
                            </Stack>

                            {!props.trial && <Stack ml="auto">
                                <SplitButton
                                    href={props.href}
                                    onCopyLinkClick={props.onCopyLinkClick}
                                    onExportDataClick={props.onExportDataClick}
                                />
                            </Stack>}
                        </Group>
                    </Grid.Col>
                </Grid>
                <div>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay visible={props.loading} overlayBlur={2} />
                        <Stack>
                            <StatsGroup data={[
                                {
                                    title: props.trial ? "LESSONS SUBMITTED" : "BADGE COMPLETION",
                                    value: props.trial ? props.lessonsCompleted || 0 : numberOfBadges,
                                    unit: props.trial ? '' : '',
                                },
                            ]}/>

                            { !props.trial && <Select
                                clearable
                                clearButtonLabel="Clear class selection"
                                size="sm"
                                placeholder="Select a class"
                                nothingFound="No options"
                                value={props.classId}
                                onChange={props.onClassChange}
                                icon={<IconCategory2/>}
                                data={props.classes.map(g => {return {value: g.classId, label: g.name}})}
                            />}

                            <Stack spacing={0}>
                                { !props.trial && <Tabs
                                    value={tab}
                                    data={[
                                        {label: "By lesson", value: "lessons"},
                                        {label: "By student", value: "students"},
                                    ]}
                                    onChange={setTab}
                                />}

                                { (!!props.trial || tab === "lessons") && <LessonTable
                                    loading={props.loading}
                                    items={props.lessons}
                                /> }

                                { (!props.trial && tab === "students") && <Table
                                    loading={props.loading}
                                    items={props.students}
                                />}
                            </Stack>
                        </Stack>
                    </div>
                </div>
            </Stack>
        </Container>
    )
}