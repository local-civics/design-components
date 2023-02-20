import {IconArrowLeft} from "@tabler/icons";
import * as React   from 'react';
import {
    createStyles,
    Title,
    Text,
    Container, Stack, Grid,
    Badge,
    ActionIcon,
    LoadingOverlay,
    UnstyledButton,
}                   from '@mantine/core';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {AccessCode} from "./AccessCode";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
    },
}));

/**
 * OrganizationProps
 */
export type OrganizationProps = {
    loading: boolean
    displayName: string
    description: string
    numberOfStudents: number
    numberOfEducators: number
    percentageOfAccountsActive: number
    accessCode: string
    peopleLink: string

    onBackClick: () => void;
    onCopyAccessCode: () => void;
}

/**
 * Organization
 * @param props
 * @constructor
 */
export const Organization = (props: OrganizationProps) => {
    const { classes } = useStyles();
    return (
        <>
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
                        <Title order={2} className={classes.title} mt="md">
                            {props.displayName || "Overview"}
                        </Title>

                        <Text color="dimmed" className={classes.description} mt="sm">
                            {props.description || "No description"}
                        </Text>
                    </Grid.Col>
                </Grid>

                <AccessCode value={props.accessCode} onCopyCode={props.onCopyAccessCode} peopleLink={props.peopleLink} />

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />

                    <Stack spacing="sm">
                        <StatsGroup data={[
                            {
                                title: "# OF STUDENTS",
                                value: props.numberOfStudents || 0,
                            },
                            {
                                title: "# OF EDUCATORS",
                                value: props.numberOfEducators || 0,
                            },
                            {
                                title: `ACTIVE USERS (${monthNames[(new Date()).getMonth()]})`,
                                value: props.percentageOfAccountsActive,
                                unit: "%",
                            },
                        ]}/>
                    </Stack>
                </div>
            </Stack>
            </Container>
        </>
    )
}