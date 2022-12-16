import {IconInfoCircle, IconPlaylistAdd} from "@tabler/icons";
import {useState}                                        from "react";
import * as React                        from 'react';
import {
    createStyles,
    Badge,
    Title,
    Text,
    Container, Stack, Grid,
    Drawer,
    Button, TextInput, ActionIcon,
    Tooltip, Group, LoadingOverlay,
}                    from '@mantine/core';
import { useForm }   from '@mantine/form';
import {StatsGroup}  from "../../components/data/StatsGroup/StatsGroup";
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
 * ClassItem
 */
export type ClassItem = Item

/**
 * ClassesProps
 */
export type ClassesProps = {
    loading: boolean
    classes: ClassItem[]

    onCreateClass:  (group: ClassItem) => void
    onDeleteClass:  (group: ClassItem) => void
    onClassClick: (group: ClassItem) => void
}

/**
 * Classes
 * @param props
 * @constructor
 */
export const Classes = (props: ClassesProps) => {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            classId: '',
            name: '',
            description: '',
        },

        validate: {
            name: (val) => (val.length <= 6 ? 'Name should include at least 6 characters' : null),
        },
    });
    const [opened, setOpened] = useState(false);
    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title={<Group spacing={0}>
                    <Title size="h5">Create a class</Title>
                    <Tooltip label="Classes settings cannot be modified once created">
                        <ActionIcon>
                            <IconInfoCircle color="#3b82f6" size={14} />
                        </ActionIcon>
                    </Tooltip>
            </Group>}
                padding="xl"
                size="xl"
            >
                <form onSubmit={form.onSubmit(() => {
                    const values = form.values
                    form.reset()
                    setOpened(false)
                    props.onCreateClass && props.onCreateClass(values)
                })}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="Class name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            label="Description"
                            placeholder="A class for my first period English students"
                            {...form.getInputProps('description')}
                        />
                    </Stack>
                    <Button type="submit" fullWidth mt="md">
                        Submit
                    </Button>
                </form>
            </Drawer>
            <Container size="lg" py="xl">
                <Stack spacing="md">
                    <Grid>
                        <Grid.Col sm="auto">
                            <Badge variant="filled" size="lg">
                                Classes
                            </Badge>
                            <Title order={2} className={classes.title} mt="md">
                                Organize students into classes
                            </Title>

                            <Text color="dimmed" className={classes.description} mt="sm">
                                A class can be for a specific period of time, grade, team, or other cohorts.
                            </Text>
                        </Grid.Col>
                        <Grid.Col sm="content">
                            { !props.loading && <Button
                                onClick={() => setOpened(true)}
                                leftIcon={<IconPlaylistAdd size={14} />}>
                                Create class
                            </Button> }
                        </Grid.Col>
                    </Grid>

                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay visible={props.loading} overlayBlur={2} />
                        <Stack spacing="sm">
                            <StatsGroup data={[
                                {
                                    title: "# OF CLASSES",
                                    value: props.classes.length,
                                },
                            ]}/>

                            <Table
                                loading={props.loading}
                                items={props.classes}
                                onDeleteClass={props.onDeleteClass}
                                onClick={props.onClassClick}
                            />
                        </Stack>
                    </div>
                </Stack>
            </Container>
        </>
    )
}