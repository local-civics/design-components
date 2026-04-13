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
import {Table as LessonTable, Item as LessonItem} from "./FileTable"

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
 * FileLockerUserItem
 */
export type FileLockerUserItem = Item

/**
 * FileLockerClass
 */
export type FileLockerClass = {
    classId: string
    name: string
    active: boolean
}

/**
 * FileLockerProps
 */
export type FileLockerProps = {
    loading: boolean
    displayName: string,
    description: string
    classes: FileLockerClass[]
    lessons: LessonItem[]
    classId: string
    students: FileLockerUserItem[]
    href: string
    trial?: boolean
    lessonsCompleted?: number

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

/**
 * FileLocker
 * @param props
 * @constructor
 */
export const FileLocker = (props: FileLockerProps) => {
    const { classes } = useStyles();
    const [tab, setTab] = useState("students")

    const numberOfStudents = props.students.length
    const numberOfFiles = props.students.reduce(
        (acc, s) => acc + (s.submissions?.length || 0),
        0
    )
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
                                    {props.displayName || "File"}
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
                                    title: props.trial ? "LESSONS SUBMITTED" : "FILES",
                                    value: props.trial ? props.lessonsCompleted || 0 : numberOfFiles,
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
                                        {label: "By student", value: "students"},
                                        {label: "By pathway", value: "pathways"},
                                        {label: "By badge", value: "badges"},
                                        {label: "By lesson", value: "lessons"},
                                    ]}
                                    onChange={setTab}
                                />}

                                { (!props.trial && tab === "students") && <Table
                                    loading={props.loading}
                                    items={props.students}
                                />}
                                {/* { (!props.trial && tab === "pathways") && <PathwayTable
                                    loading={props.loading}
                                    items={props.pathways}
                                />}

                                { (!props.trial && tab === "badges") && <BadgeTable
                                    loading={props.loading}
                                    items={props.badges}
                                />}

                                { (!!props.trial || tab === "lessons") && <LessonTable
                                    loading={props.loading}
                                    items={props.lessons}
                                /> } */}

                            </Stack>
                        </Stack>
                    </div>
                </div>
            </Stack>
        </Container>
    )
}