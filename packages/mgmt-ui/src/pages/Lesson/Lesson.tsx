import {IconArrowLeft, IconCategory2} from "@tabler/icons";
import AvatarInit                     from "avatar-initials";
import {useState}                     from "react";
import * as React                     from 'react';
import {
    createStyles,
    Badge,
    Title,
    Text,
    Container, Stack, Grid,
    Select, ActionIcon, Group,
    LoadingOverlay,
    UnstyledButton, Avatar,
}                                                         from '@mantine/core';
import {StatsGroup}                                       from "../../components/data/StatsGroup/StatsGroup";
import {Tabs}                                             from "../../components/navigation/Tabs/Tabs";
import {compact}                                          from "../../utils/numbers";
import {Item as ReflectionItem, Table as ReflectionTable} from "./ReflectionTable";
import {SplitButton}                                      from "./SplitButton";
import {Table, Item}                                      from "./Table";
import {Stack as QuestionStack, Item as QuestionItem}     from "./QuestionStack";

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
 * LessonUserItem
 */
export type LessonUserItem = Item

/**
 * LessonClass
 */
export type LessonClass = {
    classId: string
    name: string
    active: boolean
}

/**
 * LessonProps
 */
export type LessonProps = {
    loading: boolean
    displayName: string
    description: string
    href: string
    classId: string
    classes: LessonClass[]
    students: LessonUserItem[]
    reflections: ReflectionItem[],
    questions: QuestionItem[],
    trial?: boolean
    lessonsCompleted?: number
    contributors?: {name: string}[]

    onBackClick: () => void;
    onClassChange: (classId: string) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;
}

/**
 * Lesson
 * @param props
 * @constructor
 */
export const Lesson = (props: LessonProps) => {
    const { classes } = useStyles();
    const [tab, setTab] = useState("question")

    const numberOfStudents = props.students.length
    const percentageOfLessonsCompleted = numberOfStudents > 0 ? props.students.filter(u => u.isComplete).length / numberOfStudents : 0
    const contributors = props.contributors || []
    const avatars = contributors.slice(0, 5).map((u, i) => {
        const fullName = u.name
        let initials = fullName.split(/[ -]/).map((n) => n.charAt(0)).join('');
        const src = AvatarInit.initialAvatar({
            background: '#1c7ed6',
            color: '#fff',
            fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
            fontSize: 10,
            fontWeight: 250,
            size: 30,
            initials: initials,
        })

        return <Avatar key={i} src={src} radius="xl" />
    })

    const remainingUsers = contributors.slice(5).length
    if(remainingUsers){
        const initials = "+" + compact(remainingUsers)
        const src = AvatarInit.initialAvatar({
            background: '#1c7ed6',
            color: '#fff',
            fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
            fontSize: 10,
            fontWeight: 250,
            size: 30,
            initials: initials,
        })

        avatars.push(<Avatar src={src} radius="xl" />)
    }

    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <UnstyledButton onClick={props.onBackClick}>
                            <Badge
                                variant="filled"
                                leftSection={<ActionIcon color="blue" size="xs" radius="xl" variant="filled">
                                    <IconArrowLeft size={14}   />
                                </ActionIcon>}
                                size="lg">
                                Back
                            </Badge>
                        </UnstyledButton>
                        <Group>
                            <Stack spacing={0}>
                                <Title order={2} className={classes.title} mt="md">
                                    {props.displayName || "Lesson"}
                                </Title>

                                <Text color="dimmed" className={classes.description} mt="sm">
                                    {props.description || "No description"}
                                </Text>
                            </Stack>

                            <Stack ml="auto">
                                <SplitButton
                                    href={props.href}
                                    noExport={props.trial}
                                    onCopyLinkClick={props.onCopyLinkClick}
                                    onExportDataClick={props.onExportDataClick}
                                />
                            </Stack>
                        </Group>
                    </Grid.Col>
                </Grid>
                <div>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay visible={props.loading} overlayBlur={2} />
                        <Stack>
                            <StatsGroup
                                data={[
                                    {
                                        title: props.trial ? "# OF SUBMISSIONS" : "LESSON COMPLETION",
                                        value: props.trial ? props.lessonsCompleted || 0 : percentageOfLessonsCompleted,
                                        unit: props.trial ? '' : '%',
                                    },
                                ]}
                            />

                            <Group position="apart">
                                <Avatar.Group spacing="sm">
                                    {avatars}
                                </Avatar.Group>
                            </Group>

                            {!props.trial && <Select
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
                                {!props.trial && <Tabs
                                    value={tab}
                                    data={[
                                        {label: "By question", value: "question"},
                                        {label: "By student", value: "students"},
                                        {label: "By reflection", value: "reflections"},
                                    ]}
                                    onChange={setTab}
                                />}

                                { (!!props.trial || tab === "question") && <QuestionStack
                                    loading={props.loading}
                                    items={props.questions}
                                />}

                                { (!props.trial && tab === "reflections") && <ReflectionTable
                                    loading={props.loading}
                                    items={props.reflections}
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