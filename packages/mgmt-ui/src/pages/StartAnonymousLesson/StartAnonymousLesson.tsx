import * as React                                                            from "react";
import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Button,
    Group,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 400,
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][7]
        } 100%)`,
        borderRadius: theme.radius.md,
        padding: theme.spacing.xl * 2.5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        color: theme.white,
        lineHeight: 1,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        maxWidth: 300,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    form: {
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.lg,
    },

    social: {
        color: theme.white,

        '&:hover': {
            color: theme.colors[theme.primaryColor][1],
        },
    },

    input: {
        backgroundColor: theme.white,
        borderColor: theme.colors.gray[4],
        color: theme.black,

        '&::placeholder': {
            color: theme.colors.gray[5],
        },
    },

    inputLabel: {
        color: theme.black,
    },

    control: {
        backgroundColor: theme.colors[theme.primaryColor][6],
    },
}));

/**
 * StartAnonymousLessonProps
 */
export type StartAnonymousLessonProps = {
    title: string
    description: string
    educatorName: string
    studentName?: string
    onStart: () => void;
}

/**
 * StartAnonymousLesson
 * @param props
 * @constructor
 */
export const StartAnonymousLesson = (props: StartAnonymousLessonProps) => {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <div>
                    <Title className={classes.title}>{props.title}</Title>
                    <Text weight="bold" className={classes.description} mt="sm" mb={30}>
                        Instructor: {props.educatorName}
                    </Text>
                    <Text className={classes.description} mt="sm" mb={30}>
                        {props.description}
                    </Text>
                </div>
                <div className={classes.form}>
                    <TextInput
                        label="Name"
                        placeholder="John Doe"
                        defaultValue={props.studentName}
                        readOnly={!!props.studentName}
                        required
                        classNames={{ input: classes.input, label: classes.inputLabel }}
                    />

                    <Group position="right" mt="md">
                        <Button onClick={props.onStart} className={classes.control}>{!props.studentName ? "Start lesson" : "Continue lesson"}</Button>
                    </Group>
                </div>
            </SimpleGrid>
        </div>
    );
}