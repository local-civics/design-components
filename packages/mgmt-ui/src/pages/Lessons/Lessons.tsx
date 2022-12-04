import * as React                from 'react';
import {
    createStyles,
    Badge,
    Title,
    Text,
    Container, Stack, Grid, Autocomplete, LoadingOverlay,
} from '@mantine/core';
import {Table, Item} from "./Table";

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
 * LessonItem
 */
export type LessonItem = Item

/**
 * LessonsProps
 */
export type LessonsProps = {
    loading: boolean
    lessons: LessonItem[]

    onAutocompleteChange: (next: string) => void
    onLessonClick: (item: LessonItem) => void
}

/**
 * Lessons
 * @param props
 * @constructor
 */
export const Lessons = (props: LessonsProps) => {
    const { classes } = useStyles();
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
                    <Table
                        loading={props.loading}
                        items={props.lessons}
                        onClick={props.onLessonClick}
                    />
                </div>
            </Stack>
        </Container>
    )
}