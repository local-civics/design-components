import {
    ActionIcon,
    Badge,
    Card,
    Container, createStyles,
    Grid,
    Group,
    LoadingOverlay,
    ScrollArea,
    Stack,
    Text,
    Title,
    UnstyledButton,
} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons";
import * as React                     from 'react';
import {PlaceholderBanner}            from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

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

export type Item = {
    question: string
    answers: string[]
}

/**
 * StudentLessonProps
 */
export type StudentLessonProps = {
    loading: boolean
    lessonName: string
    studentName: string
    lessonDescription: string
    questions: Item[]

    onBackClick: () => void;
}

/**
 * StudentLesson
 * @param props
 * @constructor
 */
export const StudentLesson = (props: StudentLessonProps) => {
    const { classes } = useStyles();
    const rows = props.questions.map((row) => {
        const answerText = row.answers.join("\n")
        return <Card key={row.question} withBorder p="xl" radius="md">
            <Stack spacing={4}>
                <Title size="lg">{row.question}</Title>
                <ScrollArea.Autosize maxHeight={600}>
                    <Stack spacing={4}>
                        <Card key={answerText} p={5} radius={0} bg="gray.0">
                            <Text>{answerText || "N/A"}</Text>
                        </Card>
                    </Stack>
                </ScrollArea.Autosize>
            </Stack>
        </Card>
    });

    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <UnstyledButton onClick={props.onBackClick}>
                            <Badge
                                variant="filled"
                                leftSection={<ActionIcon color="blue" size="xs" radius="xl" variant="filled">
                                    <IconArrowLeft size={14} />
                                </ActionIcon>}
                                size="lg">
                                Go Back
                            </Badge>
                        </UnstyledButton>
                        <Group>
                            <Stack spacing={0}>
                                <Title order={2} className={classes.title} mt="md">
                                    {props.lessonName || "Lesson"} ({props.studentName || "Anonymous"})
                                </Title>

                                <Text color="dimmed" className={classes.description} mt="sm">
                                    {props.lessonDescription || "No description"}
                                </Text>
                            </Stack>
                        </Group>
                    </Grid.Col>
                </Grid>
                <div>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay visible={props.loading} overlayBlur={2} />

                        { !props.questions.length && <PlaceholderBanner
                            title="No questions to display"
                            description="There are no questions in this lesson."
                            loading={props.loading}
                            icon="lessons"
                        />}

                        {!!props.questions.length && <Stack py={4} spacing={10} sx={{ minWidth: 700 }}>
                            {rows}
                        </Stack>}
                    </div>
                </div>
            </Stack>
        </Container>
    )
}