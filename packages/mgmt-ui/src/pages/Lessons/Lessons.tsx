import * as React                from 'react';
import {
    createStyles,
    Badge,
    Title,
    Text,
    Container, Stack, Grid, Autocomplete, TabsValue, LoadingOverlay,
} from '@mantine/core';
import {Lesson, LessonData}      from "./Lesson/Lesson";
import {LessonUserItem}          from "./Lesson/LessonUserTable";
import {LessonTable, LessonItem} from "./LessonTable";

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
 * LessonsData
 */
export type LessonsData = {
    loading: boolean
    lessons: LessonItem[]
    lesson: LessonData | null
}

/**
 * LessonsMethods
 */
export type LessonsMethods = {
    onAutocompleteChange: (next: string) => void
    onGroupChange: (next: string) => void;
    onLessonClick: (lesson: LessonItem) => void
    onPreview: (id: string) => void;
    onTabChange: (tab: TabsValue) => void;
    onUserClick: (user: LessonUserItem) => void;
    onBackClick: () => void;
}

/**
 * LessonsProps
 */
export type LessonsProps = LessonsData & LessonsMethods

/**
 * Lessons
 * @param props
 * @constructor
 */
export const Lessons = (props: LessonsProps) => {
    const { classes } = useStyles();

    if(props.lesson){
        return <Lesson
            {...props.lesson}
            onBackClick={props.onBackClick}
            onGroupChange={props.onGroupChange}
            onTabChange={props.onTabChange}
            onUserClick={props.onUserClick}
            onPreview={props.onPreview}
        />
    }

    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <Badge variant="filled" size="lg">
                            Lessons
                        </Badge>
                        <Title order={2} className={classes.title} mt="md">
                            Lessons
                        </Title>

                        <Text color="dimmed" className={classes.description} mt="sm">
                            Well crafted units of instruction.
                        </Text>
                    </Grid.Col>
                </Grid>

                <Autocomplete
                    placeholder="Search for a lesson that fits your needs"
                    data={props.lessons.map(item => item.name)}
                    onChange={props.onAutocompleteChange}
                />

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    <LessonTable
                        loading={props.loading}
                        data={props.lessons}
                        onClick={props.onLessonClick}
                    />
                </div>
            </Stack>
        </Container>
    )
}