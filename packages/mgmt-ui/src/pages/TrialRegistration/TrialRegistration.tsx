import * as React                                                            from "react";
import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Button,
    Group,
    Image,
}                   from '@mantine/core';
import {
    IconPodium,
    IconHistory,
    IconLego, IconAffiliate, IconGrowth, IconTools, IconNews
} from '@tabler/icons';
import {SelectGrid} from "../../components/grid/SelectGrid/SelectGrid";

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 400,
        height: '100%',
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, #4e5561 0%, #222a39 100%)`,
        padding: theme.spacing.xl * 2.5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 40,
        color: theme.white,
        lineHeight: 1,
        maxWidth: 450,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        maxWidth: 500,

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

const OPTIONS = [{ description: 'high school', title: 'High school', icon: IconHistory},
    { description: 'k - 8th', title: 'K - 8th', icon: IconLego },
    { description: 'civics', title: 'Civics', icon: IconNews },
    { description: 'project-based learning', title: 'Project-based learning', icon: IconTools },
    { description: 'college', title: 'College', icon: IconPodium },
    { description: 'career', title: 'Career', icon: IconAffiliate },
    { description: 'student leadership', title: 'Student leadership', icon: IconGrowth },]

/**
 * TrialRegistrationProps
 */
export type TrialRegistrationProps = {
    onBegin: (data: {firstName: string, lastName: string, schoolName: string, interests: string[]}) => void
}

/**
 * TrialRegistration
 * @param props
 * @constructor
 */
export const TrialRegistration = (props: TrialRegistrationProps) => {
    const { classes } = useStyles();
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [schoolName, setSchoolName] = React.useState("")
    const [interests, setInterests] = React.useState({})

    return (
        <div className={classes.wrapper}>
            <SimpleGrid maw={960} ml="auto" mr="auto" cols={1} spacing={15} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Group spacing="sm">
                    <Image
                        height={150}
                        width="auto"
                        fit="contain"
                        src="https://cdn.localcivics.io/brand/l.png"
                    />
                    <div>
                        <Title className={classes.title}>
                            Are you an
                            {" "}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: 'pink', to: 'yellow' }}
                            >
                                educator
                            </Text>
                            {" "}
                            interested in a free trial?
                        </Title>
                        <Text className={classes.description} mt="sm">
                            Try out a few of the features we can bring to your classroom. No commitment required.
                        </Text>
                    </div>
                </Group>
                <div className={classes.form}>
                    <SimpleGrid cols={2} spacing={15} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        <TextInput
                            label="First Name"
                            placeholder="Your first name"
                            required
                            classNames={{ input: classes.input, label: classes.inputLabel }}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Your last name"
                            required
                            classNames={{ input: classes.input, label: classes.inputLabel }}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <TextInput
                            label="School Name (Optional)"
                            placeholder="What school, if any, are you associated with?"
                            classNames={{ input: classes.input, label: classes.inputLabel }}
                            onChange={(e) => setSchoolName(e.target.value)}
                        />
                    </SimpleGrid>

                    <Text size={14} weight={500} mb="md" mt="xl">
                        What are you interested in teaching?
                    </Text>
                    <SelectGrid
                        items={OPTIONS}
                        onChange={(e, checked) => setInterests({...interests, [e]: checked})}
                    />

                    <Group position="right" mt="md">
                        <Button
                            disabled={!firstName || !lastName}
                            onClick={() => props.onBegin({firstName, lastName, schoolName, interests: Object.keys(interests)})}
                            className={classes.control}>Begin trial</Button>
                    </Group>
                </div>
            </SimpleGrid>
        </div>
    );
}