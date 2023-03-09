import * as React   from "react";
import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Button,
    Group,
    Image, Autocomplete,
}                   from '@mantine/core';
import {
    IconPodium,
    IconTools,
    IconNews,
    IconSchool,
    IconScribble,
    IconBackpack,
    IconPresentation,
    IconBriefcase
} from '@tabler/icons';
import {SelectGrid} from "../../components/grid/SelectGrid/SelectGrid";

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: '100%',
        boxSizing: 'border-box',
        backgroundImage: `linear-gradient(-60deg, #4e5561 0%, #222a39 100%)`,
        padding: theme.spacing.xl * 2.5,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            padding: theme.spacing.xl * 1.5,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 50,
        color: theme.white,
        lineHeight: 1,
        maxWidth: 500,
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

const OPTIONS = [
    { description: 'elementary', title: 'Elementary (K-5)', icon: IconScribble},
    { description: 'middle', title: 'Middle (6-8)', icon: IconBackpack},
    { description: 'high school', title: 'High School (9-12)', icon: IconSchool},
    { description: 'college', title: 'College', icon: IconPodium },
    { description: 'career', title: 'Career', icon: IconBriefcase },
    { description: 'work-based learning', title: 'Work-Based Learning', icon: IconPresentation },
    { description: 'student leadership', title: 'Student Leadership', icon: IconPodium },
    { description: 'civics', title: 'Civics', icon: IconNews },
    { description: 'project-based learning', title: 'Project-Based Learning', icon: IconTools },
]

/**
 * TrialRegistrationProps
 */
export type TrialRegistrationProps = {
    organizations: {organizationId: string, displayName: string}[]
    onBegin: (data: NewTrialRegistration) => void
    onQueryOrganizations: (name: string) => void;
}

export type NewTrialRegistration = {
    firstName: string
    lastName: string
    organizationId: string
    organizationName: string
    interests: string[]
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
    const [organization, setOrganization] = React.useState({organizationId: "", displayName: ""})
    const [interests, setInterests] = React.useState({})

    return (
        <div className={classes.wrapper}>
            <SimpleGrid maw={1300} ml="auto" mr="auto" cols={2} spacing={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                <Group spacing="sm">
                    <Image
                        height={200}
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
                            placeholder="Insert your first name"
                            required
                            classNames={{ input: classes.input, label: classes.inputLabel }}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Insert your last name"
                            required
                            classNames={{ input: classes.input, label: classes.inputLabel }}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <Autocomplete
                            label="School/Organization Name"
                            placeholder="What's the name of your school?"
                            data={props.organizations.map(o => {return {...o, value: o.displayName}})}
                            onItemSubmit={(item) => setOrganization({organizationId: item.organizationId, displayName: item.displayName})}
                            onChange={(next) => {
                                setOrganization({organizationId: "", displayName: next})
                                return props.onQueryOrganizations(next)
                            }}
                        />
                    </SimpleGrid>

                    <Text size={14} weight={500} mb="md" mt="xl">
                        Where do you want to start? (Select as many as you want)
                    </Text>
                    <SelectGrid
                        items={OPTIONS}
                        onChange={(e, checked) => setInterests({...interests, [e]: checked})}
                    />

                    <Group position="right" mt="md">
                        <Button
                            disabled={!firstName || !lastName}
                            onClick={() => props.onBegin({
                                firstName,
                                lastName,
                                organizationId: organization.organizationId,
                                organizationName: organization.displayName,
                                interests: Object.keys(interests),
                            })}
                            className={classes.control}>Begin trial</Button>
                    </Group>
                </div>
            </SimpleGrid>
        </div>
    );
}