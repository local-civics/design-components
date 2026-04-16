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
import { useFilteredStudents } from "./useFilteredStudents"
import { Accordion } from "@mantine/core"

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

type Badge = {
    badgeId: string
    displayName: string
}

type BadgeTableProps = {
    badges: Badge[]
    students: FileLockerUserItem[]
}

const BadgeTable: React.FC<BadgeTableProps & { loading: boolean }> = ({ badges, students, loading }) => {
    const { byBadge } = useFilteredStudents(students)

    return (
        <Accordion>
            {badges.map((b) => (
                <Accordion.Item key={b.badgeId} value={b.badgeId}>
                    <Accordion.Control>
                        {b.displayName}
                    </Accordion.Control>

                    <Accordion.Panel>
                        <Table
                            loading={loading}
                            items={byBadge(b.badgeId)}
                            hideBadge
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
type Lesson = {
    lessonId: string
    lessonName: string
}

type LessonTableProps = {
    lessons: Lesson[]
    students: FileLockerUserItem[]
}

const LessonTableWrapper: React.FC<LessonTableProps & { loading: boolean }> = ({ lessons, students, loading }) => {
    const { byLesson } = useFilteredStudents(students)

    return (
        <Accordion>
            {lessons.map((l) => (
                <Accordion.Item key={l.lessonId} value={l.lessonId}>
                    <Accordion.Control>
                        {l.lessonName}
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Table
                            loading={loading}
                            items={byLesson(l.lessonName)}
                            hideLesson
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
type Pathway = {
    pathwayId: string
    title: string
    description: string
}

type PathwayTableProps = {
    pathways: Pathway[]
    badges: any[]
    students: FileLockerUserItem[]
}

export const PathwayTable: React.FC<PathwayTableProps & { loading: boolean }> = ({
    pathways,
    badges,
    students,
    loading,
}) => {
    const { byPathway } = useFilteredStudents(students)

    return (
        <Accordion>
            {pathways.map((p) => (
                <Accordion.Item key={p.pathwayId} value={p.pathwayId}>
                    <Accordion.Control>
                        <strong>{p.title}</strong>
                        <div>{p.description}</div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Table
                            loading={loading}
                            items={byPathway(p.pathwayId, badges)}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

//TODO Refactor

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
    pathways?: {
        pathwayId: string
        title: string
        description: string
    }[]
    
    badges?: {
        badgeId: string
        displayName: string
        categories?: string[]
    }[]

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
                                {tab === "pathways" && (
                                    <PathwayTable
                                        pathways={props.pathways || []}
                                        badges={props.badges || []}
                                        students={props.students}
                                        loading={props.loading}
                                    />
                                )}

                                {tab === "badges" && (
                                    <BadgeTable
                                        badges={props.badges || []}
                                        students={props.students}
                                        loading={props.loading}

                                    />
                                )}

                                {tab === "lessons" && (
                                    <LessonTableWrapper
                                        lessons={props.lessons}
                                        students={props.students}
                                        loading={props.loading}

                                    />
                                )}

                            </Stack>
                        </Stack>
                    </div>
                </div>
            </Stack>
        </Container>
    )
}