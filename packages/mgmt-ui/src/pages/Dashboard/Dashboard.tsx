import {IconCategory2}                                         from "@tabler/icons";
import {useState}                                              from "react";
import * as React                                              from 'react';
import {Container, LoadingOverlay, Select, Stack, Text, Title} from '@mantine/core';
import {StatsGroup}                                            from "../../components/data/StatsGroup/StatsGroup";
import {Tabs}                                                  from "../../components/navigation/Tabs/Tabs";
import {Item as StudentItem, Table as StudentTable}            from "./StudentTable";
import {Table as ReflectionTable, Item as ReflectionItem}      from "../Lesson/ReflectionTable";
import {Item as ImpactItem, Table as ImpactTable}              from "./ImpactTable";
import {Item as BadgeItem, Table as BadgeTable}              from "./BadgeTable";
import {Item as LessonItem, Table as LessonTable}              from "./LessonTable";

/**
 * DashboardClass
 */
export type DashboardClass = {
    classId: string
    name: string
}

/**
 * DashboardProps
 */
export type DashboardProps = {
    loading: boolean
    students: StudentItem[]
    impacts: ImpactItem[]
    reflections: ReflectionItem[],
    classes: DashboardClass[],
    badges: BadgeItem[],
    lessons: LessonItem[],
    classId: string
    percentageOfAccountsCreated: number
    percentageOfBadgesEarned: number
    percentageOfLessonsCompleted: number

    onClassChange: (classId: string) => void;
    onViewStudentProfile: (student: StudentItem) => void
    onBadgeClick: (badge: BadgeItem) => void;
    onLessonClick: (lesson: LessonItem) => void;
}

/**
 * Dashboard
 * @param props
 * @constructor
 */
export const Dashboard = (props: DashboardProps) => {
    const [tab, setTab] = useState("students")

    return <Container size="lg" py="xl">
        <Stack>
            <Stack spacing={0}>
                <Title size="h3">Dashboard</Title>
                <Text color="dimmed" size="sm" mt="md">
                    Fast-track learning for your students.
                </Text>
            </Stack>
            <Stack>
                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    <Stack spacing="sm">
                        <StatsGroup data={[
                            {
                                title: "# OF STUDENTS",
                                value: props.students.length,
                            },
                            {
                                title: "ACCOUNT CREATION",
                                value: props.percentageOfAccountsCreated,
                                unit: "%",
                            },
                            {
                                title: "BADGE COMPLETION",
                                value: props.percentageOfBadgesEarned,
                                unit: "%",
                            },
                            {
                                title: "LESSON COMPLETION",
                                value: props.percentageOfLessonsCompleted,
                                unit: "%",
                            },
                        ]}/>

                        <Select
                            clearable
                            clearButtonLabel="Clear class selection"
                            size="sm"
                            placeholder="Select a class"
                            nothingFound="No options"
                            value={props.classId}
                            onChange={props.onClassChange}
                            icon={<IconCategory2/>}
                            data={props.classes.map(g => {return {value: g.classId, label: g.name}})}
                        />

                        <Stack spacing={0}>
                            <Tabs
                                value={tab}
                                data={[
                                    {label: "My students", value: "students"},
                                    {label: "Impact statements", value: "impact"},
                                    {label: "Reflections", value: "reflections"},
                                    {label: "Badges", value: "badges"},
                                    {label: "Lessons", value: "lessons"},
                                ]}
                                onChange={setTab}
                            />

                            { tab === "impact" && <ImpactTable
                                loading={props.loading}
                                items={props.impacts}
                            />}

                            { tab === "reflections" && <ReflectionTable
                                loading={props.loading}
                                items={props.reflections}
                            /> }

                            { tab === "badges" && <BadgeTable
                                loading={props.loading}
                                items={props.badges}
                                onClick={props.onBadgeClick}
                            /> }

                            { tab === "lessons" && <LessonTable
                                loading={props.loading}
                                items={props.lessons}
                                onClick={props.onLessonClick}
                            /> }

                            { tab === "students" && <StudentTable
                                loading={props.loading}
                                items={props.students}
                                onViewProfile={props.onViewStudentProfile}
                            />}
                        </Stack>
                    </Stack>
                </div>
            </Stack>
        </Stack>
    </Container>
}